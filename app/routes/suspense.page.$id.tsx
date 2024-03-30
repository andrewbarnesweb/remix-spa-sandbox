import { Await, defer, useLoaderData, useLocation, type ClientLoaderFunctionArgs } from '@remix-run/react';
import { Suspense } from 'react';

export const clientLoader = async ({params}: ClientLoaderFunctionArgs) => {
  const id = params.id;
  const myPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString() + id);
    }, 2000);
  });

  return defer({ myPromise });
};

function SearchResults() {
  const { myPromise } = useLoaderData<typeof clientLoader>();
  const location = useLocation();

  return (
    <div>
        Show me straight away
        <div>
            <Suspense key={location.key} fallback={<div>Loading locally</div>}>
                <Await resolve={myPromise}>
                    {(randomValue) => (
                    <div>
                        <h1>{randomValue}</h1>
                    </div>
                    )}
                </Await>
            </Suspense>
        </div>
    </div>
  );
}

export default SearchResults;
