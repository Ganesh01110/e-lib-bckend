import  express from "express";
import globalErrorhandler from "./middlewares/globalErrorhandler"



const app= express();

// routes  , callbecks => (req, res, next) => {}
app.get('/',(req, res, next) => {

    // const error = createHttpError(400,"something went wrong")
    // throw  error;

      res.json({message:"welcome to elib apis"});
})

// error handler
app.use(globalErrorhandler);



export default app;