

'use client'

import clsx from "clsx";
import { useCallback, useState, useEffect } from "react";





const Mode = () => {
   
    // type Mode = 'DARK' | 'LIGHT'

// const t = localStorage.getItem('type');

//     const [mode, setMode] = useState<Mode>('LIGHT' );
//     // setMode(localStorage.getItem('type'));
//     const toggleVariant = useCallback(() =>{

//       if(mode==="LIGHT"){
//           setMode("DARK");

// // change everything we need to change

// // localStorage.getItem('mode');

//        let t= document.getElementById('main');
//        t?.classList.add('bg-black');
 
//        let jj= document.getElementById('jj');
//        jj?.classList.add('bg-black');
//        jj?.classList.remove('bg-white');
 
//        let box= document.getElementById('box');
//        box?.classList.add('bg-black');
//        box?.classList.remove('bg-white');


//        localStorage.setItem('type','DARK');
//         }
//       else{

//           setMode("LIGHT");
//        let t= document.getElementById('main');
//           t?.classList.remove('bg-black');

//           let jj= document.getElementById('jj');
//           jj?.classList.remove('bg-black');
//           jj?.classList.add('bg-white');

//      let box= document.getElementById('box');
//        box?.classList.remove('bg-black');
//        box?.classList.add('bg-white');


//        localStorage.setItem("type",'LIGHT');

//       }
      
//       },[mode]);
    let item =''

if(typeof window !== 'undefined'){
     item = localStorage.getItem('theme') || '';

   }
        const [theme, setTheme] = useState(
            
       item || 'LIGHT'
        );


        const toggleTheme =() =>{

            if (theme === 'LIGHT') {
                setTheme('DARK');
                console.log(item);

              } else {
                setTheme('LIGHT');
                console.log(item);
                
              }
            };

            const darkChanges =()=>{

            


                let t2= document.getElementById('myback');
                t2?.classList.remove('bg-gray-100')
                t2?.classList.add('bg-black')
                let q2 = document.getElementById('maint');
                q2?.classList.remove('text-gray-900');
                q2?.classList.add('text-white')


                let t= document.getElementById('main');
                       t?.classList.add('bg-black');




                 
                       let jj= document.getElementById('jj');
                       jj?.classList.add('bg-black');
                       jj?.classList.remove('bg-white');

                       let jatt= document.getElementById('jatt');
                       jatt?.classList.add('bg-black');
                       jatt?.classList.remove('bg-white');
                 
                    //    let box= document.getElementById('box');
                    //    box?.classList.add('bg-black');
                    //    box?.classList.remove('bg-white');
                      
                    //    let ubox= document.getElementById('userbox');
                    //    ubox?.classList.add('bg-black');
                    //    ubox?.classList.remove('bg-white');

                       let quo= document.getElementById('quo');
                       quo?.classList.add('bg-black');
                       quo?.classList.remove('bg-white');

                        // let load = document.getElementById('loads');
                        // // load?.classList.remove('bg-white');
                        // load?.classList.remove('bg-white');
                        // load?.classList.add('bg-red-500')

                        let tt = document.getElementById('texxt');
                        tt?.classList.add('text-white');

                        let b = document.getElementById('pan');
                        b?.classList.remove('text-black');
                        b?.classList.add('text-white')

                        let e =document.getElementById('emp');
                        e?.classList.remove('bg-gray-100');
                        e?.classList.add('bg-black');

                        let empty =document.getElementById('empty');
                        empty?.classList.remove('text-gray-900');
                        empty?.classList.add('text-white');

                     
                        let peep =document.getElementsByClassName('people');

                        for(var i=0; i<peep.length; i++){
                        peep[i]?.classList.remove('text-gray-900');
                        peep[i]?.classList.add('text-white');
                        }
                        

            }
           
            const lightChanges =()=>{

          let t2= document.getElementById('myback');
          t2?.classList.add('bg-gray-100')
          t2?.classList.remove('bg-black')
 
          let q2 = document.getElementById('maint');
          q2?.classList.add('text-gray-900');
          q2?.classList.remove('text-white')

          let t= document.getElementById('main');
          t?.classList.remove('bg-black');

          let jj= document.getElementById('jj');
          jj?.classList.remove('bg-black');
          jj?.classList.add('bg-white');

          let jatt= document.getElementById('jatt');
          jatt?.classList.remove('bg-black');
          jatt?.classList.add('bg-white');

        //   let box= document.getElementById('box');
        //       box?.classList.remove('bg-black');
        //       box?.classList.add('bg-white');


            //   let ubox= document.getElementById('userbox');
            //   ubox?.classList.remove('bg-black');
            //   ubox?.classList.add('bg-white');

              let quo= document.getElementById('quo');
                       quo?.classList.remove('bg-black');
                       quo?.classList.add('bg-white');
            // let load = document.getElementById('loads');
            // load?.classList.remove('lg-bg-black');
            // load?.classList.add('lg-bg-white');
           
                 let tt = document.getElementById('texxt');
                        tt?.classList.remove('text-white');

                        let b = document.getElementById('pan');
                        b?.classList.remove('text-white')
                        b?.classList.add('text-gray-900');

                         let e =document.getElementById('emp');
                        e?.classList.add('bg-gray-100');
                        e?.classList.remove('bg-black');

                        let empty =document.getElementById('empty');
                        empty?.classList.add('text-gray-900');
                        empty?.classList.remove('text-white');

                        let peep =document.getElementsByClassName('people');

                        for(var i=0; i<peep.length; i++){
                        peep[i]?.classList.add('text-gray-900');
                        peep[i]?.classList.remove('text-white');
                        }
                    }

            useEffect(() => {
                if(typeof window !== "undefined"){
                localStorage.setItem('theme', theme);
                }

                if(theme==='LIGHT'){
                    lightChanges();
                }
                if(theme==='DARK'){
                    darkChanges();
                }
                // document.body.className = theme;



              }, [theme]);


   
    return (  


<div>
<button
    onClick={toggleTheme}
   className={
    clsx(`
        absolute
        right-20
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

   </button>

</div>
        
    );
}
 
export default Mode;




