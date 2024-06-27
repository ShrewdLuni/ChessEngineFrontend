import { useLayoutEffect, useState } from "react";
import { Piece } from "./Piece";
import { Tile } from "./Tile";

export const ChessBoard = () => {

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
  }, []);

  let pawn = <Piece pieceType="knight" isWhite={false} handleDrop={move}/>
  let initialBoard: JSX.Element[] = []

  let moves = ["a","b","c","d","e","f","g","h"]

  let convertor: {[key: string]: number} = {}
  let c = 0
  for(let i = 8;i > 0; i--)
    for(let j = 0;j < 8; j++)
      convertor[moves[j] + "" + i] = c++

  for(let i = 0;i < 64; i++){
    initialBoard.push(<Tile isWhite={(i + Math.floor(i/8)) % 2 == 0} piece={null}/>)
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

  function showPosition(e : React.MouseEvent<HTMLElement> | MouseEvent) {
    let one = clamp(Math.floor((e.clientX - x) / 100), 0, 7)
    let two = clamp(Math.floor((e.clientY - y) / 100), 0, 7)
    console.log(moves[one] + "" + (8-two))
  }

  function move(){
    console.log("чиназес")
    initialBoard[0] = <Tile isWhite={(0 + Math.floor(0/8)) % 2 == 0} piece={pawn}/>
    initialBoard[63] = <Tile isWhite={(63 + Math.floor(63/8)) % 2 == 0} piece={null}/>
    setBoard([...initialBoard])
  }

  function FENtoBoard(position : string){
    console.log(position)
    let fenToPiece:{[key: string]: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"} = {
      "p" : "pawn",
      "n" : "knight",
      "b" : "bishop",
      "r" : "rook",
      "q" : "queen",
      "k" : "king",
    }

    let index : number = 0;
    for (let i = 0; i < position.length; i++) {
      if(!isNaN(Number(position.charAt(i)))){
        index += Number(position.charAt(i))
      }
      else if(position.charAt(i) != "/"){
        initialBoard[index] = <Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={<Piece pieceType={fenToPiece[position.charAt(i).toLowerCase()]} isWhite={position.charAt(i) == position.charAt(i).toUpperCase()} handleDrop={move}/>}/>
        index++;
      }
    }
    setBoard([...initialBoard])
  }

  return (
    <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={() => {FENtoBoard("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8")}}>
      {board.map(tile => tile)}
    </div>
  )
}