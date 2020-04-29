import React from "react";
import "./Switch.css";

const CREDITCARD = "Creditcard";
const BTC = "Bitcoin";

export default class Switch extends React.Component {
  state = {
    payMethod: BTC
  };

  select = choice => {
    return evt => {
      this.setState({
        payMethod: choice
      });
    };
  };

  renderChoice = choice => {
    // create a set of cssClasses to apply
    let cssClass = "choice";
    //debugger;
    if (this.state.payMethod === choice) {
      cssClass = "active"; // add .active class
    }

    return (
      <div onClick={this.select(choice)} className={cssClass}>
        {choice}
      </div>
    );
  };

  render() {
    return (
      <div className="switch">
        {this.renderChoice(CREDITCARD)}
        {this.renderChoice(BTC)}
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}
