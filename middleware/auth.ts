
import type codeboxRequest from "../interface/codeboxRequest.interface";
const valid_token = ["xyz-123-abc"]

const auth = (req, res, next) => {

    const { codeboxRequest: data } = req.body;

    for (const token of valid_token) {
        if (token == data.auth_token) {
            return next();
        }
    }
    console.log(data.auth_token);

    return res.status(401).json({ message: "Unauthorized" });

};

export default auth;
