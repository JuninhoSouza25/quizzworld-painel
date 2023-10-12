import img1 from '@/assets/img/avatar.png'

const Header = ({pageTitle, userName,userRole, avatar = img1}) => {
  return(
    <div className="header-section row col-12 bg-white shadow">

      <div className="col-6 d-flex align-items-center justify-content-center">
        <h1 className="h3">{pageTitle}</h1>
      </div>

      <div className="col-6 d-flex align-items-center justify-content-end">
        <div className="col-5 d-flex flex-column align-items-center justify-content-between">

          <div className="avatar-box rounded-circle mt-4 mb-2">
            <img className="w-100 h-100 object-fit-cover rounded-circle" src={avatar} alt="avatar"/>
          </div>

          <p className="mb-0">{userName}</p>
          <p>{userRole}</p>
        </div>
      </div>
        
    </div>

  )
}

export default Header