const express=require("express")
const { Dbconnect } = require("./Config/Database.js")
const { router } = require("./Routes/route.js")
const CookieParser=require("cookie-parser")
const cors=require("cors")
const app=express()
app.use(cors({
  origin:"*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
Dbconnect()
app.use(CookieParser())
app.use(express.json())
const PORT=8000
app.use("/api/v1",router)
app.listen(PORT,()=>{
  console.log(`app is running on port ${PORT}`)
})

