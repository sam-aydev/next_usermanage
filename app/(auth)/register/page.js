"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";




export default function Register(){
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(function(){
        if(sessionStatus === "authenticated"){
            router.push("/users")
        }
    },[sessionStatus])

    async function handleSubmit(e){
        e.preventDefault();

        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;

        if(!username || !email || !password || !confirmPassword){
            toast.error("Please Leave No Input Empty!")
            return;
        }else if(password != confirmPassword){
            toast.error("Password not equal to confirm password");
            return;
        }

        try{
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, email, password, confirmPassword
                })
            });

            if(res.status === 400){
                toast.error("This email has been registered before")
            }

            if(res.status === 201){
                toast.success("You are registered successfully");
                router.push("/login")
            }
        }catch(error){
            toast.error(error)
        }
    }
    

    return(
        sessionStatus != "authenticated" &&
        <div>
            <form onSubmit={handleSubmit} className="flex justify-center items-center min-h-screen px-4">
                <div className="bg-slate-400 w-2/3 md:w-1/2 lg:w-1/3 mx-auto py-5 rounded-md px-4">
                    <h2 className="text-center text-2xl font-medium rounded-xl py-2 w-1/2 mx-auto bg-slate-700 text-white">Register</h2>
                    <div className="mt-4">
                        <label className="block">Username:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="text" placeholder="Your Full Name..."/>
                    </div>

                    <div className="mt-2">
                        <label className="block">Email:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="email" placeholder="Your Email..."/>
                    </div>

                    <div className="mt-2">
                        <label className="block">Password:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="password" placeholder="Your Password..."/>
                    </div>

                    <div className="mt-2">
                        <label className="block">Confirm Password:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="password" placeholder="Confirm Your Password..."/>
                    </div>

                    <div className="mt-3">
                        <button disabled={sessionStatus === "loading"} className="px-4 w-full py-2 bg-black text-white rounded-md border-2 hover:bg-slate-500 hover:border-2 hover:text-white">Sign Up For An Account</button>
                    </div>
                    <p className="text-sm mt-3">Already Have An Account? <Link href="/login" className="hover:text-white"><b>Login</b></Link> </p>
                </div>
            </form>
        </div>
    )
}

