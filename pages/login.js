import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Image from 'next/image'
import logo from '../public/logo.svg'
import style from '../styles/login.module.css'

export default function handler(){
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = useCookies(["user"])
    const router = useRouter();
    const  login = async(e) =>{
        e.preventDefault();
        try{
         const data = await fetch(`/api/users/login?displayName=${displayName}&password=${password}`);
         const response =  await data.json();
         setCookie("user", response, {
            path: "/",
            maxAge: 43200, // Expires after 1hr
            sameSite: true,
          })
          router.push('/')
        }
        catch(error){
          alert("something went wrong check console");
          console.log(error)
        }
    }


   
    return(
        <div>
         <Head>

         </Head>
         <div className = {style.imgContainer}>
          <Image src = {logo} layout = "fill" objectFit ="contain"></Image>
         </div>
        
         <div className = {style.formContainer}>
            <form onSubmit = {(e)=> login(e)} className = {style.form}>
                <div className = {style.labelContainer}>
                  <input className = {style.input}type = "name" onChange = {(e)=> setDisplayName(e.target.value)} placeholder = "name"/>
                </div>

                <div className = {style.labelContainer}>
                  <input className = {style.input} type = "password" onChange = {(e)=> setPassword(e.target.value)} placeholder = "password"/>
                </div>

                <button className = {style.login}>Login</button>
            </form>
         
         </div>



        </div>
    )
}