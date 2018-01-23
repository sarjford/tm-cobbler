import { h, Component } from 'preact';
import request from 'superagent';
import { route } from 'preact-router';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      errorClassName: 'no-error',
    }
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  verifyEmail(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (!validateEmail(email)) {
      this.setState({ errorMsg: 'Please enter a valid email address.', errorClassName: 'email-error' });
      return;
    }
    this.setState({ errorMsg: '', errorClassName: '' });

    request.get('https://f24e23c3.ngrok.io/user')
      .query({ email: email })
      .then(function(res) {
         let current = this.props.state.currView;
         this.props.setAppState({ data: res.body, prevView: current, currView: "/step_1", step: 1 });
         route('/step_1');

      }.bind(this))
      .catch(function(err) {
        if (err) {
          // need more error handling
          console.log(err)
          this.setState({ errorMsg: err.response.text, errorClassName: 'email-error' });
        }
      }.bind(this));
  }

	render(props, state) {
    console.log('Home')


		return (
      <section style="border:solid blue;">
        <h1>HOME</h1>
        <h2>{ props.text }</h2>
        <form>
          <input id="userEmail" type="email" className={ state.errorClassName } />
          <button
            type="btn submit"
            onClick={ this.verifyEmail }>Start a Repair</button>
        </form>
        <p>{ state.errorMsg }</p>
        <a href="/step_1" style="height:50px;width:50px;border:solid black;">FORWARD</a>
      </section>
		);
	}
}
