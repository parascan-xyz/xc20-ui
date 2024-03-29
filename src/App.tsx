import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Homepage from "./pages/Homepage"
import Account from "./pages/Account"
import Navbar from "./components/Navbar";
import Terminate from "./components/Terminate"

const linkPage = [
  {path: '/', component: <Homepage />},
  {path: '/account/:id', component: <Account />},
]

// function App() {
//   return (
//     <Box>
//       <Router>
//         <Navbar />
//         <Terminate />
//         <br />
//         <Switch>
//           {linkPage.map((obj) => {
//             return (
//               <Route exact path={obj.path} key={obj.path}>
//                 {obj.component}
//               </Route>
//             );
//           })}
//         </Switch>
//       </Router>
//     </Box>
//   );
// }

function App() {
  return (
    <Box>
      <Terminate />
    </Box>
  )
}

export default App;
