import { Router } from 'preact-router';
import { h, Component } from 'preact';

import Home from './1_home';
import Shoes from './2_shoes';
import Repairs from './3_repairs';
import userInfo from './4_userInfo';
import Overview from './5_confirmation';
import Confirmation from './6_confirmation';


const Routes = (props) => (
  <Router>
    <Home path="/" state={ props.state } setAppState={ props.setAppState } />
    <Shoes path="/step_1" state={ props.state } setAppState={ props.setAppState } />
    <Repairs path="/step_2" state={ props.state } setAppState={ props.setAppState } } />
    <userInfo path="/step_3" state={ props.state } setAppState={ props.setAppState } />
    <Overview path="/step_4" state={ props.state } setAppState={ props.setAppState } />
    <Confirmation path="/complete" state={ props.state } setAppState={ props.setAppState } />
  </Router>
);
