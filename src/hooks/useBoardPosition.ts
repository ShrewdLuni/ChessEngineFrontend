import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useBoardPosition = (boardRef: React.RefObject<HTMLDivElement>) => {
  const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0, sideSize: 0 });

  useEffect(() => {
    const updatePosition = debounce(() => {
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        const sideSize = boardRef.current.clientHeight / 8;
        setBoardPosition({ x: rect.left, y: rect.top, sideSize });
      }
    }, 100);

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [boardRef]);

  return boardPosition;
};