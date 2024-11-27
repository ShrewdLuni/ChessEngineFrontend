import black from '../../../assets/images/BlackKing.png'
import white from '../../../assets/images/WhiteKing.png'

export const ColorToMove = () => {
  const options = [white, black]
  return (
    <div>
      <p className='text-xl'>Color To Play:</p>
      <div className='grid grid-cols-2 gap-2 mt-2 text-white w-[60%]'>
        {options.map((option, index) => 
          <div 
            style={{backgroundImage: `url(${option})`, imageRendering:`auto`}}
            className="bg-contain bg-no-repeat aspect-square z-50 border-[3px] border-[#8c8fbc] rounded-lg hover:bg-[#8c8fbc] transition-all duration-300"
            key={index}>
          </div>
        )}
      </div>
    </div>
  )
}