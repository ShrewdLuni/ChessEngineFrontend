type Piece = {
  isWhite: boolean;
  position: string;
  type: PieceType;
};

type MoveHint = {
  type: string;
  position: string;
};

type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
