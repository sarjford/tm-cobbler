import { h, Component } from 'preact';
// import { Router, route } from 'preact-router';


export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  verifyEmail(e){
    e.preventDefault();
    var email = document.getElementById('userEmail').value;



  }
  
	render(props) {
    console.log(props)
		return (
      <section style="border:solid black;">
        <h1>Page #1</h1>
        <h2>{ props.text }</h2>
        <form>
          <input id="userEmail" type="text" />
          <button type="btn submit" onClick={ this.verifyEmail }>Start a Repair</button>
        </form>
        <a href="/step_1" style="height:50px;width:50px;border:solid black;">FORWARD</a>
      </section>
		);
	}
}
