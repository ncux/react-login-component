import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./login.module.css";
import { TwitterSquareFilled, FacebookFilled, GooglePlusSquareFilled } from "@ant-design/icons";

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const toggleSaveLocally = () => {
        if(username && rememberMe) {
            localStorage.setItem('Username', JSON.stringify(username));
        } else {
            localStorage.removeItem('Username');
        }
    };

    const onLogin = async (e) => {
        e.preventDefault();
        if(username && password) {
            await axios.post(`/api/login`, { username, password });
        }
    };

    useEffect(() => toggleSaveLocally(), [username, rememberMe]);

    return (
        <>
            <div className={classes.loginPart}>
                <h2>Login</h2>
                <form onSubmit={ onLogin }>
                    <div className={`${classes.marginY} `}>
                        <input type="email" value={ username } onChange={ event => setUsername(event.target.value) } placeholder={`Email`} className={classes.inputs} />
                    </div>
                    <div className={classes.marginY}>
                        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) } placeholder={`Password`} className={classes.inputs} />
                    </div>
                    <div className={`${classes.rememberMeForgot} ${classes.marginY}`}>
                        <label>
                            <input type="checkbox" value={ rememberMe } onChange={ event => setRememberMe(event.target.checked) } />
                            Remember me
                        </label>
                        <span className={classes.forgotPasswordText}>
                        <a target="_blank">Forgot Password?</a>
                    </span>
                    </div>
                    <div className={classes.marginY}>
                        <button type="submit" className={classes.loginButton}>Login</button>
                    </div>
                </form>

            </div>

            <div className={classes.socialMediaPart}>
                <h3>Login</h3>
                <p style={{ fontWeight: 'bold' }}>With your social media account</p>
                <div className={classes.socialMediaButtons}>
                    <a href="http://sso/twitter" target="_blank" className={classes.socialMediaButton} style={{ color: 'white', backgroundColor: 'blue' }}>
                        <TwitterSquareFilled /> Twitter
                    </a>
                    <a href="http://sso/facebook" target="_blank" className={classes.socialMediaButton} style={{ color: 'white', backgroundColor: 'navy' }}>
                        <FacebookFilled /> Facebook
                    </a>
                    <a href="http://sso/googleplus" target="_blank" className={classes.socialMediaButton} style={{ color: 'white', backgroundColor: 'red' }}>
                        <GooglePlusSquareFilled /> Google
                    </a>
                </div>
            </div>

            <div className={classes.registerNowPart}>
                <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Don't have an account? <span className={classes.forgotPasswordText}>Register Now!</span>
                </p>

                <div className={classes.marginY} style={{ marginTop: '1rem' }}>
                    <a href="http://signin/register" target="_blank" className={classes.loginButton} >
                        Register
                    </a>
                </div>

            </div>


        </>
    );

};
