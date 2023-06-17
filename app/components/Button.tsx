// we will have many inputs

'use client';
import clsx from 'clsx'


interface ButtonProps{

    type?: 'button'| 'submit' | 'reset' |undefined;
    fullWidth?:boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    // these are all optional unless its required. 
}

const Button: React.FC<ButtonProps> = ({
    type,fullWidth,children,onClick,secondary,danger,disabled
}) => {
    return (  

       <button onClick={onClick}
       type={type}
       disabled={disabled}
       className={
        clsx(`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
       `,
       disabled && 'opacity-50 cursor-default',
       fullWidth && 'w-full',

    //    basically if it has that first property then it automatically gives the corresponding style. 
        secondary ? 'text-gray-900' :'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        // this shows danger/errors
        // if not secondary or danger then use default
        !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"

       )
       }>
{children}
{/* whatever we put in our Button in authform */}

       </button>


    );
}
 
export default Button;