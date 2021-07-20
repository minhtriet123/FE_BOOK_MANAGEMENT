import { Redirect, Route } from "react-router-dom";
import { getAccessToken } from "./Common";
const isAuth = () => {
  const token = getAccessToken();
  if (token) return true;
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
export default PrivateRoute;
