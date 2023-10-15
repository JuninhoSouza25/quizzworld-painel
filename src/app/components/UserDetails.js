import {RiArrowGoBackFill} from 'react-icons/ri'


export default function UserDetails({user, action}){
  return(
    <div className="user-details row col-12 p-5">
      <div className="col-6">
        <div className="thumbnail-wrapper">
          <img className="thumbnail" src={user.thumbnail} alt="thumbnail"/>
        </div>
        <h3 className="mt-5 fw-normal">{user.name}</h3>
        <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
          <span className="col-2 fw-bold">Nome:</span>
          <span className="col">{user.email}</span>
        </div>
        <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
          <span className="col-2 fw-bold">Função:</span>
          <span className="col">{user.role}</span>
        </div>
        <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
          <span className="col-2 fw-bold">Aniversário:</span>
          <span className="col">{user.birthday}</span>
        </div>
      </div>
      <div className="user-details-r col d-flex align-items-end justify-content-end">
        <RiArrowGoBackFill className="icon-back fs-1 cursor-pointer text-danger" onClick={action} />
      </div>
    </div>
  )
}