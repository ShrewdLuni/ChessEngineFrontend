import { ChessBoard } from './components/ChessBoard';
import pawn from './assets/WhitePawn.png'

function App() {


  return (
    <div className="flex w-screen h-full min-h-screen bg-[#1a1e23] justify-center items-center">
      <ChessBoard/>
    </div>
  )
}

export default App
