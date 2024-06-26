import { useLayoutEffect, useState } from "react";
import { Piece } from "./Piece";

export const ChessBoard = () => {
  const whiteTile = <div className="flex justify-center items-center h-[100px] max-w-[100px] bg-[#1a1e23] aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100"><Piece handleDrop={move}/></div>
  const blackTile = <div className="flex justify-center items-center h-[100px] max-w-[100px] bg-[#8c8fbc] aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100"></div>

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

  let initialBoard : JSX.Element[] = []
  for(let i = 0;i < 64; i++){
    initialBoard.push((i + Math.floor(i/8)) % 2 == 0 ? whiteTile : blackTile)
  } 

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
    initialBoard[1] = <div className="flex justify-center items-center h-[100px] max-w-[100px] bg-[#1a1e23] aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100"><Piece handleDrop={move}/></div>
    setBoard(initialBoard)
  }

  let pawn = <Piece handleDrop={showPosition}/>
  let pieces = [pawn]

  return (
    <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={showPosition}>
      {board}
    </div>
  )
}