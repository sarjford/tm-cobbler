import { h, Component } from 'preact';
import Diagram from './cobblerStepsDiagram.js';


const Content = function(props) {

  return (
    <section className='homepage-content'>

      <img src='../assets/cobbler_h1.png' />

      <div className='description'>
        <p>Every pair of shoes you buy from us comes with Cobbler Concierge, a completely free service.</p>
        <p>For up to two years, we will pay for your shoes to get repaired and cover all of the shipping costs.</p>
        <p>From start to finish, the whole process only takes about two weeks.</p>
      </div>

      <div className='available-services'>
        <img src='../assets/available-services.png' />
        <div>
          <h6><span>•</span>Cleaning</h6>
          <h6><span>•</span>Minor scuffs</h6>
          <h6><span>•</span>Heel tip replacement</h6>
        </div>
      </div>

      <Diagram />

    </section>
  )
}

export default Content;
