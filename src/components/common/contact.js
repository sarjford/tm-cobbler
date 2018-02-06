import { h, Component } from 'preact';
import './contact.scss';


const Contact = function(props) {

  return (
    <section className='contact-us'>
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

export default Contact;
