import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Shoe extends Component {

	constructor(props) {
		super(props);
		// this.state = {}
		this.selectShoe = this.selectShoe.bind(this);
	}

	selectShoe(){
		console.log('select shoe clicked');
		console.log(this.props.state.options.split(' / ')[1]);
		// this.props.setAppState({  selectedShoe: { variantId: this.props.state.variant, repairId: '', size: this.props.state.options.split(' / ')[1] } });

		this.props.setAppState({
			selectedShoeIndex: this.props.index,
			prevView: this.props.appState.currView,
			currView: "/step_2", step: 2
		});
		route('/step_2');
	}


	render(props) {

    console.log('Shoe', props)

		return (
      <div>
        { props.state.name }
        { props.state.options }
        <img src={ props.state.imageSrc } />
				<button onClick={ this.selectShoe }>SELECT</button>

      </div>
    )
	}
}


// selectedShoe: {
// 	variantId: '',
// 	repairId: '',
// 	size: ''
// }
