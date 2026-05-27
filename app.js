//Config rotas
require('dotenv').config(); //chamando .env

const express = require('express');
const app = express();
const mongoose= require('mongoose');



//conexão com o mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Rota DB iniciada'))
.catch((err) => console.error('Falha na conexão', err));

//middlewares
app.use(express.urlencoded({extended:true, }));
app.use(express.json());


//rotas API
const rotasServicos = require('./routes/osRoutes')

app.use('/os', rotasServicos)


//rota endpoint
app.get('/', (req, res) => {
    //mostrar req

    res.json({
        msg: "Ping"})
    
});



 