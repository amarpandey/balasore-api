const express = require('express');
// const router = require('express.Router');
const app = express();
const vehicleRoutes = require('./routes/getVehicleRoute')
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT"
}

app.use(cors(corsOptions));

app.set('json spaces', 2)
app.use("/", vehicleRoutes);
app.use("/getTruckReport", vehicleRoutes);



app.listen(port, ()=>{
    console.log(`app is successfully runnning on port ${port}`);
});