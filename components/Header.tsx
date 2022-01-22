import React,{FC} from 'react';
import { useSession,signOut,signIn } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';



const Header : FC = () => {

  const { data: session, status } = useSession()


  return (
    <header className='bg-[#2EC4B6] p-8 text-primary text-2xl flex justify-between items-center'>
        <div>
          <h1 className='text-primary font-bold text-4xl'>MOVIES REVIEW</h1>
        </div>
        <div>

            {session && session.user && session.user.image && session.user.name ?
                (
                  <div>
                    <div className='flex space-x-1'>
                      <h1>{session.user && session.user.name}</h1>
                      <div className='w-16 h-16 relative rounded-full'>
                        <Image layout='fill' src={session.user.image} alt={ session.user.name } />
                      </div>
                    </div>
                    
                    <button onClick={() => signOut()}>Wyloguj</button>
                  </div> 
                ):
        
                <button className='bg-primary px-6 py-4 text-accent rounded-2xl' onClick={() => signIn('facebook', {callbackUrl:"/"})}>Zaloguj się</button>
            }
            </div>
    </header> 
  );
};

export default Header;
