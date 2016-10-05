/**
 * ### Layers / 🔓 Unlock All the Layers
 * **Shortcut:** ctrl alt cmd u
 *
 * Unlocks all the layers of an artboard. If you haven't selected the artboard it raises an error 
 * 
 */

var onRun = function(context) {
  try {

    var doc = context.document;
    var sketch = context.api();
    doc.showMessage("🔓");

  } catch (e) {
    NSApplication.sharedApplication().displayDialog_withTitle_(e, "Something went 💩");
  }
}
