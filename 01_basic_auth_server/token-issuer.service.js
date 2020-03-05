const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 1, username: 'guest', password: 'guest' },
];

const generateToken = (user, expiresIn = '3 hours') => (
    jwt.sign(
        {
            sub: user.id,
            username: user.name,
        },
        'mysupersecretkey',
        { expiresIn: expiresIn }
    )
);

const responseResolver = {
    ['emptyCredentials']: {
        status: 400,
        response: 'You need a username and password',
    },
    ['userNotFound']: {
        status: 404,
        response: 'User not found',
    },
    ['invalidCredentials']: {
        status: 401,
        response: 'Invalid credentials',
    },
    ['grantAccess']: (token) => ({
        status: 200,
        response: { access_token: token }
    })
};

const resolveRequiredCredentials = (username, password) => (
    (!!username && !!password) ? null : responseResolver['emptyCredentials']
);

const retrieveUser = (username) => (
    users.find((u) => u.username === username)
);

const resolveUserNotFound = (user) => {
    return (!!user) ? null : responseResolver['userNotFound'];
};

const resolveInvalidCredentials = (user, password) => (
    (user.password === password) ? null : responseResolver['invalidCredentials']
);

exports.resolveLogin = (username, password) => {
    let response = resolveRequiredCredentials(username, password)

    if (!response) {
        const user = retrieveUser(username);
        response = resolveUserNotFound(user) || resolveInvalidCredentials(user, password);

        if (!response) {
            const token = generateToken(user);
            response = responseResolver['grantAccess'](token);
        }
    }

    return response;
};