const express = require('express');
const app = express();
// needed to use path
const path = require('path');
// require routes file
const router = require('./routes');
const PORT = 3333;

// handle all incoming json files
app.use(express.json());

// handle form data
app.use(express.urlencoded({ extended : true }));

// serving static folder containing files
app.use(express.static('assets'));

// route all api reqs to router middleware
app.use('/api', router);

app.get('/secret', (req, res) => {
    res
    .status(200)
    // setting header content type to text/html
    .set('Content-Type', 'text/html')
    .sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// serve index.html static file
// path.resolve uses absolute path so you have to put the entire path
// relative to server to get the file you want to server
app.use('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// catch all error handler
app.use('*', (req, res) => {
    res.status(400).json('error');
    // res.sendStatus(404);
});

// global error handler 
app.use((err, req, res, next) => {
    // create a default error obj
    const defaultErr = {
        log: 'middleware error',
        status: 400,
        message: { err: 'an error happened' }
    };
    // create the error obj to be send back to client
    const errorObj = { ...defaultErr, ...err };
    // send back a status being the status in error
    // converting the errorObj.message to JSON string
    return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
})

// start server listening to port
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
});