import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TAWK_SRC = 'https://embed.tawk.to/6667e739981b6c56477bcf0b/1i02tuen5';

function TawkChat() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      return undefined;
    }

    if (window.Tawk_API?.showWidget) {
      window.Tawk_API.showWidget();
      return undefined;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const existing = document.querySelector(`script[src="${TAWK_SRC}"]`);
    if (existing) return undefined;

    const script = document.createElement('script');
    script.async = true;
    script.src = TAWK_SRC;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [isAdmin]);

  return null;
}

export default TawkChat;
