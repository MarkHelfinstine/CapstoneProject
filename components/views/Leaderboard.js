import html from "html-literal";

export default () => html`
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
    <table>
      <tr>
        <th>Name</th>
        <th>Distance</th>
        <th>Elevation Gained</th>
        <th>Elevation Total</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>Distance</td>
        <td>Elevation Gained</td>
        <td>Elevation Total</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>Distance</td>
        <td>Elevation Gained</td>
        <td>Elevation Total</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>Distance</td>
        <td>Elevation Gained</td>
        <td>Elevation Total</td>
      </tr>
    </table>
  </section>
`;
