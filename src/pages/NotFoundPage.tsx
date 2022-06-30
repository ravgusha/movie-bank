import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      This page doesnt exist. Go <Link to="/">home</Link>
    </div>
  );
};

export { NotFoundPage };
