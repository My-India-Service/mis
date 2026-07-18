import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { plainTextFromMarkdown } from './MarkdownContent';
import '../pages/blogs-events.css';

function BlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api
      .getBlogs()
      .then((res) => setBlogs(res.data.slice(0, 3)))
      .catch(() => setBlogs([]));
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="home-be-section">
      <div className="container">
        <div className="home-be-header">
          <span className="section-label">Insights</span>
          <h2>Latest Blog</h2>
          <Link to="/blogs">View all blogs &rarr;</Link>
        </div>
        <div className="be-grid">
          {blogs.map((blog) => (
            <Link to={`/blogs/${blog.slug}`} key={blog._id} className="be-card">
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="be-card-img" />
              ) : (
                <div className="be-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-newspaper fa-3x" style={{ color: '#adb5bd' }}></i>
                </div>
              )}
              <div className="be-card-body">
                <h3>{blog.title}</h3>
                <p>{blog.excerpt || plainTextFromMarkdown(blog.content, 100)}</p>
                <div className="be-meta">{new Date(blog.createdAt).toLocaleDateString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
