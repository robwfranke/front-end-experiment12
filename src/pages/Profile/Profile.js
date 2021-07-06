import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../../components/context/AuthContext";
import axios from "axios";
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import jwt_decode from "jwt-decode";
import ProfileData from "./ProfileData";
import ProfileImage from "./ProfileImage";
import ProfileUpdate from "./ProfileUpdate";


function Profile() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2
    } = useForm();

    const token = localStorage.getItem('token');
    console.log("TOKEN IN PROFILE.js", token)
    const decoded = jwt_decode(token);
    const user = decoded.sub;


    const [renderPage, setRenderPage] = useState(false)
    const [changeProfileData, setChangeProfileData] = useState(false)


    function showUpdateDataProfile() {
        if (changeProfileData) {
            setChangeProfileData(false)
        } else {
            setChangeProfileData(true)
        }
    }


    useEffect(() => {
        console.log("UseEffect RenderPage")



    }, [renderPage]);
    return (

        <>
            {renderPage &&
            <div>renderpage</div>
            }

            <div className={styles.container}>

                {/************** PROFILE DATA   ************/}

                <div className={styles.profileData}>


                    <ProfileData/>


                    <button
                        className={styles.button1}
                        onClick={showUpdateDataProfile}
                    >
                        verander gegevens
                    </button>


                </div>


                {/**************  PROFILE IMAGE   ************/}
                <div className={styles.profileImage}>


                    <ProfileImage/>

                </div>


                {/**************  PROFILE UPDATE   ************/}

                {changeProfileData &&


                <div className={styles.profielUpdate}>


                    <ProfileUpdate
                        SetChangeProfileData={setChangeProfileData}
                        SetRenderPage={setRenderPage}
                    />

                </div>

                }


            </div>


        </>

    )

}

export default Profile;

