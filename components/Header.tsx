import React,{FC} from 'react';
import { useSession,signOut,signIn } from 'next-auth/react'
import Link from 'next/link';


const Header = () => {

    const { data: session, status } = useSession()

  return (
    <header className='bg-[#2EC4B6] p-8 text-primary text-2xl flex justify-between items-center'>
        <div>
          <h1 className='text-primary font-bold text-4xl'>MOVIES REVIEW</h1>
        </div>
        <div>
            {session ?
                (
                  <>
                    <h1>Witaj {session.user?.name}</h1>
                    <button onClick={() => signOut()}>Wyloguj</button>
                  </> 
                ):
        
                <button className='bg-primary px-6 py-4 text-accent rounded-2xl' onClick={() => signIn('facebook', {callbackUrl:"/"})}>Zaloguj się</button>
            }
            </div>
    </header> 
  );
};

export default Header;
