// import { playSound } from "@/lib/utils";
import { useEffect, useState } from "react";
import { playSound } from "@/lib/sounds";

interface webSocketProps{
  setEvaluation: React.Dispatch<React.SetStateAction<number>>;
  setBestMove: React.Dispatch<React.SetStateAction<string>>;
  setMovesData: React.Dispatch<React.SetStateAction<Move[] | undefined>>;
  updatePiecesFromFEN: (newFEN: string) => void;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WebSocketMessage {
  action: string;
  [key: string]: any;
}

export function useWebSocket({ setEvaluation, setBestMove, setMovesData, updatePiecesFromFEN, setIsGameOver } : webSocketProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const socketSend = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chess/");
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ action: "engine_get_legal_moves" }));
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case 'engine_get_legal_moves':
          setMovesData(data.moves);
          break;
        case 'engine_make_move':
          ws.send(JSON.stringify({ action: "engine_get_legal_moves" }));
          updatePiecesFromFEN(data.fen);
          setEvaluation(-(data.evaluation  / 100));
          setBestMove(data.move);
          break;
        case 'engine_update_evaluation':
          setEvaluation(-(data.evaluation  / 100));
          break;
        case 'engine_game_over':
          setIsGameOver(true);
          playSound("gameover")
          break;
        case 'engine_set_position':
          updatePiecesFromFEN(data.fen);
          setEvaluation((data.evaluation  / 100));
          setBestMove("");
          break;
        default:
          console.log('Unknown action:', data);
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

  const socketMethods = {
    engineMakeMove: (move: Move) => {
      socketSend({action: "engine_make_move", move: move});
    },
    unMakeMove: () => {
      socketSend({action: "engine_unmake_move"});
    },
    engineSetPosition: (fen: string) => {
      socketSend({action: "engine_set_position", fen: fen});
    }
  }

  return socketMethods;
}