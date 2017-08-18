//portfolio object constructor
function Portfolio(ticker, fundname, category, price, balance, color) {
  this.ticker = ticker;
  this.fundname = fundname;
  this.category = category;
  this.price = price;
  this.balance = balance;
  this.color = color;
}

// function for creating portfolio objects
function genPortfolioData(bal1, bal2, bal3, bal4, bal5) {

  var port1 = new Portfolio("VBMFX", "Vanguard Total Bond Market Index", "Bonds", 10.81, bal1, "rgba(9, 82, 86, 1)");

  var port2 = new Portfolio ("VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 61.63, bal2, "rgba(8, 127, 140, 1)");

  var port3 = new Portfolio("VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 39.27, bal3, "rgba(90, 170, 149, 1)");

  var port4 = new Portfolio("NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 64.69, bal4, "rgba(134, 168, 115, 1)");

  var port5 = new Portfolio("VGSTX", "Vanguard International Index", "International Stocks", 26.21, bal5, "rgba(187, 159, 6, 1)");

  return [port1, port2, port3, port4, port5];
}

// create the 3 portfolio objects
var conPort = genPortfolioData(0.60, 0.15, 0.10, 0.10, 0.05);
var modPort = genPortfolioData(0.40, 0.20, 0.15, 0.10, 0.15);
var aggPort = genPortfolioData(0.15, 0.30, 0.15, 0.15, 0.25);

// function to display investment detail rows in individual Portfolios
function displayInvPortDetails(arr, classname) {
  var portfolioHTML = "";
  $(classname).html(portfolioHTML);
  for (var i = 0; i < arr.length; i++) {
    var invbalance = (arr[i].balance * 100).toFixed(0) + "%";
    var progress = +(arr[i].balance * 100).toFixed(2) + "%";
    portfolioHTML += `<div class="${arr[i].ticker} ind-port-container">${arr[i].category}<span class="pull-right">${invbalance}</span>
    <div class="progress"><div class="progress-bar" style="width: ${progress}; background-color: ${arr[i].color};"></div></div></div> `;
  }
  $(classname).html(portfolioHTML);
}

//run when page loads
$().ready(function(){

  //generate chart options for individual portfolio charts
  var optionsInd = {
    // padding for the chart canvas
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },

    //pie chart center cutout
    cutoutPercentage: 30,

    //disable chart legend
    legend: {
      display: false,
    },

    //hover tooltip styling
    tooltips: {
      bodyFontSize: 14,
      caretSize: 0,
      xPadding: 10,
      yPadding: 10,

      callbacks: {
        label: function(tooltipItem, chartData) {
          return " " + chartData.labels[tooltipItem.index] + " " + " " + ((chartData.datasets[0].data[tooltipItem.index]) * 100) + "%";
        }
      }
    },

    //hover over chart section and animate the corresponding investment detail row
    hover: {
      onHover: function(x,y) {
        if (y[0]) {
          for (let i = 0; i < conPort.length; i++) {
            if (y[0]._index === i) {
              $(`.${conPort[i].ticker}`).css("transform", "scale(1.05,1.05)").css("transition", "0.5s");
            } else {
              // $(`.${conPort[i].ticker}`).css("transform", "scale(1,1)");
              // $(`.${conPort[i].ticker}`).css("transition", "0.5s");
              $(`.${conPort[i].ticker}`).removeAttr('style');
            }
          }
        }
        else {
          for (let i = 0; i < conPort.length; i++) {
            // $(`.${conPort[i].ticker}`).css("transform", "scale(1,1)");
            // $(`.${conPort[i].ticker}`).css("transition", "0.5s");
            $(`.${conPort[i].ticker}`).removeAttr('style');
          }
        }
      },
    },

    //chart initialize animation duration
    animation: {
      duration: 1500,
    },
  };

  //generate the 3 static portfolio charts:
  // var myConChart = {};
  // var myModChart = {};
  // var myAggChart = {};
  //
  // var conChart = $("#conChart");
  // var modChart = $("#modChart");
  // var aggChart = $("#aggChart");

  //create the portfolio chart object and selector
  var myIndPortChart = {};
  var indPortChart = $("#indPortChart");

  //add click listener to the portfolio buttons
  $('.btn-conport').on('click', function(){
    //set the data attribute to con portfolio
    $('#modal-indPort').attr('data-port', "con");
  });

  $('.btn-modport').on('click', function(){
    //set the data attribute to mod portfolio
    $('#modal-indPort').attr('data-port', "mod");
  });

  $('.btn-aggport').on('click', function(){
    //set the data attribute to agg portfolio
    $('#modal-indPort').attr('data-port', "agg");
  });

  // single modal on shown and hide
  $('#modal-indPort').on('shown.bs.modal',function(){
    //set the correct portfolio object and title based on button clicked
    var port = [];
    switch ($(this).attr('data-port')) {
    case "con":
      port = conPort;
      $('#indPortTitle').html("Conservative Portfolio");
      break;
    case "mod":
      port = modPort;
      $('#indPortTitle').html("Moderate Portfolio");
      break;
    case "agg":
      port = aggPort;
      $('#indPortTitle').html("Moderate Portfolio");
      break;
    }

    //generate the portfolio chart
    myIndPortChart = new Chart(indPortChart,{
      type: 'doughnut',
      data: genData(port),
      options: optionsInd
    });
    //generate the portfolio details
    displayInvPortDetails(port, '.indPort-data');
    //pass the port data attribute to button
    $('#indPortSelect').attr('data-port', $(this).attr('data-port'));
  }).on('hidden.bs.modal', function(){
    //destroys chart and data attributes when modal is hidden
    myIndPortChart.destroy();
    $(this).attr('data-port', null);
    $('#indPortSelect').attr('data-port', null);
  });

  // conservative portfolio modal on shown and on hide
  // $('#modal-con').on('shown.bs.modal',function(){
  //   myConChart = new Chart(conChart,{
  //     type: 'doughnut',
  //     data: genData(conPort),
  //     options: optionsInd
  //   })
  //   displayInvPortDetails(conPort, '.con-data')
  // }).on('hidden.bs.modal', function(){
  //   myConChart.destroy();
  // })

  // moderate portfolio modal on shown and on hide
  // $('#modal-mod').on('shown.bs.modal',function(){
  //   myModChart = new Chart(modChart,{
  //     type: 'doughnut',
  //     data: genData(modPort),
  //     options: optionsInd
  //   })
  //   displayInvPortDetails(modPort, '.mod-data')
  // }).on('hidden.bs.modal', function(){
  //   myModChart.destroy();
  // })

  // aggressive portfolio modal on shwn and on hide
  // $('#modal-agg').on('shown.bs.modal',function(){
  //   myAggChart = new Chart(aggChart,{
  //     type: 'doughnut',
  //     data: genData(aggPort),
  //     options: optionsInd
  //   })
  //   displayInvPortDetails(aggPort, '.agg-data')
  // }).on('hidden.bs.modal', function(){
  //   myAggChart.destroy();
  // })

  //function to update user balance based on selected portfolio
  function transferBal(alloc) {
    var totalBal = sessionStorage.userBalance;
    var fundBal = [];
    for (var i = 0; i < alloc.length; i++) {
      fundBal.push(+(alloc[i] * totalBal).toFixed(2));
    }
    return fundBal;
  }

  //add click listener to buttons to transfer to a different portfolio
  // $('#conSelect').on('click',function(){
  //   var portAlloc = [];
  //   for (var i = 0; i < conPort.length; i++) {
  //     portAlloc.push(conPort[i].balance)
  //   }
  //   sessionStorage.transferBal = transferBal(portAlloc);
  //   window.location = 'index.html';
  // })
  //
  // $('#modSelect').on('click',function(){
  //   var portAlloc = []
  //   for (var i = 0; i < modPort.length; i++) {
  //     portAlloc.push(modPort[i].balance)
  //   }
  //   sessionStorage.transferBal = transferBal(portAlloc);
  //   window.location = 'index.html';
  // })
  //
  // $('#aggSelect').on('click',function(){
  //
  //   var portAlloc = []
  //   for (var i = 0; i < aggPort.length; i++) {
  //     portAlloc.push(aggPort[i].balance)
  //   }
  //   sessionStorage.transferBal = transferBal(portAlloc);
  //   window.location = 'index.html';
  // })

  $('#indPortSelect').on('click', function(){
    var port = [];
    switch ($(this).attr('data-port')) {
    case "con":
      port = conPort;
      break;
    case "mod":
      port = modPort;
      break;
    case "agg":
      port = aggPort;
      break;
    }
    var portAlloc = [];
    for (var i = 0; i < port.length; i++) {
      portAlloc.push(port[i].balance);
    }
    sessionStorage.transferBal = JSON.stringify(transferBal(portAlloc));
    window.location = 'myAccount.html';
  });
}); //end $().ready


