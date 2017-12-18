import { h, Component } from 'preact';


export default class Shoes extends Component {
  constructor() {
    super();
  }

  render(props) {
    console.log('shoes', props)

    return (
      <section>
        <h1>I am page 2</h1>
        <a href="/step_2" style="height:50px;width:50px;border:solid black;">FORWARD</a>
      </section>
    );
  }
}
