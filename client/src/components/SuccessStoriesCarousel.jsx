import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import { getDisplayImage } from '../utils/imageUrl';
import './success-stories.css';

const AUTOPLAY_MS = 5500;

function StoryImage({ story }) {
  const img = (
    <img
      src={getDisplayImage(story.previewImage)}
      className="success-story-img"
      alt={story.title}
      loading="lazy"
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    api
      .getSuccessStories()
      .then((res) => setStories(res.data || []))
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [stories.length]);

  const goTo = useCallback(
    (index) => {
      if (stories.length === 0) return;
      const next = ((index % stories.length) + stories.length) % stories.length;
      setActiveIndex(next);
    },
    [stories.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (stories.length < 2 || paused) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [stories.length, paused]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null || stories.length < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

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
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Client success stories"
        >
          {stories.length > 1 && (
            <div className="success-carousel-indicators" role="tablist">
              {stories.map((story, index) => (
                <button
                  key={story._id}
                  type="button"
                  className={index === activeIndex ? 'active' : ''}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={`Story ${index + 1}: ${story.title}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          )}

          <div className="carousel-inner">
            {stories.map((story, index) => (
              <div
                key={story._id}
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
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
                        {String(activeIndex + 1).padStart(2, '0')} /{' '}
                        {String(stories.length).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <div className="success-story-content">
                    {story.logoImage && (
                      <div className="logo success-story-logo">
                        <img src={story.logoImage} alt="Client logo" />
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
                aria-label="Previous story"
                onClick={goPrev}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="success-carousel-control success-carousel-control-next"
                type="button"
                aria-label="Next story"
                onClick={goNext}
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
