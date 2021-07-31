const express = require("express");
const server = express();
const next = require('next');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env'), silent: true});

const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';


console.log(dev, process.env.NODE_ENV)


const app = next({ dev });

const handle = app.getRequestHandler();



server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));


app.prepare().then(() => {
    try {
        server.all("*", (req, res) => handle(req, res));
        server.listen(PORT, (err) => {
            if(err){
                throw err;
            }
            console.log(`READY ON ${PORT}`)
        });
    } catch(e) {
        // statements
        console.log(e);
    }
});