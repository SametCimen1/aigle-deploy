import {useEffect, useState} from 'react';
import style from '../styles/user.module.css';
import {useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'
import {useRouter} from 'next/router'

export default function user({comingFrom}){
    const router = useRouter();
     const[user, setCurrentUser] = useState();
     const store = useSelector(state => state)
     
     

     useEffect(()=>{
      if(comingFrom === null){
          router.push('/')
      }
  })

     
     useEffect(async()=>{
      console.log("store")  
      console.log(store)
      if(Object.keys(store).length !== 0){
        const data = await fetch(`api/users/${store.displayName}`)
        const user = await data.json();
        setCurrentUser(user)    

        }
      },[])


 
    const changeURL = async() =>{
        const url = prompt("New Image Url")
        const data =  await fetch(`api/users/newImage?displayName=${user.displayName}&newImg=${url}`)
    }

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

   
    return(
      <>
        {typeof user !== 'undefined'  ?
        <div>
            <div className = {style.ppContainer}>  
             {user.img !== '' ? <img src = {user.img} onClick={changeURL} className = {style.profilePic}></img> : <img onClick = {changeURL} className = {style.profilePic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png" />}
            </div>
            <div className = {style.textContainer}>
             <h2>{user.displayName}</h2>
            </div>
            <div className = {style.postsContainer}>
               {user.posts.map(post =>{
                    return (
                        <div className = {style.postContainer} key = {post.text}>
                           {post.pp === '' || typeof post.pp ==='undefined' ? <img className = {style.profilPic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png" /> : <img className = {style.profilPic} src = {post.pp} />}
                            <div className = {style.post}>
                               <h2 key = {post.text}>{post.text}</h2>
                               {post.img === '' && post.img === null ? '' : checkImage(post.img)  === false ? '' : <img src = {post.img} className = {style.postImage}></img>}
                            </div>
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