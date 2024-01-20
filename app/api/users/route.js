import { NextResponse } from "next/server";
import { users } from "@/app/util/db/users";
import fs from "fs"

// Fetching All Users
export async function GET(req, res){
    const data = users
    // console.log(data);
    return(
        NextResponse.json({data}, {status: 200})
    )
}

// export async function POST(req, res){
//     let {name, email, age} = await req.json();
//     if(!email || !age || !name){
//         return NextResponse.json({
//             Error: "There is error in your data"
//         }, {
//             status: 400
//         })
//     }else{
//         console.log(name, email, age);
//         return NextResponse.json({res: "Data success"})
//     }

// }

export async function POST(req, res){
    let { id, email, password, name } = await req.json();

    if(!id || !email || !password || !name){
        return (
            NextResponse.json({result: "required field not found"}, {status: 400})
        )
    }else{
        users.push({id, email, password, name})
        const updatedArrayUsers = users;
        const updatedData = JSON.stringify(updatedArrayUsers, null)

        fs.writeFileSync(
            './app/util/db/users.js', 
            `export const users = ${updatedData};`, 
            "utf-8"
        )

        return (
            NextResponse.json({result: "Users successfully added"}, {status: 200})
        )
    }

    
}

// Update User

export async function PUT(req, res){
    const {id, name, email, password} = await req.json();

    const userId = users.findIndex((user)=> user.id === id);
    if(userId === -1){
        return (
            NextResponse.json({result: "No users as that"})
        );
    }
    
    if(name){
        users[userId].name = name
    }

    if(password){
        users[userId].password = password
    }

    if(email){
        users[userId].email = email
    }

    const updatedUserAray = users;
    const updatedUser = JSON.stringify(updatedUserAray);

    fs.writeFileSync("./app/util/db/users.js",
    `export const users = ${updatedUser};`,
    "utf-8"
    )

    return(
        NextResponse.json({success: "User has been updated"})
    )
}
