import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { api } from '../services/api';
import './blogs-events.css';
import './pageStyles.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getEvents()
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blogs-events-page">
      <Navbar />
      <div className="be-hero">
        <h1>Events</h1>
        <p>Upcoming events and activities</p>
      </div>
      <section className="be-section">
        <div className="container">
          {loading ? (
            <p className="be-empty">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="be-empty">No upcoming events. Check back soon!</p>
          ) : (
            <div className="be-grid">
              {events.map((event) => (
                <div key={event._id} className="be-card" style={{ cursor: 'default' }}>
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="be-card-img" />
                  ) : (
                    <div className="be-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-calendar fa-3x" style={{ color: '#adb5bd' }}></i>
                    </div>
                  )}
                  <div className="be-card-body">
                    <div className="be-event-date">
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(event.eventDate).toLocaleString()}
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {event.location && (
                      <div className="be-meta">
                        <i className="fas fa-map-marker-alt"></i> {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Events;
