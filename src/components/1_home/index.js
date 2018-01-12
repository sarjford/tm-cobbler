import { h, Component } from 'preact';
// import { Router, route } from 'preact-router';
import request from 'superagent';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      errorClassName: 'no-error',

    }
  }

  verifyEmail = e => {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    console.log(validateEmail(email))

    if (!validateEmail(email)) {
      this.setState({ errorMsg: 'Please enter a valid email address.', errorClassName: 'email-error' });

      // errorMsg = ;
      // this.setState.errorClassName = ;
      return;
    }

    request.get('http://fe2706e6.ngrok.io/user')
      .query({ email: email })
      .then(function(res) {
         // res.body, res.headers, res.status
         console.log(res.body)
      })
      .catch(function(err) {
         // err.message, err.response
      });
  }

	render(props, state) {
    console.log(state)

		return (
      <section style="border:solid black;">
        <h1>Page #1</h1>
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
