import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Home from './0_home';
import Shoes from './1_shoes';
import Repairs from './2_repairs';
import userInfo from './3_userInfo';
import Confirmation from './5_confirmation';
import Overview from './4_overview';


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


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      text: 'hello',
      currView: '/',
      prevView: '',
      step: 0,
      data: [],
      selectedShoe: {
        variantId: '',
        repairId: '',
        size: ''
      }
      //   [
      //     {
      //     customer: {id: 181085437973, customer_id: 166503874581, first_name: "Purvisha", last_name: "Patel", company: null },
      //     date: "2018-01-13T14:23:14-08:00",
      //     imageId: 541077110805,
      //     imageSrc: "https://cdn.shopify.com/s/files/1/1103/4464/products/Chaud_High_105_Silver_Specchio_Pump_PDP_1_Slant.jpg?v=1515950998",
      //     name: "Chaud - Specchio",
      //     options: "SILVER / 40 / 105MM",
      //     price: "625.00",
      //     product: 26432307221,
      //     variant: 251488763925
      //   },
      //   {
      //     customer: {id: 181085437973, customer_id: 166503874581, first_name: "Purvisha", last_name: "Patel", company: null },
      //     date: "2018-01-13T14:23:14-08:00",
      //     imageId: 25868315861,
      //     imageSrc: "https://cdn.shopify.com/s/files/1/1103/4464/products/Linger_105_Black_Velvet_Boot_PDP_01_Slant.jpg?v=1509394223",
      //     name: "Linger Knee High - Velvet",
      //     options: "BLACK / 40 / 105MM",
      //     price: "795.00",
      //     product: 8856471238,
      //     variant: 31954897606
      //   }
      // ]

    };
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(obj) {
    this.setState.bind(this)(obj);
  }

  render({}, { setAppState, state }) {
    console.log('App')

    console.log('state', this.state)


		return (
      <Router>
        <Home path="/" state={ this.state } setAppState={ this.setAppState } />
        <Shoes path="/step_1" state={ this.state } setAppState={ this.setAppState } />
        <Repairs path="/step_2" state={ this.state } setAppState={ this.setAppState } />
        <userInfo path="/step_3" state={ this.state } setAppState={ this.setAppState } />
        <Overview path="/step_4" state={ this.state } setAppState={ this.setAppState } />
        <Confirmation path="/complete" state={ this.state } setAppState={ this.setAppState } />
      </Router>
		);
	}
}
