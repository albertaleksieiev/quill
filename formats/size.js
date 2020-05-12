import Parchment from 'parchment';

let SizeStyle = new Parchment.Attributor.Style('size', 'font-size', {
  scope: Parchment.Scope.INLINE
});

export { SizeStyle };
