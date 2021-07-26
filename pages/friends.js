import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react'
import style from '../styles/friends.module.css'
import Link from 'next/link'

export default function friends({comingFrom}){
    const store = useSelector(state => state)
    const router = useRouter();
    const [isThereFriend, setIsThereFriend] = useState();
    const [user,setUser] = useState();
    const [friends,setFriends] = useState([]);
    const [freindName,setFreindName] = useState('');

    
    useEffect(()=>{
        if(comingFrom === null){
            router.push('/')
        }
    })
    
    useEffect(async()=>{
        if(Object.keys(store).length !== 0){
            console.log("store")
            console.log(store)
            const userData = await fetch(`api/users/${store.displayName}`); 
            const userReal = await userData.json();
            console.log("userReal")
            console.log(userReal)
            setUser(userReal);  
           
        }
    },[])
    useEffect(()=>{
        if(typeof user !== 'undefined'){
            getFriends()
        } 
    },[user])


    const getFriends = async() =>{
        const data = await fetch(`api/users/friends?displayName=${user.displayName}`)
                const res = await data.json();
                res.map(friendName =>{
                  getFriendData(friendName);
        })
    }

    const getFriendData = async(name) =>{
        console.log(name)
        const friendData = await fetch(`/api/users/friend/${name}`)
        const friend = await friendData.json();

        setFriends(oldArray => [...oldArray, friend])        
    }

   useEffect(()=>{
     if(friends.length === 0){
        setIsThereFriend(false);
     }
     else{
         setIsThereFriend(true)
     }
   },[friends])

   const isFollowing = (friend) =>{
    return friend.friends.find(name => name === store.displayName);
   }

   const check = () =>{
       if(freindName !== '' && typeof user !== 'undefined'  && freindName !== user.displayName){
         addFriend();
       }
       else{
           alert("please enter the field")
       }
   }
   const addFriend = async() =>{
    const data = await fetch(`api/users/friend/addFriend?userName=${user.displayName}&friendName=${freindName}`);
    router.push('/');  
}
    return(
        <>
        <div className = {style.addFriend}>
            <h2>Add Friend</h2>
            <input placeholder = "Friend Display Name" onChange = {(e)=> setFreindName(e.target.value)}></input>
            <button onClick = {check}>Add</button>
        </div>


        {isThereFriend ?        <div className = {style.friendContainer}>  
                    <div className = {style.friendImageContainer}>        
                     <h2>PP</h2>
                    </div>
                     <div className = {style.friendNameContainer}>
                      <h2>Name</h2>
                     </div> 
                     <div className = {style.lastPost}>
                         <h2>Last Post</h2>
                     </div>
        </div>:<h2 className = {style.noFriend}>You dont have any friend, you can add friend by writing their displayName in the input box above</h2>}
  
  
         {typeof friends !== 'undefined' && friends.length > 0 &&  isThereFriend ?
             friends.map(friend => {
                 const url = `/${friend.displayName}`;
                 return(
                    <div className = {style.friendContainer} key = {friend}>  
                    <div className = {style.friendImageContainer} key = {friend + "z"}>
                      {friend.img !== '' ? <Link href = {url}><img className = {style.profilPic}src = {friend.img}/></Link> :<Link href = {url}><img className = {style.profilPic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png"/></Link>}
                    </div>
                     <div className = {style.friendNameContainer} key = {friend + "c"}>
                         <h2 key = {friend + "c"}>{friend.displayName}</h2>
                         {typeof isFollowing(friend) !== 'undefined' ? <h3 style = {{color:"green"}}>Following You</h3> : <h3 style = {{color:"red"}}>Not Following you</h3>}
                     </div> 
                     <div className = {style.lastPost} key = {friend + "v"}>
                         {friend.lastPost.text !== '' ? <h2>{friend.lastPost.text}</h2> : <h2>No Last Post Avaible</h2> }
                     </div>
                   </div>
                 )
             })
         
            :
           ''
            }
        </>
    )
}


export async function getServerSideProps(context){
    if(typeof context.query.comingFrom  === 'undefined'){
        return {
            props: { 
               comingFrom:null //pass it to the page props
            }
        } 
    }
    else{
    return {
        props: { 
           comingFrom: context.query.comingFrom //pass it to the page props
        }
    }
}   
}