import { render } from 'inferno';
import './index.css';
import Roulette from './Roulette';
import * as serviceWorker from './serviceWorker';

render(<Roulette />, document.getElementById('root'));

serviceWorker.unregister();
