const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercambio de informacion
const cors = require('cors');
//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser: true,
});

//Crear el servidor
const app = express();

//Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Habilitar cors
app.use(cors());

//Rutas de la app
app.use('/', routes());


//carpeta publica
app.use(express.static('uploads'))



//Asigno el puerto
app.listen(5000);