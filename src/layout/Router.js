import { Route, Switch } from "react-router-dom"; 
import React from 'react'


// Pages
import HomePage from "../views/Home";
import About from "../views/About";
import Contact from "../views/Contact";
import Page404 from "../views/Page404";

function Rooters() {
    return (
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/about" component={ About }/>
        <Route path="/contact" component={ Contact } />
        <Route component={ Page404 } />
      </Switch>
    )
}

export default Rooters;