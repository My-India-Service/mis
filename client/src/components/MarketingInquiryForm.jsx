import { useState } from 'react';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  servicesInterest: '',
  marketingGoals: '',
  budget: '',
  comments: '',
};

const FORM_CONFIG = {
  'book-call': {
    title: 'Book a Call',
    subtitle: 'Schedule a free consultation with our digital marketing team.',
  },
  'project-inquiry': {
    title: "Let's Discuss Your Project",
    subtitle: 'Share your marketing goals and we will prepare a tailored proposal.',
  },
};

function MarketingInquiryForm({ formType = 'book-call', showHeader = true }) {
  const config = FORM_CONFIG[formType] || FORM_CONFIG['book-call'];
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        setForm(EMPTY_FORM);
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
          <h3>{config.title}</h3>
          <p className="form-subtitle">{config.subtitle}</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
            className="form-control custom-input mb-3"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="form-control custom-input mb-3"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
            required
            className="form-control custom-input mb-3"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Company/Organization Name (if applicable)</label>
          <input
            type="text"
            name="company"
            placeholder="Company or organization name"
            className="form-control custom-input mb-3"
            value={form.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Digital Marketing Services of Interest</label>
          <textarea
            rows="3"
            name="servicesInterest"
            placeholder="e.g. SEO, Social Media, PPC, Content Marketing, Web Development..."
            className="form-control custom-input mb-3"
            value={form.servicesInterest}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Current Marketing Challenges/Goals</label>
          <textarea
            rows="3"
            name="marketingGoals"
            placeholder="Describe your current challenges and what you want to achieve"
            className="form-control custom-input mb-3"
            value={form.marketingGoals}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Budget</label>
          <input
            type="text"
            name="budget"
            placeholder="e.g. ₹50,000 - ₹1,00,000 per month"
            className="form-control custom-input mb-3"
            value={form.budget}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Additional Comments/Questions</label>
          <textarea
            rows="3"
            name="comments"
            placeholder="Any other details you'd like to share"
            className="form-control custom-input mb-3"
            value={form.comments}
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

export default MarketingInquiryForm;
