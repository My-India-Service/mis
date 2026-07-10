import Footer from '../components/Footer';
import HomeButton from '../components/HomeButton';
import './contact.css';
import './pageStyles.css';

function ContactUs() {
  return (
    <div className="contact-page">
      <HomeButton />
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>You may contact us using the information below</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="contact-info">
              <h4>
                <i className="fas fa-building"></i> Merchant Legal Entity Name
              </h4>
              <p>NB Corporate &amp; Services</p>
              <h4>
                <i className="fas fa-map-marker-alt"></i> Our Office
              </h4>
              <p>
                HN.69 Sewak Park, Dwarka More,
                <br />
                Delhi, PIN: 110059
              </p>
              <h4>
                <i className="fas fa-phone-alt"></i> Phone
              </h4>
              <p>+91 9990014966</p>
              <h4>
                <i className="fas fa-envelope"></i> Email
              </h4>
              <p>
                <a href="mailto:myindiaservice1@gmail.com">
                  myindiaservice1@gmail.com
                  <br /> contact@myindiaservice.com
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="map-container">
              <iframe
                title="My India Service Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.351148887676!2d77.03109987528858!3d28.619236075671996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05e9e9fb961f%3A0xf54d197cb3b1ef41!2sMy%20India%20Service!5e0!3m2!1sen!2sin!4v1719295522192!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <hr className="line mx-5" />
      <Footer />
    </div>
  );
}

export default ContactUs;
