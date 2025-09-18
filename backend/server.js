import express from "express"
import "dotenv/config"
import ratelimiter from "./middleware/rateLimit.js"
import router from "./route/route.js"
import { initDB } from "./controller/control.js"

const app = express()  
const PORT = process.env.PORT || 5001
console.log("my port: ", process.env.PORT)

//Middleware
app.use(ratelimiter)
app.use(express.json())

//Database
initDB;

//Route
app.use('/',router)



initDB().then(app.listen(PORT, ()=> console.log("Server is up and running on PORT: ", PORT)))
