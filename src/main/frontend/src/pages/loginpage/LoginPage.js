import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";



export function LoginPage(props) {



    return (
        <div className="homepage">
            <Helmet>
                <meta charSet="UTF-8"/>
                <title>Welcome</title>
            </Helmet>
            <div id="body">
                <div className="container" id="container">
                    <div id="register-container" className="form-container sign-up-container">
                        <RegisterForm data={props}/>
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
                <div className="wrap">
                    <img alt="error" className="img" src="https://penji.co/wp-content/uploads/2019/09/The_Godfather-iconic-movie-posters.jpg"/>
                    <img alt="error" className="img" src="https://images-na.ssl-images-amazon.com/images/I/71OIhbUOF-L.jpg"/>
                    <img alt="error" className="img"
                         src="https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/268821/4556789/apiihy1mm__31528.1625622408.jpg?c=2"/>
                    <img alt="error" className="img"
                         src="https://webneel.com/daily/sites/default/files/images/daily/09-2019/2-movie-poster-design-aladdin-disney-glossy-composite.jpg"/>
                    <img alt="error" className="img" src="https://i.pinimg.com/originals/03/c0/c2/03c0c2137dd12b0dd65d89c3b2ac2baa.jpg"/>
                    <img alt="error" className="img" src="https://cdn.wallpapersafari.com/71/79/ABPkK1.jpg"/>
                    <img alt="error" className="img" src="https://mymodernmet.com/wp/wp-content/uploads/2018/01/honest-movie-posters-7.jpg"/>
                    <img alt="error" className="img"
                         src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88205/90762/Dunkirk-2017-Advance-Style-Poster-buy-original-movie-posters-at-starstills__51424.1496229224.jpg?c=2"/>
                    <img alt="error" className="img"
                         src="https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg"/>
                    <img alt="error" className="img" src="https://www.kolpaper.com/wp-content/uploads/2020/04/La-Casa-De-Papel-Poster.jpg"/>
                </div>
            </div>

        </div>

    );
}