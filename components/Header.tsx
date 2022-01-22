import React,{FC} from 'react';
import { useSession,signOut,signIn } from 'next-auth/react'
import Link from 'next/link';


const Header = () => {

    const { data: session, status } = useSession()

  return (
    <header className='bg-[#2EC4B6] p-8 text-primary text-2xl flex justify-between'>
        <div>
        <h1 className='text-primary font-bold text-4xl'>MOVIES REVIEW</h1>
        </div>
        <div>
            {session ?
                <h1>Witaj {session.user?.name}</h1> :
                // <h1>Witaj, aby w pełni móc korzystać z serwisu <Link href="/login"><a className='border-2 rounded-md border-black'>Zaloguj się</a></Link></h1>
                <h1 onClick={() => signIn('facebook', {callbackUrl:"/"})}>Zaloguj sie</h1>
            }
                
            {session ?
                <button onClick={() => signOut()}>Wyloguj</button> :
                null
            }
            </div>
    </header> 
  );
};

export default Header;
