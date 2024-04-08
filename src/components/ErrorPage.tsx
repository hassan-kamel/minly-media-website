import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // const error = err as { statusText: string; message: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{JSON.stringify(error)}</i>
      </p>
    </div>
  );
}
