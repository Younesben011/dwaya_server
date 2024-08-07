import jwt from "jsonwebtoken";



export const verifyToken = (token) => {
    let decodedToken = ""
    console.log(process.env.JWt_SECRET)
    jwt.verify(token, process.env.JWt_SECRET, (err, decoded_Token) => {
      if (err) {
        console.log(err);
        // res.json({code:22,message:"token not valid"})
        decodedToken = null
      } else {
        decodedToken = decoded_Token
      }
    })
    return decodedToken
  }

export const isAuthenticated = async (
    req,
    res,
    next
) => {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    if (typeof bearerHeader == "undefined") {
        res.status(401).json({ code: 13, message: "user not loged in" });
        return;
    }
    const bearerToken = bearerHeader.split(" ")[1];
    console.log(bearerToken);
    const decodedToken = verifyToken(bearerToken);

    if (!decodedToken) {
        res.status(401).json({ code: 24, message: "not authorized" });
        return;
    }

    res.app.locals.pharmaId = decodedToken.id;
    next();
};


