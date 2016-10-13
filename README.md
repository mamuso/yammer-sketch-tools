# Yammer Sketch Commands
Plugins and commands we use at Yammer.

## List of available commands

### Layers / 🔓 Unlock All the Layers
**Shortcut:** ctrl alt cmd u

Unlocks all the layers of the current artboard. If there are no artboards in the document, then it unlocks all the layers of the current page. 

We found inspiration in [this article](https://blog.truthlabs.com/sketch-plugin-unlock-all-layers-1ff9252f0689#.layqla2bc). 

![Unlock](doc/assets/unlock.gif)

### Layers / 👏 Toggle Margin Boxes
**Shortcut:** ctrl alt cmd m

Toggles the visibility of layers with named ```y-marginbox```, using the first element found as a reference for showing or hiding the elements. 

- If you don't select anything and you don't have artboards, it will toggle the layers of your current page. 
- If you are using artboards, it will toggle the layers of your current artboard.
- If you have selected some layers or groups, it will toggle just the layers included in the selection.

![Unlock](doc/assets/marginbox.gif)

