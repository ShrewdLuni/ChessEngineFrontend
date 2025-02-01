import { useEffect, useMemo, useRef, useState } from "react";
import { getPieceEventHandlers, getMoveFunction, getUpdatePiecesFromFENFunction } from "@/lib/utils";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useBoardPosition } from "@/hooks/useBoardPosition";
import helpers from "../lib/helper";
import '../assets/board.css';
import { Sidebar } from "./sidebar";
import { BoardRender } from "./BoardRender";

export const ChessBoard = () => {
  const [userFEN, setUserFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

  const tiles = useMemo(() => helpers.getTiles(), []);
  const [pieces, setPieces] = useState(helpers.getPiecesFromFEN(userFEN));
  const [moveHints, setMoveHints] = useState<{starting_square: number, target_square: number}[] | null>();

  const [currentPosition, setCurrentPosition] = useState("e6");
  const [targetPosition, setTargetPosition] = useState("e6"); 

  const [evaluation, setEvaluation] = useState(0);
  const [bestMove, setBestMove] = useState("")
  const [movesHistory, setMovesHistory] = useState(null)

  const [movesData, setMovesData] = useState<Move[]>();

  const [isGameOver, setIsGameOver] = useState(false)
  const [isStartScreen, setsIsStartScreen] = useState(true)

  const [isFlipped, setIsFlipped] = useState(false)

  const move = getMoveFunction(setPieces)
  const updatePiecesFromFEN = getUpdatePiecesFromFENFunction(setPieces)

  const websocket = useWebSocket({setEvaluation, setBestMove, setMovesData, updatePiecesFromFEN, setIsGameOver})

  const boardRef = useRef<HTMLDivElement>(null);
  const boardPosition = useBoardPosition(boardRef); 

  const pieceEventHandlers = getPieceEventHandlers(setCurrentPosition, setTargetPosition, boardPosition)

  useEffect(() => {
    const fenRegex = /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+ [wb] (K?Q?k?q?|-) (-|[a-h][36]) \d+ \d+$/;
    if(fenRegex.test(userFEN))
      (userFEN)
  }, [userFEN])

  useEffect(() => {
    if(movesData == undefined)
      return
    const index = helpers.getIndexFromPosition(currentPosition);
    const targetSquares = movesData.filter(move => move.starting_square === (isFlipped ? 63 - index : index));
    setMoveHints(targetSquares);
  }, [currentPosition])

  useEffect(() => {
    if(targetPosition == "a0" || currentPosition == targetPosition)
      return
    const startIndex = helpers.getIndexFromPosition(currentPosition);
    const targetIndex = helpers.getIndexFromPosition(targetPosition);
    const foundMove = movesData?.find(move => move.starting_square === (isFlipped ? 63 - startIndex : startIndex) && move.target_square === (isFlipped ? 63 - targetIndex : targetIndex));

    if (foundMove) {
      move(isFlipped ? helpers.getPositionFromIndex(63 - startIndex) : currentPosition, isFlipped ? helpers.getPositionFromIndex(63 - targetIndex) : targetPosition);
      websocket.engineMakeMove(foundMove)
      setMoveHints(null)
    } else {
      console.log("Not legal move was used");
    }
    setTargetPosition("a0")
  }, [targetPosition])

  return (
    <div className="flex flex-row">
      <BoardRender boardRef={boardRef} isFlipped={isFlipped} moveHints={moveHints} pieces={pieces} tiles={tiles} pieceEventHandlers={pieceEventHandlers}/>
      <Sidebar evaluation={evaluation} bestMove={bestMove} moveHistory={movesHistory} flip={() => {setIsFlipped(!isFlipped)}} FEN={userFEN} SetFEN={setUserFEN} engineSetPosition={websocket.engineSetPosition}/>
    </div>
  )
}