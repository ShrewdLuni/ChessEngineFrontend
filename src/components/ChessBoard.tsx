import { useEffect, useMemo, useRef, useState } from "react";
import { Piece } from "./Piece";
import { MoveHint } from "./Hint";
import { cn, getPieceEventHandlers, getMoveFunction, getUpdatePiecesFromFENFunction } from "@/lib/utils";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useBoardPosition } from "@/hooks/useBoardPosition";
import helpers from "../lib/helper";
import '../assets/board.css';
import { Sidebar } from "./sidebar";

export const ChessBoard = () => {
  const tiles = useMemo(() => helpers.getTiles(), []);
  const [pieces, setPieces] = useState(helpers.getPiecesFromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [moveHints, setMoveHints] = useState<{starting_square: number, target_square: number}[] | null>();

  const [currentPosition, setCurrentPosition] = useState("e6");
  const [targetPosition, setTargetPosition] = useState("e6"); 

  const [evaluation, setEvaluation] = useState(50);
  const [movesHistory, setMovesHistory] = useState(null)

  const [movesData, setMovesData] = useState<Move[]>();

  const [isGameOver, setIsGameOver] = useState(false)
  const [isStartScreen, setsIsStartScreen] = useState(true)

  const move = getMoveFunction(setPieces)
  const updatePiecesFromFEN = getUpdatePiecesFromFENFunction(setPieces)

  const websocket = useWebSocket({setMovesData, updatePiecesFromFEN, setIsGameOver})

  const boardRef = useRef<HTMLDivElement>(null);
  const boardPosition = useBoardPosition(boardRef); 

  const pieceEventHandlers = getPieceEventHandlers(setCurrentPosition,setTargetPosition,boardPosition)

  useEffect(() => {
    if(movesData == undefined)
      return
    let targetSquares = movesData.filter(move => move.starting_square == helpers.getIndexFromPosition(currentPosition));
    setMoveHints(targetSquares);
  }, [currentPosition])

  useEffect(() => {
    if(targetPosition == "a0" || currentPosition == targetPosition)
      return
    const foundMove = movesData?.find(move => move.starting_square == helpers.getIndexFromPosition(currentPosition) && move.target_square == helpers.getIndexFromPosition(targetPosition));

    if (foundMove) {
      move(currentPosition, targetPosition);
      websocket.engineMakeMove(foundMove)
      setMoveHints(null)
    } else {
      console.log("Not legal move was used");
    }
    setTargetPosition("a0")
  }, [targetPosition])

  return (
    <div>
      <div className="flex flex-row">
        <div className={cn("flex flex-col justify-between text-right font-mono text-white font-bold text-xs sm:text-sm lg:text-lg mr-2")}>
          {["8", "7", "6", "5", "4", "3", "2", "1"].map((char, key) => (<p key={key} className="flex flex-col h-full justify-center">{char}</p>))}
        </div>
        <div>
          <div id="Board" ref={boardRef} className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
            {tiles}
            {pieces.map((piece, key) => <Piece key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} handlers={pieceEventHandlers}/>)}
            {moveHints?.map((hint, key) => <MoveHint key={key} type="" index={hint.target_square}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row justify-between text-center text-white font-bold font-mono text-xs sm:text-sm lg:text-lg w-full")}>
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((char, key) => (<p key={key} className="w-full">{char}</p>))}
          </div>
        </div>
        <Sidebar evaluation={evaluation} moveHistory={movesHistory}/>
      </div>
    </div>
  )
}