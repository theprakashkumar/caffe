import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
    const { isUserLogin, loginWithCredential, logout } = useContext(AuthContext);
    const [credential, setCredential] = useState({ username: "", password: ""});

    const handleChange = (e) => {
        setCredential((credential) => ({
            ...credential,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithCredential(credential.username, credential.password);
    }
    return ( 
        <div className="login">
            <p>
                {isUserLogin.toString()}
                { credential.username} {credential.password }
            </p>

            { isUserLogin ? (
                <>
                <p>Hi There!</p>
                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <form onSubmit={ handleSubmit }>
                <div class="input-text-wrapper">
                    <input 
                        class="input-text  input-text-full-name" 
                        type="text" 
                        placeholder="Full Name"
                        name="username"
                        value={ credential.username }
                        onChange={ handleChange }
                    />
                </div>

                <div class="input-text-wrapper">
                    <input class="input-text input-text-password" 
                    type="password"
                    placeholder="Password" 
                    name="password"
                    value={ credential.password }
                    onChange={ handleChange }
                    />
                </div>

                <button class="btn btn--md">Login</button>

            </form>
            )}
             
        </div>
     );
}
 
export default Login;