import { useEffect, useState } from "react";

interface webSocketProps{
  setMovesData: any
  updatePiecesFromFEN: any
  setIsGameOver: any
}

interface WebSocketMessage {
  action: string;
  [key: string]: any;
}

export function useWebSocket({setMovesData, updatePiecesFromFEN, setIsGameOver} : webSocketProps) {
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
          setMovesData(data.moves)
          break;
        case 'engine_make_move':
          ws.send(JSON.stringify({ action: "engine_get_legal_moves" }));
          updatePiecesFromFEN(data.fen)
          break;
        case 'engine_game_over':
          setIsGameOver(true)
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
      socketSend({action: "engine_make_move", move: move})
    },
  
    unMakeMove: () => {
      socketSend({action: "engine_unmake_move"})
    }
  }


  return socketMethods;
}