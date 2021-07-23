import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
    try{
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
  res.json(data)

}
catch(err){
  res.send(err)
}
// if(data.length > 0){
//   console.log("sssss")
//   console.log(data)
//   res.status(200).json("yes")
// }
// else{
// console.log("zzzz")
// console.log(data)
// res.status(404).json("no")
// }
  
 
   
}

