import React, { useEffect, useState } from "react";
import "./scss/main.scss";
import Articles from "./components/Articles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostSandbox from "./components/PostSandbox";
import Navbar from "./components/Navbar";
import * as client from "./client";
import { articlePath, adminDashboardPath } from "./secretPaths";

export default function App() {
  const [visitorCount, setVisitorCount] = useState();

  useEffect(() => {
    updateVisitor();
  }, []);

  const updateVisitor = async () => {
    const visitors = await client.newVisitor();
    setVisitorCount(visitors);
  };

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home visitors={visitorCount} />
          </Route>
          <Route path={articlePath}>
            <Articles />
          </Route>
          <Route path={adminDashboardPath}>
            <PostSandbox />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
