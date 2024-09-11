type Board = BoardItem[];

type BoardItem = {
  element: JSX.Element;
  tile: Tile;
  piece: Piece;
};

type Tile = {
  isWhite: boolean;
};

type Piece = {
  isWhite: boolean;
  pieceType: PieceTypeWithNone;
};


type NewPiece = {
  isWhite: boolean;
  position: string
  type: PieceType;
};

type MoveHint = {
  type: string
  position: string
};

type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";

type PieceTypeWithNone = PieceType | "none";