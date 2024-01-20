"use client";

export default function UsersList({ users }){

    
    return(
        <div className="bg-slate-200 mt-2 text-left text-black  px-4 py-3 rounded flex justify-center sm:w-[70%] md:w-[65%] w-[95%] mx-auto space-x-20">
            <div>{users?.name}</div>
            <div className="hidden md:flex">{users?.password}</div>
            <div className="hidden md:flex">{users?.email}</div>
        </div>
    )
}