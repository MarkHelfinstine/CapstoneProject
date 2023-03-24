import html from "html-literal";

export default state => html`
  <section id="leaderboard">
    <div class="leaderboard-row">
      <div class="leaderboard-info">
        <h4>Information!</h4>
        <p>This will be a table that pulls data from Strava via API.</p>
        <p>
          Activities from members in the club will be shown. This is an
          elevation gained challenge so elevation will be the primary metric for
          the display.
        </p>
      </div>
    </div>
    <table id="stravaBoard">
      <tr>
        <th>Name</th>
        <th>Distance</th>
        <th>Elevation Gained</th>
      </tr>

      ${state.leaderboard
        .map(leaderboard => {
          return `<tr><td>${leaderboard.athlete.firstname} ${
            leaderboard.athlete.lastname
          }</td><td>${(leaderboard.distance * 0.000621371192).toFixed(2) +
            " mi"}</td><td>${(
            leaderboard.total_elevation_gain * 3.2808
          ).toFixed(2) + " ft"}</td></tr>`;
        })
        .join("")}
    </table>
  </section>
`;
