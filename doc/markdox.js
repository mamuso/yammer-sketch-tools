var markdox = require('markdox');
var async = require('async');
var path = require('path');
var docFolder = 'YammerSketchTools.sketchplugin/Contents/Sketch/';

// Fixtures
var fixtures = [
  docFolder + '/layers/Unlock.js',
  docFolder + '/layers/ToggleMarginBlocks.js',
  docFolder + '/layers/CompactVerticalSpace.js',
  docFolder + '/layers/CompactHorizontalSpace.js',
  docFolder + '/text/TruncateLines.js',
];

var options = {
  output: 'README.md', 
  template: 'doc/template.md.ejs',
};

markdox.process(fixtures, options, function(){
  console.log('You are all set');
});