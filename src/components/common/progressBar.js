import { h, Component } from 'preact';
import { route } from 'preact-router';


export default class Progress extends Component {
  constructor() {
    super();
    // this.navigateBack = this.navigateBack.bind(this);
    // this.exitCobbler = this.exitCobbler.bind(this);
  }

  // navigateBack() {
  //   let urls = {
  //     0: '/',
  //     1: '/step_1',
  //     2: '/step_2',
  //     3: '/step_3',
  //   }
  //
  //   let newPage = this.props.state.page - 1;
  //   let newUrl = urls[newPage];
  //
  //   this.props.setAppState({
  //     page: newPage,
  //     url: newUrl
  //   });
  //   route(newUrl);
  // }
  //
  // exitCobbler() {
  //   this.props.setAppState({
  //     page: 0,
  //     url: '/'
  //   });
  //   route('/');
  // }

  render(props) {
    return (
      <section className="progress-bar">
        <div>
         PROGRESS

        </div>
      </section>
    );
  }
}

// export default class Progress extends Component {
//   constructor() {
//     super();
//     this.navigateBack = this.navigateBack.bind(this);
//     this.exitCobbler = this.exitCobbler.bind(this);
//   }
//
//   navigateBack() {
//     let urls = {
//       0: '/',
//       1: '/step_1',
//       2: '/step_2',
//       3: '/step_3',
//     }
//
//     let newPage = this.props.state.page - 1;
//     let newUrl = urls[newPage];
//
//     this.props.setAppState({
//       page: newPage,
//       url: newUrl
//     });
//     route(newUrl);
//   }
//
//   exitCobbler() {
//     this.props.setAppState({
//       page: 0,
//       url: '/'
//     });
//     route('/');
//   }
//
//   render(props) {
//     return (
//       <section className="progress-bar">
//         <div>
//           <div className="nav-button back" onClick={ this.navigateBack }>BACK</div>
//           <h3>{ props.state.page } of 3</h3>
//           <div className="nav-button exit" onClick={ this.exitCobbler }>X</div>
//         </div>
//       </section>
//     );
//   }
// }
