import Text from './text';
import Parchment from 'parchment';


class Inline extends Parchment.Inline {
  static compare(self, other) {
    let selfIndex = Inline.order.indexOf(self);
    let otherIndex = Inline.order.indexOf(other);
    if (selfIndex >= 0 || otherIndex >= 0) {
      return selfIndex - otherIndex;
    } else if (self === other) {
      return 0;
    } else if (self < other) {
      return -1;
    } else {
      return 1;
    }
  }

  formatAt(index, length, name, value) {
    if (Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, Parchment.Scope.BLOT)) {
      let blot = this.isolate(index, length);
      if (value) {
        blot.wrap(name, value);
      }
    } else {
      super.formatAt(index, length, name, value);
    }
  }

  optimize(context) {
    super.optimize(context);
    if (this.parent instanceof Inline &&
        Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      let parent = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(parent);
      parent.wrap(this);
    } else if (this.parent instanceof Inline && this.parent.children.length == 1) {
      this.attributes.move(this.parent);
    }
  }
}
Inline.allowedChildren = [Inline, Parchment.Embed, Text];
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = [
  'cursor', 'link', 'inline',   // Must be lower
  'underline', 'strike', 'italic', 'bold', 'script',
  'code'        // Must be higher
];


export default Inline;
