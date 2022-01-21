import React,{FC} from 'react';
import {getProviders,signIn,signOut} from "next-auth/react"
import { GetServerSideProps } from "next"

interface LoginPageProps {
    providers: object;
}


const LoginPage: FC<LoginPageProps> = ({providers}) => {


  return (
    <div>
        <div>
            <button onClick={() => signIn('facebook', {callbackUrl:"/"})} className="bg-blue-600 p-5 text-white rounded-full">Login with facebook</button>
        </div>
    </div>
  ) 
};


export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props: {

        }
    }

  

}

export default LoginPage;
