import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo_my_india_2.png" alt="My India Service" />
            <p>
              My India Service is your trusted partner for success in the fast-paced world of IT and business. We deliver
              high-quality, cost-effective services that empower your business to achieve its goals.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/myindiaservice" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/nb-corporate-services/?viewAsMember=true"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:myindiaservice1@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/events">Events</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
            <a href="https://myindiaservice.com/">myindiaservice.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} My India Service. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
