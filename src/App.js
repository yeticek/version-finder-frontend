// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VersionFinder from './components/VersionFinder';
import './index.css';
import './bootstrap-sass.scss';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if u are using API_URL environment variable
        //const response = await axios.get(`${process.env.API_URL}/api/response`);
        const response = await axios.get(`http://localhost:9999/api/response`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="bg-gray-100 p-6">
        <VersionFinder data={data} />
      </div>
  );
};

export default App;