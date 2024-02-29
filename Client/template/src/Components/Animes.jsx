import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { GiHeartBeats } from "react-icons/gi";


export default function Animes({user}) {
    const [animes, setAnimes] = useState([]);
    const [myLikes, setMyLikes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
         getAnimes();
         getLikedAnime();
    }, [user])
    async function getAnimes() {
        try {
            const res = await fetch(`http://localhost:8080/api/anime`);
            const data = await res.json();
            setAnimes(data)
        } catch (error) {
            console.error(error);
        }
    }
    async function getLikedAnime() {
        try {
            const res2 = await fetch(
              `http://localhost:8080/api/likes/mine/${user.id}`
            );
            const data2 = await res2.json();
            setMyLikes(data2);
          } catch (error) {
            console.error(error);
          }
    }
    console.log(user);
    async function like(animeid, user) {
        console.log(user);
        try {
            const res = await fetch(`http://localhost:8080/api/likes/${animeid}/like`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userid: user.id
                }),
              });
            getLikedAnime();
            getAnimes();
        } catch (error) {
            console.error(error);
        }
    }
    async function unlike(animeid, user) {
        console.log(user);
        try {
            const res = await fetch(`http://localhost:8080/api/likes/${animeid}/unlike`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userid: user.id
                }),
              });
            getAnimes();
            getLikedAnime();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <>
            <div className="animeContainer">
                {animes.map((anime) => {
                    return (
                        <div key={anime.id} className="anime-card">
                            <h2>{anime.name}</h2>
                            <img src={anime.image} alt={anime.name} /> <br />
                            <>
                                {myLikes.find((it) => it.id === anime.id) !== undefined ? (
                                    <button className="like-button" onClick={() => unlike(anime.id, user)}>
                                        <GiHeartBeats size='25px' style={{ color: "#c026d3" }} />
                                    </button>
                  ) : (
                                <button onClick={() => like(anime.id, user)}>
                                    <GiHeartBeats size='25px' />
                                </button>
                  )}
                            </>
                            <br />
                            <button onClick={() => { navigate(`/anime/${anime.id}`) }}>See Details</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}