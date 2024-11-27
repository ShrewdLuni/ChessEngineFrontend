export const Fen = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>FEN:</p>
        <input type="text" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-1 flex-row text-left">Reset</div>
        <div className="flex flex-1 flex-row text-left">Clear</div>
      </div>
    </div>
  )
}