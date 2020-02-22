const express = require("express");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const utils = require("./utils");
const server = express();
const cors = require("cors");

server.use(bodyParser.json());
server.use(cors());

server.get('/bookings', function (req, res) {
    res.send(utils.getAllBookings())
  });

server.get('/bookings/:id', function(req, res){
if (utils.checkBookingExists(parseInt(req.params.id))) {
    res.send(utils.getBooking(parseInt(req.params.id)))
} else {
    res.status(404).send(boom.notFound())
}
});

server.post('/bookings', function(req, res){
    console.log(req.body)

    if(utils.checkBookingExists(req.body.id)){
        res.status(400).send(boom.badRequest(`Booking with id ${req.body.id} already exists`))
    } else {
        res.send(utils.createBooking(req.body))
      
    }
})

server.delete('/bookings/:id', function(req, res){
    if (utils.checkBookingExists(parseInt(req.params.id))) {
        res.send(utils.deleteBooking(parseInt(req.params.id)))
    } else {
        res.status(404).send(boom.notFound())
    }
});

server.put('/bookings/:id', function(req, res){
console.log(req.body)

    const id = parseInt(req.params.id)

    if (utils.checkBookingExists(id)) {
        res.send(utils.editBooking(id, req.body))
    } else {
        res.status(404).send(boom.notFound())
    }
})
server.listen(4000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
  });

  

