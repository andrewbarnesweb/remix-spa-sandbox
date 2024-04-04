import {
  Await,
  defer,
  useLoaderData,
  useLocation,
  type ClientLoaderFunctionArgs,
  useSearchParams,
} from "@remix-run/react";
import { Suspense, useState } from "react";

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const id = params.id;
  const inContract = new URL(request.url).searchParams.get("in-contract");

  const myPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(
        `${Math.random().toString()} pageId: ${id} inContract: ${
          inContract ?? "not set"
        }`
      );
    }, 2000);
  });

  return defer({ myPromise });
};

function SearchResults() {
  const { myPromise } = useLoaderData<typeof clientLoader>();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [inContract, setInContract] = useState<string>(
    searchParams.get("in-contract") ?? ""
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInContract(value);
    setSearchParams({ "in-contract": value }, { replace: true });
  }

  return (
    <div>
      Show me straight away
      <fieldset>
        {/* There's also some debouncing in here in an input, so probably wouldn't be able to a traditional form submission */}
        <legend>Example filter (in contract)</legend>
        <label>
          Yes
          <input
            type="radio"
            name="search"
            value="true"
            onChange={handleChange}
            checked={inContract === "true"}
          />
        </label>
        <label>
          No
          <input
            type="radio"
            name="search"
            value="false"
            onChange={handleChange}
            checked={inContract === "false"}
          />
        </label>
      </fieldset>
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
