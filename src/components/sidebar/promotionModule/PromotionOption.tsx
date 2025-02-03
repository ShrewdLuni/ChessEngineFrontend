interface PromotionOptionProps {
  piece: any
  onClick: any
}

export const PromotionOption = ({ piece, onClick } : PromotionOptionProps) => {
  return (
    <div 
      style={{backgroundImage: `url(${piece})`, imageRendering:`auto`}}
      className="bg-contain bg-no-repeat z-50 border-[3px] border-[#8c8fbc] rounded-md hover:bg-[#8c8fbc] transition-all duration-300 cursor-pointer"
      onClick={onClick}>
    </div>
  )
}