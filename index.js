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

  if (state.view === "Leaderboard") {
    function sortTableByColumn(table, column, asc = true) {
      const dirModifier = asc ? 1 : -1;
      const tBody = table.tBodies[0];
      const rows = Array.from(tBody.querySelectorAll("tr"));
      const sortedRows = rows.sort((a, b) => {
        const aColText = a
          .querySelector(`td:nth-child(${column + 1})`)
          .textContent.trim();
        const bColText = b
          .querySelector(`td:nth-child(${column + 1})`)
          .textContent.trim();
        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
      });
      while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }
      tBody.append(...sortedRows);
      table
        .querySelectorAll("th")
        .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
      table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-asc", asc);
      table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-desc", !asc);
    }
    document.querySelectorAll(".table-sortable th").forEach(headerCell => {
      headerCell.addEventListener("click", () => {
        const tableElement =
          headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(
          headerCell.parentElement.children,
          headerCell
        );
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
      });
    });
  }
}

async function reAuthorize() {
  // fetch(auth_link, {
  //   method: "post",
  //   headers: {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     client_id: "100771",
  //     client_secret: "15e43463c1eda2defeccded69417ef9f88108f70",
  //     refresh_token: "cea392a2b76e43b8438f116091d8f361335ec8dd",
  //     grant_type: "refresh_token"
  //   })
  // })
  //   .then(res => res.json())
  //   .then(res => getActivities(res));
}

router.hooks({
  before: async (done, params) => {
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
          .post(
            "https://www.strava.com/oauth/token",
            {
              client_id: `${process.env.CLIENT_ID}`,
              client_secret: `${process.env.CLIENT_SECRET}`,
              refresh_token: `${process.env.REFRESH_TOKEN}`,
              grant_type: "refresh_token"
            },
            {
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            console.log(res.data);
            //store.Leaderboard.auth = res.data;
            axios
              .get(`https://www.strava.com/api/v3/clubs/245478/activities`, {
                headers: {
                  Authorization: `${res.data.token_type} ${res.data.access_token}`
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
