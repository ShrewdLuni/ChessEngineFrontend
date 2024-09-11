import { DragEvent, MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import '../assets/board.css';
import helpers from "../lib/helper"
import { cn } from "@/lib/utils";
import { PieceCopy } from "./Piece copy";
import { MoveHint } from "./Hint";

export const ChessBoard = () => {

  const [startPosition,setStartPostion] = useState("e6")
  const [targetPosition,setTargetPosition] = useState("e6")

  let ChessBoard = document.getElementById("Board");
  let rect = ChessBoard?.getBoundingClientRect()
  let x: number = rect?.left ?? -1;
  let y: number = rect?.top ?? -1;
  let sideSize = ChessBoard?.clientHeight! / 8;

  let handleDrag = (e : DragEvent) => {setStartPostion(getMousePosition(e))}
  let handleDrop = (e : DragEvent) => {setTargetPosition(getMousePosition(e));}
  let handleClick = (e : MouseEvent) => {setStartPostion(getMousePosition(e))}

  const pieceEventHandlers = {handleDrag, handleDrop, handleClick}

  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [movesData, setMovesData] = useState<{startingSquare : string, targetSquare: string}[]>()

  const updatePosition = () => {
    ChessBoard = document.getElementById("Board");
    rect = ChessBoard?.getBoundingClientRect();
    sideSize = ChessBoard?.clientHeight! / 8;
    x = rect?.left ?? -1;
    y = rect?.top ?? -1;
    console.log(ChessBoard?.clientHeight)
  };

  useLayoutEffect(() => {
    updatePosition()

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    if(movesData == undefined)
      return
    let targetSquares = movesData.filter(move => move.startingSquare == (helpers.getIndexFromPosition(startPosition)).toString())
    console.log(targetSquares)
    setMoveHints(targetSquares)
  }, [startPosition])

  useEffect(() => {
    move();
    getData();
  }, [targetPosition])

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chess/");
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMovesData(data)
    };
  
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    setSocket(ws);
  
    return () => {
      ws.close();
    };
  }, []);

  const getData = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: "Get Random Int" }));
    }
  };
  
  const [tiles, setTiles] = useState(helpers.getTiles())
  const [pieces, setPieces] = useState(helpers.getPieces())
  const [moveHints, setMoveHints] = useState<{startingSquare:string,targetSquare: string}[]>();

  function getMousePosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const row = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7)
    const col = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7)
    return(helpers.getPositionFromRowAndCol(row,col))
  }
  
  function move(){
    setPieces(prevPieces => {
      const pieceIndex = prevPieces.findIndex(piece => piece.position === startPosition);
      if (pieceIndex === -1) return prevPieces;
  
      return prevPieces.map((piece, index) =>
        index === pieceIndex ? { ...piece, position: targetPosition } : piece
      );
    });
  }

  function FENtoBoard(FEN : string){
    const fields: string[] = FEN.split(" ")

    const fenToPiece:{[key: string]: PieceType} = {
      "p" : "pawn",
      "n" : "knight",
      "b" : "bishop",
      "r" : "rook",
      "q" : "queen",
      "k" : "king",
    }

    const temporaryPieces: NewPiece[] = []

    let index : number = 0;
    const position = fields[0];
    for (let i = 0; i < position.length; i++) {
      if(!isNaN(Number(position.charAt(i)))){
        index += Number(position.charAt(i));
      }
      else if(position.charAt(i) != "/"){
        temporaryPieces.push({ isWhite: position.charAt(i) == position.charAt(i).toUpperCase(), position: helpers.getPositionFromIndex(index), type: fenToPiece[position.charAt(i).toLowerCase()]})
        index++;
      }
    }
    setPieces(temporaryPieces)
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className={cn("boardHeight","flex flex-col justify-between text-center text-white font-bold text-lg mr-2")}>
          <div className="flex flex-col h-full justify-center">8</div>
          <div className="flex flex-col h-full justify-center">7</div>
          <div className="flex flex-col h-full justify-center">6</div>
          <div className="flex flex-col h-full justify-center">5</div>
          <div className="flex flex-col h-full justify-center">4</div>
          <div className="flex flex-col h-full justify-center">3</div>
          <div className="flex flex-col h-full justify-center">2</div>
          <div className="flex flex-col h-full justify-center">1</div>
        </div>
        <div>
          <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={() => {FENtoBoard("4kb1r/p4ppp/4q3/8/8/1B6/PPP2PPP/2KR4")}}>
            {tiles}
            {pieces.map(piece => <PieceCopy type={piece.type} position={piece.position} isWhite={piece.isWhite} handlers={pieceEventHandlers}/>)}
            {moveHints?.map(hint => <MoveHint type="" position={Number(hint.targetSquare)}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row w-full justify-between text-center text-white font-bold text-lg")}>
            <p className="w-full">a</p>
            <p className="w-full">b</p>
            <p className="w-full">c</p>
            <p className="w-full">d</p>
            <p className="w-full">e</p>
            <p className="w-full">f</p>
            <p className="w-full">g</p>
            <p className="w-full">h</p>
          </div>
        </div>
      </div>
      <p className="text-xl text-white font-bold">{startPosition + " " +  helpers.getIndexFromPosition(startPosition)}</p>
      <p className="text-xl text-white font-bold">{targetPosition + " " +  helpers.getIndexFromPosition(targetPosition)}</p>
    </div>
  )
}