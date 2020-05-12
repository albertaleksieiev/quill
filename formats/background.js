import Parchment from 'parchment';
import { ColorAttributor } from './color';

let BackgroundStyle = new ColorAttributor('background', 'background-color', {
  scope: Parchment.Scope.INLINE
});

export { BackgroundStyle };
