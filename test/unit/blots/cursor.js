import Quill from '../../../core/quill';
import Delta from 'quill-delta';

describe('Cursor', function() {
  it("Restore after input after cursor", function(done) {
      let expectedDeltaAfterInput = new Delta().insert('AB', { bold: true }).insert('\n');
      let quill = this.initialize(Quill, '');
      quill.format("bold", true);
      // Put cursor after invisible space
      let cursor = document.getElementsByClassName("ql-cursor")[0];
      window.getSelection().setBaseAndExtent(cursor.childNodes[0], 1, cursor.childNodes[0], 1);
      document.execCommand("insertText", false, "A");
      setTimeout(() => {
        document.execCommand("insertText", false, "B");
        setTimeout(() => {
          expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
          done();
        }, 2);
      }, 2);
  });
  it("Restore after input before cursor", function(done) {
      let expectedDeltaAfterInput = new Delta().insert('AB', { bold: true }).insert('\n');
      let quill = this.initialize(Quill, '');
      quill.format("bold", true);
      // Put cursor before invisible space
      let cursor = document.getElementsByClassName("ql-cursor")[0];
      window.getSelection().setBaseAndExtent(cursor.childNodes[0], 0, cursor.childNodes[0], 0);
      document.execCommand("insertText", false, "A");
      setTimeout(() => {
        document.execCommand("insertText", false, "B");
        setTimeout(() => {
          expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
          done();
        }, 2);
      }, 2);
  });
  it("Restore after input instead of cursor", function(done) {
      let expectedDeltaAfterInput = new Delta().insert('AB', { bold: true }).insert('\n');
      let quill = this.initialize(Quill, '');
      quill.format("bold", true);
      // Select invisible space inside cursor
      let cursor = document.getElementsByClassName("ql-cursor")[0];
      window.getSelection().setBaseAndExtent(cursor.childNodes[0], 0, cursor.childNodes[0], 1);
      document.execCommand("insertText", false, "A");
      setTimeout(() => {
        document.execCommand("insertText", false, "B");
        setTimeout(() => {
          expect(quill.getContents()).toEqual(expectedDeltaAfterInput);
          done();
        }, 2);
      }, 2);
  });
});
