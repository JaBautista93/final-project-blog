import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Blogs} />
          <Route exact path="/Blogs" component={Blogs} />
          <Route exact path="/Blogs/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
