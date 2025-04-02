const axios = require('axios');

const getVehicleServices = async (sidToken, reportFrom, reportTo, reportType) =>{
    try {
        console.log(`welcome to get vehicle service ${reportFrom} , ${reportTo}, ${reportType}`);
        
        const res = await axios({
            method: 'POST',
            url:'https://hst-api.wialon.com/wialon/ajax.html',
            params:{
                svc: 'token/login',
                params: '{"token":"79d7ef47b8d892a57ff2a2ea83787f9fC13D4B88D955172DC71DF0FA45F02977419A8EDE","operateAs":"","appName":"","checkService":""}'
            }
        });
        let token = res.data.eid;

        console.log('fetched token is: ' + token);
        

       
        let vehicleData;

        // if(reportType === 'group'){
            console.log('fetched report type is: ' + reportType, reportFrom, reportTo );
            // Making vehicle detail call
            console.log(`welcome to get vehicle data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":13906320,"reportTemplateId":5,"reportTemplate":null,"reportObjectId":"28545364","reportObjectSecId":0,"reportObjectIdList":[],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails;
            // console.log(resultRows);

            // Fetching result rows
            // Making vehicle detail call
            const resultRowsData1 = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/get_result_rows',
                    params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
                    sid: token
                }
            });

            // Making vehicle detail call
            const resultRowsData2 = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/get_result_rows',
                    params: '{"tableIndex":1,"indexFrom":0,"indexTo":100}',
                    sid: token
                }
            });

            // Set 1 Data
            
            const set1 = resultRowsData1.data;
            const set2 = resultRowsData2.data;
            let set4;

            for(i=0; i<set1.length; i++){
                console.log(set1[i].c);
                console.log(set2[i].c);
                
                const set3 = set2[i].c.slice(2);
                console.log('>>>>>>>>>>>>>>>>>');
                console.log(set3);
                set4 = (set2.indexOf(set1[i])) ? [...set1[i].c, ...set3] : set1[i].c;
                console.log(set4);
            }


            



            // console.log(set1.map((item)=>{
            //     return item.c;
            // }));

            const responseData = [
                {
                "mapping":[

                    "id",
                    "grouping",
                    "engine_hours",
                    "in_motion_engine_hours",
                    "idling_engine_hours",
                    "avg_speed",
                    "max_speed",
                    "utilization",
                    "distance",
                    "fuel_consumed",
                    "kmpl",
                    "parkings",
                    "initial_fuel_level",
                    "final_fuel_level",
                    "total_fillings",
                    "total_drains",
                    "filled",
                    "drained"
                ]
                },
                {
                "data": set4
                }
            ];

            vehicleData = responseData;
        // }else if(reportType == 'parking'){
        //     // Making vehicle detail call
        //     console.log(`welcome to get vehicle parking data`);
        //     const vehicleDetails = await axios({
        //         method: 'get',
        //         url:'https://hst-api.wialon.com/wialon/ajax.html',
        //         params:{
        //             svc: 'report/exec_report',
        //             params: '{"reportResourceId":22542222,"reportTemplateId":5,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"reportObjectIdList":[28093527],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
        //             sid: token
        //         }
        //     });


        //     const resultRows = vehicleDetails.layerCount;
        //     console.log(resultRows);

        //     // Fetching result rows
        //         // Making vehicle detail call
        //         const resultRowsData = await axios({
        //             method: 'get',
        //             url:'https://hst-api.wialon.com/wialon/ajax.html',
        //             params:{
        //                 svc: 'report/select_result_rows',
        //                 params: '{"tableIndex":0,"config":{"type":"range","data":{"from":0,"to":1,"level":2}}}',
        //                 sid: token
        //             }
        //         });

        //     const responseData = [
        //         {
        //         "mapping":[
        //             "id",
        //             "grouping",
        //             "interval_beginning",
        //             "interval_end",
        //             "parking_duration",
        //             "total_data_time",
        //             "location"
        //         ]
        //         },
        //         {
        //         "data": resultRowsData.data
        //         }
        //     ];

        //     vehicleData = responseData;
        
        // }

          

        
      return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};