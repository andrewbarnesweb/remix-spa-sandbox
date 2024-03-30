import { Link, Outlet } from '@remix-run/react';

function Test() {
  return (
    <div className="m-6">
      <ul className="mb-4 flex gap-2">
        <li>
          <Link to="page/one" className="underline hover:underline-offset-2">
            Page with param (one)
          </Link>
        </li>
        <li>
          <Link to="page/two" className="underline hover:underline-offset-2">
            Page with param (two)
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
