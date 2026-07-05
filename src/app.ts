import express from "express";
import { userRouter } from "./routers/user.router.js";

const app: express.Application = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});


app.use('/api/users',userRouter); // if the route starts with /users , userRouter will handle those requests 
export { app };