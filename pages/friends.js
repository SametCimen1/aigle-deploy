import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react'
import style from '../styles/friends.module.css'
import Link from 'next/link'

export default function friends(){
    const store = useSelector(state => state)
    const [friends,setFriends] = useState([]);
    useEffect(async()=>{
        if(Object.keys(store).length !== 0){
            console.log("store")
            console.log(store)
            const data = await fetch(`api/users/friends?displayName=${store.displayName}`)
            const res = await data.json();
            res.map(friendName =>{
              getFriendData(friendName);
            })
            
        }
    },[])

    const getFriendData = async(name) =>{
        console.log(name)
        const friendData = await fetch(`/api/users/friend/${name}`)
        const friend = await friendData.json();
        setFriends(oldArray => [...oldArray, friend])        
    }

   useEffect(()=>{
    console.log("friends")
     console.log(friends)
   },[friends])

   const isFollowing = (friend) =>{
    return friend.friends.find(name => name === store.displayName);
   }
    return(
        <>
         <div className = {style.friendContainer}>  
                    <div className = {style.friendImageContainer}>        
                     <h2>PP</h2>
                    </div>
                     <div className = {style.friendNameContainer}>
                      <h2>Name</h2>
                     </div> 
                     <div className = {style.lastPost}>
                         <h2>Last Post</h2>
                     </div>
                   </div>
         {typeof friends !== 'undefined' && friends.length > 0 ?
             friends.map(friend => {
                 const url = `/${friend.displayName}`;
                 return(
                    <div className = {style.friendContainer}>  
                    <div className = {style.friendImageContainer}>
                      {friend.img !== '' ? <Link href = {url}><img className = {style.profilPic}src = {friend.img}/></Link> :<Link href = {url}><img className = {style.profilPic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png"/></Link>}
                    </div>
                     <div className = {style.friendNameContainer}>
                         <h2>{friend.displayName}</h2>
                         {typeof isFollowing(friend) !== 'undefined' ? <h3 style = {{color:"green"}}>Following You</h3> : <h3 style = {{color:"red"}}>Not Following you</h3>}
                     </div> 
                     <div className = {style.lastPost}>
                         {friend.lastPost.text !== '' ? <h2>{friend.lastPost.text}</h2> : <h2>No Last Post Avaible</h2> }
                     </div>
                   </div>
                 )
             })
         
            :
            <h1>Loading</h1>
            }
        </>
    )
}

