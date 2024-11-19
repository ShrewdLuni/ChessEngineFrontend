import { cn } from "@/lib/utils";

interface MoveHistoryProps{
  moveHistory: any;
}

export const MoveHistory = ({moveHistory} : MoveHistoryProps) => {
  const moveHistoryDummy = [
    { white: 'e4', black: 'c5' },
    { white: 'Nf3', black: 'd6' },
    { white: 'd4', black: 'cxd4' },
    { white: 'Nxd4', black: 'Nf6' },
    { white: 'Nc3', black: 'a6' },
    { white: 'Bg5', black: 'e6' },
    { white: 'f4', black: 'Be7' },
    { white: 'Qf3', black: 'Qc7' },
    { white: 'O-O-O', black: 'Nbd7' },
    { white: 'g4', black: 'b5' },
    { white: 'Bxf6', black: 'Nxf6' },
    { white: 'g5', black: 'Nd7' },
    { white: 'a3', black: 'Rb8' },
    { white: 'Bh3', black: 'Nc5' },
    { white: 'b4', black: 'Na4' },
    { white: 'Nxa4', black: 'bxa4' },
    { white: 'Rhe1', black: 'O-O' },
    { white: 'Rd3', black: 'a5' },
    { white: 'b5', black: 'Bd7' },
    { white: 'Rc3', black: 'Qa7' },
    { white: 'Nc6', black: 'Bxc6' },
    { white: 'bxc6', black: 'Qd4' },
    { white: 'Rd1', black: 'Qc5' },
    { white: 'Rd4', black: 'Qa7' },
    { white: 'Qe3', black: 'Rfc8' },
    { white: 'f5', black: 'e5' },
    { white: 'Rd5', black: 'Rxc6' },
    { white: 'f6', black: 'Bd8' },
    { white: 'fxg7', black: 'Kxg7' },
    { white: 'Bf5', black: 'Rb3' },
  ];

  return (
    <div>
      <div className="h-48 overflow-y-scroll no-scrollbar">
        {moveHistoryDummy.map(({ white, black }, index) => (
          <div key={index} className={cn("flex flex-row font-mono font-semibold", index % 2 === 0 ? "bg-[#1a1e23]" : "bg-[#1a1e23]")}>
            <div className="bg-[#1a1e23] w-8 text-left pl-1">{index + 1}</div>
            <div className="flex-1 flex justify-start hover:bg-cyan-600">{white}</div>
            <div className="flex-1 flex justify-start hover:bg-cyan-600">{black}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
