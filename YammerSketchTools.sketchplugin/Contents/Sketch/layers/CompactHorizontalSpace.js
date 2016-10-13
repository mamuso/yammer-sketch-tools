/**
 * ### Layers / :arrow_left: Compact Horizontal Space
 * **Shortcut:** ctrl alt cmd ←
 * 
 * Distributes the selected elements horizontally removing the spacing between them. The code is borrowed from @bomberstudios [Sketch Commands](https://github.com/bomberstudios/sketch-commands/blob/master/Sketch%20Commands.sketchplugin/Contents/Sketch/Align/Space%20Horizontal.cocoascript) and slightly modified.
 * 
 * ![Unlock](doc/assets/compacthorizontal.gif)
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
    return a.frame().left() - b.frame().left();
  }

  var sorted_selection = toJSArray(selection).sort(sort_by_position),
      first_element = sorted_selection[0],
      left_position = first_element.frame().left();

  sorted_selection.forEach(function(layer){
    layer.frame().setX(left_position);
    left_position = layer.frame().left() + layer.frame().width();
  });
}