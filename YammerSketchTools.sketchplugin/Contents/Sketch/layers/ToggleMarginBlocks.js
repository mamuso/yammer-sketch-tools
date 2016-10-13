/**
 * ### Layers / 👏 Toggle Margin Boxes
 * **Shortcut:** ctrl alt cmd m
 *
 * Toggles the visibility of layers with named ```y-marginbox```, using the first element found as a reference for showing or hiding the elements. 
 * 
 * - If you don't select anything and you don't have artboards, it will toggle the layers of your current page. 
 * - If you are using artboards, it will toggle the layers of your current artboard.
 * - If you have selected some layers or groups, it will toggle just the layers included in the selection.
 *
 * ![Unlock](doc/assets/marginbox.gif)
 * 
 */

 @import '../library/io.mamuso.tools.cocoascript';

 var onRun = function(context) {
  try {

    var doc = context.document,
        page = doc.currentPage(),
        artboard = page.currentArtboard(),
        selection = context.selection
        layers = null
        visible = null;

    if (page) { layers = page }
    if (artboard) { layers = artboard }
    if (selection.count() > 0) { layers = selection }

    if (layers.class() == '__NSArrayI') {
      for (var i = 0; i < layers.count(); i++) {
        toggleMarginBox(layers[i].children());
      }
    } else {
        toggleMarginBox(layers.children());
    }

    doc.showMessage("👏 Done!");

    function toggleMarginBox(layers) {
      var marginbox = io.mamuso.tools.findObjectsByName("y-marginbox", layers);
      if (marginbox.count() > 0) {
        visible = visible == null? !marginbox.firstObject().isVisible() : visible; 
      }

      for (var i = 0; i < marginbox.count(); i++) {
        marginbox[i].setIsVisible(visible);
      }

    }

  } catch (e) {
    NSApplication.sharedApplication().displayDialog_withTitle_(e, "Something went 💩");
  }
}
