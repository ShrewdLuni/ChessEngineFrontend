import { cn } from "@/lib/utils"
import '../assets/board.css';

interface TileCopyProps{
  isWhite: boolean
}

export const TileCopy = ({isWhite} : TileCopyProps) => {
  return (
    <div className={cn("tile", "relative flex justify-center items-center aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100",isWhite ? "bg-[#8c8fbc]" : "bg-[#1a1e23]")} >
    </div>
  )
}