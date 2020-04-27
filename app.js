const express = require('express');
const bodyParser = require("body-parser");

const app = express();


//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


require("./model/config/dbconfig");


const mail=require("./routes/sendmail");
const verify = require("./routes/verify");

app.use("/",mail);
app.use("/",verify);

const PORT = process.env.PORT||2345;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));