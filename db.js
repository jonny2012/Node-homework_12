import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const url =process.env.MONGO_URL

const client = new MongoClient(url)


let connection;

    try{
       connection= await client.connect()
    }
    catch(err){
        console.log(err)
    }
let db = connection.db()

export { db}