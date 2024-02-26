import Animes from "./Animes"



export default function Home({user}) {
    
    return (
        <>
           <div>
           <h1>Welcome to AnimePulse!</h1>
            <Animes user={user}/>
           </div> 
        </>
    )
}