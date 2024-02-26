import { Link } from "react-router-dom";


export default function Navigation({user, setUser}) {
   
    console.log(user);
    return (
        <>
        <nav id="navBar">
            <Link to='/'>AnimeList</Link>
            {!user?.token && <Link to='/register'>Register</Link>}
            {!user?.token && <Link to='/login'>Login</Link>}
            {!user? "" : <Link to='/account'>Account</Link>}
            {user?.token && <button onClick={() => setUser()} >LogOut</button>}
        </nav>
        </>
    )
}