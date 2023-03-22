import html from "html-literal";

export default state => html`
  <div class="signup-row">
    <form id="signups" class="signup-column-form" method="POST" action="">
      <h2>Signup</h2>
      <p>Please fill in this form to create an account</p>
      <hr />
      <label for="name" class="formLabels">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter First and Last Name"
        required
      />
      <label for="gender" class="formLabels">Gender:</label>
      <input
        type="text"
        name="gender"
        id="gender"
        placeholder="Enter Gender"
        required
      />
      <label for="strava" class="formLabels">Strava URL:</label>
      <input
        type="text"
        name="strava"
        id="strava"
        placeholder="Enter Strava Profile URL"
        required
      />
      <label for="age" class="formLabels">Age:</label>
      <input type="text" name="age" id="age" placeholder="Age" required />
      <input type="submit" name="submit" value="Submit" />
    </form>
  </div>
  <div class="signup-table-row">
    <div class="signup-table">
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
    </div>
  </div>
`;
