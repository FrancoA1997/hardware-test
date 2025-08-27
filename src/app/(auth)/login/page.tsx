/* ------------------------------Imports---------------------------- */
//Styles
//Components
import LoginForm from "@/components/login/LoginForm";
//Icons
//Props
//React
//Images
/*---------------------------------------------------------------------- */

const Login = () => {
  return (
    <main style={{width: '100dvw', height: '100dvh', position: 'relative', overflow: 'hidden'}}>
        <article style={{width: '100%', height: '100%'}}>
           <LoginForm />
        </article>
    </main>
  )
}

export default Login;