import { h, Component } from 'preact';

const Diagram = function(props) {

  return (
    <div className='diagram'>
      <h2>How the complimentary service works:</h2>

      <div className='first'>
        <img src='../assets/icon-cobbler-01@3x.png' />
        <h6>1. Send</h6>
        <h6>Enter your email address below to request a free shipping label. Box your shoes and send them to us, on us.</h6>
      </div>

      <div className='second'>
        <img src='../assets/icon-cobbler-02@3x.png' />
        <h6>2. Repair</h6>
        <h6>Expert cobblers restore your shoes with top-quality craftsmanship and care in 2 weeks.</h6>
      </div>

      <div className='third'>
        <img src='../assets/icon-cobbler-03@3x.png' />
        <h6>3. Return</h6>
        <h6>Your favorite shoes arrive back at your doorstep, good as new and ready to take on the world (again).</h6>
      </div>
    </div>
  )
}

export default Diagram;
