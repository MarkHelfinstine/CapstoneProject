import html from "html-literal";
import PELogo from "/assets/img/ProjectEchelonLogoWhite.png";

export default () => html`
  <section id="jumbotron">
    <div id="homeContent">
      <img src="${PELogo} alt="PE Logo" height="150" width="180"/>
      <h1>
        Join the challenge! Raise awareness and funds for Veteran Suicide
      </h1>
      <div id="ctaButton"><a href="./Signup">Signup Here</a></div>
    </div>
  </section>
`;
