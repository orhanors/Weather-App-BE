## Weather App imlementation with Authentication/Authorization

 <details>
<summary><b> Initial Setup </b></summary>
    </br>
    <p> To run this project locally on port 3001, run the following commands: </p>
  
```bash
npm i 
```
```bash
npm run dev 
```

 <p> Create a .env file under the project root folder and put following variables inside of it </p>

```bash
PORT=3001
MONGODB_URI
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_REDIRECT_URL=http://localhost:3001/api/users/googleRedirect

FACEBOOK_APP_ID=217985506663541
FACEBOOK_APP_SECRET=e7bbcc6b7f946cb0682f624f7a54f242
FACEBOOK_REDIRECT_URL=http://localhost:3001/api/users/facebookRedirect
       

JWT_SECRET
JWT_REFRESH_SECRET

REDIRECT_URL=http://localhost:3000
REDIRECT_LOGIN_URL=http://localhost:3000/login

WEATHER_API_KEY
```

</details>
 
 You can see the more details [here](https://github.com/orhanors/WeatherApp)

