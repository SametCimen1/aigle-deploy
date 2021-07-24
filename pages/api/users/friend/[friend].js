
import { connectToDatabase } from "../../../../util/mongodb";


export default async function handler(req,res){
    const {db} = await connectToDatabase();

 
    const user = await db.collection("users").aggregate([
        
        {
            $search: {
                search: {
                    query: [req.query.friend],
                    path:["displayName"]
                }
            }
        }
    ]).toArray();
    
    if(user.length === 1){
        let lastPost = "";
        if(user[0].posts.length > 0){
            lastPost = user[0].posts[user[0].posts.length-1]
        }
        const data = {
            img:user[0].img,
            friends:user[0].friends,
            lastPost:lastPost,
            displayName:user[0].displayName
        }
     res.json(data)
     
     
    }
}
