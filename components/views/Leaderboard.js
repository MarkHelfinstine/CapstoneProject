import html from "html-literal";

export default state => html`
  <section id="leaderboard">
    <div class="center info">
      <h4>Information!</h4>
      <p>This will be a table that pulls data from Strava via API.</p>
      <p>
        Activities from members in the club will be shown. This is an elevation
        gained challenge so elevation will be the primary metric for the
        display.
      </p>
    </div>
    <table id="stravaBoard">
      <tr>
        <th>Name</th>
        <th>Distance</th>
        <th>Elevation Gained</th>
        <th>Elevation Total</th>
      </tr>
      ${state.leaderboard
        .map(leaderboard => {
          return `<tr><td>${leaderboard.athlete.firstname} ${leaderboard.athlete.lastname}</td><td>${leaderboard.distance}</td><td>${leaderboard.total_elevation_gain}</td><td>${leaderboard.totalElevation}</td></tr>`;
        })
        .join("")}
    </table>
  </section>
`;
