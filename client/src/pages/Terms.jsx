import Footer from '../components/Footer';
import HomeButton from '../components/HomeButton';
import './terms.css';
import './pageStyles.css';

function Terms() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="terms-page">
      <HomeButton />
      <header className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Effective Date: {effectiveDate}</p>
      </header>

      <section className="terms-section">
        <div className="pb-5 px-5">
          <hr className="line" />
        </div>
        <div className="container">
          <div className="terms-content">
            <h2>1. Introduction</h2>
            <p>
              Welcome to MyIndiaService! These terms and conditions outline the rules and regulations for the use of our
              website and services. By accessing or using our website, you agree to comply with and be bound by these
              terms. If you do not agree with these terms, please do not use our services.
            </p>

            <h2>2. Definitions</h2>
            <p>In these terms and conditions:</p>
            <ul>
              <li>
                <strong>&quot;Company&quot;</strong> refers to MyIndiaService.
              </li>
              <li>
                <strong>&quot;User&quot;</strong> refers to any individual or entity accessing or using our services.
              </li>
              <li>
                <strong>&quot;Services&quot;</strong> refer to all products and services offered by MyIndiaService,
                including website design, development, and maintenance.
              </li>
            </ul>

            <h2>3. Use of Services</h2>
            <p>
              Users agree to use our services in compliance with all applicable laws and regulations. The company
              reserves the right to refuse service to anyone at any time for any reason. Users must not:
            </p>
            <ul>
              <li>Use our services for any illegal or unauthorized purpose.</li>
              <li>Disrupt or interfere with the security or functionality of our services.</li>
              <li>Copy, modify, or distribute any part of our services without our explicit consent.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content, trademarks, and data on our website and provided through our services are the property of
              MyIndiaService or its licensors. Users are granted a limited, non-exclusive, non-transferable license to
              access and use the content for personal or business purposes, subject to these terms.
            </p>

            <h2>5. Payments and Refunds</h2>
            <p>
              All payments for services provided by MyIndiaService must be made in accordance with the agreed payment
              terms. Our payment policies include:
            </p>
            <ul>
              <li>Payment terms will be specified in the service agreement or invoice provided.</li>
              <li>Refunds are provided only under specific circumstances as outlined in our refund policy.</li>
              <li>In case of non-payment, MyIndiaService reserves the right to suspend or terminate the services.</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>
              MyIndiaService is not liable for any direct, indirect, incidental, or consequential damages arising out of
              or in connection with the use of our services. We make no warranties or representations about the accuracy
              or completeness of our services. Users agree to use our services at their own risk.
            </p>

            <h2>7. Indemnification</h2>
            <p>
              Users agree to indemnify and hold harmless MyIndiaService and its affiliates, employees, and agents from
              any claims, damages, or expenses arising out of their use of our services or violation of these terms.
            </p>

            <h2>8. Changes to Terms and Conditions</h2>
            <p>
              MyIndiaService reserves the right to update or modify these terms and conditions at any time. We will
              notify users of any significant changes by posting the updated terms on our website. Continued use of our
              services after any changes constitutes acceptance of the new terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India. Any
              disputes arising from these terms or the use of our services will be subject to the exclusive
              jurisdiction of the courts of India.
            </p>

            <h2>10. Contact Information</h2>
            <p>If you have any questions or concerns about these terms and conditions, please contact us at:</p>
            <p>
              Email: <a href="mailto:myindiaservice1@gmail.com">myindiaservice1@gmail.com</a>
            </p>
            <p>Phone: +91-9990014966</p>
            <p>Address: Dwarka more, Sewak Park, New Delhi, India</p>
          </div>
        </div>
        <div className="px-5 pt-5">
          <hr className="line" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Terms;
