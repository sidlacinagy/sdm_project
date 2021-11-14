import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export function LoginPage(props) {

    return (
        <div className="container" id="container">
            <div id="register-container" className="form-container sign-up-container">
                <RegisterForm/>
            </div>
            <div id="login-container" className="form-container sign-in-container">
                <LoginForm data={props}/>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>If you already have an account please sign in</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Welcome aboard!</h1>
                        <p>If you don't have an account yet kindly register by filling the form below</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}