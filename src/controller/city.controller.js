const db = require('../../config/db.connection');
const city = db.city

// API for get all city
const cityDetails = async(req, res)=>{
    try {
        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fileds" })
        }
        const { state_id } = req.params;
        const cityData = await city.findAll({
            attributes : ["id", "city"],
                where : {
                    state_id : state_id
                }
        })
        if(cityData == null && cityData ==undefined){
            return res.status(404).json({
                success : false,
                message : "City data are not found"
            })
        }else{
            return res.status(200).json({
                success : true,
                message : "City Data Show",
                data : cityData
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// API for get All cities related to countryId
const getAllCitiesByCountryId = async(req, res)=>{
    const { country_id } = req.params;
    try {
        const findCountryData = await city.findAll({
            attributes : ["id", "city"],
            where : {
                country_id : country_id
            }
        })
        if(findCountryData){
            return res.status(200).json({
                success : true,
                message : "Show cities",
                data : findCountryData
            })
        }
        return res.status(404).json({
            success : false,
            message : "cities not found"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
module.exports = {
    cityDetails,
    getAllCitiesByCountryId
}
