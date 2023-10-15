
export default function Button({classes=" ", text, type, onclick}){
  return(
    <button 
    type={type}
    className={`text-white px-5 py-2 rounded-pill border-0 ${classes}`} 
    onClick={onclick}
    >{text}</button>
  )
}