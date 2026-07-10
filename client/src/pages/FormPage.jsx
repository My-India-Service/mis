import { Link } from 'react-router-dom';
import MarketingInquiryForm from '../components/MarketingInquiryForm';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './form-page.css';

function FormPage({ formType, heroTitle, heroSubtitle }) {
  return (
    <div className="form-page">
      <Navbar />
      <section className="form-page-hero">
        <div className="container text-center">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
        </div>
      </section>
      <section className="form-page-body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <MarketingInquiryForm formType={formType} />
              <p className="text-center mt-4">
                <Link to="/" className="form-back-link">
                  <i className="fas fa-arrow-left me-2"></i> Back to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export function BookCall() {
  return (
    <FormPage
      formType="book-call"
      heroTitle="Book a Free Call"
      heroSubtitle="Talk to our digital marketing experts about your business goals."
    />
  );
}

export function ProjectInquiry() {
  return (
    <FormPage
      formType="project-inquiry"
      heroTitle="Discuss Your Project"
      heroSubtitle="Tell us about your marketing needs and we'll prepare a tailored plan."
    />
  );
}

export default FormPage;
