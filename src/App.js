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
import axios from 'axios';

const App = () => {
  const [mqttData, setMqttData] = useState(null);
  const [waterLevel, setWaterLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tankbackend.onrender.com/api/mqtt-s1');
        console.log(response.data);
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
      const percentageValue = (newValue / 20) * 100;
      // Set the water level
      setWaterLevel(percentageValue);
    }
  }, [mqttData]);

  

  return (
    <>
      <div className="container border border-4 p-3 border-dark" style={{ paddingBottom: '2rem', marginTop: '3rem' }}>
        <h2 className="text-center " style={{ marginBottom: '3rem' }}>
          Tripti Gases PVT LTD
        </h2>
        <div className="row">
          <h6 style={{ marginBottom: '2rem' }}>
            Plant : <span>A-57 Mahape MIDC New Mumbai</span>
          </h6>
        </div>

        <div className="row">
          <div className="col-7">
            <h6 style={{ marginBottom: '2rem' }}>
              Media : <span>Liquid Nitrogen</span>
            </h6>
            <h6 style={{ marginBottom: '2rem' }}>
              Tank Capacity : <span>9000 kgs</span>
            </h6>
            <h6 style={{ marginBottom: '2rem' }}>
              Tank Level : <span>{(mqttData * 710).toFixed(2)} kgs</span>
            </h6>
          </div>
          <div className="col-5">
            <div className="border border-dark p-3 rounded-pill mb-3" style={{ height: '260px', width: '140px', background: `linear-gradient(to top, #3498db, #639BEC ${waterLevel}%, transparent ${waterLevel}%)` }}>
            <p className='text-center' style={{marginTop : "100px" }}>{(mqttData * 710).toFixed(2)} kgs</p>
            </div>
            <p className='text-center'>Liquid N2</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
