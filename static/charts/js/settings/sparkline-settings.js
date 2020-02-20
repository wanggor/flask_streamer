"use strict";
$(function () {
    $("#sparkline1").sparkline([34, 43, 43, 35, 44, 32, 44, 52, 25], {
        type: 'line',
        lineColor: '#17997f',
        fillColor: '#1ab394',
    });
    $("#sparkline2").sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
        type: 'bar',
        barColor: '#1ab394',
        negBarColor: '#c6c6c6'
    });

    $("#sparkline3").sparkline([1, 1, 2], {
        type: 'pie',
        sliceColors: ['#1ab394', '#b3b3b3', '#e4f0fb']});

    $("#sparkline4").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
        type: 'line',
        lineColor: '#17997f',
        fillColor: '#ffffff',
    });

    $("#sparkline5").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
        type: 'tristate',
        posBarColor: '#1ab394',
        negBarColor: '#bfbfbf'});


    $("#sparkline6").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 6, 3, 4, 5, 8, 7, 6, 9, 3, 2, 4, 1, 5, 6, 4, 3, 7, ], {
        type: 'discrete',
        lineColor: '#1ab394'});

    $("#sparkline7").sparkline([52, 12, 44], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#1ab394', '#b3b3b3', '#e4f0fb']});

    $("#sparkline8").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7], {
        type: 'bar',
        barWidth: 8,
        height: '150px',
        barColor: '#1ab394',
        negBarColor: '#c6c6c6'});

    $("#sparkline9").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
        type: 'line',
        lineWidth: 1,
        height: '150px',
        lineColor: '#17997f',
        fillColor: '#ffffff',
    });

     $("#sparkline10").sparkline([34, 43, 43, 35, 44, 32, 44, 52, 25], {
            type: 'line',
            width: '100%',
            height: '40',
            spotRadius: 5,
            lineWidth: 1.5,
            lineColor:'rgba(255,255,255,.85)',
            fillColor: 'rgba(0,0,0,0.03)',
            spotColor: 'rgba(255,255,255,.5)',
            minSpotColor: 'rgba(255,255,255,.5)',
            maxSpotColor: 'rgba(255,255,255,.5)',
            highlightLineColor : '#ffffff',
            highlightSpotColor: '#ffffff',
            tooltipChartTitle: 'Usage',
            tooltipSuffix:'GB'
    });

     $("#sparkline11").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
            type: 'line',
            width: '100%',
            height: '40',
            spotRadius: 4,
            lineWidth:1,
            lineColor:'#ffffff',
            fillColor: false,
            minSpotColor :false,
            maxSpotColor : false,
            highlightLineColor : '#ffffff',
            highlightSpotColor: '#ffffff',
            tooltipChartTitle: 'Earning',
            tooltipPrefix :'$ ',
            spotColor:'#ffffff',
            valueSpots : {
                '0:': '#ffffff' }
    });

     $("#sparkline12").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
            type: 'bar',
            width: '100%',
            height: '40',
            spotRadius: 4,
            lineWidth:1,
            lineColor:'#ffffff',
            fillColor: false,
            minSpotColor :false,
            maxSpotColor : false,
            tooltipChartTitle: 'Traffic',
            barColor: 'rgba(255,255,255,.7)'
    });
     $("#sparkline13").sparkline([1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
            type: 'tristate',
            width: '100%',
            height: '40',
            spotRadius: 4,
            lineWidth:1,
            lineColor:'#ffffff',
            fillColor: false,
            minSpotColor :false,
            maxSpotColor : false,
            tooltipChartTitle: 'User Statistics',
            barColor: 'rgba(255,255,255,.7)'
    });

});