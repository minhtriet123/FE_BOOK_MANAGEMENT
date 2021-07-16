import { Route, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./components/Sign-in.component";
import ListBook from "./components/List-book.component";
import Signup from "./components/Sign-up.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/books">
          <ListBook />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
