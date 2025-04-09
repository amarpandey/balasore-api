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

        if(reportType == 'group'){
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

            const set1 = resultRowsData1.data;
            const set2 = resultRowsData2.data;
            let set4 =[];

            for(i=0; i<set1.length; i++){
                set1[i].c[5] = set1[i].c[5].slice(0, -5);
                set1[i].c[6] = (set1[i].c[6].t) ? set1[i].c[6].t.slice(0, -3) : set1[i].c[6].slice(0, -5);
                const set3 = set2[i].c.slice(2);
                set3[0] = set3[0].slice(0, -3);
                set3[1] = set3[1].slice(0, -2);
                set3[4] = set3[4].slice(0, -2);
                set3[5] = set3[5].slice(0, -2);
                set3[8] = set3[8].slice(0, -2);
                set3[9] = set3[9].slice(0, -2);
                set4.push((set2.indexOf(set1[i])) ? [...set1[i].c, ...set3] : set1[i].c);
            }

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
        }else {
            console.log('fetched report type is: ' + reportType, reportFrom, reportTo );
            // Making vehicle detail call
            console.log(`welcome to get vehicle data`);
            const vehicleDetails = await axios({
                method: 'get',
                url:'https://hst-api.wialon.com/wialon/ajax.html',
                params:{
                    svc: 'report/exec_report',
                    params: '{"reportResourceId":13906320,"reportTemplateId":6,"reportTemplate":null,"reportObjectId":"28556289","reportObjectSecId":0,"reportObjectIdList":[],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
                    sid: token
                }
            });


            const resultRows = vehicleDetails;
            // console.log(resultRows);

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

            const machineData = resultRowsData.data.map((item)=>{
                console.log('>>>>>>>', item);
                item.c[3] = item.c[3].slice(0,-2);
                item.c[5] = item.c[5].slice(0,-2);
                item.c[6] = item.c[6].slice(0,-2);
                item.c[9] = item.c[9].slice(0,-2);
                item.c[10] = item.c[10].slice(0,-2);
                item.c[11] = item.c[11].slice(0,-2);
                return item.c;
            });

            const responseData = [
                {
                "mapping":[

                    "id",
                    "grouping",
                    "engine_hours",
                    "consumption",
                    "avg_consumption",
                    "initial_fuel_level",
                    "final_fuel_level",
                    "total_fillings",
                    "total_thefts",
                    "filled",
                    "stolen",
                    "utilization"
                ]
                },
                {
                "data": machineData
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