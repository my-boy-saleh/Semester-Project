let usernameArray = [];
let passwordArray = [];

let loginBox = document.getElementById("login");
let regBox = document.getElementById("register");

let loginTab = document.getElementById("lt");
let regTab = document.getElementById("rt");

function regTabFun() {
    event.preventDefault();

    regBox.style.visibility = "visible";
    loginBox.style.visibility = "hidden";

    regTab.style.backgroundColor = "rgb(12, 132, 189)";
    loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function loginTabFun() {
    event.preventDefault();

    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";

    loginTab.style.backgroundColor = "rgb(12, 132, 189)";
    regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function register() {
    event.preventDefault();

    let username = document.getElementById("re").value;
    let password = document.getElementById("rp").value;
    let passwordRetype = document.getElementById("rrp").value;

    if (username === "") {
        alert("Username required.");
        return;
    } else if (password === "") {
        alert("Password required.");
        return;
    } else if (passwordRetype === "") {
        alert("Password required.");
        return;
    } else if (password !== passwordRetype) {
        alert("Passwords don't match. Please re-enter your password.");
        return;
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    } else if (usernameArray.indexOf(username) === -1) {
        usernameArray.push(username);
        passwordArray.push(password);

        alert(username + " - Thanks for registration. \nTry to login now.");

        document.getElementById("re").value = "";
        document.getElementById("rp").value = "";
        document.getElementById("rrp").value = "";
    } else {
        alert(username + " is already registered.");
        return;
    }
}

function login() {
    event.preventDefault();

    let username = document.getElementById("se").value;
    let password = document.getElementById("sp").value;

    let i = usernameArray.indexOf(username);

    if (usernameArray.indexOf(username) == -1) {
        if (username == "") {
            alert("Username required.");
            return;
        }
        alert("Username does not exist.");
        return;
    } else if (passwordArray[i] != password) {
        if (password == "") {
            alert("Password required.");
            return;
        }
        alert("Incorrect password. Please try again.");
        return;
    } else {
        alert(username + " - You are logged in now. \nWelcome to our website.");

        document.getElementById("se").value = "";
        document.getElementById("sp").value = "";

        // Direct user to main page
        window.location.href = "main.html";
        return;
    }
}

const placesByCountry = {
    france: ["Eiffel Tower", "Louvre Museum", "Versailles Palace"],
    italy: ["Colosseum", "Venice Canals", "Leaning Tower of Pisa"],
    // Add more countries and their places here
};

function populatePlaces() {
    const countrySelect = document.getElementById("country-select");
    const selectedCountry = countrySelect.value;
    const placesList = document.getElementById("places-list");

    if (selectedCountry && placesByCountry[selectedCountry]) {
        const places = placesByCountry[selectedCountry];
        let html = "<ul>";
        places.forEach((place) => {
            html += `<li>${place}</li>`;
        });
        html += "</ul>";
        placesList.innerHTML = html;
    } else {
        placesList.innerHTML = "Please select a country to see famous places.";
    }
}

function addPlace() {
    const selectedCountry = document.getElementById("country-select").value;
    const newPlace = prompt("Enter the name of the famous place:");

    if (newPlace) {
        if (placesByCountry[selectedCountry]) {
            placesByCountry[selectedCountry].push(newPlace);
        } else {
            placesByCountry[selectedCountry] = [newPlace];
        }
        populatePlaces(); // Update the list of places
    }
}
