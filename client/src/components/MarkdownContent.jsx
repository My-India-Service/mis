import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Safe Markdown → HTML for public blog/event bodies.
 * Raw HTML from authors is not rendered (react-markdown default).
 */
function MarkdownContent({ children, className = '' }) {
  if (!children) return null;

  return (
    <div className={`md-prose ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}

/** Strip Markdown markers for short teasers / excerpts. */
export function plainTextFromMarkdown(text, max = 120) {
  if (!text) return '';
  const plain = String(text)
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 1).trim()}…`;
}

export default MarkdownContent;
