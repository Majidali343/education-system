const express = require('express')
const app= express();
const port= 5000
const ConnetDB= require('./Config/db')
const bodyparser =require('body-parser')
var cors = require('cors')
const session = require('express-session');
require('./utils/Paymentsheduler');

const http = require('http').Server(app);
app.use(cors())


app.use(bodyparser.json());
app.use(session({
  secret: 'Majid',
  resave: false,
  saveUninitialized: true
}));


app.use(bodyparser.urlencoded({ extended: true }))
app.use("/uploads",express.static('uploads'));

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log(data)
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});



//Routes

const admin = require('./Routes/adminRoutes')
const chat =require('./Routes/chatRoutes')
const nursery=require('./Routes/nurseryRoutes')
const order=require('./Routes/orderRoutes')
const payment=require('./Routes/paymentsRoutes')
const plant=require('./Routes/plantRoutes')
const user=require('./Routes/userRoutes')
const Dasboard=require('./Controllers/DashboardController')
const Cart =require('./Routes/Cart')
const UserVerify = require('./Routes/adminverifyUsersRoutes')




app.use('/chat', chat)
app.use('/nursery',nursery)
app.use('/order',order)
app.use('/payment', payment)
app.use('/plant',plant)
app.use('/dashboard',Dasboard)
app.use('/cart',Cart)
app.use('/admin',admin)
app.use('/UsersVerify',UserVerify)

app.use('/user',user)

app.use('*' ,(req,res, next)=>{
  
    res.status(404).json({
    
      status: `Fail`,
      message: `Can't find ${req.originalUrl} on this server`
    });
    })


http.listen(port, ()=>{
    console.log(`Server is listening on Port ${port}`)
})


