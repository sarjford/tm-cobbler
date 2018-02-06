import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import Progress from './common/progressBar'
import Home from './0_home';
import Shoes from './1_shoes';
import Repairs from './2_repairs';
import Info from './3_userInfo';
import Confirmation from './5_confirmation';
import Overview from './4_overview';
import Store from './store.js'


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
    console.log('1 componentWillMount')
    this.setState({ history: ['/'] })
  }

  componentDidMount() {
    let state = Store.getProductList();
    if (state) {
      this.setState(state);
    }
    console.log('2 componentDidMount')

    // console.log(this.state.history)
    // this.setState({
    //   history: [...this.state.history, window.location.pathname]
    // })
    // console.log(window.location.pathname)
    // console.log(this.state.history)
  }

  shouldComponentUpdate(){
    console.log('3 shouldComponentUpdate')
  }
  componentWillUpdate(){
    console.log('4 componentWillUpdate')
  }
  componentDidUpdate(){
    console.log('5 componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('6 componentWillUnmount')

    Store.saveProductList(this.state);
  }

  setAppState(obj) {
    this.setState.bind(this)(obj);
  }



  render({}, { setAppState, state }) {
    console.log('render')
    let url = this.state.history.slice().pop();
    console.log(url)
    console.log(this.state.history)

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
