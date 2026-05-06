const container = document.getElementById("models-container");

const params = new URLSearchParams(window.location.search);
let make = params.get("make");

console.log("Marca seleccionada:", make);

if (!make) {
  container.innerHTML = "<p>No brand selected</p>";
  throw new Error("No make provided");
}


async function getModels() {
    try {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`);

        console.log(response.data);

        const models = response.data.Results;

        displayModels(models);

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading models</p>";
    }
}

function displayModels(models) {
    container.innerHTML = "";
    const limitedModels = models.slice(0, 48);

    limitedModels.forEach(model => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <div class="card-content">
            <h3>${model.Model_Name}</h3>
            <p class="year">Vehicle Model</p>
            <button class="details-btn">View Details</button>
        </div>
        `;

        const button = card.querySelector(".details-btn");
        button.addEventListener("click", () => {
            console.log("Click en:", model.Model_Name);
            goToDetails(model.Make_Name, model.Model_Name);
        });

        container.appendChild(card);

    });
}

function goBack() {
  window.location.href = "index.html";
}

function goToDetails(make, model) {
    window.location.href =
    `details.html?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;
}


document.getElementById("title").innerText = `Models of ${make}`;
getModels();
