/**
 * ### Text / :scissors: Truncate text lines
 * **Shortcut:** ctrl alt cmd t
 * 
 * Cut the number of lines of a textbox, adding an ellipsis if needed. It works using works, not characters.
 * 
 * Most of the ideas are taken from the [sketch data populator plugin](https://github.com/preciousforever/sketch-data-populator/).
 * 
 * ![Trim](doc/assets/trimline.gif)
 * 
 */

 var onRun = function(context) {
  var doc = context.document,
  selection = context.selection,
  lines = doc.askForUserInput_initialValue("How many lines do you need?", 2);

  if(lines) {

    selection.forEach(function(layer){
      if(isLayerText(layer)) {
        var ellipsis; 

        // Getting the text and converting it into an array
        var text = text = String(layer.stringValue());
        text = text.split(' ');

        // Creates a duplicated text field to use it as a playground 
        var layerCopy = layer.duplicate();
        layerCopy.setStringValue('-');
        refreshTextLayer(layerCopy);

        // Defines the height of the line
        var lineHeight = layerCopy.frame().height();

        layerCopy.setStringValue(text.join(' '));
        refreshTextLayer(layerCopy);
        actualHeight = layerCopy.frame().height();

        while (actualHeight > lineHeight * lines) {
          //trim last word
          text.pop();

          // get the string and remove characters
          ellipsis = text.join(' ')
          if(ellipsis.slice(-1).match(/[\,\.\;\:\-]/)) { ellipsis = ellipsis.slice(0,-1) }
          ellipsis = ellipsis + '…';

          //set trimmed text and re-evaluate height
          layerCopy.setStringValue(ellipsis);
          refreshTextLayer(layerCopy);
          actualHeight = layerCopy.frame().height();
        }

        if(ellipsis.length > 1) {
          layer.setStringValue(ellipsis);
        }

        layerCopy.removeFromParent();
      }
    });
  }


  // Checks if the layer is a text layer.
  function isLayerText(layer) {
    return layer.isKindOfClass(MSTextLayer.class());
  }

  // Refreshes text layer boundaries after setting text.
  function refreshTextLayer(layer) {
    layer.setHeightIsClipped(0);
    layer.adjustFrameToFit();
    layer.select_byExpandingSelection(true, false);
    layer.setIsEditingText(true);
    layer.setIsEditingText(false);
    layer.select_byExpandingSelection(false, false);
  }
}