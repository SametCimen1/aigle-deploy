import Link from 'next/link'
import style from '../styles/Navbar.module.css'
import MainHeader from './MainHeader'
import LoggedHeader from './LoggedHeader'
import cookie from 'cookie'
import { parseCookies } from '../helpers'

import { useSelector } from 'react-redux';
import {useEffect} from 'react'

export default function Navbar(){
    const user = useSelector(state => state)
    console.log("navbar")
    console.log(user)
    let isThereData = false;
    if(Object.keys(user).length !== 0){
     isThereData = true;
    }
    useEffect(()=>{
        if(Object.keys(user).length !== 0){
            isThereData = true;
           }
    },[user])

 

    return(
        <>
         {isThereData === false ? <MainHeader/> : <LoggedHeader/>}
        </>
    )
   }

