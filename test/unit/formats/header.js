import Delta from 'quill-delta';
import Quill from '../../../core';


describe('Header', function() {
  it('parse', function() {
    let expectedDelta = new Delta()
                            .insert('Test', { size: '26px', bold: true })
                            .insert('\n\n')
    let quill = this.initialize(Quill, '');
    quill.clipboard.dangerouslyPasteHTML(0, '<h1>Test</h1>')
    expect(quill.getContents()).toEqual(expectedDelta);
  });

  it('parse with font', function() {
    let expectedDelta = new Delta()
                            .insert('Test', { size: '8px', bold: true })
                            .insert('\n\n')
    let quill = this.initialize(Quill, '');
    quill.clipboard.dangerouslyPasteHTML(0, '<h1 style="font-size: 8px">Test</h1>')
    expect(quill.getContents()).toEqual(expectedDelta);
  });

  it('is block', function() {
    let expectedDelta = new Delta()
                            .insert('Test', { size: '26px', bold: true })
                            .insert('\n')
                            .insert('After\n');
    let quill = this.initialize(Quill, '');
    quill.clipboard.dangerouslyPasteHTML(0, '<h1>Test</h1>After')
    expect(quill.getContents()).toEqual(expectedDelta);
  });
});
