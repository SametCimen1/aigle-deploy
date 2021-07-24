import {useEffect, useState} from 'react';
import style from '../styles/user.module.css';

export default function user({name}){
     const[user,setUser] = useState()
     useEffect(async()=>{
      const data = await fetch(`api/users/${name}`);
      const res = await data.json();
     setUser(res)
     },[])
    return(
      <>
        {typeof user !== 'undefined'  ?
        <div className = {style.ppContainer}>  
            <img src = {user.img} className = {style.profilePic}></img>
        </div>
       : <h2>Loading</h2>
    }
      </>
 )
}

user.getInitialProps = ({ query: { name } }) => {
    return { name };
  };