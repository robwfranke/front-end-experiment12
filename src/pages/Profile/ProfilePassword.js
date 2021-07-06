import React, {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./ProfileUpdate.module.css"
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../components/context/AuthContext";


function ProfielPassword({SetChangePassword, SetRenderPage}) {



    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();


    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.sub;

    const {role} = useContext(AuthContext);
    const {email} = useContext(AuthContext);
    const {street} = useContext(AuthContext);
    const {city} = useContext(AuthContext);
    const {postalcode} = useContext(AuthContext);
    const {telnumber} = useContext(AuthContext);

    const {updatePageFromAuthState}=useContext(AuthContext)







    async function onSubmit(data) {

        console.log("PROFILE UPDATE IN profilePassword")
        console.log("DATA: ", data)
        // sendFileToBackend();

        try{
            const response = await axios.put(`http://localhost:8080/customers`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })

        }catch(e){

            console.log("PutStatus fout gegaan", e.response)
            console.log("PutStatus fout gegaan", e.response.status)

        }


updatePageFromAuthState()

        //aanzetten wanneer axios klaar is
        SetRenderPage(true)
       SetChangePassword(false)


    }


    return (
        <>


            <div className={styles.container}>
                <form

                    className={styles.onSubmit}
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <label htmlFor="password-field">
                        Password:
                        <input
                            type="password"
                            placeholder="min 8 karakters"
                            {...register("password", {
                                required:true,
                                minLength: {
                                    value: 8,
                                }
                            })}
                        />
                        {errors.password && (
                            <span className={styles["alert"]}>Minimaal 8 karakters!</span>
                        )}
                    </label>









                    <div>

                        <button
                            className={styles.button}

                            type="submit"

                        >
                            Update!
                        </button>


                        <button
                            className={styles.button}
                            onClick={()=>
                                SetChangePassword(false)
                            }
                        >
                            cancel
                        </button>


                    </div>


                </form>


            </div>


        </>

    )
}


export default ProfielPassword;
