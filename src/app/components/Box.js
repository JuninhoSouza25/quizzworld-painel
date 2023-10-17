export default function Box({classes='', children}){
  return(
    <div className={`col-12 col-lg-6 ${classes}`}>{children}</div>
  )
}