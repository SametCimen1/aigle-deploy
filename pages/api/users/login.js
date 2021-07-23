
import { connectToDatabase } from "../../../util/mongodb";


export default async function handler(req,res){
    const {db} = await connectToDatabase();
   
    const user = await db.collection("users").aggregate([
        
        {
            $search: {
                search: {
                    query: [req.query.displayName],
                    path:["displayName"]
                }
            }
        }
    ]).toArray();
    
    if(user.length === 1){
        if(user[0].password === req.query.password){
        console.log(user)
          res.send(user[0]);
        }
        else{
            res.status(401).send("wrong password")
        }
      
    }
}
