import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { getDisplayImage } from '../utils/imageUrl';
import './success-stories.css';

function StoryImage({ story }) {
  const img = (
    <img
      src={getDisplayImage(story.previewImage)}
      className="success-story-img"
      alt={story.title}
      onError={(e) => {
        e.currentTarget.src =
          'data:image/svg+xml,' +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280"><rect fill="#e8edfc" width="100%" height="100%"/><text x="50%" y="50%" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="16">Preview unavailable</text></svg>'
          );
      }}
    />
  );

  if (story.websiteUrl) {
    return (
      <a
        href={story.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="success-story-image-link"
        title={`Visit ${story.websiteUrl}`}
      >
        {img}
        <span className="success-story-visit-badge">
          <i className="fas fa-external-link-alt"></i> Visit Website
        </span>
      </a>
    );
  }

  return <div className="success-story-image-wrap">{img}</div>;
}

function StoryBlock({ icon, label, text, variant }) {
  if (!text) return null;
  return (
    <div className={`success-story-block success-story-block-${variant}`}>
      <div className="success-story-block-label">
        <i className={`fas ${icon}`}></i>
        <span>{label}</span>
      </div>
      <p>{text}</p>
    </div>
  );
}

function SuccessStoriesCarousel() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getSuccessStories()
      .then((res) => setStories(res.data))
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="success-stories-section">
        <div className="container">
          <div className="success-stories-loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  return (
    <section className="success-stories-section">
      <div className="success-stories-bg-shape success-stories-bg-shape-1"></div>
      <div className="success-stories-bg-shape success-stories-bg-shape-2"></div>

      <div className="container">
        <div className="success-stories-header">
          <span className="section-label">Client Wins</span>
          <h2>Our clients&apos; success stories</h2>
          <p>Real challenges solved with technology — measurable impact for businesses we partner with.</p>
        </div>

        <div
          id="successStoriesCarousel"
          className="carousel slide carousel-fade success-carousel-v2"
          data-bs-ride="carousel"
        >
          {stories.length > 1 && (
            <div className="success-carousel-indicators">
              {stories.map((story, index) => (
                <button
                  key={story._id}
                  type="button"
                  data-bs-target="#successStoriesCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Story ${index + 1}: ${story.title}`}
                />
              ))}
            </div>
          )}

          <div className="carousel-inner">
            {stories.map((story, index) => (
              <div key={story._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <article className="success-story-card">
                  <div className="success-story-media">
                    {story.previewImage ? (
                      <StoryImage story={story} />
                    ) : (
                      <div className="success-story-placeholder">
                        <i className="fas fa-trophy fa-3x"></i>
                        <span>Success Story</span>
                      </div>
                    )}
                    {stories.length > 1 && (
                      <span className="success-story-slide-count">
                        {String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <div className="success-story-content">
                    {story.logoImage && (
                      <div className="success-story-logo">
                        <img src={getDisplayImage(story.logoImage)} alt="Client logo" />
                      </div>
                    )}

                    <h3 className="success-story-title">{story.title}</h3>

                    <div className="success-story-blocks">
                      <StoryBlock icon="fa-bullseye" label="Challenge" text={story.challenge} variant="challenge" />
                      <StoryBlock icon="fa-lightbulb" label="Solution" text={story.solution} variant="solution" />
                      <StoryBlock icon="fa-chart-line" label="Benefits" text={story.benefits} variant="benefits" />
                    </div>

                    {story.websiteUrl && (
                      <a
                        href={story.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="success-story-cta"
                      >
                        Visit Website
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>

          {stories.length > 1 && (
            <>
              <button
                className="success-carousel-control success-carousel-control-prev"
                type="button"
                data-bs-target="#successStoriesCarousel"
                data-bs-slide="prev"
                aria-label="Previous story"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="success-carousel-control success-carousel-control-next"
                type="button"
                data-bs-target="#successStoriesCarousel"
                data-bs-slide="next"
                aria-label="Next story"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default SuccessStoriesCarousel;
