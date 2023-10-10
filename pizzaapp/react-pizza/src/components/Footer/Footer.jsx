import { Clock } from "./Clock";
import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        All Rights Reservered 2023 <span>&#169;</span>
      </div>
      <div className="clock-container">
        <Clock />
      </div>
    </footer>
  );
};
