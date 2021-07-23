import { connectToDatabase } from "../../../util/mongodb";



export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
   
     const temp = req.query;
     const user = {...temp,posts:[], friends:[]}

    const data = await db.collection("users").aggregate([
      {
          $search: {
              search: {
                  query: req.query.displayName,
                  path:["displayName"]
              }
          }
      }
  ]).toArray()

  if(data.length > 0){
  
    res.status(401).send()
  }
else{
    await db.collection("users").insertOne(user);
    res.status(200).json()
}
  
 
   
}

