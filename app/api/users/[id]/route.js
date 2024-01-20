import { users } from "@/app/util/db/users";
import { NextResponse } from "next/server";
import fs from "fs"

export async function GET(req, res){
    const { id } = await res.params;

   const data =  users.filter((user)=> user.id === id)

   if(data){
        return(
            NextResponse.json({data}, {status: 200})
        )
   }else{
        return(
            NextResponse.json({
                error: "There is error"
            })
        )
   }
}

export async function POST(req, res){
    let {name, email, password} = await req.json();
    const { id } = await res.params;

    const { name: uName, email: uEmail, password:uPassword} = users.find((user)=> user.id === id)
    if(uName === name && uEmail === email && uPassword===password){
        return (
            NextResponse.json({result : "Successfully logged in"})
        )
    }else if(!name || !email || password){
        return(
            NextResponse.json({result: "Please fill all the input fields"})
        );
    }else{
        return(
            NextResponse.json({result: "Invalid User"})
        )
    }
}


export async function DELETE(req, res){
    const { id } = res.params;

    const userIndex = users.findIndex((user)=> user.id === id)

    if(userIndex){
        users.splice(userIndex)
        const updatedUserArray = users;
        const  updatedUser = JSON.stringify(updatedUserArray);

        fs.writeFileSync(
            "./app/util/db/users.js",
            `export const users = ${updatedUser};`,
            "utf-8"
        )

        return(
            NextResponse.json({success: "Deleted success"})
        )
    }else{
        return(
            NextResponse.json({result: "error deleting"})
        )
    }
    
}