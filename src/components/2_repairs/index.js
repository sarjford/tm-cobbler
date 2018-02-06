import { h, Component } from 'preact';
import { route } from 'preact-router';
import Progress from '../common/progressBar';
import Checkbox from './checkbox';
import Help from './helpPopup';
import './repairs.scss';


const repairs = {
  'Cleaning': 134,
  'Heel Tip Replacement': 297,
  'Minor Scuffs': 298,
}

export default class Repairs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    }
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.selectRepairs = this.selectRepairs.bind(this);
    this.showHelpPopup = this.showHelpPopup.bind(this);
    this.hideHelpPopup = this.hideHelpPopup.bind(this);
  }

  componentWillMount(){
    this.props.setAppState({
      history: [...this.props.state.history, window.location.pathname]
    });
    this.selectedCheckboxes = new Set();
  }

  componentDidMount(){
    window.onpopstate = function(event) {
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
  }

  toggleCheckbox(label){
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  showHelpPopup(){
    this.setState({ popupVisible: true });
  }

  hideHelpPopup(){
    this.setState({ popupVisible: false });
  }

  selectRepairs(e){
    e.preventDefault();
    let selectedRepairsIds = [];
    for (const checkbox of this.selectedCheckboxes) {
      selectedRepairsIds.push(repairs[checkbox]);
    }

    this.props.setAppState({
      selectedRepairs: selectedRepairsIds,
      url: "/step_3",
			// page: 3
    });
    window.scrollTo(0, 0);

    route('/step_3');
  }

  render(props, { state, toggleCheckbox, hideHelpPopup }) {

    let toggle = this.toggleCheckbox;
    let checkboxes = Object.keys(repairs).map(function(label){
      return <Checkbox label={ label } handleCheckboxChange={ toggle } />
    });

    return (
      <section className='page-container'>
        <section className='page-2-repairs'>
          {this.state.popupVisible ? <Help hide={this.hideHelpPopup} /> : null }

          <h1>Great, let’s get these repaired:</h1>

          <section class="selected-shoe">
            <img src={ props.state.data[props.state.selectedShoeIndex].imageSrc } />
            <h6>{ props.state.data[props.state.selectedShoeIndex].name }</h6>
            <h5>{ props.state.data[props.state.selectedShoeIndex].options }</h5>
          </section>

          <h1>What kind of love do your shoes need?</h1>
          <p>Check all that apply.</p>

          <section className="checkboxes">
            { checkboxes }
          </section>

          <div className="help-popup">
            <a onClick={ this.showHelpPopup }>Don’t see your needed repairs here?</a>
          </div>

          <button
            className='repair-page-next'
            onClick={ this.selectRepairs }
            >NEXT</button>


        </section>

      </section>
    );
  }
}
