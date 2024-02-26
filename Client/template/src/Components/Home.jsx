import Animes from "./Animes"
import { useState } from "react"


export default function Home({user}) {
    const [auth, setAuth] =useState({})
    return (
        <>
           
           <div>
           <h1>Welcome to AnimePulse!</h1>
            <Animes user={user}/>
            
           </div> 
        </>
    )
}