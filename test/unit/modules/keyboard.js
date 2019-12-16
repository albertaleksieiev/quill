import Keyboard, { SHORTKEY } from '../../../modules/keyboard';
import { Range } from '../../../core/selection';
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

    it("Preserve format on list autostart", function() {
        let originalDelta = new Delta().insert('1.', { bold: true });
        let expectedDeltaAfterInput = new Delta().insert('A', { bold: true }).insert('\n', { list: "ordered" });

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 32 }))
        quill.insertText(quill.getLength() - 1, "A")
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);

    });

    it("Delete list line", function() {
        let originalDelta = new Delta().insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" })
                                        .insert('B', { bold: true })
                                        .insert('\n', { list: "ordered" });
        let expectedDeltaAfterInput = new Delta().insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" });

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
        expect(quill.getSelection()).toEqual(new Range(1, 0));

    });
    it("Delete first and only list line when there is text before it", function() {
        let originalDelta = new Delta().insert('1\n')
                                        .insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" });
        let expectedDeltaAfterInput = new Delta().insert('1\n');

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
        expect(quill.getSelection()).toEqual(new Range(1, 0));

    });
    it("Delete first and only list line", function() {
        let originalDelta = new Delta().insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" });
        let expectedDeltaAfterInput = new Delta().insert('\n');

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
        expect(quill.getSelection()).toEqual(new Range(0, 0));

    });
    it("Delete indented line when there is one empty before", function() {
        let originalDelta = new Delta().insert('A', { bold: true })
                                        .insert('\n', { indent: 1})
                                        .insert('\n', { indent: 1})
                                        .insert('\n', { indent: 1});
        let expectedDeltaAfterInput = new Delta().insert('A', { bold: true })
                                                  .insert('\n\n', { indent: 1});

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 8 }))// backspace
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
    });

    it("Stop list on hift+Enter on empty line", function() {
        let originalDelta = new Delta().insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" })
                                        .insert('\n', { list: "ordered" });
        let expectedDeltaAfterInput = new Delta().insert('A', { bold: true })
                                        .insert('\n', { list: "ordered" })
                                        .insert('\n');

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 13, shiftKey: true }))// enter
        expect(quill.getContents()).toEqual(expectedDeltaAfterInput);

    });
    it("Save format after tab", function(done) {
        let originalDelta = new Delta().insert('ABC', { bold: true });
        let expectedDeltaAfterInput = new Delta().insert('ABC\t123', { bold: true }).insert('\n');

        let quill = this.initialize(Quill, '');
        quill.setContents(originalDelta);
        quill.setSelection(quill.getLength() - 1, 0);

        quill.root.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 9}))// tab
        document.execCommand("insertText", false, "123");
        setTimeout(() => {
          expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
          done();
        }, 2);
    });
  });
});
