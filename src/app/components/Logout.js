'use client'
import {LuLogOut } from "react-icons/lu";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Logout(){
  const router = useRouter()

  async function logout() {
    await signOut({
      redirect: false
    })

    router.redirect('/')

  }

  return <LuLogOut onClick={logout}/>

}