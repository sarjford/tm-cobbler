import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import Progress from './common/progressBar'
import Home from './0_home';
import Shoes from './1_shoes';
import Repairs from './2_repairs';
import Info from './3_userInfo';
import Confirmation from './5_confirmation';
import Overview from './4_overview';


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedShoeIndex: 0,
      selectedRepairs: [],
      email: '',
      data: [],
      history: []
    };
    this.setAppState = this.setAppState.bind(this);
  }

  componentWillMount() {
    // if user refreshes the page -- just go to home page
    if (window.location.pathname === '/') {
      this.setState({ history: ['/'] });
    } else {
      window.location.href = '/';
    }
  }

  setAppState(obj) {
    this.setState.bind(this)(obj);
  }

  render({}, { setAppState, state }) {
    let url = this.state.history.slice().pop();

		return (
      <div className='app-container'>
        {url.indexOf('step') > -1 ? <Progress className="progressBar" state={ this.state } setAppState={ this.setAppState } /> : null }

        <Router>
          <Home path="/" state={ this.state } setAppState={ this.setAppState } />
          <Shoes path="/step_1" state={ this.state } setAppState={ this.setAppState } />
          <Repairs path="/step_2" state={ this.state } setAppState={ this.setAppState } />
          <Info path="/step_3" state={ this.state } setAppState={ this.setAppState } />
          <Overview path="/step_4" state={ this.state } setAppState={ this.setAppState } />
          <Confirmation path="/complete" state={ this.state } setAppState={ this.setAppState } />
        </Router>
      </div>
		);
	}
}
