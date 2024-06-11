//API Documentation
const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const errorHandlerMiddleware = require('./middleware/errorMiddleware');
const morgan = require('morgan');
const cors = require('cors');

//Database
const connectDB = require('./db/connect');

//Security
const helmet = require('helmet');
const xss = require('xss-clean')
const mangoSanitize = require('express-mongo-sanitize');

//routes import
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobsRoutes = require('./routes/jobsRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mangoSanitize());

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);


//validation middleware
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        const options={
            definition:{
                openapi: "3.0.0",
                info:{
                    title: "Jobify API",
                    description: "Jobify API Documentation in Node and Express",
                    },
                    servers:[
                        {
                            url:"http://localhost:3000"
                        }
                    ]
                    },
                apis:['./routes/*.js'],
                }
            const spec = swaggerDoc(options);
            app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(spec))
            app.listen(port, ()=>{
        });
    } catch (error) {
    }

}

start();
