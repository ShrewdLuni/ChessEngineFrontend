type Piece = {
  isWhite: boolean;
  position: string;
  type: PieceType;
};

type MoveHint = {
  type: string;
  position: string;
};

type Move = {
  starting_square: number;
  target_square: number;
  flag: number;
}

type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
