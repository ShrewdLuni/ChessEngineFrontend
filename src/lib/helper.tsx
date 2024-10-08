import { Tile } from "@/components/Tile";

interface Convertor {
  moves: string[];
  fenToPiece: { [key: string]: PieceType };
}

const convertor: Convertor = {
  moves: ["a", "b", "c", "d", "e", "f", "g", "h"],

  fenToPiece: {
    "p": "pawn",
    "n": "knight",
    "b": "bishop",
    "r": "rook",
    "q": "queen",
    "k": "king",
  }
};

const helpers = {
  getIndexFromPositionPrecomputed: function(){
    const precomputed: {[key: string]: number} = {};

    let c = 0
    for(let i = 8;i > 0; i--)
      for(let j = 0;j < 8; j++)
        precomputed[convertor.moves[j] + "" + i] = c++

    return precomputed;
  },

  getTiles: function(){
    const tiles: JSX.Element[] = [];
    for(let i = 0;i < 64; i++){
      tiles.push(<Tile key={i} isWhite={(i + Math.floor(i/8)) % 2 == 0}/>);
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
  
  getIndexFromPosition: function(position: string){
    return ((position.charCodeAt(0) - 97) + (8 * (8 - parseInt(position[1]))));
  },

  getPositionFromIndex: function(index: number){
    return this.getPositionFromRowAndCol(index % 8,Math.floor(index / 8));
  },

  getRowAndColFromPosition: function(position: string) {
    return {row: 8 - parseInt(position[1]), col: position.charCodeAt(0) - 'a'.charCodeAt(0)};
  },

  getRowAndColFromIndex: function(position: number) {
    return {row: Math.floor(position / 8), col: position % 8};
  },

  getPositionFromRowAndCol: function(row: number, col: number){
    return (convertor.moves[row] + "" + (8-col));
  },

  getPieceTypeFromFEN: function(FEN: string){
    return convertor.fenToPiece[FEN.toLowerCase()];
  },

  getPiecesFromFEN: function(FEN: string){
    const pieces: Piece[] = [];
    let index : number = 0;
    for(const char of FEN.split(" ")[0]){
      if(char == "/")
        continue;
      if(!isNaN(Number(char)))
        index += Number(char);
      else
      pieces.push({ isWhite: char == char.toUpperCase(), position: helpers.getPositionFromIndex(index++), type: helpers.getPieceTypeFromFEN(char)});
    }
    return pieces;
  },
}

export default helpers;