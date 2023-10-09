import '../../styles/_button.scss'
export default function Button({classes=" ", text, onclick}){
  return(
    <button 
    className={`btn-style-1 text-white px-5 py-2 bg-primary rounded-pill border-0 ${classes}`} 
    onClick={onclick}
    >{text}</button>
  )
}