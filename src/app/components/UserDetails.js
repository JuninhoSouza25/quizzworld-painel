import {RiArrowGoBackFill} from 'react-icons/ri'


export default function UserDetails({user, action}){
  return(
    <div className="user-details row col-12 p-5">
      <div className="col-6 p-5 ms-3">
          <div className="thumbnail-wrapper">
            <img className="thumbnail" src={user.thumbnail ? user.thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs867oiFI9uKZePrJlp5ccrk_PJOu1ABWO8hnIutySxpbwLIHe2VAHDTV6PFb7yua7UbA&usqp=CAU"} alt="thumbnail"/>
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
            <span className="col-2 fw-bold">Username:</span>
            <span className="col">{user.username}</span>
          </div>
        </div>
      <span className="col-12 text-danger text-end mt-0 w-100 cursor-pointer" onClick={action} >
        Voltar <RiArrowGoBackFill className="icon-back fs-1 cursor-pointer text-danger"/>
      </span>
    </div>
  )
}