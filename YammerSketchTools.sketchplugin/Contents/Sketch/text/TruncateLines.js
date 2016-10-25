/**
 * ### Text / :scissors: Truncate text lines
 * **Shortcut:** ctrl alt cmd t
 * 
 * Cut the number of lines of a textbox, adding an ellipsis if needed. It works using works or characters.
 * 
 * Most of the ideas are taken from the [sketch data populator plugin](https://github.com/preciousforever/sketch-data-populator/).
 * 
 * ![Trim](doc/assets/trimline-word.gif)
 * 
 * ![Trim](doc/assets/trimline-character.gif)
 *
 */

 var onRun = function(context) {
  var doc = context.document;
  var selection = context.selection;

  // Ask for some info
  var options = ['Truncate words', 'Truncate characters']
  var choices = createDialog('How many lines do you need?', options, 0)
  var lines = choices[1];
  var go = choices[0] == 1000 ? true : false;
  var truncateMode = choices[2];

  if(lines && go) {

    selection.forEach(function(layer){
      if(isLayerText(layer)) {
        var ellipsis; 
        var text = String(layer.stringValue());

        // Creates a duplicated text field to use it as a playground 
        var layerCopy = layer.duplicate();
        layerCopy.setStringValue('-');
        refreshTextLayer(layerCopy);

        // Defines the height of the line
        var lineHeight = layerCopy.frame().height();

        // Get ready to iterate
        layerCopy.setStringValue(text);
        refreshTextLayer(layerCopy);
        actualHeight = layerCopy.frame().height();


        while (actualHeight > lineHeight * lines) {
          if(truncateMode > 0) {
            text = text.slice(0,-1);
          } else {
            text = text.split(' ');
            text.pop();
            text = text.join(' ');
          }

          // get the string and remove punctuation
          ellipsis = text;
          if(ellipsis.slice(-1).match(/[\,\.\;\:\-\n\r]/)) { ellipsis = ellipsis.slice(0,-1) }
          ellipsis = ellipsis + '…';
          log(ellipsis)

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

  function createDialog(msg, items, selectedItemIndex) {
    selectedItemIndex = selectedItemIndex || 0

    var accessoryInput = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,25));
    var input = NSTextField.alloc().initWithFrame(NSMakeRect(0,0,300,25));
    input.editable = true;
    input.stringValue = '2';
    accessoryInput.addSubview(input);

    var accessoryList = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,160,25));
    accessoryList.addItemsWithObjectValues(items);
    accessoryList.selectItemAtIndex(selectedItemIndex);

    var alert = COSAlertWindow.alloc().init();
    alert.setMessageText(msg);
    alert.addButtonWithTitle('OK');
    alert.addButtonWithTitle('Cancel');
    alert.addAccessoryView(accessoryInput);
    alert.addAccessoryView(accessoryList);

    var responseCode = alert.runModal();

    return [responseCode, input.stringValue(), accessoryList.indexOfSelectedItem()];
  }

}
