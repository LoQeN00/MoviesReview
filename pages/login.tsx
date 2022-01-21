import React,{FC} from 'react';
import {getProviders,signIn,signOut} from "next-auth/react"
import { GetServerSideProps } from "next"

interface LoginPageProps {
    providers: object;
}


const LoginPage: FC<LoginPageProps> = ({providers}) => {


    if (!providers) return <h1>Nie ma providerów</h1>

  return (
    <div>
        {Object.values(providers).map(provider => {
                return (
                    <div key={provider.id}>
                        <button onClick={() => signIn(provider.id, {callbackUrl:"/"})} className="bg-blue-600 p-5 text-white rounded-full">Login with {provider.name}</button>
                    </div>
                )
         })}
         
         
    </div>
  ) 
};


export const getServerSideProps: GetServerSideProps = async (context) => {

    const providers = await getProviders()

    if (providers) {
        return {
            props: {
                providers
            }
        }
    }

    return {
        props: {

        }
    }

  

}

export default LoginPage;
