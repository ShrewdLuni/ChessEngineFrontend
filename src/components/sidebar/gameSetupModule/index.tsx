import { Castling } from "./Castling"
import { ColorToMove } from "./ColorToMove"
import { Fen } from "./Fen"

interface GemeSetupModuleProps {
  FEN: string
  SetFEN: any
}

export const GameSetupModule = ({FEN, SetFEN}: GemeSetupModuleProps) => {
  return (
    <div className="text-left">
      <ColorToMove FEN={FEN} SetFEN={SetFEN}/>
      <Castling FEN={FEN} SetFEN={SetFEN}/>
      <Fen FEN={FEN} SetFEN={SetFEN}/>
    </div>
  )
}