import { TileCopy } from "@/components/Tile copy"


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
    const precomputed: {[key: string]: number} = {}

    let c = 0
    for(let i = 8;i > 0; i--)
      for(let j = 0;j < 8; j++)
        precomputed[convertor.moves[j] + "" + i] = c++

    return precomputed;
  },

  getTiles: function(){
    const tiles: JSX.Element[] = []
    for(let i = 0;i < 64; i++){
      tiles.push(<TileCopy isWhite={(i + Math.floor(i/8)) % 2 == 0}/>)
    }
    return tiles; 
  },

  getPieces: function(){
    const pieces: NewPiece[] = [
      // White pieces
      { isWhite: true, position: 'a1', type: 'rook' },
      { isWhite: true, position: 'b1', type: 'knight' },
      { isWhite: true, position: 'c1', type: 'bishop' },
      { isWhite: true, position: 'd1', type: 'queen' },
      { isWhite: true, position: 'e1', type: 'king' },
      { isWhite: true, position: 'f1', type: 'bishop' },
      { isWhite: true, position: 'g1', type: 'knight' },
      { isWhite: true, position: 'h1', type: 'rook' },
      
      // White pawns
      { isWhite: true, position: 'a2', type: 'pawn' },
      { isWhite: true, position: 'b2', type: 'pawn' },
      { isWhite: true, position: 'c2', type: 'pawn' },
      { isWhite: true, position: 'd2', type: 'pawn' },
      { isWhite: true, position: 'e2', type: 'pawn' },
      { isWhite: true, position: 'f2', type: 'pawn' },
      { isWhite: true, position: 'g2', type: 'pawn' },
      { isWhite: true, position: 'h2', type: 'pawn' },
    
      // Black pieces
      { isWhite: false, position: 'a8', type: 'rook' },
      { isWhite: false, position: 'b8', type: 'knight' },
      { isWhite: false, position: 'c8', type: 'bishop' },
      { isWhite: false, position: 'd8', type: 'queen' },
      { isWhite: false, position: 'e8', type: 'king' },
      { isWhite: false, position: 'f8', type: 'bishop' },
      { isWhite: false, position: 'g8', type: 'knight' },
      { isWhite: false, position: 'h8', type: 'rook' },
    
      // Black pawns
      { isWhite: false, position: 'a7', type: 'pawn' },
      { isWhite: false, position: 'b7', type: 'pawn' },
      { isWhite: false, position: 'c7', type: 'pawn' },
      { isWhite: false, position: 'd7', type: 'pawn' },
      { isWhite: false, position: 'e7', type: 'pawn' },
      { isWhite: false, position: 'f7', type: 'pawn' },
      { isWhite: false, position: 'g7', type: 'pawn' },
      { isWhite: false, position: 'h7', type: 'pawn' },
    ];
    return pieces;
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
    return ((position.charCodeAt(0) - 97) + (8 * (8 - parseInt(position[1]))))
  },

  getPositionFromIndex: function(index: number){
    return this.getPositionFromRowAndCol(index % 8,Math.floor(index / 8))
  },

  getRowAndColFromPosition: function(position: string) {
    return {row: 8 - parseInt(position[1]), col: position.charCodeAt(0) - 'a'.charCodeAt(0)}
  },

  getRowAndColFromIndex: function(position: number) {
    return {row: Math.floor(position / 8), col: position % 8}
  },

  getPositionFromRowAndCol: function(row: number, col: number){
    return (convertor.moves[row] + "" + (8-col))
  },

  getPieceTypeFromFEN: function(FEN: string){
    return convertor.fenToPiece[FEN.toLowerCase()];
  }
}

export default helpers;