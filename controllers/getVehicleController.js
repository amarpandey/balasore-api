console.log('inside controller');
const getVehicleService = require('../services/getVehicleService');

const getVehicleDetails = async (req, res)=>{
    try{
        console.log('inside getVehicleDetails controller:: ');
        // Calling getVehicle service 
        const userToken = req.query.token;
        const reportType = (req.query.report) ? req.query.report : 'group' ;
        const validToken = userToken == '79d7ef47b8d892a57ff2a2ea83787f9fC13D4B88D955172DC71DF0FA45F02977419A8EDE' ? true : false;
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

module.exports = getVehicleDetails;


