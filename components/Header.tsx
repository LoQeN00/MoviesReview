import React,{FC, useState} from 'react';
import { useSession,signOut,signIn } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';



const Header : FC = () => {

  const { data: session, status } = useSession()

  const [userImage,setUserImage] = useState(session?.user.image)

  return (
    <header className='bg-[#2EC4B6] p-8 text-primary flex justify-between items-center'>
        <div>
          <Link href="/" passHref>
            <h1 className='text-primary font-bold text-2xl sm:text-3xl md:text-5xl cursor-pointer'>MOVIES REVIEW</h1>
          </Link>
        </div>
        <div>

            {session && session.user && session.user.image && session.user.name ?
                (
                  <div>
                    <div className='flex space-x-1 justify-center items-center'>
                      <p className='hidden md:block md:text-xl lg:text-2xl'>{session.user && session.user.name}</p>
                      <div className='w-16 h-16 relative'>
                        {userImage ?
                         <Image quality={100} className='rounded-full' layout='fill' src={userImage} alt={ session.user.name } onError={() => setUserImage('/default.jpg')}  /> :
                         <p>{session.user.name}</p>
                        }
                      </div>
                    </div>
                    
                    <button
                     className='bg-primary px-6 py-4 text-accent rounded-2xl md:text-xl lg:text-2xl'
                     onClick={() => signOut()}>Wyloguj</button>
                  </div> 
                ):
        
                <button
                 className='bg-primary px-6 py-4 text-accent rounded-2xl md:text-xl lg:text-2xl'
                 onClick={() => signIn('facebook', {callbackUrl:"/"})}>Zaloguj się</button>
            }
            </div>
    </header> 
  );
};

export default Header;
