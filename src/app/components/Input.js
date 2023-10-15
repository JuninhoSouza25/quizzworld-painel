export default function Input({name,id, type, value, onchange, placeholder, classes=""}){
  return(
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={onchange}
      placeholder={placeholder}
      className={`rounded-pill ${classes}`} />
  )
}