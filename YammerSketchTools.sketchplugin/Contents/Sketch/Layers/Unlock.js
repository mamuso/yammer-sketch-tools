/**
 * ### Layers / 🔓 Unlock All the Layers
 * **Shortcut:** ctrl alt cmd u
 *
 * Unlocks all the layers of the current artboard. If there are no artboards in the document, then it unlocks all the layers of the current page. 
 *
 * We found inspiration in [this article](https://blog.truthlabs.com/sketch-plugin-unlock-all-layers-1ff9252f0689#.layqla2bc). 
 * 
 * ![Unlock](doc/assets/unlock.gif)
 * 
 */

 var onRun = function(context) {
  try {
    var doc = context.document,
    page = doc.currentPage(),
    artboard = page.currentArtboard(),
    layers = artboard == null ? page.children() : artboard.children(),
    unlocked = 0;

    for (var i = 0; i < layers.count(); i++) {
      var layer = layers[i];

      if (layer.isLocked()) {
        layer.setIsLocked(false);
        unlocked++;
      }
    }

    doc.showMessage("🔓 " + unlocked + " layers unlocked");

  } catch (e) {
    NSApplication.sharedApplication().displayDialog_withTitle_(e, "Something went 💩");
  }
}
