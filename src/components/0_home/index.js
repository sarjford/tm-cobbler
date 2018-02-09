import { h, Component } from 'preact';
import './home.scss';
import { route } from 'preact-router';
import request from 'superagent';
import Loading from '../common/loading.js';
import Content from './textContent.js';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      errorClassName: 'no-error',
      loading: false
    }
    this.verifyEmail = this.verifyEmail.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  componentWillMount() {
    this.props.setAppState({
      history: [...this.props.state.history, window.location.pathname]
    });
  }

  updateEmail(e){
    this.setState({ errorClassName: '' });
    this.props.setAppState({ email: e.target.value });
  }

  verifyEmail(e) {
    e.preventDefault();
    const email = this.props.state.email;
    let apiUrl = '';

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    if (!validateEmail(email)) {
      this.setState({
        errorMsg: 'Please enter a valid email address.',
        errorClassName: 'email-error'
      });
      return;
    }

    this.setState({ errorMsg: '', errorClassName: '', loading: true });

    if (window.location.href.indexOf('local') > -1) {
      apiUrl = 'https://4cfb0fbc.ngrok.io/user';
    } else {
      apiUrl = 'https://tm-cobbler.herokuapp.com/user';
    }

    request.get(apiUrl)
      .query({ email: email })
      .then(function(res) {
         this.props.setAppState({
           data: res.body,
           url: "/step_1",
         });
         window.scrollTo(0, 0);
         route('/step_1');
      }.bind(this))
      .catch(function(err) {
        if (err) {
          console.log(err)
          this.setState({
            errorMsg: err.response.text,
            errorClassName: 'email-error',
            loading: false
          });
        }
      }.bind(this));
  }

	render(props, state) {
		return (
        <section className='page-container-home'>

          <Content />

          <div className='start-repair-process'>
            {this.state.loading ? <Loading /> : null }
            <h4>Here we go</h4>
            <h6>Enter your email below to start the repair process.</h6>
            <form>
              <input id="userEmail" type="email" className={ state.errorClassName } value={props.state.email} onInput={this.updateEmail} />
              <button type="btn submit"
                onClick={ this.verifyEmail }>Start Your Repair</button>
            </form>
            <span className={ state.errorClassName }>{ state.errorMsg }</span>
          </div>

          <h6 className='terms'>*Terms & Conditions apply. <a>More info.</a></h6>
      </section>
		);
	}
}
