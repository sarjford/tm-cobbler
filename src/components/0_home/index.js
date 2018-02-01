import { h, Component } from 'preact';
import request from 'superagent';
import { route } from 'preact-router';
import './home.scss';
import Loading from './loading.js';



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

  updateEmail(e){
    this.setState({ errorClassName: '' });
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
    this.setState({ errorMsg: '', errorClassName: '', loading: true });

    request.get('https://4cfb0fbc.ngrok.io/user')
      .query({ email: email })
      .then(function(res) {
         this.props.setAppState({
           data: res.body,
           url: "/step_1",
           page: 1
         });
         window.scrollTo(0, 0);
         route('/step_1');
      }.bind(this))
      .catch(function(err) {
        if (err) {
          // need more error handling
          console.log(err)
          this.setState({ errorMsg: err.response.text, errorClassName: 'email-error', loading: false });
        }
      }.bind(this));

  }

	render(props, state) {
		return (

        <section className='page-container'>

          <section className='homepage-content'>
            <img src='../assets/cobbler_h1.png' />

            <div className='description'>
              <p>Every pair of shoes you buy from us comes with Cobbler Concierge, a completely free service.</p>
              <p>For up to two years, we will pay for your shoes to get repaired and cover all of the shipping costs.</p>
              <p>From start to finish, the whole process only takes about two weeks.</p>
            </div>

            <div className='available-services'>
              <h3>Available Services</h3>
              <h6>•	Cleaning</h6>
              <h6>•	Minor scuffs</h6>
              <h6>•	Heel tip replacement</h6>
            </div>

            <div className='diagram'>
              <h2>How the complimentary service works:</h2>

              <div className='first'>
                <img src='../assets/icon-cobbler-01@3x.png' />
                <h6>1. Send</h6>
                <h6>Enter your email address below to request a free shipping label. Box your shoes and send them to us, on us.</h6>
              </div>

              <div className='second'>
                <img src='../assets/icon-cobbler-02@3x.png' />
                <h6>2. Repair</h6>
                <h6>Expert cobblers restore your shoes with top-quality craftsmanship and care in 2 weeks.</h6>
              </div>

              <div className='third'>
                <img src='../assets/icon-cobbler-03@3x.png' />
                <h6>3. Return</h6>
                <h6>Your favorite shoes arrive back at your doorstep, good as new and ready to take on the world (again).</h6>
              </div>
            </div>

          </section>

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
