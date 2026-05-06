const container = document.getElementById("details-container");

const params = new URLSearchParams(window.location.search);
const make = params.get("make");
const model = params.get("model");

console.log(make, model);

async function getDetails() {
    try {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeModel/${encodeURIComponent(make)}/${encodeURIComponent(model)}?format=json`);
        console.log(response.data);
        const details = response.data.Results;
        displayDetails(details);
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading details</p>";
  }
}

function displayDetails() {
  container.innerHTML = `
    <div class="card">
      <h2>🚗 ${make} ${model}</h2>
      <p><strong>Brand:</strong> ${make}</p>
      <p><strong>Model:</strong> ${model}</p>
      <p><strong>Type:</strong> Passenger Vehicle</p>
    </div>
  `;
}

function goBack() {
    window.history.back();
}

displayDetails();

