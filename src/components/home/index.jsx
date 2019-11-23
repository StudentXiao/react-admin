import React, {Component} from 'react';
import checklogin from '../../containers/with-check-login/checkLogin';

@checklogin
class Home extends Component {
  render() {
    return (
      <div>
        home....
      </div>
    );
  }
}

export default Home;