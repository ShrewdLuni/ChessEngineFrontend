interface FenProps {
  FEN: string
  SetFEN: any
  engineSetPosition: any
}

export const Fen = ({FEN, SetFEN, engineSetPosition} : FenProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(FEN).then(() => {
      console.log("FEN copied to clipboard:", FEN);
    }).catch(err => {
      console.error("Failed to copy FEN:", err);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p className="py-2">FEN</p>
        <input type="text" value={FEN} className="w-full bg-transparent font-mono text-sm border-2 border-[#8c8fbc] rounded-md py-2 px-2 transition duration-300 ease focus:outline-none focus:border-[#8c8fbc]  hover:border-[#8c8fbc]  shadow-sm focus:shadow" onChange={(event) => {SetFEN(event.target.value)}}/>
      </div>
      <div className="flex flex-row justify-between gap-1">
        <div className="flex flex-1 flex-row text-left cursor-pointer border-2 px-2 py-1 border-[#8c8fbc] rounded-md hover:bg-[#8c8fbc] transition-all duration-300" onClick={() => {SetFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")}}>Reset</div>
        <div className="flex flex-1 flex-row text-left cursor-pointer border-2 px-2 py-1 border-[#8c8fbc] rounded-md hover:bg-[#8c8fbc] transition-all duration-300" onClick={() => {SetFEN("8/8/8/8/8/8/8/8 w - - 0 1")}}>Clear</div>
        <div className="flex flex-1 flex-row text-left cursor-pointer border-2 px-2 py-1 border-[#8c8fbc] rounded-md hover:bg-[#8c8fbc] transition-all duration-300" onClick={copyToClipboard}>Copy</div>
        <div className="flex flex-1 flex-row text-left cursor-pointer border-2 px-2 py-1 border-[#8c8fbc] rounded-md hover:bg-[#8c8fbc] transition-all duration-300" onClick={() => {engineSetPosition(FEN)}}>Start</div>
      </div>
    </div>
  )
}