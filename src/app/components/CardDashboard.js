export default function CardDashboard({bg, dataNumber, cardTitle, icon}){
  return(
    <div className={`card-dashboard col-12 col-md-6 col-lg-5 col-xl-3 radius shadow p-4 p-md-5 m-4 d-flex flex-column align-items-center justify-content-around ${bg}`}>
        <div className="card-dashboard-icon-border rounded-circle mb-5 d-flex align-items-center justify-content-around">
          {icon}
        </div>
        <div className="fs-1 fw-bold">
            {dataNumber}
        </div>
        <div className="mt-5">
          <p className="mb-0 fs-3">{cardTitle}</p>
        </div>
    </div>
  )
}