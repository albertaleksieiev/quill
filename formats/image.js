import Parchment from 'parchment';
import { sanitize } from '../formats/link';

const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];

const STYLES = [
  'height',
  'width'
];

class Image extends Parchment.Embed {
  static create(value) {
    let node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
    }
    return node;
  }

  static formats(domNode) {
    let attributes = ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
    let styles = STYLES.reduce(function(formats, style) {
      if (domNode.style[style]) {
        formats[style] = domNode.style[style];
      }
      return formats;
    }, {});
    return Object.assign(attributes, styles);
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data', 'cid', 'file']) ? url : '//:0';
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
      if (STYLES.indexOf(name) > -1) {
        this.domNode.style[name] = null;
      }
    } else {
      super.format(name, value);
    }
  }
}
Image.blotName = 'image';
Image.tagName = 'IMG';


export default Image;
