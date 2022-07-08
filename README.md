# UserAuthenticationApi
The REST api is deployed here : [https://user-auth-upa.herokuapp.com/](https://user-auth-upa.herokuapp.com/)

The postman collection for verification of the api is in a JSON folder within the code.

Please set two environment variables before proceeding with the the verification:
  1. url ---> Set url to this link <u>https://user-auth-upa.herokuapp.com</u>.

  2. jwt  ---> This will be automatically set when a new user registers or logins or logs out.

Protected Routes will work only if user is logged in.
If user is logged in, cookies will have a jwt token set and parent collection will have header authorization set to bearer token for the logged in user.
All the routes will inherit auth from parent.
