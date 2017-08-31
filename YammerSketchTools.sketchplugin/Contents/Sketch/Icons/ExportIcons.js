/**
 * ### Icons / :ant: Export SVG Icons
 * 
 * Based on Yammer Icon MasterDoc conventions. The plugin only acts over the elements of the 
 * artboard 'icons' in the current page:
 * 
 * - Toggles off the visibility of all the groups of each instance
 * - Toggles on the visibility of the 'export' group
 * - Creates a temporary slice per instance and export an SVG
 * - Toggles off the 'export' group and on the 'symbol' group
 * 
 */

@import '../library/io.mamuso.tools.cocoascript';

var onRun = function(context) {
  try {
    var doc = context.document,
      currentPage = doc.currentPage(),
      scriptPath = context.scriptPath,
      homeFolder = "/Users/" + NSUserName();

      io.mamuso.config.doc = doc;
      io.mamuso.config.basePath = io.mamuso.tools.getDirFromPrompt();


      // Were are we saving the files?
      if(io.mamuso.config.basePath == null) {
        return;
      } else {
        // looking for the artboard named 'icons'
        var iconsPage = io.mamuso.tools.findObjectsByName("icons", currentPage.artboards()).firstObject();

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
              var exportgroup = io.mamuso.tools.findObjectsByName("export", icongroups).firstObject();
              exportgroup.setIsVisible(true);

              // export the svg
              filename = master.name() + ".svg";
              filePath = io.mamuso.config.basePath.stringByAppendingPathComponent(filename);
              io.mamuso.tools.sliceAndExport(master, filePath);

              // toggle off export
              exportgroup.setIsVisible(false);

              // toggle on the group we use for symbol
              var symbolgroup = io.mamuso.tools.findObjectsByName("symbol", icongroups).firstObject();
              symbolgroup.setIsVisible(true);

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