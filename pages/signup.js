import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../public/logo.svg'
import style from '../styles/signup.module.css'


export default function signup(){

    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');
 

    const submit = async(e) =>{
        e.preventDefault();
        if(fullName === '' || displayName === '' || password === ''){
          alert("please fill the fields")
          return;
        }
        else{
         const data = await fetch(`/api/users/newUser?fullName=${fullName}&displayName=${displayName}&password=${password}&img=${img}`)
         
          if(data.ok){
            router.push("/login")
          }
          else{
              alert("user already exist")
          }
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
                <form onSubmit = {(e)=> submit(e)} className = {style.form}>
                    <div  className = {style.labelContainer}>
                    <input  className = {style.input} type ="name" onChange = {(e)=> setFullName(e.target.value)} placeholder = "full name*"></input>
                    </div>

                    <div  className = {style.labelContainer}>
                    <input  className = {style.input} type ="name" onChange = {(e)=> setDisplayName(e.target.value)} placeholder = "display name*"></input>
                    </div>
                  
                    <div  className = {style.labelContainer}>
                      <input  className = {style.input} type ="password" onChange = {(e)=> setPassword(e.target.value)} placeholder = "password*"></input>
                    </div>
                    
                    <div  className = {style.labelContainer}>
                    <input  type="name" name = "img"  className = {style.input} onChange = {(e)=> setImg(e.target.value)} placeholder = "img url (optional)" ></input>
                    </div>

                 
                    <button className = {style.sign}>Sign Up</button>
              </form>
  
          </div>
      </div>
     )
    
}
