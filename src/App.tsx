import { ChessBoard } from './components/ChessBoard';

function App() {
  const whiteTile = <div className="h-[100px] bg-[#1a1e23] aspect-square rounded-sm hover:bg-green-600"></div>
  const blackTile = <div className="h-[100px] bg-[#8c8fbc] aspect-square hover:bg-green-600"></div>

  let board = [];
  for(let i = 0;i < 64; i++){
    board.push((i + Math.floor(i/8)) % 2 == 0 ? whiteTile : blackTile)
  } 

  return (
    <div className="flex w-screen h-full min-h-screen bg-[#1a1e23] justify-center items-center">
      <ChessBoard/>
    </div>
  )
}

export default App
