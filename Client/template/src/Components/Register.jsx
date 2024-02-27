import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHeartBeats } from "react-icons/gi";



export default function Register({ setToken }) {
    const navigate = useNavigate()
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await fetch(
          `http://localhost:8080/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              email: user.email,
              password: user.password,
            }),
          }
        );
        const result = await response.json();
        sessionStorage.setItem("user", JSON.stringify(result));
        navigate('/account')
      } catch (error) {
        console.log(error.message);
      }
    }
    return (
      <div className="register-container">
        <h2>Welcome to Anime Pulse <GiHeartBeats size='25px' /></h2>
        <p>Get ready for a new world of Anime! Where you can watch your favorite anime and talk about it with each Pulse at a same time. Get connected today!! </p>
        <h2>Register form:</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </label>
          <label>
            Confirm password:
            <input
              type="password"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              required
            />
          </label>
          <input className="register-submit" type="submit" />
        </form>
        <br />
        <iframe width="700" height="400"
          src="https://www.youtube.com/embed/fQ6PRbh-ntM?si=hi9CsY2e0IC8C1H0">
        </iframe>
        {/* <img src="https://i.ebayimg.com/images/g/aTEAAOSwlEtfbdOX/s-l400.jpg" alt="animeposter"/> */}
      </div>
    );
  }