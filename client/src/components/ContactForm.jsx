import { useState } from 'react';

const COUNTRIES = [
  'All Countries',
  'India',
  'Afghanistan',
  'Sri Lanka',
  'China',
  'USA',
  'Nepal',
  'South Africa',
  'Pakistan',
  'U.A.E.',
  'Canada',
  'Sweden',
  'Australia',
];

const COUNTRY_VALUES = {
  'All Countries': 'All',
  'U.A.E.': 'UAE',
};

const FORM_CONFIG = {
  contact: {
    title: 'Get in Touch',
    subtitle: "Tell us about your project and we'll reach out shortly.",
    messagePlaceholder: 'Tell us about your development needs.',
  },
  'book-call': {
    title: 'Book a Call',
    subtitle: 'Schedule a free consultation with our team.',
    messagePlaceholder: 'Preferred date/time or any notes for the call.',
  },
  'project-inquiry': {
    title: "Let's Discuss Your Project",
    subtitle: 'Share your project requirements and we will prepare a tailored proposal.',
    messagePlaceholder: 'Describe your project goals, timeline, and budget (if any).',
  },
};

function ContactForm({
  formType = 'contact',
  phoneRequired = true,
  showHeader = true,
  title,
  subtitle,
  messagePlaceholder,
}) {
  const config = FORM_CONFIG[formType] || FORM_CONFIG.contact;

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: 'All',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const label = e.target.value;
    setForm((prev) => ({
      ...prev,
      country: COUNTRY_VALUES[label] || label,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formType }),
      });
      const data = await res.json();
      alert(data.message || (data.success ? 'Thanks we will reach shortly...' : 'Try again! going something wrong...'));

      if (data.success) {
        setForm({ name: '', email: '', country: 'All', phone: '', message: '' });
      }
    } catch {
      alert('Try again! going something wrong...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      {showHeader && (
        <>
          <h3>{title || config.title}</h3>
          <p className="form-subtitle">{subtitle || config.subtitle}</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            required
            className="form-control custom-input mb-3"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Business Email*"
            required
            className="form-control custom-input mb-3"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <select
            name="country"
            className="form-control custom-input mb-3"
            required
            value={form.country === 'All' ? 'All Countries' : form.country === 'UAE' ? 'U.A.E.' : form.country}
            onChange={handleCountryChange}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="tel"
            maxLength="10"
            name="phone"
            placeholder="Phone*"
            className="form-control custom-input mb-3"
            required={phoneRequired}
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            rows="4"
            name="message"
            placeholder={messagePlaceholder || config.messagePlaceholder}
            className="form-control custom-input mb-3"
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-mis" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
          <i className="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
