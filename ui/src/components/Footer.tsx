import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer">
        <p>&#169; 2025 Kay Rubio</p>
        <p>
          <Link className="footerlink center" to="/terms">Terms of Service</Link>
          <span aria-hidden='true'>&#8226;</span>
          <a className="center" href="https://www.linkedin.com/in/kay-sweeney-rubio-731abb114/">Contact</a>
          <span aria-hidden='true'>&#8226;</span>
          <a className="center" href="https://kaysrubio.github.io/digital-portfolio/">Digital Portfolio</a>
        </p>
    </footer>
  )
}
export default Footer