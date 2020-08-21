import { Component } from 'inferno';
import './assets/roulette_red.png';
import './assets/roulette_blue.png';
import './assets/roulette_gold.png';
import './Roulette.css';
import moment from 'moment';

const socket = new WebSocket('wss://rustchance.com/feed');

socket.onopen = () => {
  socket.send(JSON.stringify({
    'room': 'roulette',
    'type': 'join',
    'data': null
  }))
}

class Roulette extends Component {
  state = {
    timer: {
      seconds: null,
      milliseconds: null,
    },
    isRolling: false,
    spinItems: [],
  };

  componentDidMount() {
    for (let i = 0; i < 7; i++) {
      this.state.spinItems.push(<div className="spin red" data-id={ i + 1 } />);

      if (i === 3) {
        this.state.spinItems.push(<div className="spin gold" data-id="0" />);
      }

      this.state.spinItems.push(<div className="spin blue" data-id={ 14 - 1 } />);
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'list') {
        const date = moment(data.data.current.timer);

        const timer = {
          seconds: date.toDate().getSeconds(),
          milliseconds: date.toDate().getMilliseconds() / 10,
        }

        setTimer(timer)
        startTimer();
      }

      if (data.type === 'roll') {
        const date = moment(data.data.newGame.timer);

        const timer = {
          seconds: date.toDate().getSeconds(),
          milliseconds: date.toDate().getMilliseconds() / 10,
        }

        setTimer(timer)
        startTimer();

        this.setState(() => ({
          isRolling: true,
        }));

        rollRoulette()
      }
    };

    const rollRoulette = (color) => {
      console.log(color)
    };

    const startTimer = () => {
      this.myInterval = setInterval(() => {
        const timer = this.state.timer
        const { seconds, milliseconds } = timer

        if (! seconds && ! milliseconds) {
          clearInterval(this.myInterval);
          return;
        }

        if (seconds > 0) {
          const newTimer = {
            seconds: milliseconds === 0 ? seconds - 1 : seconds,
            milliseconds: milliseconds === 0 ? 99 : milliseconds - 1,
          }

          setTimer(newTimer)
        } else {
          timer.milliseconds = timer.milliseconds - 1;

          setTimer(timer);
        }
      }, 10);
    }

    const setTimer = ({ seconds, milliseconds }) => {
      this.setState(() => ({
        timer: {
          seconds: seconds,
          milliseconds: milliseconds,
        },
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    const countdown = `${this.state.timer.seconds}.${this.state.timer.milliseconds}`;
    const isRolling = this.state.isRolling;
    const spinItems = this.state.spinItems;

    return (
      <div className="App">
        <div className="roulette">
          <div className={ `roulette-roller ${isRolling || (this.state.timer.seconds === null || this.state.timer.milliseconds === null) ? ' hidden' : ''}` }>
            <div className="rolling">Rolling</div>
            <div className="countdown">{ countdown }</div>
          </div>

          <div className={ `roulette-mask ${isRolling ? ' hidden' : ''}` } />

          <div className={ `roulette-indicator ${! isRolling ? ' hidden' : ''}` } />

          <div className="roulette-spin-items">
            { spinItems }
          </div>
        </div>
      </div>
    );
  }
}

export default Roulette;
