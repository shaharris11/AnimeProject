import { useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Posts from './Post';



const apiUrl = "https://animeproject-yjv4.onrender.com/api"

export default function SingleAnime({user}) {
    const [anime, setAnime] = useState({})
    const {id} = useParams();
   
    useEffect(() => {
        async function getAnime() {
            try {
                const res = await fetch(`${apiUrl}/anime/${id}`);
                const data = await res.json()
                console.log(data);
                setAnime(data)
            } catch (error) {
                console.error(error);
            }
        }
        getAnime();
    }, [])
    return (
        <>
        <div className='singleAnime'>
            <h1>{anime.name}</h1>
            {/* <br />  */}
            <img src={anime.image} alt={anime.name}/> 
            <h1>Creator: {anime.creator}</h1>
            <p>{anime.link}</p>
            <p>{anime.description}</p>
            
            <br />
            {<Posts user={user}/>}
        </div>
        </>
    )
}