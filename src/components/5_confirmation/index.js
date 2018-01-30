import { h, Component } from 'preact';


const Confirmation = function(props) {

  return (
    <section>
      <h1>Request Complete!</h1>
      <p>Now just send us your shoes.</p>
      <img src='' />
      <p>A pre-paid label will arrive shortly in your email inbox. Print the label and pop your shoes in a box and drop off at any FedEx drop off location.</p>
      <a href='http://www.fedex.com/us/dropbox/'>Find dropoff locations</a>

      <div>
        <h1>When to expect your shoes back:</h1>
        <div></div>
        <p>About two weeks. We’ll send you an email once we receive your shoes, and again when they’re on their way back.</p>
      </div>

      <img src='' />
    </section>
  )
}

export default Confirmation;
