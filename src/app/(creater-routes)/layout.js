'use client'
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PrivateLayout({children}){
  const {data: session} = useSession()
  
  console.log('session' , session)

  if(!session){
    redirect('/signin')
  }


  return <>{children}</>
}