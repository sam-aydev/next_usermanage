"use client";

import { useRouter } from "next/navigation"

export default function Notfound(){
    const router = useRouter();

    return(
        <div className="flex items-center justify-center h-screen">
            <button onClick={()=>router.push("/")} className="bg-green-600 text-black flex hover:text-white hover:bg-black border px-4 py-3 font-bold rounded-xl ">Go Home! You are Damn Lost!</button>
        </div>
    )
}