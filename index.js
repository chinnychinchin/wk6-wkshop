//Load libraries 
const express = require('express');
const morgan = require('morgan');
const fortuneCookie = require('fortune-cookie');



//config 
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000; 

//Random int generator
const randNum = () => Math.round(Math.random()*fortuneCookie.length)

//instantiate express
const app = express() 
//use morgan to log all requests. combined format 
app.use(morgan('combined'))

app.use(express.static(__dirname + '/public/frontend'))

//resource 

app.get('/api/cookie', (req, res) => {

    const count = parseInt(req.query['count']) || 1

    res.status(200);
    res.type('application/json')
    if(count == 1){
        res.json( {'cookie': fortuneCookie[randNum()] })
    }
    else{
        let c = []
        for(let i = 0; i < count; i++){
            c.push(fortuneCookie[randNum()])
        }
        res.json( {'cookie': c })

    }

} )


//start server
app.listen(PORT, () => console.log(`Your app started on port ${PORT} at ${new Date()}`))