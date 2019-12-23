import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import Logo from "../../assets/logo.png";
import Modal from "react-animated-modal";
import "./landingPage.css";
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      data: "",
      geolocationInfo: "",
      showModal: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.props.isGeolocationAvailable) {
      this.setState({
        geolocationInfo: "Your browser does not support Geolocation"
      });
    } else if (!this.props.isGeolocationEnabled) {
      this.setState({
        geolocationInfo: "Geolocation is not enabled"
      });
    } else if (this.props.coords) {
      console.log(this.props.coords.latitude, this.props.coords.longitude);
      fetch(
        `https://wainnakel.com/api/v1/GenerateFS.php?uid=${this.props.coords.latitude},${this.props.coords.longitude}&get_param=value`
      )
        .then(response => response.json())
        .then(data =>
          this.setState({ data, showModal: true }, () =>
            console.log(this.state.data)
          )
        );
    }
  }
  render() {
    return (
      <div className="landingPage">
        <img src={Logo} alt="" />
        <button className="suggest" onClick={() => this.handleClick()}>
          اقترح
        </button>
        <p className="info">{this.state.geolocationInfo}</p>
        <Modal
          visible={this.state.showModal}
          closemodal={() => this.setState({ showModal: false })}
          type="fadeIn"
        >
          <h2>{this.state.data.name}</h2>
          <h3>{this.state.data.cat}</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.7089906704336!2d46.61366101508151!3d24.80541645357032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee473bdb6af49%3A0xcb712322be293868!2s8121%20Wag%20Valley%2C%20Al%20Malqa%2C%20Riyadh%2013521%C2%A03134!5e0!3m2!1sen!2ssa!4v1577125261380!5m2!1sen!2ssa"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
          />
          <button className="other" onClick={() => this.handleClick()}>
            اقتراح آخر
          </button>
        </Modal>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(LandingPage);
