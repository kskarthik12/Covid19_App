// Function to fetch data from the API based on entered state name
function fetchDataByState(state) {
    return new Promise((resolve, reject) => {
      fetch('https://data.covid19india.org/v4/min/data.min.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve({ state, stats: data[state] })) // Include state name in the resolved object
        .catch(error => reject(error));
    });
  }
  
  // Function to display stats on the webpage
  function displayStats(data) {
    const statsContainer = document.getElementById('stats-container');
  
    // Customize the HTML structure based on the data structure
    statsContainer.innerHTML = `
      <h1>COVID-19 Stats - ${data.stats.meta.date}</h1>
      <p>State: ${data.state}</p>
      <ul>
        <li>Total Cases: ${data.stats.total.confirmed}</li>
        <li>Total Recovered: ${data.stats.total.recovered}</li>
        <li>Total Deaths: ${data.stats.total.deceased}</li>
        <li>Delta Tested (last 24 hours): ${data.stats.delta.tested}</li>
        <li>Delta Vaccinated 1 (last 24 hours): ${data.stats.delta.vaccinated1}</li>
        <li>Delta Vaccinated 2 (last 24 hours): ${data.stats.delta.vaccinated2}</li>
        
      </ul>
      <img src="https://play-lh.googleusercontent.com/S1yAI7MW3yaowp7mknUujGf2GfRkqSmNWu2crVda_Y3DKppAeq94_5-muv34BNKrjvU=w600-h300-pc0xffffff-pd" alt="Placeholder Image">
    `;
  }
  
  // Function to fetch default data and display stats when the page loads
  function fetchDefaultStats() {
    fetchDataByState('AN') // Default state, you can change it if needed
      .then(data => displayStats(data))
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Fetch and display default stats when the page loads
  document.addEventListener('DOMContentLoaded', fetchDefaultStats);
  
  // Function to fetch data and display stats when the button is clicked
  function fetchAndDisplayStats() {
    const stateInput = document.getElementById('state-input');
    const enteredState = stateInput.value.toUpperCase(); // Convert to uppercase for consistency
  
    fetchDataByState(enteredState)
      .then(data => displayStats(data))
      .catch(error => console.error('Error fetching data:', error));
  }
  