const container = document.getElementById("makes-container");

async function getMakes() {
  try {
    const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");

    console.log(response.data);

    const makes = response.data.Results;

    displayMakes(makes);

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Error loading data</p>";
  }
}

function displayMakes(makes) {
    container.innerHTML = "";

    makes.slice(0, 48).forEach(make => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <h3>${make.MakeName}</h3>
        <button onclick="goToModels('${make.MakeName}')">
            View Models
        </button>
    `;

        container.appendChild(card);
  });
}

function goToModels(make) {
    window.location.href = `models.html?make=${encodeURIComponent(make)}`;
}

getMakes();