import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import BlogsSection from '../components/BlogsSection';
import EventsSection from '../components/EventsSection';
import SuccessStoriesCarousel from '../components/SuccessStoriesCarousel';

const BRANDS = [
  'flipkart-24F.png',
  'indigo-24F.png',
  'india-today-24.png',
  'boeing-brands-24.png',
  'zee5-24F.png',
  'dupont-24.png',
  'Max-life.png',
  'aegon-24F.png',
  'paytm-24.png',
  'KPMG.png',
  'Cipla.png',
];

const EXPERTISE = [
  {
    icon: 'fa-code',
    title: 'Custom Software Development',
    text: 'We can assist you in developing intelligent digital applications that enhance end-user experiences while increasing operational efficiency.',
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Mobile App Development',
    text: 'Partner with us to develop Mobile Apps that prioritize straightforward user onboarding, minimalist design, and self-guided workflows.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Full-Stack Software Development',
    text: 'Utilizing our extensive expertise in JavaScript frameworks, PHP, Node, Angular, Python, and more, we build flexible and scalable solutions.',
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud-Native Development',
    text: 'Partner with us to harness the scale, elasticity, resiliency, and flexibility Cloud-native applications offer.',
  },
];

function Home() {
  useEffect(() => {
    const marqueeContainer = document.querySelector('.sc-dcJtft.hoxTPo');
    if (!marqueeContainer) return undefined;

    const marqueeItems = marqueeContainer.querySelectorAll('.sc-kAycRU.bAbiCP');
    if (!marqueeItems.length) return undefined;

    const scrollSpeed = 2;
    let scrollPosition = 0;
    let frameId;

    const scrollMarquee = () => {
      scrollPosition += scrollSpeed;
      marqueeContainer.scrollLeft = scrollPosition;
      if (scrollPosition >= marqueeContainer.offsetWidth) {
        scrollPosition = 0;
      }
      frameId = requestAnimationFrame(scrollMarquee);
    };

    frameId = requestAnimationFrame(scrollMarquee);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <Navbar />
      <section id="home">
        <div className="container-fluid px-0 top-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-8">
                <span className="hero-badge">
                  <i className="fas fa-circle"></i> Trusted IT Partner Since 2016
                </span>
                <h1 className="mb-4 head">Outsource Software Development</h1>
                <p className="fs-5">
                  Develop scalable, innovative, and user-centered digital applications tailored to your business needs.
                </p>
                <div className="hero-actions">
                  <Link to="/book-call" className="btn-hero-primary">
                    Book a Call <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link to="/contact" className="btn-hero-outline">
                    Contact Us <i className="fa-solid fa-envelope"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="below-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-body">
                <div className="body-content">
                  <div className="content py-5 mt-5 lh-lg">
                    <div className="section-title">
                      <h1 className="head1">
                        Enabling enterprise software, modernizing legacy systems,
                        <br /> and consolidating app
                        <br /> portfolios.
                      </h1>
                    </div>
                    <div className="description">
                      <p>
                        Our Custom Software Development services enable a robust digital transformation for your business.
                        We design and develop tailored-fit solutions to deliver maximal outcomes within your existing
                        technology ecosystem.
                      </p>
                      <p>
                        Whether you&apos;re rethinking your customer interactions or optimizing operational efficiency, our
                        solutions deliver tangible benefits that your business needs to grow.
                      </p>
                      <p>
                        Our unique methodology includes a perfect blend of leveraging new technologies and adopting
                        industry-leading best practices, with an aim to provide the BEST in class, always.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div className="form-content py-5 mt-5">
                <ContactForm formType="contact" showHeader />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client-brand">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Our Clients</span>
            <h2 className="section-heading">Trusted by businesses worldwide</h2>
          </div>
          <div className="row justify-content-center g-3">
            {BRANDS.map((brand) => (
              <div key={brand} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="brand-card">
                  <img src={`/images/${brand}`} alt={brand} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="property-experties">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="expertise-sidebar">
                <span className="section-label">What We Do</span>
                <h2 className="section-heading">Explore our Custom Development expertise</h2>
                <Link to="/project-inquiry">
                  <button className="btn btn-discuss mt-3" type="button">
                    Let&apos;s Discuss Your Project
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              {EXPERTISE.map((item) => (
                <div className="expertise-card" key={item.title}>
                  <h3>
                    <i className={`fas ${item.icon}`}></i> {item.title}
                  </h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SuccessStoriesCarousel />

      <section className="ppc2-cta-banner bg-white">
        <div className="container">
          <div className="bg-irys pt-lg-4">
            <div className="row align-items-center">
              <div className="img-box col-lg-10 p-lg-5">
                <h1 className="mb-4 mb-lg-0">
                  Are you seeking to harness cutting-edge technologies to create innovative products and applications?
                </h1>
              </div>
              <div className="content_box col-lg-2">
                <Link to="/project-inquiry" className="btn btn-primary w-100 p-2 mt-4 mt-lg-0">
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ppc-leaders mb-5 pb-2">
        <div className="container">
          <div className="leader-head mt-5 pt-md-5 text-center">
            <span className="section-label">Recognition</span>
            <h2 className="section-heading">Solution partners trusted by global leaders</h2>
          </div>
          <div className="leaders-logo">
            <img src="/images/Overall ER&D 3.webp" alt="Overall ER&D" />
            <img src="/images/Clutch reviews (1).webp" alt="Clutch reviews" />
            <img src="/images/Deloitte (1).webp" alt="Deloitte" />
            <img src="/images/Forbes-1.webp" alt="Forbes" />
          </div>
        </div>
      </section>

      <section className="tech-stack-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Technologies</span>
            <h2 className="section-heading">Technology stack</h2>
          </div>
          {[
            {
              title: 'Frontend',
              items: [
                ['Angular', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Angular.webp'],
                ['React Native', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/React.webp'],
                ['React', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/React.webp'],
                ['HTML', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/HTML.webp'],
                ['CSS', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/css.webp'],
                ['Bootstrap', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Bootstrap.webp'],
              ],
            },
            {
              title: 'Backend',
              items: [
                ['ASP. Net', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/ASP.%20Net.webp'],
                ['Java Spring', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Java%20Spring.webp'],
                ['Node', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Node_0.webp'],
                ['Golang', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Golang.webp'],
                ['PHP Laravel', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Laravel-1.webp'],
                ['Kibana', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Kibana.webp'],
                ['Django', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Django_0.webp'],
              ],
            },
            {
              title: 'Database',
              items: [
                ['MySQL', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/MySQL.webp'],
                ['MS SQL', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/MS%20SQL.webp'],
                ['MongoDB', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/MongoDB.webp'],
                ['Redis', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Redis.webp'],
                ['Elastic Search', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Elastic%20Search.webp'],
                ['GraphQL', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/GraphQL.webp'],
              ],
            },
            {
              title: 'Infrastructure',
              items: [
                ['AWS', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/aws-1_0.webp'],
                ['GCP', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/gcp_0.webp'],
                ['Azure', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Azure-1_0.webp'],
                ['Kubernetes', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Kubernetes.webp'],
                ['Docker', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/docker.webp'],
                ['Nginx', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Nginx.webp'],
                ['Apache', 'https://d1ugv6dopk5bx0.cloudfront.net/s3fs-public/Apache-1.webp'],
              ],
            },
          ].map((section) => (
            <div className="mb-4" key={section.title}>
              <h3 className="mb-3" style={{ color: 'var(--primary)', fontWeight: 700 }}>{section.title}</h3>
              <div className="d-flex flex-wrap">
                {section.items.map(([label, src]) => (
                  <span className="tech-pill" key={label}>
                    <img alt={label} src={src} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lets-talk">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="main">
                <div className="left-container">
                  <div className="field_content mt-5 pt-5">
                    <h2 className="let_head">Let&apos;s talk</h2>
                    <p>
                      Please fill out the form or email at{' '}
                      <a href="mailto:myindiaservice1@gmail.com" style={{ color: 'var(--accent)' }}>
                        myindiaservice1@gmail.com
                      </a>
                    </p>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <span className="stat-number">1000+</span>
                        <span className="stat-label">Strong Workforce</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">150+</span>
                        <span className="stat-label">Active Customers</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">8+</span>
                        <span className="stat-label">Years of Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="form-content py-5 mt-4">
                <ContactForm formType="contact" phoneRequired={false} showHeader={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogsSection />
      <EventsSection />

      <Marquee />

      <section className="our-offices">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label" style={{ color: '#6ee7b7' }}>Locations</span>
            <h2 className="section-heading" style={{ color: '#fff' }}>Our Team</h2>
          </div>
          <div className="office-location d-flex flex-wrap">
            {[
              ['Delhi', 'Sewak park Dwarka Mor Metro pillar 776 New Delhi 110059', 'fa-building'],
              ['Uttar Pradesh', '8C Noida, Yamuna Enclave, Noida, Uttar Pradesh 201301', 'fa-map-marker-alt'],
              ['Haryana', 'plot-no:41 A, Dinod, Bhiwani, Haryana 127111', 'fa-map-marker-alt'],
              ['Mumbai', '7B Maharashtra, #18-10 Andheri West, Mumbai 400053', 'fa-building'],
              ['Jaipur', 'Level 21, Jamuna Nagar, Sodala, Jaipur, Rajasthan 302007', 'fa-building'],
            ].map(([city, address, icon]) => (
              <div className="office-card address-box" key={city}>
                <h4>
                  <i className={`fas ${icon}`}></i> {city}
                </h4>
                <p>{address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
