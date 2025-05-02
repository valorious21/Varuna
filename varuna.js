let temperature = 26;
let humidity = 60;
let lightOn = false;
let growthScore = 0;
let currentStage = "";

// Chart Data Arrays
const labels = [];
const tempData = [];
const humidityData = [];

let chart;

// Initialize the Chart
function initChart() {
  const ctx = document.getElementById("historyChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: tempData,
          borderColor: "#ff7043",
          backgroundColor: "rgba(255, 112, 67, 0.2)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Humidity (%)",
          data: humidityData,
          borderColor: "#42a5f5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Update the UI (sensors and growth stage)
function updateUI() {
  document.getElementById("temperature").innerText = temperature.toFixed(1);
  document.getElementById("humidity").innerText = humidity.toFixed(1);
  document.getElementById("light").innerText = lightOn ? "ON" : "OFF";

  let stage = "Seed";
  let icon = "🌱";

  if (growthScore > 20) {
    stage = "Sprout";
    icon = "🌿";
  }
  if (growthScore > 40) {
    stage = "Microgreen";
    icon = "🥬";
  }
  if (growthScore > 60) {
    stage = "Ready to Harvest";
    icon = "🧺";
  }

  if (stage !== currentStage) {
    currentStage = stage;
    const growthStageElem = document.getElementById("growthStage");
    const iconElem = document.getElementById("growthIcon");

    growthStageElem.innerText = stage;
    iconElem.innerText = icon;

    iconElem.classList.remove("growth-icon");
    void iconElem.offsetWidth; // Force reflow to restart animation
    iconElem.classList.add("growth-icon");
  }
}

// Update the historical data chart
function updateChart() {
  const now = new Date().toLocaleTimeString();
  labels.push(now);
  tempData.push(temperature.toFixed(1));
  humidityData.push(humidity.toFixed(1));

  if (labels.length > 20) {
    labels.shift();
    tempData.shift();
    humidityData.shift();
  }

  chart.update();
}

// Simulate environmental data
function simulateEnvironment() {
  temperature += Math.random() * 0.6 - 0.3;
  humidity += Math.random() * 1.5 - 0.75;

  if (humidity >= 55 && humidity <= 75 && temperature >= 24 && temperature <= 28) {
    growthScore += 1;
  }

  updateUI();
  updateChart();
}

// Manual Controls
function togglePump() {
  alert("Water pump toggled.");
}

function toggleFan() {
  alert("Fan toggled.");
}

function toggleLight() {
  lightOn = !lightOn;
  updateUI();
}

// Toggle Chart visibility
function toggleChart() {
  const chartContainer = document.querySelector(".chart-container");
  const button = document.getElementById("toggleChartBtn");

  if (chartContainer.style.display === "none") {
    chartContainer.style.display = "block";
    button.innerText = "📉 Hide Historical Chart"; // Change text when showing chart
  } else {
    chartContainer.style.display = "none";
    button.innerText = "📊 Show Historical Chart"; // Change text when hiding chart
  }
}

// Initialize everything
window.onload = () => {
  updateUI();
  initChart();
  setInterval(simulateEnvironment, 1000);
};
