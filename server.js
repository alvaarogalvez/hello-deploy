const express = require("express");
const app = express();
const exec = require("child_process").exec;

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Actualizacion");
});

app.get("/run-command", (req, res) => {
    exec("touch test", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send("Error executing script");
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send("Script executed successfully");
    });
});

app.post("/recon", (req, res) => {
    console.log("Received request to /recon");
    const domain = req.body.domain || req.query.domain;
    const APIKEY = req.body.APIKEY || req.query.APIKEY;

    console.log(`Domain: ${domain}`);
    console.log(`APIKEY: ${APIKEY}`);
    if(APIKEY !== "1234") {
        return res.status(403).send("Forbidden");
    } else {
    exec(`./recon.sh ${domain} > resultados`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send("Error executing script");
        } else {
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.send("Script executed successfully");
        } 
    });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});