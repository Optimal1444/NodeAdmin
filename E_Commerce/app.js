const express = require('express')
const adminRouter=require('./Routers/adminRouter')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
app.use('/',adminRouter)
module.exports=app

 