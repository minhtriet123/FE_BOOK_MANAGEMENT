import { Route, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./components/Sign-in.component";
import ListBook from "./components/List-book.component";
import Signup from "./components/Sign-up.component";
import AddBook from "./components/Add-book.component";
import PrivateRoute from "./Utils/PrivateRoute";
import EditBook from "./components/Edit-book.component";
import Profile from "./components/Profile.component";
import AuthorCategory from "./components/Author-Category.component";

function App() {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={ListBook} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/add-book" component={AddBook} />
        <PrivateRoute path="/books/:id" component={EditBook} />
        <PrivateRoute path="/author-category" component={AuthorCategory} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
