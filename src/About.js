import React from "react";
import { FaGithub, FaLinkedin} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
const About = () => {
  return (
    <main className="About">
      <h3 style={{ marginTop: "1rem" }}>
        Hi...i am mugil,
      </h3>
      <h3 style={{ marginTop: "1rem" }}>
        I created this react app to show'up my React.js skills
      </h3><br />
      <p>Reach out!</p>
      <div>
        <a href="https://github.com/Mugil1410" target="_blank" rel="noopener noreferrer">
        <FaGithub className="social-icons FaGithub"  size={50}  />
        </a>
        <a href="https://www.linkedin.com/in/mugilaananthan" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="social-icons FaLinkedin " size={50}/>
        </a>
        <a href="https://mugil.netlify.app/" target="_blank" rel="noopener noreferrer">
        <TbWorldWww className="social-icons FaGlobe"  size={50}  />
        </a>
      </div>
    </main>
  );
};

export default About;
