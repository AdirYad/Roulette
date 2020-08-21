import { Component } from 'inferno';
import './Roulette.css';

class Roulette extends Component {
  render() {
    return (
      <div className="App">
        <div className="roulette">
          <div className="roulette-roller">
            <div className="rolling">Rolling</div>
            <div className="countdown">15</div>
          </div>

          <div className="roulette-mask" />

          <div className="roulette-indicator hidden" />

          <div className="roulette-spin-items">
            <div className="spin red" />
            <div className="spin blue" />
            <div className="spin red" />
            <div className="spin blue" />
            <div className="spin red" />
            <div className="spin blue" />
            <div className="spin gold" />
            <div className="spin red" />
            <div className="spin blue" />
            <div className="spin red" />
            <div className="spin blue" />
            <div className="spin red" />
            <div className="spin blue" />
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
