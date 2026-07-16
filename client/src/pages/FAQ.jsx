import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './faq.css';
import './blogs-events.css';

const FAQ_ITEMS = [
  {
    id: 'One',
    question: 'What services does MyIndiaService offer?',
    answer:
      'MyIndiaService specializes in website design and development, including custom website creation, e-commerce solutions, CMS integration, mobile responsiveness, and ongoing website maintenance and support.',
  },
  {
    id: 'Two',
    question: 'What types of websites do you develop?',
    answer:
      'We develop a wide range of websites, including personal blogs, corporate websites, e-commerce stores, portfolios, and custom web applications tailored to specific business needs.',
  },
  {
    id: 'Three',
    question: 'How do I get started with a new website project?',
    answer:
      "To start, you can contact us through our website or call our customer service. We'll schedule a consultation to discuss your project requirements, goals, and budget.",
  },
  {
    id: 'Four',
    question: 'How long does it take to develop a website?',
    answer:
      'The timeline depends on the complexity and size of the project. A basic website might take 4-6 weeks, while more complex sites, such as e-commerce or custom applications, can take several months.',
  },
  {
    id: 'Five',
    question: "Can I update my website after it's been launched?",
    answer:
      'Yes, all our websites come with an easy-to-use CMS (Content Management System) that allows you to make updates. We also offer ongoing support if you prefer us to handle the updates.',
  },
  {
    id: 'Six',
    question: 'How much does a new website cost?',
    answer:
      "The cost varies depending on the project's complexity, features, and design requirements. We provide custom quotes after an initial consultation to understand your needs better.",
  },
  {
    id: 'Seven',
    question: 'Do you offer payment plans?',
    answer:
      "Yes, we offer flexible payment plans to make our services accessible. Typically, we require a deposit upfront, with the remaining balance spread over the project's duration or upon completion.",
  },
  {
    id: 'Eight',
    question: 'Are there any additional costs associated with website development?',
    answer:
      'Additional costs can include domain registration, hosting fees, premium plugins or themes, and ongoing maintenance. We will provide a detailed breakdown of all potential costs upfront.',
  },
  {
    id: 'Nine',
    question: 'What platforms and technologies do you use?',
    answer:
      'We use various platforms and technologies, including HTML5, CSS3, JavaScript, PHP, PHP Laravel, WordPress, NodeJS, and others, depending on the project requirements.',
  },
  {
    id: 'Ten',
    question: 'How can I contact MyIndiaService?',
    answer: (
      <>
        You can contact us via our website&apos;s{' '}
        <Link to="/contact">contact form</Link>
        , email us at myindiaservice1@gmail.com, or call us at +91-9990708450.
      </>
    ),
  },
];

function FAQ() {
  return (
    <div className="blogs-events-page faq-page">
      <Navbar />
      <div className="be-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Your questions answered by My India Service</p>
      </div>

      <section className="be-section">
        <div className="container">
          <div className="faq-accordion accordion" id="faqAccordion">
            {FAQ_ITEMS.map((item, index) => (
              <div className="accordion-item faq-item" key={item.id}>
                <h2 className="accordion-header" id={`heading${item.id}`}>
                  <button
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`collapse${item.id}`}
                  >
                    <span className="faq-q-num">{String(index + 1).padStart(2, '0')}</span>
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${item.id}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading${item.id}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FAQ;
