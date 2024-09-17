import { DragEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { Piece } from "./Piece";
import { MoveHint } from "./Hint";
import { cn } from "@/lib/utils";
import helpers from "../lib/helper";
import '../assets/board.css';

export const ChessBoard = () => {
  const [FEN, setFEN] = useState("rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1")

  const tiles = useMemo(() => helpers.getTiles(), []);
  const [pieces, setPieces] = useState(helpers.getPiecesFromFEN(FEN));
  const [moveHints, setMoveHints] = useState<{starting_square: string, target_square: string}[]>();

  const [currentPosition, setCurrentPosition] = useState("e6");
  const [targetPosition, setTargetPosition] = useState("e6"); 
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [movesData, setMovesData] = useState<{starting_square: string, target_square: string}[]>();

  const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0, sideSize: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  let handleDrag = (e : DragEvent) => {setCurrentPosition(getMousePosition(e));}
  let handleDrop = (e : DragEvent) => {setTargetPosition(getMousePosition(e));}
  let handleClick = (e : MouseEvent) => {setCurrentPosition(getMousePosition(e));}
  const pieceEventHandlers = {handleDrag, handleDrop, handleClick};

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    if(movesData == undefined)
      return
    let targetSquares = movesData.filter(move => move.starting_square == (helpers.getIndexFromPosition(currentPosition)).toString());
    setMoveHints(targetSquares);
  }, [currentPosition])

  useEffect(() => {
    if(currentPosition == targetPosition)
      return
    move(currentPosition, targetPosition);
    engineMakeMove(currentPosition, targetPosition);
  }, [targetPosition])

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chess/");
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ action: "get_chess_info" }));
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case 'engine_make_move':
          console.log(helpers.getPositionFromIndex(data.engine_move.starting_square),helpers.getPositionFromIndex(data.engine_move.target_square))
          move(helpers.getPositionFromIndex(data.engine_move.starting_square), helpers.getPositionFromIndex(data.engine_move.target_square))
          setMovesData(data.moves);
          break;
        case 'generate_random_number':
          console.log(data.random_number);
          break;
        default:
          console.log('Unknown action:', data);
      }
    };
  
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    setSocket(ws);
  
    return () => {
      ws.close();
    };
  }, []);

  const updatePosition = debounce(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const sideSize = boardRef.current.clientHeight / 8;
      setBoardPosition({ x: rect.left, y: rect.top, sideSize });
    }
  }, 100);

  const engineMakeMove = (from: string, to: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({action: "engine_make_move", move: {starting_square: helpers.getIndexFromPosition(from), target_square: helpers.getIndexFromPosition(to)}}));
    }
  };

  function getMousePosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { x, y, sideSize } = boardPosition;
    const row = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7);
    const col = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7);
    return(helpers.getPositionFromRowAndCol(row, col))
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

  return (
    <div>
      <div className="flex flex-row">
        <div className={cn("boardHeight","flex flex-col justify-between text-center text-white font-bold text-lg mr-2")}>
          {["8", "7", "6", "5", "4", "3", "2", "1"].map((char, key) => (<p key={key} className="flex flex-col h-full justify-center">{char}</p>))}
        </div>
        <div>
          <div id="Board" ref={boardRef} className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
            {tiles}
            {pieces.map((piece, key) => <Piece key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} handlers={pieceEventHandlers}/>)}
            {moveHints?.map((hint, key) => <MoveHint key={key} type="" position={Number(hint.target_square)}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row justify-between text-center text-white font-bold text-lg w-full")}>
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((char, key) => (<p key={key} className="w-full">{char}</p>))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-xl text-white font-bold">{currentPosition + " " +  helpers.getIndexFromPosition(currentPosition)}</p>
        <p className="text-xl text-white font-bold">{targetPosition + " " +  helpers.getIndexFromPosition(targetPosition)}</p>
      </div>
    </div>
  )
}