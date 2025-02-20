import { cn } from '@/lib/utils';
import { getPieceIcon } from '@/lib/images';

interface ColorToMoveProps {
  FEN: string;
  SetFEN: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorToMove = ({ FEN, SetFEN } : ColorToMoveProps) => {
  
  const FENElements = FEN.split(" ");
  const colorToPlay = FENElements[1] || "";
  
  return (
    <div>
      <p className='text-xl'>Color To Play:</p>
      <div className='grid grid-cols-2 gap-2 mt-2 text-white w-[60%]'>
        {(["w", "b"] as const).map((option, index) => 
          <div 
            style={{backgroundImage: `url(${getPieceIcon(option, "king")})`, imageRendering:`auto`}}
            className={cn("bg-contain bg-no-repeat aspect-square z-50 border-[3px] border-[#8c8fbc] rounded-lg hover:bg-[#8c8fbc] transition-all duration-300 cursor-pointer", option == colorToPlay && "bg-[#8c8fbc]")}
            key={index}
            onClick={() => {FENElements[1] = option;SetFEN(FENElements.join(" "))}}>
          </div>
        )}
      </div>
    </div>
  )
}