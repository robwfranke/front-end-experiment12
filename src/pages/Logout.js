import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../components/context/AuthContext";


export default function Logout({loggedIn,setLoggedIn}) {


    const {clearRole}=useContext(AuthContext)
    const {role}=useContext(AuthContext)

    console.log("op logout page")
    clearRole();
    localStorage.clear();
    console.log("role:",role)


setLoggedIn=(false);


    const history = useHistory();
    history.push("/home")
    window.location.reload();
    return null;
}
