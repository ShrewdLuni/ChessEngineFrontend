import { cn } from "@/lib/utils"
import { MoveHistory } from "./MoveHistory"
import { PromotionModule } from "./promotionModule";
import { GameSetupModule } from "./gameSetupModule";
import { Evaluation } from "./evaluation";
import { GameStatus } from "./GameStatus";

interface SidebarProps {
  evaluation : number,
  bestMove: string,
  moveHistory: any
  flip: any
  FEN: string
  SetFEN: any
  engineSetPosition: any

  isPromotion: any
  handleMove: any
  promotionOptions: any
  
  isGameOver: any
  isSettings: any
  setIsSettings: any

  toggleRematch: any
  toggleSettings: any
}

export const Sidebar = ({evaluation, bestMove, moveHistory, flip, FEN, SetFEN, engineSetPosition, isPromotion, handleMove, promotionOptions, isGameOver, isSettings, setIsSettings, toggleRematch, toggleSettings} : SidebarProps) => {
  return (
    <div className={cn("boardInfo","flex flex-col justify-start gap-4 text-center bg-[#1a1e23] text-white font-bold text-sm ml-2 overflow-y-scroll no-scrollbar")}>
      {true && <Evaluation evaluation={evaluation} bestMove={bestMove} flip={flip} setIsSettings={setIsSettings}/>}
      {isGameOver && <GameStatus toggleRematch={toggleRematch} toggleSettings={toggleSettings}/>}
      {moveHistory.length > 0 && <MoveHistory moveHistory={moveHistory}/>}
      {isPromotion && <PromotionModule isWhite={FEN.split(" ")[1] == "w"} handleMove={handleMove} promotionOptions={promotionOptions}/>}
      {isSettings && <GameSetupModule FEN={FEN} SetFEN={SetFEN} engineSetPosition={engineSetPosition}/>}
    </div>
  )
}