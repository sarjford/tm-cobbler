import { h, Component } from 'preact';


export default class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedClassName: '',
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label } = this.props;

    const css = (this.state.checkedClassName === '') ? "checked" : '';
    this.setState({ checkedClassName : css });

    handleCheckboxChange(label);
  }

  render(props, state) {

    return (
      <div className='checkbox'>
        <div className={ state.checkedClassName }
              onClick={ this.toggleCheckboxChange } />
        <p>{ props.label }</p>
      </div>
    );
  }
}
