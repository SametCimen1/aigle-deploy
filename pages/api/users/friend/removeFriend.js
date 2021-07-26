import { connectToDatabase } from "../../../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
   
     const userName = req.query.userName;
     const friendName = req.query.friendName;
     
     const user = await db.collection("users").aggregate([
        
      {
          $search: {
              search: {
                  query: [req.query.userName],
                  path:["displayName"]
              }
          }
      }
  ]).toArray();
  
  if(user.length === 1){

   const oldFriends = user[0].friends;
   const newFriends = oldFriends.filter(name => name !== friendName);
  

         await db.collection("users").findOneAndUpdate(
            { "displayName" : req.query.userName},
            { $set: { friends : newFriends } }
         )
            res.send("updated")  
  }
  else{
     res.send("error")
  }

 
}



