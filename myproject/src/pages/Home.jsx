import "./home.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//material ui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const Home = (props) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // Make a GET request to the /trips endpoint
        const response = await axios.get('http://localhost:5000/trips');

        // Extract the trips data from the response
        const tripsList = response.data;
        console.log(tripsList);

        // Update the state with the fetched trips
        setTrips(tripsList);
      } catch (error) {
        console.error('Error fetching tripss:', error);
      }
    };

    // Call the fetchTrips function when the component mounts
    fetchTrips();
  }, []);

  const handleBookNow = async (tripId) => {
    try {
      // Make a POST request to create a new reservation
      await axios.post('http://localhost:5000/createReservation', {tripId});
      
      // Show an alert when the reservation is successfully booked
      window.alert('Reservation booked successfully!');
    } catch (error) {
      console.error('Error booking trip:', error);
    }
  };

  return (
    <div>
      <nav className="navigation">
        <h1>Trips List</h1>
        <Link to="/myReservations">My Reservations</Link>
      </nav>
      <ul>
      <div className='cardContainer'>
        {trips.map(trip => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={trip.destinationImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <FlightTakeoffIcon/> {trip.origin}({trip.departureTime})
                <br/>
                <br/>
                <FlightLandIcon/> {trip.destination}({trip.arrivalTime})
                <br/>
                <br/>
                <AirlineSeatReclineNormalIcon/> {trip.seatsAvailable}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="big" onClick={() => handleBookNow(trip.tripId)}>Book Now</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      </ul>
    </div>
  );
};

export default Home;
