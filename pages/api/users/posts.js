import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req,res){
  const {db} = await connectToDatabase();
  const data = await db.collection("users").aggregate([
    {
        $search: {
            search: {
                query: req.query.displayName,
                path:"displayName"
            }
        }
    }
]).toArray()
  try{
    res.json(data[0].posts)
  

}
catch(err){
  res.send(err)
}

}