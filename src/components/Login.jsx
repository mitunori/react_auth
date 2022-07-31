import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const googleLogIn = () => {
    const provider = new GoogleAuthProvider();

    console.log(auth, "認証情報");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result, "成功したらresultにデータが入ります🤗");
        console.log("Googleアカウントでログインしました。");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報をチェック！");
      //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!
      if (user) {
        user && navigate("/");
      } else {
        user && navigate("/login");
      }
    });

    return () => unSub();
  }, [navigate]);

  return (
    <div>
      <h2>GoogleLogin</h2>
      <button onClick={googleLogIn}>ログイン</button>
    </div>
  );
};

export default Login;
