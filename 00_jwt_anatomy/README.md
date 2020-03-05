## JWT Structure and Format

* JWT Official site: https://jwt.io/
* JWT Introduction: https://jwt.io/introduction/

> NOTE: Use official 

* Header
    - metadata
    - algorithms & keys used

* Claims
    - issuer (iss) -> Issuer of JWT
    - Audience (aud) -> Recipient for which the JWT is intended
    - IssuedAt (iat) -> Time at which the JWT was issued; can be used to determine age of the JWT
    - Expiration (exp) -> Time after which the JWT expires
    - Subject (sub) -> Subject of the JWT (the user)
    - ...and application defined claims

> Two types of claims reserved claims and application defined claims. Official reference: https://auth0.com/docs/tokens/concepts/jwt-claims

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

* Header -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

* Payload (Claims) -> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

* Signature -> SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

## Reading JWT Payload

* Let's check that we can read this payload. 