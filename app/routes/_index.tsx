import { Link, Outlet } from '@remix-run/react';

export const clientLoader = async () => {
  const response: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString());
    }, 1000);
  });

  return { response };
};

function Test() {
  return (
    <div className="m-6">
      <ul className="mb-4 flex gap-2">
        <li>
          <Link to="/suspense" className="underline hover:underline-offset-2">
            Suspense
          </Link>
        </li>
        <li>
          <Link to="/navigation" className="underline hover:underline-offset-2">
            useNavigation
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Test;
