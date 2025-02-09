import { Castling } from "./Castling";
import { ColorToMove } from "./ColorToMove";
import { Fen } from "./Fen";

interface GemeSetupModuleProps {
  FEN: string;
  SetFEN: React.Dispatch<React.SetStateAction<string>>;
  engineSetPosition: (fen: string) => void;
}

export const GameSetupModule = ({ FEN, SetFEN, engineSetPosition }: GemeSetupModuleProps) => {
  return (
    <div className="text-left">
      <ColorToMove FEN={FEN} SetFEN={SetFEN}/>
      <Castling FEN={FEN} SetFEN={SetFEN}/>
      <Fen FEN={FEN} SetFEN={SetFEN} engineSetPosition={engineSetPosition}/>
    </div>
  )
}