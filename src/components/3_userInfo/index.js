import { h, Component } from 'preact';
import { route } from 'preact-router';
import request from 'superagent';
import Unsuccessful from './unsuccessful.js';
import Loading from '../common/loading.js';
import './userInfo.scss';


export default class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false
    }
    this.createOrderObj = this.createOrderObj.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.startOver = this.startOver.bind(this);
  }

  componentWillMount() {
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

    this.props.setAppState({
      history: [...this.props.state.history, window.location.pathname]
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
      this.category = 'womens';
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
    let apiUrl = '';
    let orderObject = this.createOrderObj();

    this.setState({ loading: true });

    if (window.location.href.indexOf('local') > -1) {
      apiUrl = 'https://ebaef735.ngrok.io/order';
    } else {
      apiUrl = 'https://tm-cobbler.herokuapp.com/order';
    }

    request.post(apiUrl)
      .send(orderObject)
      .set('Accept', 'application/json')

      .then(function(res) {
        if (JSON.parse(res.body.status) == 200) {
          console.log('successful post to api')
          window.scrollTo(0, 0);
          route('/complete');
        } else {
          console.log('unsuccessful post to api')
          this.setState({ loading: false, error: true });
        }

      }.bind(this))
      .catch(function(err) {
        if (err) {
          console.log('error', err);
        }
      }.bind(this));
  }

  updateInputValue(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  startOver(){
    route('/');
  }

  render(props, state) {
    console.log('info state', state)

    return (
      <section className='page-container'>
        <section className='user-info-page'>
          {this.state.loading ? <Loading /> : null }
          {this.state.error ? <Unsuccessful startOver={this.startOver} /> : null }

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
            onClick={this.submitOrder}>SUBMIT REQUEST</button>
        </section>
      </section>
    );
  }
}
