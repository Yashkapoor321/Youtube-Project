const dotenv = require("dotenv");
const connectDB = require("./db/connectDB.js");
const app = require("./app");

dotenv.config({
    path : "./.env"
})

 
connectDB()      // connectDatabase
.then(() => {
     app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port : ${process.env.PORT}`);  
     })
})
.catch((error) => {
  console.log("MONGO db connection failed !!! ", error);
})