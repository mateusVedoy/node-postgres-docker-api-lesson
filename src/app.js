const Express = require("express");
const { Router } = require("express");
const { pgClient } = require("./db-client.js")

const app = Express();
const route = Router();

app.use(Express.json());

app.use(route);

app.listen(3333, () => { console.log("Running at 3333") });

pgClient.connect().then(() => {

    route.get("/user/all", async (_, res) => {
        try {
            const { rows } = await pgClient.query("select * from Usr");
            return res.json({ "Users:": rows }).status(200);
        } catch (error) {
            return res.send(error).status(400);
        }
    });

    route.post("/user/create", async (req, res) => {
        const { fullname } = req.body;
        try {
            await pgClient.query(`insert into Usr (usr_fullname) values ('${fullname}')`);
            return res.send({ "Message": "User has been created successfully" }).status(201);
        } catch (error) {
            return res.send({ "Error: ": error }).status(400);
        }
    });

}).catch(err => {
    console.log(err)
});
