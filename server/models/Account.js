const mongoose=require('mongoose');
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }

});
const accountModel=mongoose.model('Accounts',accountSchema);
module.exports=accountModel;
