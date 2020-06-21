import React, { Component } from 'react';
import Forms from './Forms';

export default class InputPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected:undefined
    }
    this.formOptions = [
      'initial'
    ];
  }

  createFormButtons = () => {
    return this.formOptions.map(formOption => (
      <div className="col">
        <div className="btn green" onClick={(e) => this.selectForm(formOption)}>{formOption}</div>
      </div>
    ));
  }

  selectForm = (formOption) => {
    this.setState({selected:formOption});
  }

  render() {
    return (
      <div className="container">
        <span>InputPage</span>
        <div className="row">
          {this.createFormButtons()}
        </div>
        <div className="row">
          {this.state.selected}
          {this.state.selected ? <Forms formName={this.state.selected} email={this.props.currentUser} /> : null}
        </div>
      </div>
    )
  }
}
