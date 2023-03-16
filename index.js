import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
  if (state.view === "Signup") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;
      console.log("Input Element LIst", inputList);

      const requestData = {
        name: inputList.name.value,
        gender: inputList.gender.value,
        strava: inputList.strava.value,
        age: inputList.age.value
      };
      console.log("request Body", requestData);

      axios
        .post(`${process.env.SIGNUP}/signups`, requestData)
        .then(response => {
          store.Signup.signup.push(response.data);
          router.navigate("/Signup");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; // Add a switch case statement to handle multiple routes
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        axios
          .get(
            // Replace the key provided here with your own key from openweathermap
            `https://api.openweathermap.org/data/2.5/weather?q=st%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then(response => {
            console.log(response.data);
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Save Data into state
            store.Home.weather = {};
            store.Home.weather.city = response.data.name;
            store.Home.weather.temp = kelvinToFahrenheit(
              response.data.main.temp
            );
            store.Home.weather.feelsLike = kelvinToFahrenheit(
              response.data.main.feels_like
            );
            store.Home.weather.description =
              response.data.weather[0].description;
            console.log(store.Home.weather);

            done();
          });
        break;
      // New Case for Pizza View
      case "Leaderboard":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`https://www.strava.com/api/v3/clubs/245478/activities`, {
            headers: {
              Authorization: "Bearer 08974425558782dc2e712ff7797642f6f3b9320b"
            }
          })
          .then(response => {
            // Storing retrieved data in state
            //store.Pizza.pizzas = response.data;
            store.Leaderboard.leaderboard = response.data;
            //console.log(response.data);
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      case "Signup":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.SIGNUP}/signups`)
          .then(response => {
            // Storing retrieved data in state
            store.Signup.signup = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
