export default function Card({classes, innerClasses, textClasses, action, icon, text}){
  return(
    <div className={`border radius shadow p-5 m-4 d-flex flex-column align-items-center justify-content-around ${classes}`} onClick={action}>
      <div className={`card-user-icon-border border rounded-circle mb-5 d-flex align-items-center justify-content-around ${innerClasses}`}>
        {icon}
      </div>
      <div className="mt-5">
        <p className={`mb-0 fs-1 ${textClasses}`}>{text}</p>
      </div>
    </div>
  )
}