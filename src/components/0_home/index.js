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
    this.updateEmail = this.updateEmail.bind(this);
  }

  updateEmail(e){
    this.props.setAppState({ email: e.target.value });
  }

  verifyEmail(e) {
    e.preventDefault();
    const email = this.props.state.email;

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    console.log(email)

    if (!validateEmail(email)) {
      this.setState({ errorMsg: 'Please enter a valid email address.', errorClassName: 'email-error' });
      return;
    }
    this.setState({ errorMsg: '', errorClassName: '' });

    request.get('https://4cfb0fbc.ngrok.io/user')
      .query({ email: email })
      .then(function(res) {
         this.props.setAppState({
           data: res.body,
           url: "/step_1",
           page: 1
         });
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
		return (
      <section className='page-container'>

        <div className='content-container'>

          <section className='homepage-content'>
            <img src='../assets/cobbler_h1.png' />

            <div className='description'>
              <p>Every pair of shoes you buy from us comes with Cobbler Concierge, a completely free service.</p>
              <p>For up to two years, we will pay for your shoes to get repaired and cover all of the shipping costs.</p>
              <p>From start to finish, the whole process only takes about two weeks.</p>
            </div>

            <div className='services-text'>
              <h2>Available Services</h2>
              <p>•	Cleaning</p>
              <p>•	Minor scuffs</p>
              <p>•	Heel tip replacement</p>
            </div>

            <div className='diagram'>
              <h3>How the complimentary service works:</h3>

              <div className='send-step'>
                <img src='../assets/icon-cobbler-01@3x.png' />
                <h4>1. Send</h4>
                <p>Enter your email address below to request a free shipping label. Box your shoes and send them to us, on us.</p>
              </div>

              <div className='repair-step'>
                <img src='../assets/icon-cobbler-02@3x.png' />
                <h4>1. Repair</h4>
                <p>Expert cobblers restore your shoes with top-quality craftsmanship and care in 2 weeks.</p>
              </div>

              <div className='return-step'>
                <img src='../assets/icon-cobbler-03@3x.png' />
                <h4>1. Send</h4>
                <p>Your favorite shoes arrive back at your doorstep, good as new and ready to take on the world (again).</p>
              </div>
            </div>

          </section>

          <div className='start-repair-process'>
            <h2>Here we go</h2>
            <p>Enter your email below to start the repair process.</p>
            <form>
              <input id="userEmail" type="email" className={ state.errorClassName } value={props.state.email} onChange={this.updateEmail} />
              <button type="btn submit"
                onClick={ this.verifyEmail }>Start Your Service</button>
            </form>
            <p>{ state.errorMsg }</p>
          </div>

          <p>*Terms & Conditions apply. More info.</p>

        </div>
      </section>
		);
	}
}
