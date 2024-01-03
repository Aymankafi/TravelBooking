// Import necessary libraries and styles
import "./myReservations.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations for a specific passenger email
    const fetchReservations = async () => {
      try {
        // Use Axios for the HTTP request
        const response = await axios.get('http://localhost:5000/getMyReservations');
        const data = response.data;

        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
      // Use Axios to make a DELETE request to delete the reservation
      const response = await axios.delete(`http://localhost:5000/myReservations/${reservationId}`);
      console.log(response.data); // Log the server response

      // Update the state to remove the deleted reservation
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== reservationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>My Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <p>Passenger Email: {reservation.passengerEmail}</p>
            <p>Trip ID: {reservation.tripId}</p>
            <p>Class: {reservation.class}</p>
            <p>Booking Date: {new Date(reservation.bookingDate).toLocaleDateString()}</p>
            <Button onClick={() => handleDeleteReservation(reservation._id)} variant="outlined" color="error">
              Delete
            </Button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReservations;
