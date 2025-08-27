"use client";
/* ------------------------------Imports---------------------------- */
//Styles
//Components
//Icons
import "../../scss/components/login/LoginForm.scss";
//React
import {loginAction} from 'actions/Login';
import { useState } from "react";
import { useRouter } from "next/navigation";
//Images
import Image from "next/image";
import logo from "../../assets/logoOnly.png";
import blob from "../../assets/login-bg.svg";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
/*---------------------------------------------------------------------- */
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginAction(email, password)
    
    if(response?.status === 200){
      router.refresh()
    }else{
      setError(response)
    }

  
  };
  return (
    <section className="loginForm">
      <div className="loginForm__container">
        <div
          className="logo-container"
          style={{ backgroundImage: `url(${blob.src})` }}
        >
          <Image src={logo} alt="company-logo" />
          <h3>Indumentaria</h3>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <h2>Inicio de sesion</h2>
          <div className="input-container">
            <PersonIcon id="icon" />
            <input
              type="text"
              name="email"
              placeholder="Direccion de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <LockIcon id="icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar sesion</button>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </form>
        {error}
      </div>
    </section>
  );
};

export default LoginForm;
