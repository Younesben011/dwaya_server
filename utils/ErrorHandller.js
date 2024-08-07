import { Error, MongooseError } from "mongoose";
const EROORS = {
    duplicated: {
        userName: {
            message:
                "E11000 duplicate key error collection: greenTopia.users index: username_1 dup key",
            respose: "userName already exists",
        },
        email: {
            message:
                "E11000 duplicate key error collection: greenTopia.users index: email_1 dup key",
            respose: "email already exists",
        },
    },
};
export const errorHandller = (err, res) => {
    console.log(err.message);

    if (err.message.startsWith(EROORS.duplicated.userName.message))
        return res.status(400).json(EROORS.duplicated.userName.respose);
    else if (err.message.startsWith(EROORS.duplicated.email.message))
        return res.status(400).json(EROORS.duplicated.email.respose);
    else res.status(500).json({ message: err.message.split(":")[2] });
};
