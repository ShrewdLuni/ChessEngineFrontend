export const Castling = () => {
  return (
    <div className="mt-4">
      <p className="text-xl">Castling:</p>
      <div className="grid grid-cols-2">
        <p>White:</p>
        <p>Black:</p>
        <div className="grid grid-cols-2 col-span-2 mt-2 mb-4">
          <div className="flex flex-row gap-1">
            <input type="checkbox" className=''/>
            <p className="text-[#8c8fbc] hover:font-extrabold hover:text-white">O-O</p>
          </div>
          <div className="flex flex-row gap-1">
            <input type="checkbox"/>
            <p className="text-[#8c8fbc] hover:font-extrabold hover:text-white">O-O</p>
          </div>
          <div className="flex flex-row gap-1">
            <input type="checkbox"/>
            <p className="text-[#8c8fbc] hover:font-extrabold hover:text-white">O-O</p>
          </div>
          <div className="flex flex-row gap-1">
            <input type="checkbox"/>
            <p className="text-[#8c8fbc] hover:font-extrabold hover:text-white">O-O</p>
          </div>
        </div>
      </div>
    </div>
  )
}