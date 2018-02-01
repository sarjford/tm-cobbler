import { h, Component } from 'preact';
import './confirmation.scss';



const Confirmation = function(props) {
  
  return (
    <section className='page-container'>
      <section className='confirmation-page'>
        <h1>Request Complete!</h1>
        <p>Now just send us your shoes.</p>
        <img src='../assets/icon-cobbler-02@3x.png' />
        <p>A pre-paid label will arrive shortly in your email inbox. Print the label and pop your shoes in a box and drop off at any FedEx drop off location.</p>
        <a href='http://www.fedex.com/us/dropbox/'>Find dropoff locations</a>

        <div className='expect-shoes-box'>
          <h1>When to expect your shoes back:</h1>
          <div></div>
          <p>About two weeks. We’ll send you an email once we receive your shoes, and again when they’re on their way back.</p>
        </div>

        <a href=''><img src='../assets/siren-105-leopard-haircalf-002-r-3-qc-paola-kudacki@3x.jpg' /></a>
      </section>
    </section>
  )
}

export default Confirmation;
