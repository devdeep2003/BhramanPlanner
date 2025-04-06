import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css"; // Import the separate CSS file

function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
     <a href="https://github.com/devdeep2003/BhramanPlanner">  <FaGithub className="github-icon" /></a> 
      </a>
      <p className="project-name">भ्रमनPlanner</p>
      <p className="project-name">©️</p>
      <p className="year">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
