'use client'
import Image from 'next/image'

// (site works like a direct page similar to app. )
// (Treated like a root file. )
import {useCallback, useState} from 'react'
import AuthForm from './components/AuthForm'
import clsx from 'clsx'
import Mode from '../conversations/[conversationId]/components/Mode'
export default function Home() {
  // this controls out home landing page essentially. 
 
 
    // const toggle 

    // type Mode = 'DARK' | 'LIGHT'

    // const [mode, setMode] = useState<Mode>('LIGHT');
    // const toggleVariant = useCallback(() =>{

    //   if(mode==="DARK"){
    //       setMode("LIGHT");



    //       let t2= document.getElementById('myback');
    //       t2?.classList.add('bg-gray-100')
    //       t2?.classList.remove('bg-black')
 
    //       let q2 = document.getElementById('maint');
    //       q2?.classList.add('text-gray-900');
    //       q2?.classList.remove('text-white')
 
 
    //     }
    //   else{
    //       setMode("DARK");
    //      let t2= document.getElementById('myback');
    //      t2?.classList.remove('bg-gray-100')
    //      t2?.classList.add('bg-black')
    //      let q2 = document.getElementById('maint');
    //      q2?.classList.remove('text-gray-900');
    //      q2?.classList.add('text-white')

    //   }
      
    //   },[mode]);
 
  return (
   
    
    <div 
    id='myback'
    className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>

      {/* we dont have to define tailwind ourselves here. */}
      <div> 

{/* <button
    onClick={toggleVariant}
   className={
    clsx(`
        absolute
        right-10
        top-5
        flex
        justify-center
        underline
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
   `,
   "bg-black hover:bg-black focus-visible:outline-black text-white")
   }>
        Light/Dark Mode

   </button> */}
   <Mode />
</div>

<div className='sm:mx-auto sm:w-full sm:max-w-md'>
    
<Image alt='Logo' height='48'
width='48' className='mx-auto w-auto' src='/images/logo.png'  />
{/* self closing, have to import image */}

<h2 id='maint' className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
{/* just add all the classes cuz its tailwind. it auto styles it basically.  */}
Sign in to your account 
</h2>



</div>
<div id='jatt8' className='text-center mb-0 mt-4'>
Demo Account: 
Email Address: suzy@suzy.com 
Password: suzy

</div>
{/* create our Authentication Form */}

<AuthForm />
{/* create auth in a component.  */}
    </div>

  )
}
