"use client"

import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";



export default function Login(){
    const router = useRouter();
    const {data: session, status: sessionStatus} = useSession();

    useEffect(function(){
        if(sessionStatus === "authenticated"){
            router.push("/users")
        }
    }, [sessionStatus]);

    async function handleSubmit(e){
        e.preventDefault();
       
        const email = e.target[0].value;
        const password = e.target[1].value;


        if(!email || !password){
            toast.error("Please fill in the inputs!");
            return;
        }

        try {
            const res = await signIn("credentials", {
                redirect: false, 
                email,
                password
            });

            if(res?.error){
                if(res?.url){
                    router.replace("/users");
                }
                toast.error("Invalid Credentials")
            }else{
                toast.success("You are successfully logged in!")
            }
        } catch (error) {
            toast.error(error)
        }
        
        
    }

    return( sessionStatus != "authenticated" &&
        <div>
            <form disab onSubmit= {handleSubmit} className="flex justify-center items-center min-h-screen px-4">
                <div className="bg-slate-400 w-2/3 md:w-1/2 lg:w-1/3 mx-auto py-9 rounded-md px-4">
                    <h2 className="text-center text-2xl font-medium rounded-xl py-2 w-1/2 mx-auto bg-slate-700 text-white">Login</h2>
                    
                    <div className="mt-2">
                        <label className="block">Email:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="email" placeholder="Your Email..."/>
                    </div>

                    <div className="mt-2">
                        <label className="block">Password:</label>
                        <input disabled={sessionStatus === "loading"} className="outline-green-600 w-full py-2 px-2 border-2 rounded-md" type="password" placeholder="Your Password..."/>
                    </div>

                    <div className="mt-3">
                        <button disabled={sessionStatus === "loading"} className="px-4 w-full py-2 bg-black text-white rounded-md border-2 hover:bg-slate-500 hover:border-2 hover:text-white">Sign In</button>
                    </div>
                    <p className="text-sm mt-3">Don't Have An Account? <Link href="/register" className="hover:text-white"><b>Register</b></Link> </p>
                </div>
            </form>
        </div>
    )
}