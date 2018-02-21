/**
 * ### Icons / :ant: Export SVG Icons
 * 
 * Based on Yammer Icon MasterDoc conventions. The plugin only acts over the elements of the 
 * artboard 'icons' in the current page. This way we can manage icons also for different platform
 * with different export needs.
 *
 * For making this plugin work you need to have SVGo installed. 
 * If you have brew, try ```brew install svgo```
 * 
 * Naming conventions:
 * - The export group needs to be in a "symbol" group
 * - The icon masking the color needs to be named "mask"
 *
 * ![iconstructure](doc/assets/iconstructure.png)
 * 
 * @todo: make the plugin change pages automatically
 * 
 * 
 */

@import '../library/io.mamuso.tools.cocoascript';

var onRun = function(context) {
  try {
    var doc = context.document,
      scriptPath = context.scriptPath,
      homeFolder = "/Users/" + NSUserName();

      io.mamuso.config.doc = doc;
      io.mamuso.config.basePath = io.mamuso.tools.getDirFromPrompt();


      // Were are we saving the files?
      if(io.mamuso.config.basePath == null) {
        return;
      } else {

        // looking for the artboard named 'icons'
        var iconsPage = io.mamuso.tools.findObjectsByName("icons", doc.pages()).firstObject();

        if(iconsPage == null) {
          return;
        } else {
          // get all the icons of the page
          var icons = iconsPage.children();
          for (var i = 0; i < icons.count(); i++) {
            
            if(icons[i].class() == "MSSymbolInstance") {
              var master = icons[i].symbolMaster();
              var masterchildren = master.children();
              var icongroups = io.mamuso.tools.findObjectsOfType(MSLayerGroup, masterchildren);

              // toggling groups off
              for (var j = 0; j < icongroups.count(); j++) {
                if(icongroups[j].class() == MSLayerGroup) {
                  icongroups[j].setIsVisible(false);
                }
              }
              
              // toggle on the group we want to export
              var symbolgroup = io.mamuso.tools.findObjectsByName("symbol", icongroups).firstObject();
              if(symbolgroup != null) {
                symbolgroup.setIsVisible(true);
                var symbolelements = symbolgroup.children();
                // Toggle all the layers off except "mask" + turn the mask off
                for (var k = 0; k < symbolelements.count(); k++) {
                  if(symbolelements[k].class() != MSLayerGroup) {
                    if(symbolelements[k].name() == "mask") {
                      symbolelements[k].setIsVisible(true);
                      symbolelements[k].hasClippingMask = 0;
                      // What if is a boolean shape?
                      for (var l = 0; l < symbolelements[k].children().count(); l++) {
                        symbolelements[k].children()[l].setIsVisible(true);
                      }
                    } else {
                      symbolelements[k].setIsVisible(false);
                    }
                  }
                }

                // export the svg
                filename = master.name() + ".svg";
                filePath = io.mamuso.config.basePath.stringByAppendingPathComponent(filename);
                io.mamuso.tools.sliceAndExport(master, filePath);

              // Go back to normal
              for (var k = 0; k < symbolelements.count(); k++) {
                symbolelements[k].setIsVisible(true);
                if(symbolelements[k].class() != MSLayerGroup) {
                  if(symbolelements[k].name() == "mask") {
                    symbolelements[k].hasClippingMask = 1;
                  }
                }
              }


            }
          }
        }
        // svgo
        io.mamuso.tools.svgo();
      }
    }

  } catch (e) {
  	NSApplication.sharedApplication().displayDialog_withTitle_(e, "Something went 💩");
  }

}
