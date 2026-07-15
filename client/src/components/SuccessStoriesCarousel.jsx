import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { getDisplayImage } from '../utils/imageUrl';

function StoryImage({ story }) {
  const img = (
    <img
      src={getDisplayImage(story.previewImage)}
      className="d-block w-100 rounded-2 transform story-preview-clickable"
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
        className="story-image-link"
        title={`Visit ${story.websiteUrl}`}
      >
        {img}
        <span className="story-visit-badge">
          <i className="fas fa-external-link-alt"></i> Visit Website
        </span>
      </a>
    );
  }

  return img;
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

  if (loading) return null;
  if (stories.length === 0) return null;

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide success-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {stories.map((story, index) => (
          <button
            key={story._id}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="clients-quote">
        <h1>Our clients&apos; success stories</h1>
      </div>
      <div className="carousel-inner">
        {stories.map((story, index) => (
          <div key={story._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="row">
              <div className="col-md-4">
                {story.previewImage ? (
                  <StoryImage story={story} />
                ) : (
                  <div className="story-placeholder rounded-2">
                    <i className="fas fa-image fa-3x"></i>
                  </div>
                )}
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-5 p-5">
                {story.logoImage && (
                  <div className="logo">
                    <img src={story.logoImage} alt="Client logo" />
                  </div>
                )}
                <h4 className="ppc-title">{story.title}</h4>
                {story.challenge && (
                  <p>
                    <b className="glossy-blue">Challenge:</b> {story.challenge}
                  </p>
                )}
                {story.solution && (
                  <p>
                    <b className="glossy-blue">Solution:</b> {story.solution}
                  </p>
                )}
                {story.benefits && (
                  <p>
                    <b className="glossy-blue">Benefits:</b> {story.benefits}
                  </p>
                )}
                {story.websiteUrl && (
                  <a
                    href={story.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary mt-2"
                  >
                    <i className="fas fa-external-link-alt me-1"></i> Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {stories.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default SuccessStoriesCarousel;
