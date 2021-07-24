import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
   
     const userName = req.query.userName;
     const friendName = req.query.friendName;
     
     
     const postFromFunction = user.friends
     
     
     const data = await db.collection("users").findOneAndUpdate(
        { "displayName" : req.query.userName},
        { $set: { friends : [...postFromFunction, friendName ] } }
     )
        res.send("updated")
}



