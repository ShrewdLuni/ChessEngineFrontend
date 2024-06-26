export const ChessBoard = () => {
  const whiteTile = <div className="h-[100px] bg-[#1a1e23] aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100"></div>
  const blackTile = <div className="h-[100px] bg-[#8c8fbc] aspect-square hover:border-solid hover:border-[#fffaf6] hover:border-[4px] hover:rounded-sm transition-all duration-100"></div>

  let board = [];
  for(let i = 0;i < 64; i++){
    board.push((i + Math.floor(i/8)) % 2 == 0 ? whiteTile : blackTile)
  } 

  const ChessBoard = document.getElementById("Board");
  const rect = ChessBoard?.getBoundingClientRect()

  let moves = ["a","b","c","d","e","f","g","h"]

  let x : number = rect == undefined ? 0 : rect.left == undefined ? 0 : rect.left
  let y : number = rect == undefined ? 0 : rect.top == undefined ? 0 : rect.top
  
  function showPosition(e : React.MouseEvent<HTMLElement> | MouseEvent) {
    console.log(moves[Math.floor((e.clientX - x) / 100)] + "" + (8 - Math.floor((e.clientY - y) / 100)))
  }


  ChessBoard?.addEventListener("mousemove", (e) => {
    showPosition(e)
  });

  return (
    <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm" onClick={showPosition}>
      {board}
    </div>
  )
}