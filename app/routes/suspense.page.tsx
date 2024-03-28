import { Await, defer, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

export const clientLoader = async () => {
  const response: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString());
    }, 2000);
  });

  return defer({ response });
};

function SearchResults() {
  const { response } = useLoaderData<typeof clientLoader>();

  return (
    <div>
        Show me straight away
        <div>
            <Suspense fallback={<div>Loading locally</div>}>
                <Await resolve={response}>
                    {(response) => (
                    <div>
                        <h1>{response}</h1>
                    </div>
                    )}
                </Await>
            </Suspense>
        </div>
    </div>
  );
}

export default SearchResults;
