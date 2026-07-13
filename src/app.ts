import express, { NextFunction } from "express";
import { userRouter } from "./routers/user.router.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app: express.Application = express();

//Custom middleware
function logRequest(req: Response,res: Request, next: NextFunction){

    console.log("URL: ",req.url)

    next(); //Please call my next function
}

app.use(express.json()); // this will express to deserialize the request body to javascript object
app.use(express.text()); // convert the text to javascipt text
app.use(express.urlencoded());


// custom based routes (example of next function)
// app.get("/health",logRequest, (_req, res) => {
//     res.json({
//       status: "ok",
//       timestamp: new Date().toISOString(),
//     });
//   });


// custom based routes
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Express based routes
app.use('/api/users',userRouter); // if the route starts with /users , userRouter will handle those requests 
// app.use(errorHandler)   // added errorhandler based middleware
export { app };