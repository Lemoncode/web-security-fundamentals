import { login } from './api/login.service';
import { httpClientService } from './api/http-client.service';

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
        login(credentials)
            .then((data) => {
                // console.log(data);
                const { access_token } = data;
                const headers = {
                    'Authorization': `Bearer ${access_token}`
                };
                httpClientService.setHeaders(headers);
            }).catch((err) => console.log(err));
    });

    /*diff*/
    document.getElementById('cars').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        httpClientService.get('http://localhost:3050/api/cars')
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
    /*diff*/
});