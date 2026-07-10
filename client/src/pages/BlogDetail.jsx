import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { api } from '../services/api';
import './blogs-events.css';
import './pageStyles.css';

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getBlog(slug)
      .then((res) => setBlog(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="blogs-events-page">
      <Navbar />
      <div className="be-hero">
        <h1>Blog</h1>
      </div>
      <section className="be-section">
        <div className="container">
          {loading ? (
            <p className="be-empty">Loading...</p>
          ) : error || !blog ? (
            <div className="be-empty">
              <p>Blog not found.</p>
              <Link to="/blogs">Back to Blogs</Link>
            </div>
          ) : (
            <div className="be-detail">
              {blog.image && <img src={blog.image} alt={blog.title} />}
              <h1>{blog.title}</h1>
              <div className="be-meta" style={{ marginBottom: '24px' }}>
                By {blog.author} &middot; {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div className="be-detail-content">{blog.content}</div>
              <Link to="/blogs" className="btn btn-primary mt-4">
                &larr; Back to Blogs
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default BlogDetail;
