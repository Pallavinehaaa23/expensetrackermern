const Transmodel = require("../models/transmodel");
const moment = require('moment');

const getAll = async (req, res) => {
    try {
        const { freq, startDate, endDate, userid,type } = req.body;
        
        let dateQuery;
        if (freq !== 'custom') {
            dateQuery = {
                date: {
                    $gt: moment().subtract(Number(freq), 'd').toDate()
                }
            };
        } else {
            dateQuery = {
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
        }
        
       
        const transactions = await Transmodel.find({
            ...dateQuery,
            userid,
            ...(type!=='all' && {type})
        });
        
        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const addAll = async (req, res) => {
    try {
        const transaction = new Transmodel(req.body);
        await transaction.save();
        res.status(201).send('Transaction created');
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
const edits=async(req,res)=>{
    try{
        await Transmodel.findOneAndUpdate(
            {_id:req.body.transId},req.body.payload
        )
    res.status(200).send('Edit success');
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
}
const deltrans=async(req,res)=>{
    try{
        await Transmodel.findOneAndDelete(
            {_id:req.body.transId}
        )
        res.status(200).send('Delete success');
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = { addAll, getAll ,edits,deltrans};
