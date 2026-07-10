import Footer from '../components/Footer';
import HomeButton from '../components/HomeButton';
import './privacy.css';
import './pageStyles.css';

function Privacy() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="privacy-page">
      <HomeButton />
      <div className="container content" style={{ marginBottom: '50px', marginTop: '50px' }}>
        <h1 className="text-center">Privacy Policy</h1>
        <p className="text-center">Effective Date: {effectiveDate}</p>

        <p>
          Welcome to My India Service. We value your privacy and are committed to protecting your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Identification Information:</strong> Name, email address, phone number, etc.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our website, such as pages visited and time spent
            on each page.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> Cookies and similar technologies to track activity on
            our website.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and maintain our service.</li>
          <li>Communicate with you, including for customer service and support.</li>
          <li>Analyze usage and improve our services.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Companies that provide services to us to help with our business
            activities.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law or in response to legal processes.
          </li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>
          We take reasonable measures to protect your information from unauthorized access, disclosure, or alteration.
        </p>

        <h2>5. Your Data Protection Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. If you wish to exercise any of
          these rights, please contact us.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page.
        </p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          Email:{' '}
          <a href="mailto:support@myindiaservice.com" style={{ color: '#f1c40f' }}>
            support@myindiaservice.com
          </a>
        </p>
        <p>Dwarka more, Sewak Park, New Delhi, India</p>
      </div>
      <div className="px-5 pb-3">
        <hr className="line" />
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;
