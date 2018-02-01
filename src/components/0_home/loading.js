import { h, Component } from 'preact';
import './loading.scss';



const Loading = function(props) {

  return (
    <div className='loader'>
      <div className="lds-css ng-scope">
        <div className="lds-spinner" style="100%;height:100%">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loading;
