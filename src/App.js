import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
      </div>
      <div className="content">
        <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
