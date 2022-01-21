import React,{FC} from 'react';
import {getProviders,signIn,signOut} from "next-auth/react"


const LoginPage: FC= () => {


  return (
    <div>
        <div>
            <button onClick={() => signIn('facebook', {callbackUrl:"/"})} className="bg-blue-600 p-5 text-white rounded-full">Login with facebook</button>
        </div>
    </div>
  ) 
};


export default LoginPage;
