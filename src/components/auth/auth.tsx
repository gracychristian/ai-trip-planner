import { Button, TextField } from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import TravlyLogo from "../../assets/images/Travly.png";
import TravlyDarkLogo from "../../assets/images/Travly-dark.png";

const Authorization = () => {

  const [user, setUser] = useState<any>([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
  };

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            const { email, name, picture } = res.data
            console.log("res", res)
            const user = {
              email,
              name,
              picture
            };
            localStorage.setItem('authInfo', JSON.stringify(user));
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );
  const isDarkTheme = useAppSelector((state) => state.themeMode.isDarkTheme);
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-2">
      <div className="flex flex-col gap-4 min-w-[300px] md:w-1/2">
        <div
          className="h-[120px] flex justify-center">
          <img
            className="h-full"
            src={isDarkTheme ? TravlyDarkLogo : TravlyLogo}
            alt=""
          />
        </div>
        <h1>Please login to your account</h1>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" onClick={() => login()}>Continue </Button>
        <h2>OR</h2>
        <Button variant="contained" color="primary" type="submit" onClick={() => login()}>Sign in with Google 🚀 </Button>
      </div>

      <div className="relative md:w-1/2 hidden md:block max-h-[450px]">
        <img
          src="https://img.freepik.com/free-photo/maldives-island_1203-3746.jpg?t=st=1746100542~exp=1746104142~hmac=c0a1a8fce4d0919df590dd8d3b3a7d9541332c2cd95037e6aebab166ebb25f83&w=740"
          alt="Sign up illustration"
          className="w-full h-full object-cover rounded-r-lg"
        />
        <div className="absolute top-8 left-8 bg-white p-4 rounded-md shadow-md max-w-[240px]">
          Here's the tea, sign up for a free account and, voilà, we'll
          continue chatting.
        </div>
      </div>
    </div>
  );
}

export default Authorization;