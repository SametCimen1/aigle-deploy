import {useCookies} from 'react-cookie'
import Link from 'next/link'
import { parseCookies } from '../helpers'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import style from '../styles/index.module.css'
import Head from 'next/head'
import Image from 'next/image'
import image1 from '../public/index1.jpg'
import image2 from '../public/index2.jpg'
import image3 from '../public/index3.jpg'
import {useRouter} from 'next/router'


export default function Home({data}) {
  const router = useRouter();


  let user = false;
  const userRed = useSelector(state => state)
  const dispatch = useDispatch();
  const [stateUser,setUser] = useState({});
  const [cookies, setCookie] = useCookies(["user"]);

  
  const check = async (name) =>{
   const response = await fetch(`api/users/checkIfExist?displayName=${name}`);
   const arr = await response.json();
    if(arr.length > 0){
     return true;
   }
   else{
    return false;
   }
  }
  useEffect(async()=>{
    if(data.user){
      user = JSON.parse(data.user)
      console.log("USEEFFECT")
      console.log(user.displayName)
      const res = await check(user.displayName)
      console.log("data.user");
      console.log(res);
      
      if(res){
        setUser(user)
        const add =  () =>{
          return{
              type:'add',
              payload:user
          }
        }
        dispatch(add())
      }
      else{
        setCookie("user", "", {
          path: "/",
          maxAge: 4, // Expires after 1hr
          sameSite: true,
        })
        console.log("COOKOIE")
        console.log(data.user)
        
        //delete the cookie
        alert("user doesnt exist")
        setUser('')
      }
     
    }
    else{
      console.log("IF USER DOESNT EXIST")
    }
  },[])




  return (
    <div className="container"> 
    { (isObjEmpty(stateUser)) ?  // should be  { (isObjEmpty(stateUser)) without !
     <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
      </Head>
      <main className = {style.main}>
        <div className = {style.card}>
          <div className = {style.imageCard}>
           <Image src = {image1} alt = "social media app picture number 1" layout="intrinsic"/>
          </div>
         <div className = {style.textCard}>
            <h1 className = {style.h1}>Aigle</h1>
            <h3 className = {style.h3}>Connect with friends and the world around you</h3>
          </div>
        </div>

        <div className = {style.card}>
        <div className = {style.secondText}>
            <h3 className = {style.h3}>Share pictures, opinions and stay connected!</h3>
          </div>
          <div className = {style.secondImage}>
           <Image src = {image2} alt = "social media app picture number 2" layout="intrinsic"/>
          </div>
        </div>


        <div className = {style.card}>
          <div className = {style.imageCard}>
           <Image src = {image3} alt = "social media app picture number 1" layout="intrinsic"/>
          </div>
         <div className = {style.buttonCard}>
            <Link href = "/signup" ><button className = {style.newAccount}>Make a new Account</button></Link>
          <Link href = "/login"><button className = {style.login}>Login</button></Link>
          </div>
        </div>

        

      </main>
    </>
    : 
    <div>
      <h2 className = {style.welcome}>Welcome {stateUser.displayName}</h2>
      <h2 className = {style.desc}>You can go to one of the pages above to see your posts, your friends and your friends posts. Have fun!</h2>
    </div>
    }
    </div>
  )
}



Home.getInitialProps = async ({ req }) => {
  const data = parseCookies(req)

if (typeof res !== 'undefined')  {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/login" })
      res.end()
    }
  }
  
  return {
    data: data && data,
  }
}



const isObjEmpty = (obj) =>{
  if(Object.keys(obj).length === 0){
     return true;
  }
  return false;
}
