import html from "html-literal";

export default state => html`
  <form id="signup" method="POST" action="">
    <h2>Signup</h2>
    <div>
      <label for="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="FirstName LastName"
        required
      />
    </div>
    <div>
      <label for="gender">Gender:</label>
      <input
        type="text"
        name="gender"
        id="gender"
        placeholder="Enter Gender"
        required
      />
    </div>
    <div>
      <label for="strava">Strava URL:</label>
      <input
        type="text"
        name="strava"
        id="strava"
        placeholder="Enter Strava Profile URL"
        required
      />
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="text" name="age" id="age" placeholder="Age" required />
    </div>
    <input type="submit" name="submit" value="Submit" />
  </form>
  <table id="signup">
    <tr>
      <th>Name</th>
      <th>Gender</th>
      <th>Strava</th>
      <th>Age</th>
    </tr>
    ${state.signup
      .map(signup => {
        return `<tr><td>${signup.name}</td><td>${signup.gender}</td><td>${signup.strava}</td><td>${signup.age}</td></tr>`;
      })
      .join("")}
  </table>
`;
