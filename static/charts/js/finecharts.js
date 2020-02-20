/*
 *
 *   FineCharts - Responsive Charts & Graphs
 *   version 1.0.0
 *
 */

"use strict";

// Sparkline Top Chart

for (var i = 1; i <= $('.sparkline').length; i++)
  drawLines(i, genData());
function drawLines(i, data) {
  $('#line' + i).sparkline(data[0], {
    width: '150px',
    height: '150px',
    lineColor: '#ccc',
    fillColor: 'rgba(204,204,204,0.6)',
    spotRadius: 0
  });
  $('#line' + i).sparkline(data[1], {
    composite: true,
    lineColor: '#239690',
    fillColor: 'rgba(35,150,144,0.7)',
    highlightLineColor: '#000',
    spotRadius: 0
  });
}
function genData() {
  var arr = [[], []];
  for (var i = 0; i < 2; i++)
    for (var j = 0; j < 7; j++)
      arr[i].push(Math.round(Math.random() * 1000));
  return arr;
}


