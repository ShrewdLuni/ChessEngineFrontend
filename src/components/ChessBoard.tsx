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

  for(let i = 0;i < 64; i++){
    initialBoard.push(<Tile isWhite={(i + Math.floor(i/8)) % 2 == 0} piece={null}/>)
  }
  initialBoard[63] = <Tile isWhite={(63 + Math.floor(63/8)) % 2 == 0} piece={pawn}/>

  let moves = ["a","b","c","d","e","f","g","h"]

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

  return (
    <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={showPosition}>
      {board.map(tile => tile)}
    </div>
  )
}