import { useLayoutEffect, useState } from "react";
import { Piece } from "./Piece";
import { Tile } from "./Tile";

export const ChessBoard = () => {

  const [startPosition,setStratPostion] = useState("a1")
  const [endPosition,setEndPostion] = useState("a1")

  let ChessBoard = document.getElementById("Board");
  let rect = ChessBoard?.getBoundingClientRect()
  let x : number = rect == undefined ? -1 : rect.left == undefined ? -1 : rect.left
  let y : number = rect == undefined ? -1 : rect.top == undefined ? -1 : rect.top

  useLayoutEffect(() => {
    ChessBoard = document.getElementById("Board");
    rect = ChessBoard?.getBoundingClientRect()
    x = rect == undefined ? -1 : rect.left == undefined ? -1 : rect.left
    y = rect == undefined ? -1 : rect.top == undefined ? -1 : rect.top
    // ChessBoard?.addEventListener("mousemove", (e) => {
    //   showPosition(e)
    // });
    FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  }, []);

  let initialBoard: {
    element: JSX.Element;
    tile:{isWhite:boolean};
    piece:{isWhite:boolean,pieceType : "none" | "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"}
  }[] = []

  let moves = ["a","b","c","d","e","f","g","h"]

  let convertor: {[key: string]: number} = {}
  let c = 0
  for(let i = 8;i > 0; i--)
    for(let j = 0;j < 8; j++)
      convertor[moves[j] + "" + i] = c++

  for(let i = 0;i < 64; i++){
    initialBoard.push({element:<Tile isWhite={(i + Math.floor(i/8)) % 2 == 0} piece={null}/>,tile:{isWhite:((i + Math.floor(i/8)) % 2 == 0)},piece:{isWhite:false,pieceType:"none"}})
  }
  const [board, setBoard] = useState(initialBoard);


  function clamp(target:number, min:number, max:number){
    if(target < min){
      return min;
    }
    else if(target > max){
      return max;
    }
    return target;
  }

  function showPosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let one = clamp(Math.floor((e.clientX - x) / 100), 0, 7)
    let two = clamp(Math.floor((e.clientY - y) / 100), 0, 7)
    return(moves[one] + "" + (8-two))
  }
  
  function move(){
    console.log("move")

    const newBoard = [...board]
    console.log(startPosition)
    
    let start = Object.assign({}, newBoard[convertor[startPosition]]);
    let end = Object.assign({}, newBoard[convertor[endPosition]]);

    newBoard[convertor[endPosition]] = {
      element:<Tile isWhite={end.tile.isWhite} piece={start.piece.pieceType == "none" ? null : 
        <Piece pieceType={start.piece.pieceType} 
          isWhite={start.piece.isWhite} 
          handleDrag={(e : DragEvent) => {setStratPostion(showPosition(e))}} 
          handleDrop={(e : DragEvent) => {setEndPostion(showPosition(e));move()}}/>}/>,
      tile:{isWhite:end.tile.isWhite},
      piece:{isWhite:start.piece.isWhite,pieceType:start.piece.pieceType}}
    
      newBoard[convertor[startPosition]] = {
      element:<Tile isWhite={start.tile.isWhite} piece={end.piece.pieceType == "none" ? null : 
        <Piece pieceType={end.piece.pieceType} 
          isWhite={end.piece.isWhite} 
          handleDrag={(e : DragEvent) => {setStratPostion(showPosition(e))}} 
          handleDrop={(e : DragEvent) => {setEndPostion(showPosition(e));move()}}/>}/>,
      tile:{isWhite:start.tile.isWhite},
      piece:{isWhite:end.piece.isWhite,pieceType:end.piece.pieceType}}
    setBoard(newBoard)
  }

  function FENtoBoard(FEN : string){
    let fields: string[] = FEN.split(" ")

    let fenToPiece:{[key: string]: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"} = {
      "p" : "pawn",
      "n" : "knight",
      "b" : "bishop",
      "r" : "rook",
      "q" : "queen",
      "k" : "king",
    }

    let index : number = 0;
    let position = fields[0];
    for (let i = 0; i < position.length; i++) {
      if(!isNaN(Number(position.charAt(i)))){
        index += Number(position.charAt(i))
      }
      else if(position.charAt(i) != "/"){
        initialBoard[index] = {
        element:<Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={
        <Piece pieceType={fenToPiece[position.charAt(i).toLowerCase()]} 
        isWhite={position.charAt(i) == position.charAt(i).toUpperCase()} 
        handleDrag={(e : DragEvent) => {setStratPostion(showPosition(e))}} 
        handleDrop={(e : DragEvent) => {setEndPostion(showPosition(e));move()}}/>}/>,
        tile:{isWhite:((index + Math.floor(index/8)) % 2 == 0)},
        piece:{isWhite:(position.charAt(i) == position.charAt(i).toUpperCase()),pieceType:fenToPiece[position.charAt(i).toLowerCase()]}}
        index++;
      }
      setBoard([...initialBoard])
    }
  }

  return (
    <div>
      <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={(e) => {console.log(showPosition(e))}}>
        {board.map(item => item.element)}
      </div>
      <p className="text-white text-xl">{startPosition}</p>
      <p className="text-white text-xl">{endPosition}</p>
    </div>
  )
}