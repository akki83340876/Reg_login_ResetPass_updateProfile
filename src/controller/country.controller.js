const db = require('../dbConfig');
const country = db.country
const state = db.state;
const city = db.city

// API for get all country 
const countryDetails = async (req,res)=>{
    try{
        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fileds" })
        }
    const countryData = await country.findAll({
            attributes: ['id', 'country']
    })
    if(countryData == null){
        return res.status(404).json({
            success : false,
            message : "Country are not found"
        })
    }
    return res.status(200).json({
        success : true,
        message : "Show all country Data",
        countryData : countryData
    })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.messgage
        })
    }
}

module.exports = {
    countryDetails
}
