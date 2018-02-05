import { h, Component } from 'preact';
import { route } from 'preact-router';
import Shoe from './shoe';
import './shoes.scss';



export default class Shoes extends Component {

  // componentDidMount(){
  //   window.onpopstate = function(event) {
  //     console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  //   };
  // }

  render(props) {

    let purchasedShoes = props.state.data.map(function(shoeData, i){
      return <Shoe className="shoe" appState={ props.state } state={ shoeData } setAppState={ props.setAppState } index={ i } />
    });

    return (
      <section className='page-container page-1-shoes'>
        <section className='page-1-shoes'>

          <h1>Which shoe would you like to repair?</h1>
          <p>Choose one of your shoes to repair:</p>
          { purchasedShoes }
        </section>
      </section>
    );
  }
}
