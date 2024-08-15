import { useEffect, useLayoutEffect, useState } from "react";
import { Piece } from "./Piece";
import { Tile } from "./Tile";
import helpers from "../lib/helper"

export const ChessBoard = () => {

  const [startPosition,setStratPostion] = useState("e6")
  const [endPosition,setEndPostion] = useState("e6")

  let ChessBoard = document.getElementById("Board");
  let rect = ChessBoard?.getBoundingClientRect()
  let x: number = rect?.left ?? -1;
  let y: number = rect?.top ?? -1;

  let handleDrag = (e : DragEvent) => {setStratPostion(getMousePosition(e))}
  let handleDrop = (e : DragEvent) => {setEndPostion(getMousePosition(e));}

  useLayoutEffect(() => {
    ChessBoard = document.getElementById("Board");
    rect = ChessBoard?.getBoundingClientRect()
    x = rect?.left ?? -1;
    y = rect?.top ?? -1;

    FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  }, []);

  useEffect(() => {
    move();
  }, [endPosition])

  const initialBoard: {
    element: JSX.Element;
    tile: {isWhite: boolean};
    piece: {isWhite: boolean, pieceType : "none" | "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"}
  }[] = helpers.getBoard();

  const moves = ["a","b","c","d","e","f","g","h"]

  const convertor: {[key: string]: number} = helpers.getConvertor();

  const [board, setBoard] = useState(initialBoard);

  function getMousePosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const one = helpers.clamp(Math.floor((e.clientX - x) / 100), 0, 7)
    const two = helpers.clamp(Math.floor((e.clientY - y) / 100), 0, 7)
    return(moves[one] + "" + (8-two))
  }
  
  function move(){
    const newBoard = [...board]
    console.log(startPosition, endPosition)
    
    const start = Object.assign({}, newBoard[convertor[startPosition]]);
    const end = Object.assign({}, newBoard[convertor[endPosition]]);
    
    newBoard[convertor[endPosition]] = {
    element:<Tile 
      isWhite={end.tile.isWhite} piece={start.piece.pieceType == "none" ? null : 
      <Piece pieceType={start.piece.pieceType} 
        isWhite={start.piece.isWhite} 
        handleDrag={handleDrag} 
        handleDrop={handleDrop}/>}
        />,
    tile:{isWhite:end.tile.isWhite},
    piece:{isWhite:start.piece.isWhite,pieceType:start.piece.pieceType}}
    
    newBoard[convertor[startPosition]] = {
    element:<Tile isWhite={start.tile.isWhite} piece={null}/>,
    tile:{isWhite:start.tile.isWhite},
    piece:{isWhite:end.piece.isWhite,pieceType:end.piece.pieceType}}

    setBoard(newBoard)
  }

  function FENtoBoard(FEN : string){
    const fields: string[] = FEN.split(" ")

    const fenToPiece:{[key: string]: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"} = {
      "p" : "pawn",
      "n" : "knight",
      "b" : "bishop",
      "r" : "rook",
      "q" : "queen",
      "k" : "king",
    }

    let index : number = 0;
    const position = fields[0];
    for (let i = 0; i < position.length; i++) {
      if(!isNaN(Number(position.charAt(i)))){
        let empty = Number(position.charAt(i));
        for(let j = 0; j < empty; j++) {
          initialBoard[index] = {
            element:<Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={null}/>,
            tile:{isWhite:((index + Math.floor(index/8)) % 2 == 0)},
            piece:{isWhite:(position.charAt(i) == position.charAt(i).toUpperCase()),pieceType:"none"}} 
          index++;
        }
        console.log(index,"empty")
      }
      else if(position.charAt(i) != "/"){
        initialBoard[index] = {
        element:<Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={
        <Piece pieceType={fenToPiece[position.charAt(i).toLowerCase()]} 
        isWhite={position.charAt(i) == position.charAt(i).toUpperCase()} 
        handleDrag={handleDrag} 
        handleDrop={handleDrop}/>}/>,
        tile:{isWhite:((index + Math.floor(index/8)) % 2 == 0)},
        piece:{isWhite:(position.charAt(i) == position.charAt(i).toUpperCase()),pieceType:fenToPiece[position.charAt(i).toLowerCase()]}}
        index++;
      }
      setBoard([...initialBoard])
    }
  }

  return (
    <div>
      <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
        {board.map(item => item.element)}
      </div>
    </div>
  )
}