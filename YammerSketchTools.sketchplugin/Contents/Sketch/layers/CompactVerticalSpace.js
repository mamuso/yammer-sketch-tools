/**
 * ### Layers / :arrow_up: Compact Vertical Space
 * **Shortcut:** ctrl alt cmd ↑
 * 
 * Distributes the selected elements vertically removing the spacing between them. The code is borrowed from @bomberstudios [Sketch Commands](https://github.com/bomberstudios/sketch-commands/blob/master/Sketch%20Commands.sketchplugin/Contents/Sketch/Align/Space%20Vertical.cocoascript) and slightly modified.
 * 
 * ![Unlock](doc/assets/compactvertical.gif)
 * 
 */

var onRun = function(context) {
  var doc = context.document,
      selection = context.selection

  function toJSArray(arr) {
    var len = arr.count(),
        res = [];
    while(len--){
      res.push(arr[len]);
    }
    return res;
  }

  function sort_by_position(a,b){
    return a.frame().top() - b.frame().top();
  }

  var sorted_selection = toJSArray(selection).sort(sort_by_position),
      first_element = sorted_selection[0],
      top_position = first_element.frame().top();

  sorted_selection.forEach(function(layer){
    layer.frame().setY(top_position);
    top_position = layer.frame().top() + layer.frame().height();
  });

}