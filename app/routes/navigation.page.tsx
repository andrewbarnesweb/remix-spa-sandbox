import { Await, defer, useLoaderData, useNavigation } from '@remix-run/react';
import { Suspense } from 'react';

export const clientLoader = async () => {
  const response: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString());
    }, 2000);
  });

  return { response };
};

function SearchResults() {
  const { response } = useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();

  return (
    <div>
        Show me straight away
        <div>
            {navigation.state !== "idle" ? <>Loading...</> : (
              <h1>{response}</h1>
            )}
        </div>
    </div>
  );
}

export default SearchResults;
