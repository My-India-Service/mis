import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <Link to="/" className="btn home-button">
      <i className="fas fa-house-user"></i>
    </Link>
  );
}

export default HomeButton;
