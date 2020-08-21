import { render } from 'inferno';
import Roulette from './Roulette';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Roulette />, div);
});
