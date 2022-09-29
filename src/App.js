import React from "react";
import Top from "./TopPage";
import { Route, BrowserRouter } from "react-router-dom"; 
class App extends React.Component {

  render() {
    return (
      <div> 
        <div>
          <BrowserRouter>
            <Route exact path='/' component={Top} /> 
          </BrowserRouter> 
        </div>

      </div>
    );
  }
}

export default App;
