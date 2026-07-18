import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { api } from '../services/api';
import './blogs-events.css';
import './pageStyles.css';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBlogs()
      .then((res) => setBlogs(res.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blogs-events-page">
      <Seo
        title="Blog"
        description="Latest insights from My India Service — digital marketing, web development, and business growth."
        path="/blogs"
      />
      <Navbar />
      <div className="be-hero">
        <h1>Blog</h1>
        <p>Latest insights from My India Service</p>
      </div>
      <section className="be-section">
        <div className="container">
          {loading ? (
            <p className="be-empty">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="be-empty">No blogs published yet. Check back soon!</p>
          ) : (
            <div className="be-grid">
              {blogs.map((blog) => (
                <Link to={`/blogs/${blog.slug}`} key={blog._id} className="be-card">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="be-card-img" loading="lazy" />
                  ) : (
                    <div className="be-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-newspaper fa-3x" style={{ color: '#adb5bd' }}></i>
                    </div>
                  )}
                  <div className="be-card-body">
                    <h2>{blog.title}</h2>
                    <p>{blog.excerpt || blog.content.slice(0, 120) + '...'}</p>
                    <div className="be-meta">
                      {blog.author} &middot; {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Blogs;
