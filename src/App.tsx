import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Homepage from "./pages/Homepage"
import Account from "./pages/Account"

const linkPage = [
  {path: '/', component: <Homepage />},
  // can we use component instead of children
  {path: '/account/:id', component: <Account />},
]

function App() {
  return (
    <Box>
      <Router>
        {/* Searchbar or Navbar e.g <Navbar NAV_ITEMS={NAV_ITEMS} /> */}
        <br />
        <Switch>
          {linkPage.map((obj) => {
            return (
              <Route exact path={obj.path} key={obj.path}>
                {obj.component}
              </Route>
            );
          })}
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
