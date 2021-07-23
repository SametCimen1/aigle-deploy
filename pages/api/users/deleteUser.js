import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req,res){
  const {db} = await connectToDatabase();
  
  const data = await db.collection("users").deleteOne({name:req.query.name, password:req.query.password})


   res.json(data);
}