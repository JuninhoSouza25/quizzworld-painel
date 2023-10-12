const AsideMenu = ({data}) => {
  return(
    <div className="aside-menu col-12 col-lg-2 bg-white shadow">
        <div className="branch text-center d-flex align-items-center justify-content-center">
          <h1 className="h3 text-primary">Quizzlies</h1>
        </div>
        <nav>
          <ul className="h-100 d-flex flex-column gap-3">
            <li><LuFilePieChart className="fs-2 mx-4" />Dashboard</li>
          </ul>
        </nav>
      </div>

  )
}

export default AsideMenu