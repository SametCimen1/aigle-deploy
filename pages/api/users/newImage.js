import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    

   await db.collection("users").findOneAndUpdate(
    { "displayName" : req.query.displayName},
    { $set: { img : req.query.newImg } }
    ) 
}



