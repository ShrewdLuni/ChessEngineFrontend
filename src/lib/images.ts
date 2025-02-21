import whitePawn from '../assets/images/WhitePawn.png';
import whiteKnight from '../assets/images/WhiteKnight.png';
import whiteBishop from '../assets/images/WhiteBishop.png';
import whiteRook from '../assets/images/WhiteRook.png';
import whiteQueen from '../assets/images/WhiteQueen.png';
import whiteKing from '../assets/images/WhiteKing.png';

import blackPawn from '../assets/images/BlackPawn.png';
import blackKnight from '../assets/images/BlackKnight.png';
import blackBishop from '../assets/images/BlackBishop.png';
import blackRook from '../assets/images/BlackRook.png';
import blackQueen from '../assets/images/BlackQueen.png';
import blackKing from '../assets/images/BlackKing.png';

const PIECES = {
  white: {
    pawn: whitePawn,
    knight: whiteKnight,
    bishop: whiteBishop,
    rook: whiteRook,
    queen: whiteQueen,
    king: whiteKing,
  },
  black: {
    pawn: blackPawn,
    knight: blackKnight,
    bishop: blackBishop,
    rook: blackRook,
    queen: blackQueen,
    king: blackKing,
  },
};

const COLOR_MAPPING = {
  'w': 'white',
  'b': 'black',
  'white': 'white',
  'black': 'black'
} as const;

const getColor = (color: ColorInput): Color => {
  if (typeof color === 'boolean') {
    return color ? 'white' : 'black';
  }
  
  const _color = COLOR_MAPPING[color];
  if (!_color) {
    throw new Error(`Invalid color input: ${color}`);
  }
  
  return _color;
};


/**
 * Gets piece icon(s) based on the input
 * @param color - The piece color
 * @param type - Single piece type or array of piece types
 * @returns Single piece icon if input is single type or array of length 1,
 *          Array of piece icons in the same order as input array otherwise
 */
export const getPieceIcon: (color: ColorInput, type: PieceType | PieceType[]) => any | any[] = (color: ColorInput, type: PieceType | PieceType[]) => {
  let _color = getColor(color)
  if(Array.isArray(type)){
    if(type.length === 1)
      return PIECES[_color][type[0]]
    return type.map(_type => PIECES[_color][_type])
  }
  return PIECES[_color][type]
}