import { h, Component } from 'preact';
import { route } from 'preact-router';
// import Shoe from './shoe';
import Progress from '../common/progressBar';
import request from 'superagent';

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



export default class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.createOrderObj = this.createOrderObj.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

  }

  componentWillMount() {

    console.log(this.props);

    this.setState({
      first: this.props.state.data[0].customer.first_name || '',
      last: this.props.state.data[0].customer.last_name || '',
      address1: this.props.state.data[0].customer.address1 || '',
      address2: this.props.state.data[0].customer.address2 || '',
      city: this.props.state.data[0].customer.city || '',
      state: this.props.state.data[0].customer.province_code || '',
      zip: this.props.state.data[0].customer.zip || '',
      phone: this.props.state.data[0].customer.phone || ''
    });
  }

  createOrderObj(){
    let result = { order: {} };
    let data = this.props.state.data;

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
      this.category = 'Womens';
      this.associate_comments = variant;
      this.repair_ids = repairIds;
      this.size = size;
    }

    result.order['attributes'] = new OrderAttributes(
      this.state.first + ' ' + this.state.last,
      data[0].order,
      this.state.first,
      this.state.last,
      this.state.phone,
      this.props.state.email);

    result.order['order_address_attributes'] = new OrderAddress(
      this.state.address1,
      this.state.address2,
      this.state.city,
      this.state.state,
      this.state.zip,
      this.state.phone);

    result.order['line_items_attributes'] = { 0: new OrderLineItem(
      data[this.props.state.selectedShoeIndex].variant,
      this.props.state.selectedRepairs,
      data[this.props.state.selectedShoeIndex].options.split(' / ')[1])
    };
    return result;
  }

  submitOrder(e){
    e.preventDefault();

    let orderObject = this.createOrderObj();

    request.post('https://4cfb0fbc.ngrok.io/order')
      .send(orderObject)
      .set('Accept', 'application/json')
      .then(function(res) {
         alert('yay got ' + JSON.stringify(res.body));

         // this.props.setAppState({ data: res.body, prevView: this.props.state.currView, currView: "/step_1", step: 1 });
         // route('/step_1');
      }.bind(this))
      .catch(function(err) {
        if (err) {
          // need more error handling
          console.log(err)
          // this.setState({ errorMsg: err.response.text, errorClassName: 'email-error' });
        }
      }.bind(this));

  }

  updateInputValue(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(props, state) {
    console.log('info state', state)

    return (
      <section>
        <Progress className="progressBar" state={ props.state } setAppState={ props.setAppState } />
        <h1>Let’s make sure our info for you is still correct:</h1>

        <div>
          <input value={this.state.first} onChange={this.updateInputValue} placeholder="First Name" name="first" />
          <input value={this.state.last} onChange={this.updateInputValue} placeholder="Last Name" name="last" />
          <input value={this.state.address1} onChange={this.updateInputValue} placeholder="Address Line 1" name="address1" />
          <input value={this.state.address2} onChange={this.updateInputValue} placeholder="Address Line 2" name="address2" />
          <input value={this.state.city} onChange={this.updateInputValue} placeholder="City" name="city" />
          <input value={this.state.state} onChange={this.updateInputValue} placeholder="State" name="state" />
          <input value={this.state.zip} onChange={this.updateInputValue} placeholder="Zip Code" name="zip"/>
          <input value={this.state.phone} onChange={this.updateInputValue} placeholder="Phone Number" name="phone" />
        </div>

        <button
          className=""
          onClick={this.submitOrder}>
          SUBMIT ORDER
        </button>

      </section>
    );
  }
}
