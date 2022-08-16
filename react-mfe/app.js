import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

  render() {
    const reactVersion = require('./package.json').dependencies['react'];
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
    return ([
        <h1 key='mfe'>
         <img style= {{marginRight: "10px"}} src={logoUrl} height="30"></img>
          React MFE
        </h1>,
        <p key='version'>
          React Version: {reactVersion}
        </p>,
    ])
  }
}

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define('react-element', ReactMfe);