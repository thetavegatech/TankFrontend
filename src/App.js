// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file

// const App = () => {
//   const [mqttData, setMqttData] = useState(null);
//   const [waterLevel, setWaterLevel] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://192.168.29.151:5000/api/mqtt-s1');
//         console.log(response.data)
//          setMqttData(response.data.s1Value ||  10);
//       } catch (error) {
//         console.error('Error fetching MQTT data:', error);
//       }
//     };

//     fetchData();

//     // Set up an interval to fetch data every one second
//     const intervalId = setInterval(fetchData, 1000);

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   useEffect(() => {
//     // Update the water level based on the fetched MQTT data
//     if (mqttData) {
//       const newValue = parseFloat(mqttData);
//       // Map the value to the percentage range [0, 100]
//       const percentageValue = (newValue / 20) * 100;
//       // Set the water level
//       setWaterLevel(percentageValue);
//     }
//   }, [mqttData]);

//   return (
//     <div className="tank-container">
//       <div className="tank">
//         <div className="cylinder">
//           {/* <div className="bottom"></div> */}
//           <div className="middle">
//           </div>
//           <div className="top"></div>
//           <div className="water" style={{ height: `${waterLevel}%` }}>
//             <div className="data-value above-water">{mqttData}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import tankImage from './tank.png'; // Import your tank image
import smalllogo from './Picture1.jpg'

function App() {
  const [mqttData, setMqttData] = useState(null);
  const [waterLevel, setWaterLevel] = useState(0);
  const [actualgas, setActualGas]  = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tankbackend.onrender.com/api/mqtt-s1');
        setMqttData(response.data.s1Value);
      } catch (error) {
        console.error('Error fetching MQTT data:', error);
      }
    };

    fetchData();

    // Set up an interval to fetch data every one second
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Update the water level based on the fetched MQTT data
    if (mqttData) {
      const newValue = parseFloat(mqttData);
      // Map the value to the percentage range [0, 100]
      let convertedvalue = (newValue * 562.5) - 2250;
      // Set the water level
      setActualGas(convertedvalue.toFixed(2))

      let value = (convertedvalue/45)
      
      setWaterLevel(value.toFixed(2));
    }
  }, [mqttData]);



  return (
    <div className="container border border-4 p-1 border-dark" style={{ paddingBottom: '2rem', marginTop: '3rem' }}>
       <h2 className="text-center" style={{ marginBottom: '3rem' }}> <img className="text-center" src={smalllogo} alt='not found' height="45px" />JSK CRYO AIR PRODUCTS</h2>
      <div className="row">
        <h6 style={{ marginBottom: '2rem' }}>
          Client: <span>Tripti Gases PVT LTD</span>
        </h6>
        <h6 style={{ marginBottom: '2rem' }}>
          Plant: <span>A-57 Mahape MIDC New Mumbai</span>
        </h6>
      </div>

      <div className="row">
        <div className="col-6">
          <h6 style={{ marginBottom: '2rem' }}>
            Media: <span>Liquid Nitrogen</span>
          </h6>
          <h6 style={{ marginBottom: '2rem' }}>
            TankCapacity: <span>9000 kgs</span>
          </h6>
          <h6 style={{ marginBottom: '2rem' }}>
            Tank Level: <span>{actualgas} kg</span>
          </h6>
        </div>
        <div className="col-6">
          <div style={{ position: 'relative' }}>
            <img src={tankImage} alt="Tank" style={{ width: '150px', height: 'auto' }} />
            <div
              style={{
                position: 'absolute',
                bottom: '38px', // Adjust this value as per your need to position the tank level div
                left: '70px', // Adjust this value as per your need to position the tank level div
                width: '30px',
                height: '200px',
                border: '2px solid white',
                marginTop: '10px',
                background: 'white'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: `${waterLevel}px`, // Adjusted to match the range 1-20
                  backgroundColor: '#FF7F50',
                }}
              ></div>
            </div>
          </div>
          <h6 style={{marginLeft : "2.5rem"}}>Liquid N2</h6>
        </div>
      </div>
    </div>
  );
}

export default App;

