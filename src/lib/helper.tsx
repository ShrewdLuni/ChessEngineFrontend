import { Tile } from "@/components/Tile"
import { TileCopy } from "@/components/Tile copy"

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
    const board: Board = []
    for(let i = 0;i < 64; i++){
      board.push({element:<Tile isWhite={(i + Math.floor(i/8)) % 2 == 0} isPossible={false} piece={null}/>,tile:{isWhite:((i + Math.floor(i/8)) % 2 == 0)},piece:{isWhite:false,pieceType:"none"}})
    }
    return board;
  },

  getTiles: function(){
    const tiles: JSX.Element[] = []
    for(let i = 0;i < 64; i++){
      tiles.push(<TileCopy isWhite={(i + Math.floor(i/8)) % 2 == 0}/>)
    }
    return tiles; 
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
  
  getIndexFromSquare: function(square: string){//O(1)
    return ((square.charCodeAt(0) - 97) + (8 * (8 - parseInt(square[1]))))
  }
}

export default helpers;