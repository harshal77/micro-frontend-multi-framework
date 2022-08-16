import React from 'react'
import ReactDOM from 'react-dom'

export default class ReactComponentOne extends React.Component {

  render() {
    return ([
        <p>
          React Component 1
        </p>
    ])
  }
}


class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<ReactComponentOne/>, this);
  }
}

customElements.define('react-component-1', ReactMfe);