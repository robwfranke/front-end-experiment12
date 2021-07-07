import React, {useState, useContext, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {AuthContext} from "../../components/context/AuthContext";
import styles from "../Login/Login.module.css";


function Login() {
    const {login} = useContext(AuthContext);
    const {role} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
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
            console.log("userNameInput:  ", data.username)
            console.log("data.password:  ", data.password)


            const dataJwt = {
                username: data.username,
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





                    <form
                        className={styles.submit}
                        onSubmit={handleSubmit(onSubmit)}>

                        <fieldset className={styles["registration-container"]}>

                            <label htmlFor="username-field">
                                Username:
                                <input
                                    type="text"

                                    placeholder="vb. Jan Klaassen"
                                    {...register("username", {
                                        required: true,
                                        minLength: {
                                            value: 3,
                                        }
                                    })}
                                />
                                {errors.username && (
                                    <span className={styles["alert"]}>Vul uw username in (min 3 letters)</span>

                                )}
                            </label>

                            <label htmlFor="password-field">
                                Password   :
                                <input
                                    type="password"
                                    placeholder="min 8 karakters"
                                    {...register("password", {
                                        required: true,
                                        // minLength: {
                                        //     value: 8,
                                        // }
                                    })}
                                />
                                {errors.password && (
                                    <span className={styles["alert"]}>Minimaal 8 karakters!</span>
                                )}
                            </label>
                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Inloggen
                        </button>

                            <p>Heb je nog geen account? <Link to="/registration">Registreer</Link> je dan eerst.</p>

            </fieldset>
                    </form>




                {opgehaald &&
                <h1>Ingelogd!! Nu naar homepage!</h1>
                }






        </>
    );
}

export default Login;
