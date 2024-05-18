import app from "./src/app";

const startServer =()=>{
    const port = process.env.PORT || 3000;

    app.listen(port,()=>{
        console.log(`listening on port : ${port}`);
    });
    // port with the callback it starts when the metod is being called
    // it also indicates the port is also started running
}

startServer();