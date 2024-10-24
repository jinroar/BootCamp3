import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Menu from "./pages/Menu";

import Stored from "./pages/Stored";
import PickPokemon from "./PickPokemon";
import SearchPokemon from "./SearchPokemon";
import Fight from "./Fight";
import Capture from "./Capture";

const Try = () => {
  return (
    <div>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route path="/" element={<Menu />} />

          <Route path="/Captured" element={<Capture />} />
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route path="/Fight" element={<Fight />} />
          {/* This route is for Menu component 
          with exact path "/Menu", in component 
          props we passes the imported component*/}
          <Route path="/SearchPokemon" element={<SearchPokemon />} />

          {/* This route is for Menu component 
          with exact path "/Menu", in component 
          props we passes the imported component*/}
          <Route path="/Stored" element={<Stored />} />

          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/PickPokemon" element={<PickPokemon />} />
          <Route path="/Capture" element={<Capture />} />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Try;