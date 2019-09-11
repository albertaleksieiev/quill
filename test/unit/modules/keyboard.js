import Keyboard, { SHORTKEY } from '../../../modules/keyboard';
import Quill from '../../../core/quill';
import Delta from 'quill-delta';


describe('Keyboard', function() {
  describe('match', function() {
    it('no modifiers', function() {
      let binding = {
        key: 'a'
      };
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(true);
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(false);
    });

    it('simple modifier', function() {
      let binding = {
        key: 'a',
        shiftKey: true
      };
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(false);
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(true);
    });

    it('optional modifier', function() {
      let binding = {
        key: 'a',
        shiftKey: null
      };
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(true);
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(true);
    });

    it('shortkey modifier', function() {
      let binding = {
        key: 'a',
        shortKey: true
      };
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(false);
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        [SHORTKEY]: true
      }, binding)).toBe(true);
    });

    it('native shortkey modifier', function() {
      let binding = {
        key: 'a',
        [SHORTKEY]: true
      };
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }, binding)).toBe(false);
      expect(Keyboard.match({
        keyCode: 'A'.charCodeAt(0),
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        [SHORTKEY]: true
      }, binding)).toBe(true);
    });

    it("List autostart", function() {
        let originalDelta = new Delta().insert('1.', { bold: true });
        let expectedDeltaAfterInput = new Delta().insert('A', { bold: true }).insert('\n', { list: "ordered" });

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 32 }))
        quill.insertText(quill.getLength() - 1, "A")
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);

    });
  });
});
