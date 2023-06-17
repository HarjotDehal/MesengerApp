
'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useState, useCallback, useEffect } from "react";
import { useForm,FieldValues,SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub, BsGoogle} from 'react-icons/bs'
import {toast} from 'react-hot-toast'
import axios from "axios";
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';
// need this to be interactive. and not have it intefere with server. 

const AuthForm = ({}) => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
//   disable inputs/buttons after submitting our form. 


useEffect(() =>{
    if(session?.status==='authenticated'){
        // console.log('Authenticated');
        router.push('/users');
        
    }
}, [session?.status,router])
// add router to dependency array. 

const toggleVariant = useCallback(() =>{

if(variant==="LOGIN"){
    setVariant("REGISTER");
}
else{
    setVariant("LOGIN");
}

},[variant]);

const {
    register,
    handleSubmit,
    formState:{
        errors
    }
} = useForm<FieldValues>({defaultValues:{
    name:'',
    email:'',
    password: ''
}});
// this is our default form values. 

const onSubmit: SubmitHandler<FieldValues>=(data) =>{

    setIsLoading(true);

    if(variant==='REGISTER'){

        // axios register call

        axios.post('/api/register',data)
        // data which includes everything from our route in register. 
            .then(() => signIn('credentials',data))
        .catch(() => toast.error('Something went wrong!')) 
        // if u dont put in good inputs this occurs. 
        .finally(() => setIsLoading(false))
    }

    if(variant==='LOGIN'){
        // use nextauth sign in function. 

        signIn('credentials',{
            ...data,
            redirect:false
        }).then((callback) =>{
            if(callback?.error){
                toast.error('Invalid credentials');
            }
            if(callback?.ok && !callback?.error){
                toast.success('Login Success!')
                router.push('/users');

            }
        })
        .finally(()=>setIsLoading(false));
        // this is for our credentials provider, not google or git
    }
}

const socialAction = (action:string)=>{

    setIsLoading(true);

    // social sign in, google/github.

    signIn(action, {redirect:false})
    .then((callback) =>{
        if(callback?.error){
            toast.error('Invalid Credentials');
        }
        if(callback?.ok && !callback?.error){
            toast.success('Logged in!')
        }
    }) .finally(() => setIsLoading(false));
// call signin with either google or github


}

// if (Mode==='LIGHT'){

//         let t=document.getElementById('box');
//         t?.classList.add('bg-white');
//         t?.classList.remove('bg-gray-300');

//         let j=document.getElementById('j');
//         j?.classList.remove('border-black');
//         j?.classList.add('border-gray-300');
// }
// else{
//     let t=document.getElementById('box');
//     t?.classList.remove('bg-white');
//     t?.classList.add('bg-gray-300');

//     let j=document.getElementById('j');
//     j?.classList.remove('border-gray-300');
//     j?.classList.add('border-black');
// }



    return ( 

<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">

<div id="box" className="  bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
{/* create a white box under sign in to account */}

<form className="space-y-6"
onSubmit={handleSubmit(onSubmit)}>
    {/* handle submit wraps our on submit. because it is how we get our data into our on submit. Therefore we must do both.  */}
{variant ==='REGISTER' &&(

<Input errors={errors} id="name" label="Name" register={register}
disabled={isLoading}/>)}
{/* if registering then we show this stuff.  */}
    {/* use react */}

    <Input errors={errors} disabled={isLoading} id="email" label="Email address" type="email" register={register}/>
{/* if button clicked then these inputs freeze */}
    <Input errors={errors} disabled={isLoading} id="password" label="Password" type="password" register={register}/>
    {/* <Input errors={errors} id="name" label="Name" register={register}/> */}

    {/* <Input errors={errors} id="email" label="Email address" type="email" register={register}/> */}

<div>
<Button
disabled={isLoading}
fullWidth
type="submit"
// dont need anything specific as it is in form and submit will allow it to happen. 
>
{variant ==='LOGIN'? 'Sign in': 'Register'}

</Button>
{/* define button in our components.  */}

</div>

</form>

<div className="mt-6">

    <div className="relative">

        <div className='absolute 
        inset-0 
        flex 
        items-center'>

          
                    <div id='j' className="w-full border-t border-gray-300 "/>

        </div>

<div className="relative flex justify-center text-sm">
    <span className="bg-white px-2 text-gray-500">
Or Continue with
    </span>

{/* text between our lines */}
</div>


    </div>

<div className="mt-6 flex gap-2">
{/* add our google and github stuff.  */}

<AuthSocialButton icon={BsGithub} 
onClick={()=> socialAction('github')}
/>

<AuthSocialButton icon={BsGoogle} 
onClick={()=> socialAction('google')}
/>
{/* bsgithub gives us the discord symbol to log in with.  */}
{/* fits both of them onto one line */}
</div>

</div>


<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">

    <div>
{variant==='LOGIN'? 'New to Messenger?' :'Already have an account?'}

    </div>

<div onClick={toggleVariant} className="underline cursor-pointer">

{variant ==='LOGIN' ? 'Create an account' : 'Login'}
{/* creates another side bar.  */}
{/* This toggles between both screens.  */}

</div>
</div>

</div>

</div>


     );
}
 
export default AuthForm;