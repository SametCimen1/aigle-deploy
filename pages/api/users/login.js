
import { connectToDatabase } from "../../../util/mongodb";


export default async function handler(req,res){
    const {db} = await connectToDatabase();

    const user = await db.collection("users").aggregate([
        
        {
            $search: {
                search: {
                    query: [req.query.displayName,req.query.password],
                    path:["displayName", "password"]
                }
            }
        }
    ]).toArray();
    if(user.length === 1){

          res.send(user[0]);
        
      
    }
}
