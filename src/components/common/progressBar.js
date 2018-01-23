import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Progress extends Component {
  constructor() {
    super();
    this.navigateBack = this.navigateBack.bind(this);
    this.exitCobbler = this.exitCobbler.bind(this);
  }

  navigateBack(){
    const newUrl = this.props.state.prevView;
    const newStep = this.props.state.step - 1;
    const newPrev = this.props.state.currView;
    this.props.setAppState({ currView: newUrl, prevView: newPrev, step: newStep });
    route(newUrl);
  }

  exitCobbler(){
    const newPrev = this.props.state.currView;
    this.props.setAppState({ currView: '/', prevView: newPrev, step: 0 });
    route('/');
  }

  render(props) {
    console.log('progress ', props)

    return (
      <section className="progress-bar">
        <div>
          <div className="nav-button back" onClick={ this.navigateBack }>BACK</div>
          <h3>{ props.state.step } of 3</h3>
          <div className="nav-button exit" onClick={ this.exitCobbler }>X</div>
        </div>
      </section>
    );
  }
}
