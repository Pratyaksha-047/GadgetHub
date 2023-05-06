const express = require('express')
const env = require('dotenv');
const bodyParser = require('body-parser')
const path = require("path");
const mongoose = require('mongoose')

const app = express();

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin/auth');
const gadgetRoutes = require('./routes/gadgets');
const wishlistRoutes = require('./routes/wishlist');
//mongodb connection
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.uxo3eei.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('database connected')
    });
// mongodb+srv://pratyakshaguptajul:<password>@cluster0.4cncivd.mongodb.net/?retryWrites=true&w=majority

app.use(bodyParser());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', gadgetRoutes);
app.use('/api', wishlistRoutes);
//app.use(routes);


//app.use('/api', require('./server/'));

app.listen(process.env.PORT, () => {
    console.log('Server running at:', process.env.PORT);
});





// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message : "Hello"
//     });
// })

// app.post('/data', (req, res, next) => {
//     res.status(200).json({
//         message : req.body
//     });
// })