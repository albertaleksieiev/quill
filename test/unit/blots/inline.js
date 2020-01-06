import Scroll from '../../../blots/scroll';


describe('Inline', function() {
  it('format order', function() {
    let scroll = this.initialize(Scroll, '<p>Hello World!</p>');
    scroll.formatAt(0, 1, 'bold', true);
    scroll.formatAt(0, 1, 'italic', true);
    scroll.formatAt(2, 1, 'italic', true);
    scroll.formatAt(2, 1, 'bold', true);
    expect(scroll.domNode).toEqualHTML(
      '<p><strong><em>H</em></strong>e<strong><em>l</em></strong>lo World!</p>'
    );
  });

  it('reorder', function() {
    let scroll = this.initialize(Scroll, '<p>0<strong>12</strong>3</p>');
    let p = scroll.domNode.firstChild;
    let em = document.createElement('em');
    [].slice.call(p.childNodes).forEach(function(node) {
      em.appendChild(node);
    });
    p.appendChild(em);
    expect(scroll.domNode).toEqualHTML('<p><em>0<strong>12</strong>3</em></p>');
    scroll.update();
    expect(scroll.domNode).toEqualHTML(
      '<p><em>0</em><strong><em>12</em></strong><em>3</em></p>'
    );
  });
  it('move styles to top', function(done) {
    let scroll = this.initialize(Scroll, '<p><span style="background-color: rgb(255, 0, 255);color: rgb(0, 0, 255);">123</span></p>');
    let outerSpan = scroll.domNode.childNodes[0].childNodes[0];
    // let scroll = this.initialize(Scroll, '<p><span style="background-color: rgb(255, 0, 255)"><span style="font-size: 32px">123</font></span></p>');
    let innerSpan = document.createElement("SPAN");
    innerSpan.style.color = outerSpan.style.color;
    innerSpan.innerHTML = outerSpan.innerHTML;
    outerSpan.innerHTML = "";
    outerSpan.style.color = "";

    outerSpan.appendChild(innerSpan);
      setTimeout(() => {
        expect(scroll.domNode).toEqualHTML(
          '<p><span style="background-color: rgb(255, 0, 255); color: rgb(0, 0, 255);">123</span></p>'
        );
        done();
      }, 2);
  });
});
