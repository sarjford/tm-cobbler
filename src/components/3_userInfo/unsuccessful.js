import { h, Component } from 'preact';
import Contact from '../common/contact.js';
import './unsuccessful.scss';


const Unsuccessful = function(props) {

  return (
    <section className='unsuccessful'>
      <div>
        <h4>Looks like there was an error processing your request. Please reach out to our customer service team for assistance or try submitting a
          <span onClick={props.startOver}> new request</span>.
        </h4>
        <Contact />
      </div>
    </section>
  )
}

export default Unsuccessful;
