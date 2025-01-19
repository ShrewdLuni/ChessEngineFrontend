import { Castling } from "./Castling"
import { ColorToMove } from "./ColorToMove"
import { Fen } from "./Fen"

interface GemeSetupModuleProps {
  colorToPlay: any
  setColorToPlay: any

  FEN: string
  SetFEN: any
}

export const GameSetupModule = ({colorToPlay, setColorToPlay, FEN, SetFEN}: GemeSetupModuleProps) => {
  return (
    <div className="text-left">
      <ColorToMove colorToPlay={colorToPlay} setColorToPlay={setColorToPlay}/>
      <Castling/>
      <Fen FEN={FEN} SetFEN={SetFEN}/>
    </div>
  )
}