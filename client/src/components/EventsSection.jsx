import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import '../pages/blogs-events.css';

function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((res) => setEvents(res.data.slice(0, 3)))
      .catch(() => setEvents([]));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="home-be-section alt">
      <div className="container">
        <div className="home-be-header">
          <span className="section-label">What's On</span>
          <h2>Upcoming Events</h2>
          <Link to="/events">View all events &rarr;</Link>
        </div>
        <div className="be-grid">
          {events.map((event) => (
            <div key={event._id} className="be-card">
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
                  {new Date(event.eventDate).toLocaleDateString()}
                </div>
                <h3>{event.title}</h3>
                <p>{event.description.slice(0, 100)}...</p>
                {event.location && (
                  <div className="be-meta">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;
