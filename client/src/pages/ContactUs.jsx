import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './contact.css';
import './blogs-events.css';

function ContactUs() {
  return (
    <div className="blogs-events-page contact-page">
      <Navbar />
      <div className="be-hero">
        <h1>Contact Us</h1>
        <p>You may contact us using the information below</p>
      </div>

      <section className="be-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
              <div className="contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div>
                    <h4>Merchant Legal Entity Name</h4>
                    <p>NB Corporate &amp; Services</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Our Office</h4>
                    <p>
                      HN.69 Sewak Park, Dwarka More,
                      <br />
                      Delhi, PIN: 110059
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:+919990014966">+91 9990014966</a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:myindiaservice1@gmail.com">myindiaservice1@gmail.com</a>
                      <br />
                      <a href="mailto:contact@myindiaservice.com">contact@myindiaservice.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-map-card">
                <iframe
                  title="My India Service Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.351148887676!2d77.03109987528858!3d28.619236075671996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05e9e9fb961f%3A0xf54d197cb3b1ef41!2sMy%20India%20Service!5e0!3m2!1sen!2sin!4v1719295522192!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
