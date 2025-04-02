
const axios = require('axios');
// const { report } = require('process');
// const httpCallUtility = require('../utility/httpcall.js');



const getVehicleServices = async (sidToken, reportFrom, reportTo, reportType) =>{
    try {
        console.log(`welcome to get vehicle service ${reportFrom} , ${reportTo}`);
        // return 'hello';
        
        const res = await axios({
            method: 'POST',
            url:'https://hst-api.wialon.com/wialon/ajax.html',
            params:{
                svc: 'token/login',
                params: '{"token":"9e582221ad39b510b1c6951d6df5a2a4ECE871EDFDFE3D78EC0ABC72929B578A4A12DD04","operateAs":"","appName":"","checkService":""}'
            }
        });
        let token = res.data.eid;

        // Set the data timezone
        // const setTimezone = await axios({
        //     method: 'POST',
        //     url:'https://hst-api.wialon.com/wialon/ajax.html',
        //     params:{
        //         svc: 'render/set_locale',
        //         params: '{"tzOffset": 1342375280 , "language": "en"}',
        //         sid: token
        //     }
        // });

        // console.log(setTimezone);
        let vehicleData;

        if(reportType == 'summary'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":1,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093532, 28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/get_result_rows',
                        params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "group_vehicle",
                    "mileage",
                    "engine_hours",
                    "parkings",
                    "cons_fls",
                    "kmpl",
                    "filled",
                    "stolen"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;
        }else if(reportType == 'parking'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle parking data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":5,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/select_result_rows',
                        params: '{"tableIndex":0,"config":{"type":"range","data":{"from":0,"to":1,"level":2}}}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "grouping",
                    "interval_beginning",
                    "interval_end",
                    "parking_duration",
                    "total_data_time",
                    "location"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;
        
        }else if(reportType == 'stop'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle stop data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":10,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/select_result_rows',
                        params: '{"tableIndex":0,"config":{"type":"range","data":{"from":0,"to":1,"level":2}}}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "grouping",
                    "interval_beginning",
                    "interval_end",
                    "parking_duration",
                    "total_data_time",
                    "location"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;
        }else if(reportType == 'theft'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle theft data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":6,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093532, 28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/get_result_rows',
                        params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "grouping",
                    "theft_time",
                    "theft_location",
                    "fuel_before_theft",
                    "stolen",
                    "fuel_after_theft"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;

        }else if(reportType == 'machine'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle machine data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":8,"reportTemplate":null,"reportObjectId":"28093532","reportObjectSecId":0,"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/get_result_rows',
                        params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "machine_id",
                    "engine_hours",
                    "fuel_consumption",
                    "avg_consumption",
                    "fuel_filled",
                    "fuel_stolen",
                    "initial_fuel_level",
                    "final_fuel_level"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;

        }else if(reportType == 'power'){
            // Making vehicle detail call
            console.log(`welcome to get vehicle power data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":22542222,"reportTemplateId":9,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails.layerCount;
            console.log(resultRows);

            // Fetching result rows
                // Making vehicle detail call
                const resultRowsData = await axios({
                    method: 'get',
                    url:'https://hst-api.wialon.com/wialon/ajax.html',
                    params:{
                        svc: 'report/get_result_rows',
                        params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
                        sid: token
                    }
                });

            const responseData = [
                {
                "mapping":[
                    "id",
                    "group_vehicle",
                    "mileage",
                    "engine_hours",
                    "parkings",
                    "cons_fls",
                    "kmpl",
                    "filled",
                    "stolen"
                ]
                },
                {
                "data": resultRowsData.data
                }
            ];

            vehicleData = responseData;

        }

          

        
      return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};