import { h, Component } from 'preact';
import { route } from 'preact-router';
import './progress.scss';

const urls = {
  '/' :'0',
  '/step_1': '1',
  '/step_2': '2',
  '/step_3': '3'
}

export default class Progress extends Component {
  constructor() {
    super();
    this.navigateBack = this.navigateBack.bind(this);
    this.exitCobbler = this.exitCobbler.bind(this);
  }

  navigateBack() {
    let history = this.props.state.history.slice();
    route(history.slice(-2, -1)[0]);
  }

  exitCobbler() {
    route('/');
  }

  render(props) {
    let step = urls[window.location.pathname];

    console.log(this.props.state.history)

    return (
      <section className="progress-bar">
        <div>
          <div className="nav-button back" onClick={ this.navigateBack }>
          <img src='../../assets/back_icon@2x.png' />

          </div>
          <h3>{step} of 3</h3>
          <div className="nav-button exit" onClick={ this.exitCobbler }>
          <img src='../../assets/x_icon@2x.png' />


          </div>
        </div>
      </section>
    );
  }
}
