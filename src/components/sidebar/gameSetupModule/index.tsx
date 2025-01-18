import { Castling } from "./Castling"
import { ColorToMove } from "./ColorToMove"
import { Fen } from "./Fen"

interface GemeSetupModuleProps {
  colorToPlay: any
  setColorToPlay: any
}

export const GameSetupModule = ({colorToPlay, setColorToPlay}: GemeSetupModuleProps) => {
  return (
    <div className="text-left">
      <ColorToMove colorToPlay={colorToPlay} setColorToPlay={setColorToPlay}/>
      <Castling/>
      <Fen/>
    </div>
  )
}