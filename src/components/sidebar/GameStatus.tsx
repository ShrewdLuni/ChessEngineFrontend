interface GameStatusProps {
  toggleRematch: () => void;
  toggleSettings: () => void;
}

export const GameStatus = ({ toggleRematch, toggleSettings } : GameStatusProps) => {
  return (
    <div className="flex flex-col gap-y-4 py-2 font-mono">
      <p className="text-2xl">{true ? "White" : "Black"} checkmate</p>
      <div className="flex flex-col gap-y-2">
        <div className="text-lg border-[3px] font-bold text-[#8c8fbc] border-[#8c8fbc] rounded-md cursor-pointer py-2 hover:bg-[#8c8fbc] hover:text-[#1a1e23] transition-all duration-300" onClick={toggleRematch}>Remath</div>
        <div className="text-lg border-[3px] font-bold text-[#8c8fbc] border-[#8c8fbc] rounded-md cursor-pointer py-2 hover:bg-[#8c8fbc] hover:text-[#1a1e23] transition-all duration-300" onClick={toggleSettings}>Change Settings</div>
      </div>
    </div>
  )
}