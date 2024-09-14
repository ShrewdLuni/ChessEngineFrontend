import { cn } from "@/lib/utils";
import '../assets/board.css';

interface TileProps{
  isWhite: boolean;
}

export const Tile = ({isWhite} : TileProps) => {
  return (
    <div className={cn("tile", "relative aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100", isWhite ? "bg-[#8c8fbc]" : "bg-[#1a1e23]")} >
    </div>
  )
}