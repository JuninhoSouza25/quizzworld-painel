import Box from "@/app/components/Box";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import { LiaUserPlusSolid } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";

export default function UserHome({action1, action2}){
  return(
    <Container
    classes="bg-light"
    children={
      <>
        <Card 
        classes={"card-style-1 border-primary "}
        innerClasses={"border-primary"}
        action={action1}
        icon={<LuUsers className="icon text-primary"/>}
        textClasses={"text-primary"}
        text={"Ver todos usuários"} />
        
        <Card 
        classes={"card-style-1 border-success "}
        innerClasses={"border-success"}
        action={action2}
        icon={<LiaUserPlusSolid className="icon text-success"/>}
        textClasses={"text-success"}
        text={"Criar novo usuário"} />

      </>
    }/>
  )
}