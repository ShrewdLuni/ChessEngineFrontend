import { useEffect, useLayoutEffect, useState } from "react";
import { Piece } from "./Piece";
import { Tile } from "./Tile";
import helpers from "../lib/helper"

export const ChessBoard = () => {

  const [startPosition,setStartPostion] = useState("e6")
  const [targetPosition,setTargetPosition] = useState("e6")

  let ChessBoard = document.getElementById("Board");
  let rect = ChessBoard?.getBoundingClientRect()
  let x: number = rect?.left ?? -1;
  let y: number = rect?.top ?? -1;
  let sideSize = ChessBoard?.clientHeight! / 8;

  let handleDrag = (e : DragEvent) => {setStartPostion(getMousePosition(e))}
  let handleDrop = (e : DragEvent) => {setTargetPosition(getMousePosition(e));}

  const [randomInt, setRandomInt] = useState(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const updatePosition = () => {
    ChessBoard = document.getElementById("Board");
    rect = ChessBoard?.getBoundingClientRect();
    sideSize = ChessBoard?.clientHeight! / 8;
    x = rect?.left ?? -1;
    y = rect?.top ?? -1;
  };

  useLayoutEffect(() => {
    FENtoBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

    updatePosition()

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    move();
  }, [targetPosition])

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/some_path/");
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.random_int !== undefined) {
        setRandomInt(data.random_int);
        console.log("Received random int:", data.random_int);
      }
    };
  
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    setSocket(ws);
  
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (randomInt !== null) {
      console.log("Random Int:", randomInt);
    }
  }, [randomInt]);
  
  const getRandomIntFunction = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: "Get Random Int" }));
    }
  };
  

  const initialBoard: {
    element: JSX.Element;
    tile: {isWhite: boolean};
    piece: {isWhite: boolean, pieceType : "none" | "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"}
  }[] = helpers.getBoard();

  const moves = ["a","b","c","d","e","f","g","h"]

  const convertor: {[key: string]: number} = helpers.getConvertor();

  const [board, setBoard] = useState(initialBoard);

  function getMousePosition(e : MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const one = helpers.clamp(Math.floor((e.clientX - x) / sideSize), 0, 7)
    const two = helpers.clamp(Math.floor((e.clientY - y) / sideSize), 0, 7)

    console.log("showpos",sideSize)
    return(moves[one] + "" + (8-two))
  }
  
  function move(){
    const newBoard = [...board]
    
    const start = Object.assign({}, newBoard[convertor[startPosition]]);
    const end = Object.assign({}, newBoard[convertor[targetPosition]]);
    
    newBoard[convertor[targetPosition]] = {
    element:<Tile 
      isWhite={end.tile.isWhite} piece={start.piece.pieceType == "none" ? null : 
      <Piece pieceType={start.piece.pieceType} 
        isWhite={start.piece.isWhite} 
        handleDrag={handleDrag} 
        handleDrop={handleDrop}/>}
        />,
    tile:{isWhite:end.tile.isWhite},
    piece:{isWhite:start.piece.isWhite,pieceType:start.piece.pieceType}}
    
    newBoard[convertor[startPosition]] = {
    element:<Tile isWhite={start.tile.isWhite} piece={null}/>,
    tile:{isWhite:start.tile.isWhite},
    piece:{isWhite:end.piece.isWhite,pieceType:end.piece.pieceType}}

    setBoard(newBoard)
  }

  function FENtoBoard(FEN : string){
    const fields: string[] = FEN.split(" ")

    const fenToPiece:{[key: string]: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"} = {
      "p" : "pawn",
      "n" : "knight",
      "b" : "bishop",
      "r" : "rook",
      "q" : "queen",
      "k" : "king",
    }

    let index : number = 0;
    const position = fields[0];
    for (let i = 0; i < position.length; i++) {
      if(!isNaN(Number(position.charAt(i)))){
        let empty = Number(position.charAt(i));
        for(let j = 0; j < empty; j++) {
          initialBoard[index] = {
            element:<Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={null}/>,
            tile:{isWhite:((index + Math.floor(index/8)) % 2 == 0)},
            piece:{isWhite:(position.charAt(i) == position.charAt(i).toUpperCase()),pieceType:"none"}} 
          index++;
        }
      }
      else if(position.charAt(i) != "/"){
        initialBoard[index] = {
        element:<Tile isWhite={(index + Math.floor(index/8)) % 2 == 0} piece={
        <Piece pieceType={fenToPiece[position.charAt(i).toLowerCase()]} 
        isWhite={position.charAt(i) == position.charAt(i).toUpperCase()} 
        handleDrag={handleDrag} 
        handleDrop={handleDrop}/>}/>,
        tile:{isWhite:((index + Math.floor(index/8)) % 2 == 0)},
        piece:{isWhite:(position.charAt(i) == position.charAt(i).toUpperCase()),pieceType:fenToPiece[position.charAt(i).toLowerCase()]}}
        index++;
      }
      setBoard([...initialBoard])
    }
  }

  return (
    <div>
      <div id="Board" className="relative grid grid-rows-8 grid-cols-8 border-[#8c8fbc] border-[4px] aspect-square rounded-sm z-1" onClick={() => {getRandomIntFunction()}}>
        {board.map(item => item.element)}
      </div>
      <div>
        <p className="text-xl text-white">
          {startPosition}
        </p>
        <p className="text-xl text-white">
          {targetPosition}
        </p>
      </div>
    </div>
  )
}