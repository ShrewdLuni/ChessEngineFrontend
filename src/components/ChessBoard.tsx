import { DragEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { Piece } from "./Piece";
import { MoveHint } from "./Hint";
import { cn, playSound } from "@/lib/utils";
import helpers from "../lib/helper";
import '../assets/board.css';
import moveSound from '../assets/sounds/move.mp3';
import captureSound from '../assets/sounds/capture.mp3'
import { useWebSocket } from "@/hooks/useWebSocket";

export const ChessBoard = () => {
  const tiles = useMemo(() => helpers.getTiles(), []);
  const [pieces, setPieces] = useState(helpers.getPiecesFromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [moveHints, setMoveHints] = useState<{starting_square: number, target_square: number}[] | null>();

  const [currentPosition, setCurrentPosition] = useState("e6");
  const [targetPosition, setTargetPosition] = useState("e6"); 

  const [movesData, setMovesData] = useState<Move[]>();

  const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0, sideSize: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  const [isGameOver, setIsGameOver] = useState(false)

  const socketSend = useWebSocket({setMovesData, updatePiecesFromFEN, setIsGameOver})

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
    let targetSquares = movesData.filter(move => move.starting_square == helpers.getIndexFromPosition(currentPosition));
    setMoveHints(targetSquares);
  }, [currentPosition])

  useEffect(() => {
    if(targetPosition == "a0")
      return
    if(currentPosition == targetPosition)
      return
    const foundMove = movesData?.find(move => move.starting_square == helpers.getIndexFromPosition(currentPosition) && move.target_square == helpers.getIndexFromPosition(targetPosition));

    if (foundMove) {
      move(currentPosition, targetPosition);
      engineMakeMove(foundMove);
      setMoveHints(null)
    } else {
      console.log("Not legal move was used");
    }
    setTargetPosition("a0")
  }, [targetPosition])

  const updatePosition = debounce(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const sideSize = boardRef.current.clientHeight / 8;
      setBoardPosition({ x: rect.left, y: rect.top, sideSize });
    }
  }, 100);

  function getMousePosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { x, y, sideSize } = boardPosition;
    const row = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7);
    const col = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7);
    return(helpers.getPositionFromRowAndCol(row, col))
  }
  
  function updatePiecesFromFEN(newFEN: string) {
    playSound(moveSound)
    setPieces(helpers.getPiecesFromFEN(newFEN));
  }

  const engineMakeMove = (move: Move) => {
    socketSend({action: "engine_make_move", move: move})
  };

  const unMakeMove = () => {
    socketSend({action: "engine_unmake_move"})
  }
  
  function move(from: string,to: string, flag: number  = 0){
    setPieces(prevPieces => {
      const pieceIndex = prevPieces.findIndex(piece => piece.position === from);
      if (pieceIndex === -1) return prevPieces;
      const captureIndex = prevPieces.findIndex(piece => piece.position == to);
      playSound(captureIndex == -1 ? moveSound : captureSound)
      return prevPieces.map((piece, index) =>
        index === pieceIndex ? { ...piece, position: to } : piece
      );
    });
  }

  return (
    <div>
      {isGameOver && 
        <div className="text-white text-2xl absolute z-[9999] bg-black p-8 rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          Game Over
          <p className="text-xl text-black font-bold border-solid border-4 border-white p-2 bg-white rounded-xl hover:bg-gray-500 transition-all duration-200" onClick={() => {unMakeMove()}}>Play Again</p>
        </div>
      }
      <div className="flex flex-row">
        <div className={cn("boardHeight","flex flex-col justify-between text-center text-white font-bold text-lg mr-2")}>
          {["8", "7", "6", "5", "4", "3", "2", "1"].map((char, key) => (<p key={key} className="flex flex-col h-full justify-center">{char}</p>))}
        </div>
        <div>
          <div id="Board" ref={boardRef} className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
            {tiles}
            {pieces.map((piece, key) => <Piece key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} handlers={pieceEventHandlers}/>)}
            {moveHints?.map((hint, key) => <MoveHint key={key} type="" index={hint.target_square}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row justify-between text-center text-white font-bold text-lg w-full")}>
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((char, key) => (<p key={key} className="w-full">{char}</p>))}
          </div>
        </div>
      </div>
      <div>
        {/* <p className="text-xl text-black font-bold border-solid border-4 border-white p-2 bg-white hover:bg-gray-500 transition-all duration-200" onClick={() => {unMakeMove()}}>undo</p> */}
        {/* <p className="text-xl text-white font-bold">{currentPosition + " " +  helpers.getIndexFromPosition(currentPosition)}</p> */}
        {/* <p className="text-xl text-white font-bold">{targetPosition + " " +  helpers.getIndexFromPosition(targetPosition)}</p> */}
      </div>
    </div>
  )
}