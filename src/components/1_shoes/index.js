import { h, Component } from 'preact';
import { route } from 'preact-router';
import Shoe from './shoe';
import Progress from '../common/progressBar'



export default class Shoes extends Component {

  render(props) {

    let purchasedShoes = props.state.data.map(function(shoeData, i){
      return <Shoe className="shoe" state={ shoeData } setAppState={ props.setAppState } index={ i } />
    });

    // console.log('Shoes')


    // console.log(purchasedShoes)

    return (
      <section>
        <h1>SHOES</h1>
        <Progress className="progressBar" state={ props.state } setAppState={ props.setAppState } />

        { purchasedShoes }
        <a href="/step_2" style="height:50px;width:50px;border:solid black;">FORWARD</a>
      </section>
    );
  }
}
