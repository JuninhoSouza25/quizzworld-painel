import { LiaUserPlusSolid } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";

export default function UserHome({action1, action2}){
  return(
    <div className="user-home col-12 d-flex justify-content-center">

        <div className="col-12 col-lg-6 d-flex justify-content-center gap-2 mt-5">
          
          <div className="col-12 col-lg-6 p-auto m-auto" onClick={action1}>

            <div className="card-user-option border radius border-primary shadow p-5 m-auto d-flex flex-column align-items-center justify-content-around">
              <span className="card-user-icon-border border border-primary rounded-circle mb-5 d-flex align-items-center justify-content-around">
                <LuUsers className="icon text-primary"/>
              </span>
              <span className="mt-5">
                <p className="mb-0 fs-1 text-primary">Ver todos usuários</p>
              </span>
            </div>
          </div>

          <div className="col-12 col-lg-6 p-auto m-auto" onClick={action2}>

            <div className="card-user-option col-10 border radius border-success shadow p-5 m-auto d-flex flex-column align-items-center justify-content-around">
                <span className="card-user-icon-border border border-success rounded-circle mb-5 d-flex align-items-center justify-content-around">
                  <LiaUserPlusSolid className="icon text-success"/>
                </span>
                <span className="mt-5">
                  <p className="mb-0 fs-1 text-success">Criar novo usuário</p>
                </span>
            </div>
          </div>

        </div>

    </div>
  )
}