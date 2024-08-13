import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    flight_status: 'active',
    dep_iata: '',
    arr_iata: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/aviation', { params: filters });
      setFlights(response.data.data);
      setErrorMessage(''); // Clear error message on success
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage('Your current subscription plan does not support this API function.');
      } else {
        setErrorMessage('An error occurred while fetching flight data.');
      }
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <div>
      <h1>Flight Status</h1>

      <div>
        <label>
          Flight Status:
          <select name="flight_status" onChange={handleInputChange} value={filters.flight_status}>
            <option value="active">Active</option>
            <option value="landed">Landed</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="incident">Incident</option>
            <option value="diverted">Diverted</option>
          </select>
        </label>

        <label>
          Departure IATA:
          <input
            type="text"
            name="dep_iata"
            value={filters.dep_iata}
            onChange={handleInputChange}
            placeholder="e.g., JFK"
          />
        </label>

        <label>
          Arrival IATA:
          <input
            type="text"
            name="arr_iata"
            value={filters.arr_iata}
            onChange={handleInputChange}
            placeholder="e.g., LAX"
          />
        </label>

        <button onClick={handleSearch} className="search-button">
          Search
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <ul>
        {flights.map((flight) => (
          <li key={flight.flight.iata}>
            {flight.airline.name} - {flight.flight.iata} - {flight.flight_status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
