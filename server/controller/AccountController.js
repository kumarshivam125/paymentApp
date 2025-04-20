const Account=require('../models/Account');
const mongoose=require('mongoose');

exports.transferAmount=async(req,resp)=>{
    try {       
        const session = await mongoose.startSession();
        session.startTransaction();

        const { amount, to } = req.body;
        const id=req.user.id;
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: id }).session(session);   
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return resp.status(400).json({
                success:false,
                message: "Insufficient balance"
            });
        }
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return resp.status(400).json({
                success:false,
                message: "Invalid account"
            });
        }
        
        // Perform the transfer
        await Account.updateOne({ userId: id }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
    
        return resp.status(200).json({
            success: true,
            message: "Transfer successful"
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Transfer---"+err.message
        })
    }
}

