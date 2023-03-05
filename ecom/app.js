const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

require("dotenv").config();
mongoose.set('strictQuery', true);
//mongoose.set("strictQuery", false);
//app

const AuthRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

const app = express();





// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
    .then(() => console.log('DB Connected'));



    //middleware
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(expressValidator());
    app.use(cors());


    app.use("/api", AuthRoutes);
    app.use("/api", userRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", productRoutes);
    app.use("/api", braintreeRoutes);
     app.use("/api", orderRoutes);

    app.use("/test", function(request, response) {
        // We want to set the content-type header so that the browser understands
        //  the content of the response.
        response.contentType('application/json');
      
        // Normally, the data is fetched from a database, but we can cheat:
        var people = [
          { name: 'Dave', location: 'Atlanta' },
          { name: 'Santa Claus', location: 'North Pole' },
          { name: 'Man in the Moon', location: 'The Moon' }
        ];
      
        // Since the request is for a JSON representation of the people, we
        //  should JSON serialize them. The built-in JSON.stringify() function
        //  does that.
        var peopleJSON = JSON.stringify(people);
      
        // Now, we can use the response object's send method to push that string
        //  of people JSON back to the browser in response to this request:
        response.send(peopleJSON);
      });

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is Running on Port ${port}`);
});