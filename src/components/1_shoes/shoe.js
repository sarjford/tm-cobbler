import { h, Component } from 'preact';


export default class Shoe extends Component {


	render(props) {

    console.log('Shoe', props)

		return (
      <div>
        { props.state.name }
        { props.state.options }
        <img src={ props.state.imageSrc } />
				<button onClick=''>SELECT</button>

      </div>
    )
	}
}
