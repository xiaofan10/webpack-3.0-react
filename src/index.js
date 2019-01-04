import React from 'react';
import ReactDom from 'react-dom';
require('./xx.less');
require('./index.less');
import Header from './pages/header/header.jsx';


class App extends React.Component {
  render () {
    return(
      <div>
        <Header />
        HelloWorld!搜索色色搜索搜索sdfsdfds搜索dddss
      </div>
    )
  }
}
const a = 123;
const b = () => {
  return 324
}
class c {
  constructor() {
    this.name = '小明'
  }
}
class d {
  constructor() {
    this.name = '小hong'
  }
}
ReactDom.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}