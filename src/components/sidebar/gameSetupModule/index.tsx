import { Castling } from "./Castling"
import { ColorToMove } from "./ColorToMove"
import { Fen } from "./Fen"


export const GameSetupModule = () => {
  return (
    <div className="text-left">
      <ColorToMove/>
      <Castling/>
      <Fen/>
    </div>
  )
}