import axios from "axios";

const form = document.querySelector("form")!
const addressInput = <HTMLInputElement>document.getElementById("address")!;

const GOOGLE_API_KEY = "GOOGLE_API";

type googleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: "OK" | "ZERO_RESULTS";
}
const searchAddressHandler = (event: Event) => {
    event.preventDefault()
    const enteredAddress = addressInput.value;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}\n&key=${GOOGLE_API_KEY}`
    axios.get<googleGeocodingResponse>(url)
        .then(r => {
            if (r.data.status !== "OK") {
                throw new Error("Could not fetch location!")
            }
            const cordinates = r.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: cordinates,
                zoom: 16
            });
            new google.maps.Marker({
                position: cordinates,
                map: map,
            });

        })
        .catch(err => {
            alert(err.message);
        })
}

form.addEventListener("submit", searchAddressHandler);