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

  return (
    <div className="logout-button d-flex justify-content-center align-items-center">
      <LuLogOut className="logout-icon me-3 text-danger" onClick={logout}/>
      <p className="mb-0 text-danger">Logout</p>
    </div>
  )

}