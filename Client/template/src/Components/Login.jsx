import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHeartBeats } from "react-icons/gi";


export default function Login({setUser}) {
    const navigate = useNavigate()
    const [allUser, setAllUser] = useState({
      username: "",
      password: "",
    });
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: allUser.username,
              password: allUser.password,
            }),
          }
        );
        const result = await response.json();
        sessionStorage.setItem("user", JSON.stringify(result));
        setUser(result)
        navigate('/account')
      } catch (error) {
        console.log(error.message);
      }
    }
    return (
      <div className="login-container">
        <h2>Welcome to Anime AnimePulse <GiHeartBeats size='25px' /></h2>
        <p>Login to Your Profile!</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              onChange={(e) => setAllUser({ ...allUser, username: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              onChange={(e) => setAllUser({ ...allUser, password: e.target.value })}
              required
            />
          </label>
          <input className="login-submit" type="submit" />
        </form>
      </div>
    );
  }