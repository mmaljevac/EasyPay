import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>Sorry :(</h1>
      <div>Page not found.</div>
      <Link to='/'>Back to homepage</Link>
    </>
  );
};

export default NotFound;
