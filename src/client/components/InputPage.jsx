import React, { Component } from 'react';
import Forms from './Forms';
import NutritionalInformationForm  from './NutritionalInformation';

export default class InputPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected:undefined
    }
    this.formOptions = {
      'Initial Signup':'initial',
      'AM Checklist':'am_checklist',
      'PM Checklist':'pm_checklist',
      'Add meal': 'meals'
    }
  }

  createFormButtons = () => {
    const formTitles = Object.keys(this.formOptions);
    return formTitles.map(formOption => (
      <div className="col">
        <div className="btn green" onClick={(e) => this.selectForm(this.formOptions[formOption])}>{formOption}</div>
      </div>
    ));
  }

  selectForm = (formOption) => {
    this.setState({selected:formOption});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.createFormButtons()}
        </div>
        <div className="row">          
          {this.state.selected ? this.state.selected === 'meals' ? <NutritionalInformationForm />:
            <Forms formName={this.state.selected} email={this.props.currentUser.email} /> : null}
        </div>
      </div>
    )
  }
}
