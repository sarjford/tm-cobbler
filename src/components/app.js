import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Home from './1_home';
import Shoes from './2_shoes';
import Repairs from './3_repairs';
import userInfo from './4_userInfo';
import Confirmation from './6_confirmation';
import Overview from './5_overview';



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      text: 'hello',
      example: 'abcd',
      path: '',
      view: 0,
      // step: ,
    };
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(obj) {
    this.setState.bind(this)(obj);
  }

  render({}, { setAppState, state }) {
		return (
      <Router>
        <Home path="/" state={ this.state } setAppState={ this.setAppState } />
        <Shoes path="/step_1" state={ this.state } setAppState={ this.setAppState } />
        <Repairs path="/step_2" state={ this.state } setAppState={ this.setAppState } />
        <userInfo path="/step_3" state={ this.state } setAppState={ this.setAppState } />
        <Overview path="/step_4" state={ this.state } setAppState={ this.setAppState } />
        <Confirmation path="/complete" state={ this.state } setAppState={ this.setAppState } />
      </Router>
		);
	}
}
