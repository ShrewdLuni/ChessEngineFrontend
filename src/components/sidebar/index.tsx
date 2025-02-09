import { cn } from "@/lib/utils";
import { MoveHistory } from "./MoveHistory";
import { PromotionModule } from "./promotionModule";
import { GameSetupModule } from "./gameSetupModule";
import { Evaluation } from "./evaluation";
import { GameStatus } from "./GameStatus";

interface SidebarProps {
  evaluation: number;
  bestMove: string;
  moveHistory: { white: string; black: string; }[];
  flip: () => void;
  FEN: string;
  SetFEN: React.Dispatch<React.SetStateAction<string>>;
  engineSetPosition: (fen: string) => void;

  isPromotion: boolean;
  handleMove: (foundMove: Move, from: string, to: string, flag?: number) => void;
  promotionOptions: { move: Move; from: string; to: string;}[];
  
  isGameOver: boolean;
  isSettings: boolean;
  setIsSettings: () => void;
  toggleRematch: () => void;
  toggleSettings: () => void;
}

export const Sidebar = ({ evaluation, bestMove, moveHistory, flip, FEN, SetFEN, engineSetPosition, isPromotion, handleMove, promotionOptions, isGameOver, isSettings, setIsSettings, toggleRematch, toggleSettings } : SidebarProps) => {
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