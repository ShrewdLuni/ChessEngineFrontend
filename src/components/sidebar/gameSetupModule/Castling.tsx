import { cn } from "@/lib/utils";

interface CastlingProps{
  FEN: string
  SetFEN: any
}

export const Castling = ({FEN, SetFEN}: CastlingProps) => {
  const castling: Record<"Q" | "q" | "K" | "k", {text: string; state: boolean;}> = {"Q": {"text": "O-O", "state": false}, "q": {"text": "O-O", "state": false}, "K": {"text": "O-O-O","state": false}, "k": {"text": "O-O-O", "state": false}}
  const FENElements = FEN.split(" ")

  const castlingFEN = FENElements[2] || "";
  for (const symbol of castlingFEN) {
    if (symbol in castling) {
      castling[symbol as keyof typeof castling].state = true;
    }
  }

  const handleClick = (key: "Q" | "q" | "K" | "k") => {
    castling[key].state = !castling[key].state
    let newCastle = ""
    for(const item of ["K", "Q", "k", "q"] as (keyof typeof castling)[]){
      if(castling[item].state)
        newCastle += item
    }
    FENElements[2] = newCastle == "" ? "-" : newCastle
    console.log(FENElements)
    SetFEN(FENElements.join(" "))
  }

  return (
    <div className="mt-4">
      <p className="text-xl">Castling:</p>
      <div className="grid grid-cols-2">
        <p>White:</p>
        <p>Black:</p>
        <div className="grid grid-cols-2 col-span-2 mt-2 mb-4">
          {Object.entries(castling).map(([key, value]) => 
            <p key={key} className={cn("text-[#8c8fbc] hover:font-extrabold text-base hover:text-white cursor-pointer", value.state && "text-white hover:font-extrabold")} onClick={() => {handleClick(key as keyof typeof castling)}}>{value.text}</p>
          )}
        </div>
      </div>
    </div>
  )
}