
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react'
import style from '../styles/post.module.css'
import defaultProfile from '../public/profile.png'
import {useRouter} from 'next/router'

export default function Posts({comingFrom}){
    const router = useRouter();

  
    useEffect(()=>{
        if(comingFrom === null){
            router.push('/')
        }
    })

    const[user, setUser] = useState();
    const store = useSelector(state => state)
    const[posts, setPosts] = useState([]);
    const [newPostText, setNewPostText]  = useState('')
    const [newPostImage, setNewPostImage]  = useState('')
    


    const getFriendPosts = async (friendName)=>{
        const response = await fetch(`api/users/posts?displayName=${friendName}`)
        const res = await response.json();
            const arr = [];
            if(posts.length > 0){
            posts.forEach(post => arr.push(post));
            res.forEach(post => arr.push(post));    
            setPosts(arr)
            }
            else{
                res.forEach(post => arr.push(post));    
                setPosts(arr)
            }
        
    }

    useEffect(async()=>{
        if(Object.keys(store).length !== 0){
            console.log(store)
            setUser(store);
           
            if(typeof user === 'undefined'){
                console.log("user")
                console.log(user)
            }
            else{
                if(user.friends.length <= 0){
                    console.log("NO FRIENDS")
                } 
            user.friends.map((friendName)=>{
               console.log("YES FRIENDS")
                getFriendPosts(friendName)
            })
           
           
          }
        }
    },[user])
   
  
    const newPost = async(e) => {
        e.preventDefault();

        fetch(`/api/users/newPost?displayName=${user.displayName}&img=${newPostImage}&text=${newPostText}&pp=${user.img}`)
    }


 
    return(
        <div>
        <h2>Post something!</h2>
        <form className = {style.newPost} onSubmit = {(e)=> newPost(e)}>
            <div className = {style.inputContainer}>
                  <input className = {style.input}type = "name" onChange = {(e)=> setNewPostText(e.target.value)} placeholder = "Type Here!"/>
            </div>
            <div className = {style.inputContainer}>
                  <input className = {style.input}type = "name" onChange = {(e)=> setNewPostImage(e.target.value)} placeholder = "Add Picture!"/>
            </div>
            <button className = {style.submit}>Post</button>
        </form>
        {posts.length > 0 ?  posts.map(post =>
        {   
            return (
            <div className = {style.postContainer}>
                {console.log(post)}
               {post.pp === '' || typeof post.pp ==='undefined' ? <img className = {style.profilPic} src = "https://www.pngarea.com/pngm/90/6980003_profile-icon-png-facebook-default-profile-picture-girl.png" /> : <img className = {style.profilPic} src = {post.pp} />}
                <div>
                   <h2 key = {post.text}>{post.text}</h2>
                   {post.img !== '' ? <img src = {post.img} /> : ''}
                </div>
            </div>
            )         
        
        }) : <h1>Loading</h1>}
   
       </div>
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