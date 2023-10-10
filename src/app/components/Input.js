export default function Input({name, type, value, onchange, placeholder, classes=""}){
  return(
    <input
      name={name}
      type={type}
      value={value}
      onChange={onchange}
      placeholder={placeholder}
      className={`rounded-pill ${classes}`} />
  )
}