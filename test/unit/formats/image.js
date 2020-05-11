import Delta from 'quill-delta';
import Editor from '../../../core/editor';


describe('Image', function() {
  it('plain', function() {
    let editor = this.initialize(Editor, '<img src="somewhere.png">');
    expect(editor.getDelta()).toEqual(new Delta().insert({image: "somewhere.png"}).insert('\n'));
  });
  it('with size in attributes', function() {
    let editor = this.initialize(Editor, '<img src="somewhere.png" width="100px" height="200px">');
    expect(editor.getDelta()).toEqual(new Delta().insert({image: "somewhere.png"}, {width: "100px", height:"200px"}).insert('\n'));
  });
  it('with size in styles', function() {
    let editor = this.initialize(Editor, '<img src="somewhere.png" style="width:100px; height:200px">');
    expect(editor.getDelta()).toEqual(new Delta().insert({image: "somewhere.png"}, {width: "100px", height:"200px"}).insert('\n'));
  });
  it('with size in styles and attributes', function() {
    let editor = this.initialize(Editor, '<img src="somewhere.png" width="400px" height="300px" style="width:100px; height:200px">');
    expect(editor.getDelta()).toEqual(new Delta().insert({image: "somewhere.png"}, {width: "100px", height:"200px"}).insert('\n'));
  });
  it('set size', function() {
    let editor = this.initialize(Editor, '<img src="somewhere.png" width="400px" height="300px" style="width:100px; height:200px">');
    editor.formatText(0, 1, { width: "700px", height: "900px" });
    expect(editor.getDelta()).toEqual(new Delta().insert({image: "somewhere.png"}, {width: "700px", height:"900px"}).insert('\n'));
  });
});
