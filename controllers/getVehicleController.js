console.log('inside controller');
const getVehicleService = require('../services/getVehicleService');

const getVehicleDetails = async (req, res)=>{
    try{
        console.log('inside getVehicleDetails controller:: ');
        // Calling getVehicle service 
        const userToken = req.query.token;
        const reportType = (req.query.report) ? req.query.report : 'summary' ;
        const validToken = userToken == '9e582221ad39b510b1c6951d6df5a2a4ECE871EDFDFE3D78EC0ABC72929B578A4A12DD04' ? true : false;
        if(validToken){
            // const reportFrom = (new Date(req.query.from).getTime() / 1000);
            // const reportTo = (new Date(req.query.to).setHours(23, 59) / 1000);
            const reportFrom = req.query.from;
            const reportTo = req.query.to;
            console.log('token :: '+ userToken);
            console.log('from :: '+ reportFrom);
            console.log('to :: '+ reportTo);
            console.log('reportType :: '+ reportType);

            const vehicleData = await getVehicleService.getVehicleServices(userToken,reportFrom, reportTo, reportType);
            res.send(vehicleData);
        }else{
            res.send('Invalid Token');
        }
        
    }catch(err){
        return err;
    }
    
}

function sortData (data){
    let sortedData;
    {
        sortedData = data.sort(function(a,b){
        return a.x - b.x;
        })
    }
    return sortedData;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}


module.exports = getVehicleDetails;


