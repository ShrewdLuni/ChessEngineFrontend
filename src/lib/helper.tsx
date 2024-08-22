import { Tile } from "@/components/Tile"

const helpers = {
  getConvertor: function(){
    const convertor: {[key: string]: number} = {}
    const moves = ["a","b","c","d","e","f","g","h"]

    let c = 0
    for(let i = 8;i > 0; i--)
      for(let j = 0;j < 8; j++)
        convertor[moves[j] + "" + i] = c++
    return convertor;
  },

  getBoard: function(){
    type BoardItem = {
      element: JSX.Element;
      tile:{isWhite:boolean};
      piece:{isWhite:boolean,pieceType : "none" | "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"}
    };

    const board: BoardItem[] = []
    for(let i = 0;i < 64; i++){
      board.push({element:<Tile isWhite={(i + Math.floor(i/8)) % 2 == 0} piece={null}/>,tile:{isWhite:((i + Math.floor(i/8)) % 2 == 0)},piece:{isWhite:false,pieceType:"none"}})
    }
    return board;
  },

  clamp: function(target:number, min:number, max:number){
    if(target < min){
      return min;
    }
    else if(target > max){
      return max;
    }
    return target;
  },
  
  getIndexFromSquare: function(square: string){
    console.log((square.charCodeAt(0) - 97) + (8 * (8 - parseInt(square[1]))))
    return ((square.charCodeAt(0) - 97) + (8 * (8 - parseInt(square[1]))))
  }
}

export default helpers;