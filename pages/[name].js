import {useEffect, useState} from 'react';
import style from '../styles/user.module.css';
import {useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'

export default function user({name}){
     const[user,setUser] = useState();
     const[op, setOp] = useState();
     


     const[currentUser, setCurrentUser] = useState();
     const store = useSelector(state => state)
     
     
     useEffect(()=>{
      let isFriend = false;
      if(typeof currentUser !== 'undefined'){
        currentUser.friends.forEach(friend =>{
          if(friend === name){
            isFriend = true;
          }
        })
        setOp(isFriend)
     }
      setOp(isFriend)
    },[currentUser])


     useEffect(async()=>{
      const data = await fetch(`api/users/${name}`);
      const res = await data.json();
     setUser(res)
     },[])
     
     useEffect(async()=>{
      console.log("store")  
      console.log(store)
      if(Object.keys(store).length !== 0){
        const data = await fetch(`api/users/${store.displayName}`)
        const user = await data.json();
        setCurrentUser(user)    

        }
      },[])

     function checkImage(imageSrc) {
        var img = new Image();
        img.onload = function(){
          return true;
        }; 
        img.onerror = function(){
           return false;
        };
        return img.src = imageSrc;
    }
 
    const unFollow = async() =>{
      setOp(prev => !prev);
      const data = await fetch(`api/users/friend/removeFriend?userName=${currentUser.displayName}&friendName=${user.displayName}`);
      
    
    }
    const follow = async() =>{
      setOp(prev => !prev);
     const data = await fetch(`api/users/friend/addFriend?userName=${currentUser.displayName}&friendName=${user.displayName}`);
      }

    return(
      <>
        {typeof user !== 'undefined'  ?
        <div>
            <div className = {style.ppContainer}>  
             {user.img !== '' ? <img src = {user.img} className = {style.profilePic}></img> : <img className = {style.profilePic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png" />}
            </div>
            <div className = {style.textContainer}>
             <h2>{user.displayName}</h2>
            </div>
            <div className = {style.btnContainer}>
                {op ? <button onClick = {unFollow} className = {style.btnUnfollow}>UnFollow</button> : <button onClick = {follow} className = {style.btn}>Follow</button> }
            </div>
            <div className = {style.postsContainer}>
             {user.posts.map(post => {
                 return (
                        <div className = {style.post} key = {post.text + "div"}>
                           <h2 key = {post.text + "text"} className = {style.postText}> {post.text}</h2>
                            {post.img === '' && post.img === null ? '' : checkImage(post.img)  === false ? '' : <img src = {post.img} className = {style.postImage}></img>}
                        </div>
                 )
             })}
            </div>
        </div>
       : <h2>Loading</h2>
    }
      </>
 )
}

user.getInitialProps = ({ query: { name } }) => {
    return { name };
  };