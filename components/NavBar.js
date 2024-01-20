"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";



export default function NavBar(){
    const route = usePathname();
    // const router = useRouter()
    const { data: session, status: sessionStatus } = useSession();
    
       

    return(
        <div>
            <div className='bg-black w-[80%] mx-auto text-white py-4 px-4 rounded-b-xl'>
                <ul className='flex  items-center justify-between'>
                    {sessionStatus === "authenticated" ?
                        <li aria-disabled={sessionStatus === "loading"} onClick={signOut} className="p-3 cursor-pointer rounded-md font-semibold bg-slate-600 mx-auto text-white  hover:bg-slate-600 hover:text-white">
                            Logout
                        </li>

                        :
                        <>
                            <li className={route === "/login" ? `p-3  rounded-md font-semibold bg-slate-600 text-white` : `p-3 bg-white text-black rounded-md font-semibold hover:bg-slate-600 hover:text-white` }>
                                <Link href="/login">Login</Link>
                            </li>


                            <li className={route === "/register" ? `p-3  rounded-md font-semibold bg-slate-600 text-white` : `p-3 bg-white text-black rounded-md font-semibold hover:bg-slate-600 hover:text-white` }>
                                <Link href="/register">Register</Link>
                            </li>
                        </>

                    }   
                </ul>
            </div>
        </div>
    )
}