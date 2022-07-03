import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      This page doesnt exist. Go <Link to="/">home</Link>
    </div>
  );
};

export { NotFound};
