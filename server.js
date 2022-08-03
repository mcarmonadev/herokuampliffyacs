const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
//app.use(express.bodyParser({limit: '50mb'}));

app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.json());



//app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servicio ejecutándose ahora mismo en puerto: '+port);
});

app.post('/metric', (req, res) => {
    const metric = req.body;
    console.log(metric.date);
    console.log("metrics uploaded");
    //res.send('Book is added to the database');

    let filePath = "./finalResults90.json"        
    let fileContent = (JSON.stringify(metric, null, 4));
    fs.writeFileSync(filePath, fileContent, 'utf8');   
        
    res.json({status: "OK", msj: "El archivo remoto finalResults90.json ha sido actualizado usando API remota "});
    res.end();
});
app.get('/metric', (req, res) => {

    let filePath = "./finalResults90.json"   

    if (fs.existsSync(filePath)){
        let rawData = fs.readFileSync(filePath);        
        let result = (JSON.parse(rawData));
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    }else{
        res.json({data: "no hay archivo finalResults90.json"});
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))



