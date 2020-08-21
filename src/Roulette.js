import { Component } from 'inferno';
import './assets/roulette_red.png';
import './assets/roulette_blue.png';
import './assets/roulette_gold.png';
import './Roulette.css';

class Roulette extends Component {
  state = {
    seconds: 20,
    milliseconds: 0,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      console.log('hi')
      const { seconds, milliseconds } = this.state
      if (seconds > 0) {
        if (milliseconds === 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
            milliseconds: 99
          }));
        } else {
          this.setState(({ milliseconds }) => ({
            milliseconds: milliseconds - 1
          }));
        }
      } else if (milliseconds > 0) {
        this.setState(({ milliseconds }) => ({
          milliseconds: milliseconds - 1
        }));
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    const countdown = `${this.state.seconds}.${this.state.milliseconds}`;

    const spinItems = [];

    for (let i = 0; i < 3; i++) {
      spinItems.push(<div className="spin red" />);
      spinItems.push(<div className="spin blue" />);
    }

    return (
      <div className="App">
        <div className="roulette">
          <div className="roulette-roller">
            <div className="rolling">Rolling</div>
            <div className="countdown">{ countdown }</div>
          </div>

          <div className="roulette-mask" />

          <div className="roulette-indicator hidden" />

          <div className="roulette-spin-items">
            { spinItems }
            <div className="spin gold" />
            { spinItems }
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
