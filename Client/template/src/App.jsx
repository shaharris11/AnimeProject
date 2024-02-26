import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useState} from 'react'

import Home from './Components/Home'
import Animes from './Components/Animes'
import SingleAnime from './Components/SingleAnime'
import Register from './Components/Register'
import Navigation from './Components/Navigation'
import Login from './Components/Login'
import Account from './Components/Account'

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    console.log(user);

  return (
    <>
    <Navigation user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home user={user} />}/>
        <Route path='/anime' element={<Animes user={user} />} />
        <Route path= '/anime/:id' element={<SingleAnime user={user}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setUser={setUser} />} /> 
        <Route path='/account' element={<Account user={user}/>} />
      </Routes>
    </>
  )
}

export default App
