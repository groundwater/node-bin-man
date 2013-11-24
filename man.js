#!/usr/bin/env node

var fs = require('fs');
var blessed = require('blessed');

var arg = process.argv[2] || 'bin-man';
var path = process.env.HOME + "/lib/node_modules/" + arg + "/README.md";

try{
  var readme = fs.readFileSync(path,'utf-8');
}catch(e){
  console.log('No README.md for Package',arg);
  process.exit(-1);
}

// Create a screen object.
var screen = blessed.screen();

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  content: readme,
  alwaysScroll:true,
  scrollable: true,
});

// Append our box to the screen.
screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key(['space','f','j','n'], function(ch, key) {
  box.scroll(box.height);
  screen.render();
});

screen.key(['down'], function(ch, key) {
  box.scroll(1);
  screen.render();
});

screen.key(['up'], function(ch, key) {
  box.scroll(-1);
  screen.render();
});

screen.key(['b','k','p'], function(ch, key) {
  box.scroll(-box.height);
  screen.render();
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
