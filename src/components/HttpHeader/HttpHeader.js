import axios from 'axios';


const httpHeader = axios.create({
    baseURL: 'http://localhost:8080',

});

// axios.defaults.headers.common['Authorization']=`Bearer ${jwtToken}`;


export default httpHeader;
