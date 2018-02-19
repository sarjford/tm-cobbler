import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Shoe extends Component {

	constructor(props) {
		super(props);
		this.selectShoe = this.selectShoe.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
	}

	selectShoe(){
		this.props.setAppState({
			selectedShoeIndex: this.props.index,
		});
		window.scrollTo(0, 0);
		route('/step_2');
	}

	imageLoaded(){
		this.props.setAppState({
			imagesLoaded: this.props.appState.imagesLoaded + 1,
		});
	}

	render(props) {
		let options = props.state.options.split(' / ');
		let details =  options[0] + ' | ' + 'Size ' + options[1];

		return (
      <div className='shoe-orders'>
				<div>
					<div className='img'>
						<img src={ props.state.imageSrc } onLoad={this.imageLoaded}/>
					</div>

					<div className='info'>
						<div>
			        <h6>{ props.state.name }</h6>
			        <h5>{details}</h5>
							<button className='white' onClick={ this.selectShoe }>SELECT</button>
						</div>
					</div>
				</div>
      </div>
    )
	}
}
