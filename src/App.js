import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import InvestmentAdvisory from './InvestmentAdvisory';
import FinancialPlanning from './FinancialPlanning';
import RiskAssessment from './RiskAssessment';
import CustomerSupport from './CustomerSupport';
import Settings from './Settings';
import SignOut from './SignOut';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/investment" component={InvestmentAdvisory} />
          <Route exact path="/planning" component={FinancialPlanning} />
          <Route exact path="/risk" component={RiskAssessment} />
          <Route exact path="/support" component={CustomerSupport} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/signout" component={SignOut} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;


/*import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import TinderCards from './TinderCards';


const App = () => {
  return (
    <div className="App">
      {Header }
      <Header />

      <Router>
        <Switch>
          <Route path="/chat">
            <div>Chat Component Here</div>
          </Route>

          <Route path="/">
          <TinderCards/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
*/