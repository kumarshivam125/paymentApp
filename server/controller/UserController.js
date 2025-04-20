const zod=require('zod');
const User=require('../models/User');
const Account=require('../models/Account');

exports.updateProfile=async(req,resp)=>{
    try{
        const {firstName,lastName}=req.body;
        console.log(req.body);
        const userSchema=zod.object({
            firstName:zod.string().min(3),
            lastName:zod.string().min(3),
        })
        const checkFields=userSchema.safeParse({firstName,lastName});
        if (!checkFields.success) {
            console.log(checkFields.error);
            return resp.status(400).json({ 
                success:false, 
                message:"Invalid input fields" 
            });
        }
        const id=req.user.id;
        const checkUserExist=await User.findById(id);
        if(!checkUserExist){
            return resp.status(400).json({
                success:false,
                message:"User DONT  Exist."
            })
        }
        const updatedUser=await User.findOneAndUpdate({_id:id},{firstName,lastName},{new:true});
        return resp.status(200).json({
            success:true,
            message:"Profile Updated",
            updatedUser
        })
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in Updating Profile"
        })
    }
}

exports.getUsers=async(req,resp)=>{
    const filter=req.query.filter||"";
    try{
        const selectedUsers=await User.find({
            $or:[
                {firstName:{$regex:filter, $options:"i"}},
                {lastName:{$regex:filter, $options:"i"}},
            ]
        });
        
        return resp.status(200).json({
            success:true,
            message:"Uers Fetched Successfully",
            users:selectedUsers.map(user=>(
                {firstName:user.firstName,lastName:user.lastName,username:user.username,_id:user._id}
            ))
        })
                
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in Fetching Users"
        })
    }
}

exports.getBalance=async(req,resp)=>{
    try{
        const id=req.user.id;
        const checkAccountExist=await Account.findOne({userId:id});
        if(!checkAccountExist){
            return resp.status(404).json({
                success:false,
                message:"User Dont exist"
            })
        }
        return resp.status(200).json({
            success:true,
            message:"User Balance fetched Successfully",
            balance:checkAccountExist.balance
        })
                
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error in Fetching Balance"
        })
    }
}

