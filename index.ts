import express from "express";



const app = express();
app.use(express.json());

import type codeboxRequest from "./interface/codeboxRequest.interface.ts";
import auth from "./middleware/auth.ts";





app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.post("/code", auth, (req, res) => {

    const { codeboxRequest: data } = req.body;
    for (const keys in data) {
        console.log(keys, " __", data[keys]);
    }

    return res.status(200).send({ message: "success" });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
