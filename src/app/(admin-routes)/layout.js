'use client'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOption } from "../api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default function PrivateLayout({children}){
  const {data: session} = useSession()
  

  if(!session){
    redirect('/signin')
  }

  return <>{children}</>
}