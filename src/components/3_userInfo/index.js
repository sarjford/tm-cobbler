import { h, Component } from 'preact';
import { route } from 'preact-router';
// import Shoe from './shoe';
import Progress from '../common/progressBar';
import request from 'superagent';




export default class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {
      : '1'
    }
    this.createOrderObj = this.createOrderObj.bind(this);
    this.submitOrder = this.submitOrder.bind(this);

  }

  createOrderObj(formFirstName, formLastName, formLine1, formLine2, formCity, formState, formZip, formPhone){
    // {
    //    order: {
    //       attributes: {
    //          channel: "tm", // is this our code?
    //          store_name: "API", // ask brendan to add this to our co.
    //          creator: "", // customer name
    //          ref_number: "", // order #
    //          customer_first_name: "",
    //          customer_last_name: "",
    //          phone: "",
    //          email: ""
    //       },
    //       order_address_attributes: {
    //          line1: "",
    //          line2: "",
    //          city: "",
    //          state: "",
    //          zip: ""
    //       },
    //       line_items_attributes:{
    //          0: {
    //             category: "womens",
    //             associate_comments: "", // send variant ID
    //             repair_ids: [ "1", "4" ], // ask brendan
    //             style_id: "9", // ask brendan
    //             material_id: "4", // ask brendan
    //             size: ""
    //          }
    //       }
    //    }
    // }
    let result = { order: {} };
    let

    function OrderAttributes(creator, orderNum, firstName, lastName, phone, email){
      this.channel = 'tm';
      this.store_name = 'API';
      this.creator = creator;
      this.ref_number = orderNum;
      this.customer_first_name = firstName;
      this.customer_last_name = lastName;
      this.phone = phone;
      this.email = email;
    }
    function OrderAddress(address1, address2, city, state, zip){
      this.line1 = address1;
      this.line2 = address2;
      this.city = city;
      this.state = state;
      this.zip = zip;
    }
    function OrderLineItem(variant, repairIds, size){
      this.category = 'womens';
      this.associate_comments = variant;
      this.repair_ids = repairIds;
      this.size = size;
    }

    result.order['order_address_attributes'] = new OrderAddress(formLine1, formLine2, formCity, formState, formZip, formPhone);
    result.order['attributes'] = new OrderAttributes(formName, );
    result.order['line_items_attributes'] = { 0: new OrderLineItem('1', '2', '3') };
    return result;
  }

  submitOrder(e){
    e.preventDefault();

    // save input in state

    // request.post('https://4cfb0fbc.ngrok.io/order')
    //   .send({ name: 'Manny', species: 'cat' })
    //   .set('X-API-Key', 'foobar')
    //   .set('Accept', 'application/json')
    //   .then(function(res) {
    //      alert('yay got ' + JSON.stringify(res.body));
    //
    //      // this.props.setAppState({ data: res.body, prevView: this.props.state.currView, currView: "/step_1", step: 1 });
    //      // route('/step_1');
    //   }).bind(this))
    //   .catch(function(err) {
    //     if (err) {
    //       // need more error handling
    //       console.log(err)
    //       this.setState({ errorMsg: err.response.text, errorClassName: 'email-error' });
    //     }
    //   }.bind(this));

  }

  render(props) {
    console.log('userInfo', props)

    return (
      <section>
        <Progress className="progressBar" state={ props.state } setAppState={ props.setAppState } />
        <h1>Let’s make sure our info for you is still correct:</h1>

        <div>
          <input value={ props.state.data[0].customer.first_name } placeholder="First Name"/>
          <input value={ props.state.data[0].customer.last_name } placeholder="Last Name"/>
          <input value={ props.state.data[0].customer.address1 } placeholder="Address Line 1" />
          <input value={ props.state.data[0].customer.address2 } placeholder="Address Line 2" />
          <input value={ props.state.data[0].customer.city } placeholder="City" } />
          <input value={ props.state.data[0].customer.province_code } placeholder="State" />
          <input value={ props.state.data[0].customer.zip } placeholder="Zip Code" />
          <input value={ props.state.data[0].customer.phone } placeholder="Phone Number" />
        </div>

        <button
          className=""
          onClick={this.submitOrder}
        </button>

      </section>
    );
  }
}
