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

  const [evaluation, setEvaluation] = useState(0);
  const [bestMove, setBestMove] = useState("")
  const [movesHistory, setMovesHistory] = useState(null)

  const [movesData, setMovesData] = useState<Move[]>();

  const [isGameOver, setIsGameOver] = useState(false)
  const [isStartScreen, setsIsStartScreen] = useState(true)


  const [isBlack, setIsBlack] = useState(false) 

  const move = getMoveFunction(setPieces)
  const updatePiecesFromFEN = getUpdatePiecesFromFENFunction(setPieces)

  const websocket = useWebSocket({setEvaluation, setBestMove, setMovesData, updatePiecesFromFEN, setIsGameOver})

  const boardRef = useRef<HTMLDivElement>(null);
  const boardPosition = useBoardPosition(boardRef); 

  const pieceEventHandlers = getPieceEventHandlers(setCurrentPosition,setTargetPosition,boardPosition)

  const rank = isBlack ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const flie = isBlack ? ["1", "2", "3", "4", "5", "6", "7", "8"] : ["8", "7", "6", "5", "4", "3", "2", "1"];

  useEffect(() => {
    if(movesData == undefined)
      return
    const index = helpers.getIndexFromPosition(currentPosition);
    const targetSquares = movesData.filter(move => move.starting_square === (isBlack ? 63 - index : index));
    setMoveHints(targetSquares);
  }, [currentPosition])

  useEffect(() => {
    if(targetPosition == "a0" || currentPosition == targetPosition)
      return
    const startIndex = helpers.getIndexFromPosition(currentPosition);
    const targetIndex = helpers.getIndexFromPosition(targetPosition);
    const foundMove = movesData?.find(move => 
      move.starting_square === (isBlack ? 63 - startIndex : startIndex) && 
      move.target_square === (isBlack ? 63 - targetIndex : targetIndex)
    );
    

    if (foundMove) {
      if(isBlack){
        move(helpers.getPositionFromIndex(63 - helpers.getIndexFromPosition(currentPosition)), helpers.getPositionFromIndex(63 - helpers.getIndexFromPosition(targetPosition))); //flipped
      }
      else{
        move(currentPosition,targetPosition);
      }
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
        <div className={cn("boardHeight flex flex-col justify-between text-right font-mono text-white font-bold text-xs sm:text-sm lg:text-lg mr-2")}>
          {flie.map((char, key) => (<p key={key} className="flex flex-col justify-center">{char}</p>))}
        </div>
        <div>
          <div id="Board" ref={boardRef} className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1">
            {tiles}
            {pieces.map((piece, key) => <Piece key={key} type={piece.type} position={piece.position} isWhite={piece.isWhite} isBlack={isBlack} handlers={pieceEventHandlers}/>)}
            {moveHints?.map((hint, key) => <MoveHint key={key} type="" index={hint.target_square} isBlack={isBlack}/>)}
          </div>
          <div className={cn("boardWidth","flex flex-row justify-between text-center text-white font-bold font-mono text-xs sm:text-sm lg:text-lg w-full")}>
            {rank.map((char, key) => (<p key={key} className="w-full">{char}</p>))}
          </div>
        </div>
        <Sidebar evaluation={evaluation} bestMove={bestMove} moveHistory={movesHistory} flip={() => {setIsBlack(!isBlack)}}/>
      </div>
    </div>
  )
}