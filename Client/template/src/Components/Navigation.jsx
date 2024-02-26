import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navigation({user, setUser}) {
    // const [user, setUser] = useState();
    // console.log(user);
    // useEffect(() => {
    //  setUser(sessionStorage.getItem("user"))
    // }, []);
    console.log(user);
    return (
        <>
        <nav id="navBar">
            <Link to='/'>AnimeList</Link>
            <Link to='/account'>Account</Link>
            {!user?.token && <Link to='/register'>Register</Link>}
            {!user?.token && <Link to='/login'>Login</Link>}
            {user?.token && <button onClick={() => setUser()} >LogOut</button>}
        </nav>
        </>
    )
}