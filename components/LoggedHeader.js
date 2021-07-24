import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/loggedNavBar.module.css'
import logo from '../public/logo.svg'
import {useRef,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useCookies} from 'react-cookie'
import {useRouter} from 'next/router'

export default function Navbar(){

    
// const userRed = useSelector(state => state)
// const dispatch = useDispatch();
const [cookies, setCookie] = useCookies(["user"]);

    const router = useRouter();
    const btn1 = useRef(null);
    const btn2 = useRef(null);
    const btn3 = useRef(null);
    const btn4 = useRef(null);

   const change = (btn) =>{
   
     btn1.current.style.borderBottom = "0";
     btn2.current.style.borderBottom = "0";
     btn3.current.style.borderBottom = "0";
     btn4.current.style.borderBottom = "0";

     btn.current.style.borderBottom = "3px solid red"
 }

    return(
    <header className = {style.header}>
        <Image src = {logo} alt = "Logo, A picture of eagle" width="100px" height ="100px"/>
    <ul className = {style.ul}>
        <li className = {style.li} >
        <Link href={{
        pathname: "/posts",
        query: {
            comingFrom: 'yes'
        }
    }}>
            <button ref={btn1} onClick={()=> change(btn1)} className = {style.btn}>Posts</button>
            </Link>
        </li>

        <li className = {style.li}>
            <Link href = "/profile">
            <button  ref={btn2} onClick={()=> change(btn2)}   className = {style.btn}>Profile</button>
            </Link>
        </li>

        <li className = {style.li}>
            <Link href = "/friends">
            <button   ref={btn3} onClick={()=> change(btn3)}   className = {style.btn}>Friends</button>
            </Link>
        </li>


        <li className = {style.li}>
            <Link href = "/">
            <button ref={btn4}  onClick = {()=>
            {
                setCookie("user", '', {
                path: "/",
                maxAge: 1, // Expires after 1hr
                sameSite: true,
            })
            router.reload('/')
        
          }
          }  className = {style.btn}>Log Out</button>
            </Link>
        </li>
    </ul>
    </header>
    )
}