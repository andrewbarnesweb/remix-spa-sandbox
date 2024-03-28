import { Link, Outlet } from '@remix-run/react';

function Test() {
  return (
    <div className="m-6">
      <ul className="mb-4 flex gap-2">
        <li>
          <Link to="page" className="underline hover:underline-offset-2">
            Load page with useNavigation in it - promise delayed for 2 seconds (try clicking more than once)
          </Link>
        </li>
        <li>
          <Link to="/" className="underline hover:underline-offset-2">
            Home
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Test;
