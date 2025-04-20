const express=require('express');
const dbConnect = require('./config/database');
const cors=require('cors');
const app=express();
const PORT=4000;
const userRoute=require('./routes/userRoute');
const accountRoute=require('./routes/accountRoute');
const path=require('path');

dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({origin:"https://paymentapp-hacl.onrender.com/",credentials:true}));
app.use('/api/v1/user',userRoute);
app.use('/api/v1/account',accountRoute);

//-----------------------------
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, '/frontend/dist')));
app.get('*', (req, resp) => {
    resp.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
})

//----------------------

app.listen(PORT,()=>console.log("Server Started at",PORT))