import { Redirect, Route } from "react-router-dom";
import { getAccessToken } from "./Common";

const isNotAuth = () => {
  const token = getAccessToken();
  if (token) return false;
  return true;
};

const PublishRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        isNotAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/books" }} />
        );
      }}
    />
  );
};
export default PublishRoute;
