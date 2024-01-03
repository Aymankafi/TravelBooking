const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const username = 'travelbookingdb';
const password = 'EMAJ9tbPLn8153SvbuNLaps7j96YW6gJzZN8FEq9AmJL8p9BQvu0naJZUafAXpI79B658G5l8StWACDbuPWO3g==';
const host = 'travelbookingdb.mongo.cosmos.azure.com';
const port = '10255';
const database = 'travelbooking';

// Connection String
const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?ssl=true&retryWrites=false`;

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//trip schema


const travelClassSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const tripSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  destinationImage: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  travelClasses: {
    type: [travelClassSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

// Define a route to get all trips

app.get('/trips', async (req, res) => {
  try {
    // Fetch all trips from the database
    const trips = await Trip.find();

    // Return the list of trips
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// reservation schema
const reservationSchema = new mongoose.Schema({
  passengerEmail: {
    type: String,
    required: true,
  },
  tripId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

app.get('/getMyReservations', async (req, res) => {
  const passengerEmail = "aymankafi@gmail.com";

  try {
    // Fetch reservations for the specified passenger email from the database
    const reservations = await Reservation.find({ passengerEmail });

    // Return the list of reservations
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to create a new reservation
app.post('/createReservation', async (req, res) => {
  const {tripId} = req.body;

  try {
    // Create a new reservation
    const newReservation = new Reservation({
      passengerEmail:"aymankafi@gmail.com",
      tripId,
      class: "Economy",
      bookingDate:new Date(),
    });

    // Save the reservation to the database
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete a reservation
app.route('/myReservations/:reservationId?')
  .delete(async (req, res) => {
    const passengerEmail = "aymankafi@gmail.com";
  try {
    // If reservationId is provided, delete the reservation and return the result
    if (req.params.reservationId) {
      const deleteResult = await Reservation.deleteOne({
        _id: req.params.reservationId,
        passengerEmail,
      });

      if (deleteResult.deletedCount === 1) {
        res.status(200).json({ message: 'Reservation deleted successfully' });
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    }else{
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  