"use client"

import CreateUser from "@/components/CreateUser";
import SearchInput from "@/components/SearchInput";
import UsersList from "@/components/UsersList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function Users(){
    const [ users, setUsers ] = useState([]);
    const [user, setUser] = useState("")
    const [id, setId] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ useId, setUseId ] = useState("");
    const [openForm, setOpenForm]= useState(false);
    const {data: session} = useSession();


    useEffect(function(){
        async function getUsers(){
            const res = await fetch('/api/users')
            const data = await res.json();
            setUsers(data);
        };
        getUsers();
        
    }, []);

    if(!session){
        toast.success("You are successfully logged out!");
        redirect("/");
    }

    async function getId(){
        if(!id) return;
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json()
        setId(data)
        setUser(data)
        setId("")

    }
    
    async function handleSubmit(e){
        e.preventDefault();
        if(!useId || !name || !password || !email) return;

        try{
            const res = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({id : useId, email, password, name})
            })
            if(res.ok){
                alert('created success');
            }else {alert('not created')}
        } catch(error){
            alert(error)
            return;
        }

        setUser(!open);
        setOpenForm(false);
        location.reload();
    }

    async function handleDelete(){
        if(!useId) return;
        try{
            const res = await fetch(`/api/users/${useId}`, {
                method: "DELETE", 
            })
            if(res.ok){
                alert("Deleted Successfully")
            }else{
                alert("not deleted")
            }
        }catch(error){
            alert(error);
        }

        setUseId("")
        location.reload();
        
    }



    return(
        <div>
            <div className="mt-10  flex justify-center items-center h-full">
                <div className="w-full px-10">
                    <div onClick={()=> setUser((open)=>!open)} className="flex items-center justify-center cursor-pointer">
                        <h2 className="text-white font-semibold text-center 
                        bg-black rounded-md py-3 px-3 w-[50%] ">All My Users</h2>
                    </div>
                    {!user && !openForm &&
                    <>
                        <div className="bg-slate-400 mt-5  text-white px-4 py-3 rounded flex justify-center 
                        sm:w-[70%] md:w-[65%] w-[95%] mx-auto items-center space-x-28">
                            <div>Name</div>
                            <div className="hidden md:flex">Password</div>
                            <div className="hidden md:flex">Email</div>
                        </div>
                        <div>
                            {users?.data?.map((user)=>
                            <UsersList key= {user.id} users={user}/>
                            )}
                        </div>
                    </>
                    }
                    <div>
                        <div onClick={()=> setOpenForm((open)=>!open)}>
                            <button className="mx-auto mt-4 bg-black text-white rounded border px-3 flex hover:text-black hover:border hover:bg-white py-3 ">Create User</button>
                        </div>
                        {openForm && <CreateUser name={name} 
                            setEmail={setEmail} 
                            setName={setName} 
                            email={email}
                            password={password}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                            useId ={useId}
                            setUseId={setUseId}
                        />}
                        <div className=" mt-3 flex items-center space-x-4 justify-center">
                            <input value={useId} onChange={(e)=> setUseId(e.target.value)} className="px-2 py-2 border-2 rounded " type="number" placeholder="Your Id...."/>
                            <button className="px-2 py-2 bg-slate-400 hover:bg-red-800 hover:text-white  text-red-800 rounded" onClick={handleDelete}>Delete</button>
                        </div>
                        <SearchInput id={id} setId={setId} getId={getId}/>

                        <h2 className="bg-black text-white py-3 px-2 w-[50%] rounded-md mx-auto mt-4 text-center font-semibold">Details From My Id</h2>
                        {Array.isArray(id) ? null 
                        : 
                        user?.data?.map((info)=> <p className="mt-5 px-8 mx-auto py-3 
                        bg-slate-700 text-white rounded font-medium w-[40%]">My Name is {info.name}  and I am {info.age}years old, 
                        I want to start working as a
                         student as a developer you can message me through this email <strong>{info.email}</strong>.</p> )}
                    </div>

                    
                </div>

            </div>
            
        </div>
    )
}