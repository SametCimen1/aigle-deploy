import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
   
     const temp = req.query;
     
     
     const user = await getUser(req.query.displayName);
     const postFromFunction = user.posts
     console.log(postFromFunction)

     const post = {img:req.query.img, text:req.query.text, pp:user.img}
     
     const data = await db.collection("users").findOneAndUpdate(
        { "displayName" : req.query.displayName },
        { $set: { posts : [...postFromFunction, post] } }
     )
        res.send("updated")
}
export async function getUser(name){
    const {db} = await connectToDatabase();
    const data = await db.collection("users").aggregate([
        {
            $search: {
                search: {
                    query: name,
                    path:"displayName"
                }
            }
        }
    ]).toArray()
      try{
        return data[0];
    }
    catch(err){
        return;
    }
}
 
   


