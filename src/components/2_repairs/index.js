import { h, Component } from 'preact';
import { route } from 'preact-router';
import Progress from '../common/progressBar';
import Checkbox from './checkbox';
import Help from './helpPopup';

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
    this.selectedCheckboxes = new Set();
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
      prevView: this.props.state.currView,
      currView: "/step_3",
      step: 3
    });
    route('/step_3');
  }

  render(props, { state, toggleCheckbox, hideHelpPopup }) {

    let toggle = this.toggleCheckbox;
    let checkboxes = Object.keys(repairs).map(function(label){
      return <Checkbox label={ label } handleCheckboxChange={ toggle } />
    });

    return (
      <section>
        <Progress className="progressBar" state={ props.state } setAppState={ props.setAppState } />

        <h1>Great, let’s get these repaired:</h1>

        <section class="selected-shoe">
          { props.state.data[props.state.selectedShoeIndex].name }
          { props.state.data[props.state.selectedShoeIndex].options }
          <img src={ props.state.data[props.state.selectedShoeIndex].imageSrc } />
        </section>

        <h1>What kind of love do your shoes need?</h1>

        <section className="checkboxes">
          { checkboxes }
        </section>

        <div className="help-popup">
          <p onClick={ this.showHelpPopup }>Don’t see your needed repairs here?</p>
          {this.state.popupVisible ? <Help hide={this.hideHelpPopup} /> : null }
        </div>

        <button
          className=""
          onClick={ this.selectRepairs }
          >NEXT</button>

      </section>
    );
  }
}
