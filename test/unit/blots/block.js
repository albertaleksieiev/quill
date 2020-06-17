import Scroll from '../../../blots/scroll';


describe('Block', function() {
  it('childless', function() {
    const scroll = this.initialize(Scroll, '');
    const block = scroll.create('block');
    block.optimize();
    expect(block.domNode).toEqualHTML('<br>');
  });

  it('insert into empty', function() {
    const scroll = this.initialize(Scroll, '');
    const block = scroll.create('block');
    block.insertAt(0, 'Test');
    expect(block.domNode).toEqualHTML('Test');
  });

  it('insert newlines', function() {
    let scroll = this.initialize(Scroll, '<p><br></p>');
    scroll.insertAt(0, '\n\n\n');
    expect(scroll.domNode).toEqualHTML('<p><br></p><p><br></p><p><br></p><p><br></p>');
  });

  it('insert multiline', function() {
    let scroll = this.initialize(Scroll, '<p>Hello World!</p>');
    scroll.insertAt(6, 'pardon\nthis\n\ninterruption\n');
    expect(scroll.domNode).toEqualHTML(`
      <p>Hello pardon</p>
      <p>this</p>
      <p><br></p>
      <p>interruption</p>
      <p>World!</p>
    `);
  });

  it('delete line contents', function() {
    let scroll = this.initialize(Scroll, '<p>Hello</p><p>World!</p>');
    scroll.deleteAt(0, 5);
    expect(scroll.domNode).toEqualHTML('<p><br></p><p>World!</p>');
  });

  it('join lines', function() {
    let scroll = this.initialize(Scroll, '<p>Hello</p><p>World!</p>');
    scroll.deleteAt(5, 1);
    expect(scroll.domNode).toEqualHTML('<p>HelloWorld!</p>');
  });

  it('join line with empty', function() {
    let scroll = this.initialize(Scroll, '<p>Hello<strong>World</strong></p><p><br></p>');
    scroll.deleteAt(10, 1);
    expect(scroll.domNode).toEqualHTML('<p>Hello<strong>World</strong></p>');
  });

  it('join empty lines', function() {
    let scroll = this.initialize(Scroll, '<p><br></p><p><br></p>');
    scroll.deleteAt(1, 1);
    expect(scroll.domNode).toEqualHTML('<p><br></p>');
  });

  it('format empty', function() {
    let scroll = this.initialize(Scroll, '<p><br></p>');
    scroll.formatAt(0, 1, 'blockquote', true);
    expect(scroll.domNode).toEqualHTML('<blockquote><br></blockquote>');
  });

  it('format newline', function() {
    let scroll = this.initialize(Scroll, '<p>Hello</p>');
    scroll.formatAt(5, 1, 'blockquote', true);
    expect(scroll.domNode).toEqualHTML('<blockquote>Hello</blockquote>');
  });

  it('remove unnecessary break', function() {
    let scroll = this.initialize(Scroll, '<p>Test</p>');
    scroll.children.head.domNode.appendChild(document.createElement('br'));
    scroll.update();
    expect(scroll.domNode).toEqualHTML('<p>Test</p>');
  });
});
