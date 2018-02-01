import { h, Component } from 'preact';


const Help = function(props) {

  return (
    <section className='help'>
      <div className='exit-help-box' onClick={props.hide}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Saint_Andrew%27s_cross_black.svg/1000px-Saint_Andrew%27s_cross_black.svg.png' />
      </div>
      <div className='text'>
        <h4>Need more?</h4>
        <p>Reach out to our client services team if you have some serious shoe needs and we’ll get you setup:</p>
      </div>
      <div className='contact'>
        <img src='../../assets/phone-icon@3x.png' />
        <a href="tel:+18664195500">Call 866.419.5500</a>
      </div>
      <div className='contact'>
      <img src='../../assets/email-icon@3x.png' />
        <a href="mailto:atyourservice@tamaramellon.com">Email</a>
      </div>
    </section>
  )
}

export default Help;
