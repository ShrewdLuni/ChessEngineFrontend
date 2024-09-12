import { DragEvent, MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import '../assets/board.css';
import helpers from "../lib/helper"
import { cn } from "@/lib/utils";
import { PieceCopy } from "./Piece copy";
import { MoveHint } from "./Hint";

export const ChessBoard = () => {
  const verticalLabels = "87654321".split("");
  const horizontalLabels = "abcdefgh".split("");

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
    setMoveHints(targetSquares)
  }, [startPosition])

  useEffect(() => {
    move(startPosition, targetPosition);
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
  
  function move(from: string,to: string){
    setPieces(prevPieces => {
      const pieceIndex = prevPieces.findIndex(piece => piece.position === from);
      if (pieceIndex === -1) return prevPieces;
  
      return prevPieces.map((piece, index) =>
        index === pieceIndex ? { ...piece, position: to } : piece
      );
    });
  }

  function FENtoBoard(FEN : string){
    const updatedPieces: NewPiece[] = []
    let index : number = 0;
    for(const char of FEN.split(" ")[0]){
      if(char == "/")
        continue
      if(!isNaN(Number(char)))
        index += Number(char)
      else
        updatedPieces.push({ isWhite: char == char.toUpperCase(), position: helpers.getPositionFromIndex(index++), type: helpers.getPieceTypeFromFEN(char)})
    }
    setPieces(updatedPieces)
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className={cn("boardHeight","flex flex-col justify-between text-center text-white font-bold text-lg mr-2")}>
          {verticalLabels.map((char, key) => (<p key={key} className="flex flex-col h-full justify-center">{char}</p>))}
        </div>
        <div>
          <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
            {tiles}
            {pieces.map((piece, key) => <PieceCopy key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} handlers={pieceEventHandlers}/>)}
            {moveHints?.map((hint, key) => <MoveHint key={key} type="" position={Number(hint.targetSquare)}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row justify-between text-center text-white font-bold text-lg w-full")}>
            {horizontalLabels .map((char, key) => (<p key={key} className="w-full">{char}</p>))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-xl text-white font-bold">{startPosition + " " +  helpers.getIndexFromPosition(startPosition)}</p>
        <p className="text-xl text-white font-bold">{targetPosition + " " +  helpers.getIndexFromPosition(targetPosition)}</p>
      </div>
    </div>
  )
}