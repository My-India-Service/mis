import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import MarkdownContent, { plainTextFromMarkdown } from '../components/MarkdownContent';
import { api } from '../services/api';
import './blogs-events.css';
import './pageStyles.css';

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .getBlog(slug)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        setBlog(null);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const seoDescription = blog
    ? blog.metaDescription ||
      plainTextFromMarkdown(blog.excerpt || blog.content, 160) ||
      'Blog post from My India Service.'
    : 'Blog post from My India Service.';

  return (
    <div className="blogs-events-page">
      {blog ? (
        <Seo
          title={blog.metaTitle || blog.title}
          appendSiteName={!blog.metaTitle}
          description={seoDescription}
          path={`/blogs/${blog.slug}`}
          image={blog.image || undefined}
          type="article"
        />
      ) : (
        <Seo
          title={error || !loading ? 'Blog not found' : 'Blog'}
          description="Blog post from My India Service."
          path={`/blogs/${slug}`}
          noindex={Boolean(error || (!loading && !blog))}
        />
      )}
      <Navbar />
      <div className="be-hero">
        <p className="be-hero-label">Blog</p>
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
              <MarkdownContent className="be-detail-content">{blog.content}</MarkdownContent>
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
