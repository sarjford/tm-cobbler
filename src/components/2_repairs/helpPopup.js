import { h, Component } from 'preact';


const Help = function(props) {

  return (
    <section>
      <p onClick={props.hide}>X</p>
      <p>{ props }</p>
      <h4>Need more?</h4>
      <p>Reach out to our client services team if you have some serious shoe needs and we’ll get you setup:</p>
      <div>
        <img src="" />
        <p>Call</p>
        <a href="tel:+18664195500">866.419.5500</a>
      </div>
      <div>
        <img src="" />
        <a href="mailto:atyourservice@tamaramellon.com">Email</a>
      </div>
    </section>
  )
}

export default Help;
