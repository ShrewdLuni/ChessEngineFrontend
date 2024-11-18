import { cn } from "@/lib/utils";

export const MoveHistory = () => {
  const moveHistory = [
    { moveNumber: 1, white: 'e4', black: 'c5' },
    { moveNumber: 2, white: 'Nf3', black: 'd6' },
    { moveNumber: 3, white: 'd4', black: 'cxd4' },
    { moveNumber: 4, white: 'Nxd4', black: 'Nf6' },
    { moveNumber: 5, white: 'Nc3', black: 'a6' },
    { moveNumber: 6, white: 'Bg5', black: 'e6' },
    { moveNumber: 7, white: 'f4', black: 'Be7' },
    { moveNumber: 8, white: 'Qf3', black: 'Qc7' },
    { moveNumber: 9, white: 'O-O-O', black: 'Nbd7' },
    { moveNumber: 10, white: 'g4', black: 'b5' },
    { moveNumber: 11, white: 'Bxf6', black: 'Nxf6' },
    { moveNumber: 12, white: 'g5', black: 'Nd7' },
    { moveNumber: 13, white: 'a3', black: 'Rb8' },
    { moveNumber: 14, white: 'Bh3', black: 'Nc5' },
    { moveNumber: 15, white: 'b4', black: 'Na4' },
    { moveNumber: 16, white: 'Nxa4', black: 'bxa4' },
    { moveNumber: 17, white: 'Rhe1', black: 'O-O' },
    { moveNumber: 18, white: 'Rd3', black: 'a5' },
    { moveNumber: 19, white: 'b5', black: 'Bd7' },
    { moveNumber: 20, white: 'Rc3', black: 'Qa7' },
    { moveNumber: 21, white: 'Nc6', black: 'Bxc6' },
    { moveNumber: 22, white: 'bxc6', black: 'Qd4' },
    { moveNumber: 23, white: 'Rd1', black: 'Qc5' },
    { moveNumber: 24, white: 'Rd4', black: 'Qa7' },
    { moveNumber: 25, white: 'Qe3', black: 'Rfc8' },
    { moveNumber: 26, white: 'f5', black: 'e5' },
    { moveNumber: 27, white: 'Rd5', black: 'Rxc6' },
    { moveNumber: 28, white: 'f6', black: 'Bd8' },
    { moveNumber: 29, white: 'fxg7', black: 'Kxg7' },
    { moveNumber: 30, white: 'Bf5', black: 'Rb3' },
  ];
  

  return (
    <div>
      {/* <p className="text-xs bg-[#1a1e23]">Move History</p> */}
      <div className="h-48 overflow-y-scroll no-scrollbar">
        {moveHistory.map(({ moveNumber, white, black }, index) => (
          <div key={index} className={cn("flex flex-row font-mono font-semibold", index % 2 === 0 ? "bg-[#1a1e23]" : "bg-[#1a1e23]")}>
            <div className="bg-[#1a1e23] w-8 text-left pl-1">{moveNumber}</div>
            <div className="flex-1 flex justify-start hover:bg-cyan-600">{white}</div>
            <div className="flex-1 flex justify-start hover:bg-cyan-600">{black}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
