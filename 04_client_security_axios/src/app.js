// import { login } from './api/login.service';
import { login, loginAxios } from './api/login.service';
import { httpClientService } from './api/http-client.service';
import { setUpRequest } from './api/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    };
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const credentials = readCredentials();
        // login(credentials)
        //     .then((data) => {
        //         const { access_token } = data;
        //         const headers = {
        //             'Authorization': `Bearer ${access_token}`
        //         };
        //         httpClientService.setHeaders(headers);
        //     })
        loginAxios(credentials)
            .then(({ data }) => {
                const { access_token } = data;
                setUpRequest(access_token);
                
            })
            .catch((err) => console.log(err));
    });

    document.getElementById('cars').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        // httpClientService.get('http://localhost:3050/api/cars')
        //     .then((result) => console.log(result))
        //     .catch((err) => console.log(err));
        axios.get('http://localhost:3050/api/cars')
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
});