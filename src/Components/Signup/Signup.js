import { useState } from "react"
import jwt from 'jwt-simple'
import axios from "axios"
import Swal from "sweetalert2"
const SignupComponent = (props) => {
  const [username, setusername] = useState("all")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    if(username !== "" && password !== "") {
      const url =  "https://carritodecompras-3e25c-default-rtdb.firebaseio.com/users.json"
      const payload = {
        username,
        password
      }

      axios.post(url, payload)
      .then(() => {
        Swal.fire("Bien hecho!!","Has sido registrado, te enviaremos a la página de ingreso :)", "success")
        .then(() => {
          var secret = 'shhhhhh';
          const token = jwt.encode(payload, secret)
          localStorage.setItem("auth", token)
          window.location.href = "/login"
        })

      })
      .catch(() => {

      })

    } else  {
      Swal.fire("Oops!","Por favor completa los campos requeridos :(", "warning")
    }

  }
  return(  
      <div className="login-container">
        <h1>Registro </h1>
        <input placeholder="username" type="input" onChange={(e) => setusername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={() => handleRegister()} >Registrarse</button>
        <p></p>
        <a href="/login">¿Ya tienes una cuenta?</a>
      </div>
      
    
  )
}
export default SignupComponent