"use client";

export default function CreateUser({handleSubmit, setPassword, password, name, setName, email, setEmail, useId, setUseId}){
    return(
        <div>
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col">
                <div>
                    <label className="block">ID:</label>
                    <input value={useId} onChange={(e)=> setUseId(e.target.value)} className="border-2 px-2 py-2 mt-1 rounded" type="number" placeholder="ID..."/>
                </div>

                <div className="mt-2">
                    <label className="block">Email:</label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} className="border-2 px-2 py-2 mt-1 rounded" type="email" placeholder="Email..."/>
                </div>

                <div className="mt-2">
                    <label className="block">Name:</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} className="border-2 px-2 py-2 mt-1 rounded" type="text" placeholder="Name..."/>
                </div>

                <div className="mt-2">
                    <label className="block">Password</label>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} className="border-2 px-2 py-2 mt-1 rounded" type="password" placeholder="Password..."/>
                </div>

                <button className="bg-black text-white w-[17%] py-2 px-2 rounded-md mt-2 hover:text-black hover:bg-white border-2">Create</button>
            </form>
        </div>
    )
}