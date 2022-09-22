const mongoose = require('mongoose');
//const config = require("dotenv").config();

const options = {
    autoIndex: false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(process.env.DBURLPROD, options)
.then(()=>{ console.log('connected successfully'); })
.catch(err =>{
        console.log('Error in the connection' + err);
})

//connect();
exports.mongoose = mongoose;
