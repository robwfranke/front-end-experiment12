import React, {useState, useContext, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import styles from "../Login/Login.module.css";


function Login() {
    const {login} = useContext(AuthContext);
    const {role} = useContext(AuthContext);
    const {handleSubmit, register} = useForm();
    const [error, setError] = useState("");
    const [opgehaald, setOpgehaald] = useState(false)
    const history = useHistory();


    console.log("LOGINPAGE, role:", role)
    if ((role === "ADMIN")) {
        history.push("/admin1")
    }

    if (role === "COMPANY_USER") {
        history.push("/companyUser")
    }


    if (role === "CUSTOMER") {
        history.push("/home")
    }


    async function onSubmit(data) {
        console.log("Login Page, data:  ", data);

        try {
            console.log("data:  ", data)
            console.log("userNameInput:  ", data.userNameInput)
            console.log("data.password:  ", data.password)


            const dataJwt = {
                username: data.userNameInput,
                password: data.password
            }


            const response = await axios.post("http://localhost:8080/authenticate", dataJwt);
            console.log("result jwt =", response)
            console.log("result.status", response.status)
            console.log(response.config)
            console.log("jwt", response.data.jwt)
            //hier wordt functie login uit AuthContext aangeroepen.
            // vervolgens wordt de accesToken uit de response  gehaald, waardoor de login functie kan starten in AuthContext
            login(response.data.jwt);

            console.log("Login klaar met login(response.data.jwt)")
            setOpgehaald(true)


        } catch (error) {
            // console.log("response status",response);
            console.log("foutje, user niet aanwezig")
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }


    }


    return (

        <>


            <div className={styles.x}>

            <div className={styles.container}>

                <div className={styles.submit}>
                    <form
                        className={styles.submit}
                        onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="username-field">
                            Username:
                            <input
                                type="text"
                                id="username-field"
                                name="userName"
                                {...register("userNameInput")}
                            />
                        </label>

                        <label htmlFor="password-field">
                            Wachtwoord:
                            <input
                                type="password"
                                id="password-field"
                                name="password"
                                {...register("password")}
                            />
                        </label>
                        <button
                            type="submit"
                            className={styles.button}
                        >
                            Inloggen
                        </button>
                    </form>
                </div>

                {opgehaald &&
                <h1>Ingelogd!! Nu naar homepage!</h1>
                }


                <p>Heb je nog geen account? <Link to="/registration">Registreer</Link> je dan eerst.</p>

            </div>
            </div>
        </>
    );
}

export default Login;
