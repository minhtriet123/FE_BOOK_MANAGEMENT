import { Route, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./components/Sign-in.component";
import ListBook from "./components/List-book.component";
import Signup from "./components/Sign-up.component";
import AddBook from "./components/Add-book.component";
import PrivateRoute from "./Utils/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/books" component={ListBook} />
        <PrivateRoute exact path="/add-book" component={AddBook} />
      </Switch>
    </div>
  );
}

export default App;
