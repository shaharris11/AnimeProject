import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Account({user}) {
    // const [userAccount, setUserAccount] = useState({});
    const [myLikes, setMyLikes] = useState([]);
    const [myPosts, setMyPost] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchAccount() {
            try{
                const response = await fetch(`http://localhost:8080/api/posts/mine/${user?.id}`)
                const res = await fetch(`http://localhost:8080/api/likes/mine/${user?.id}`);
                const data = await response.json()
                const data2 = await res.json()
                setMyPost(data)
                setMyLikes(data2)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAccount()
    }, [])
    return(
        <>
            <div className="account">
              <p>Welcome!{user?.username} </p>
             
            <div className="pageLikes">
                {myLikes && myLikes?.length > 0 && myLikes.map((anime) => {
                    
                    return (
                        <>
                            <div>
                                <h2>{anime.name}</h2>
                                <img src={anime.image} alt={anime.name} />
                                <button onClick={() => { navigate(`/anime/${anime.id}`) }}>See Details</button>
                                <Link to= '/anime/:id'>Details</Link>

                            </div>
                        </>
                    )
                })}
            </div>
            <div className="pagePost">
                {myPosts && myPosts?.length > 0 && myPosts.map((post) => {
                    console.log(post)
                    return (
                        <>
                            <div>
                                <h2>{post.title}: {post.description}</h2>
                               
                            </div>
                        </>
                    )
                })}
            </div>
            </div>
        </>
    )
}