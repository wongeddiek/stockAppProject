// Chart data generation functions
function genChartData(arr) {
  var data = [];
  for (var i = 0; i < arr.length; i++) {
    data.push(arr[i].balance);
  }
  return data;
}

function genChartLegend(arr) {
  var legend = [];
  for (var i = 0; i < arr.length; i++) {
    legend.push(arr[i].category);
  }
  return legend;
}

function genData(arr) {
  var data = {
    datasets: [{
      data: genChartData(arr),
      backgroundColor: [
        'rgba(9, 82, 86, 1)',
        'rgba(8, 127, 140, 1)',
        'rgba(90, 170, 149, 1)',
        'rgba(134, 168, 115, 1)',
        'rgba(187, 159, 6, 1)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
      ],
      hoverBackgroundColor: [
        'rgba(35, 108, 112, 1)',
        'rgba(24, 153, 166, 1)',
        'rgba(115, 196, 175, 1)',
        'rgba(160, 194, 141, 1)',
        'rgba(213, 185, 32, 1)',
      ],
      // hoverBorderColor: [
      //   'rgba(255,255,255,1)',
      //   'rgba(255,255,255,1)',
      //   'rgba(255,255,255,1)',
      //   'rgba(255,255,255,1)',
      //   'rgba(255,255,255,1)',
      // ],
      hoverBorderWidth: 4,
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: genChartLegend(arr)
  }
  return data;
}

//currency formatting function
var currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});


