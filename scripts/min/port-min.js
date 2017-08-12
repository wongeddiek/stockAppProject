
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

  var port2 = new Portfolio ("VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 61.63, bal2, "rgba(8, 127, 140, 1)")

  var port3 = new Portfolio("VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 39.27, bal3, "rgba(90, 170, 149, 1)")

  var port4 = new Portfolio("NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 64.69, bal4, "rgba(134, 168, 115, 1)")

  var port5 = new Portfolio("VGSTX", "Vanguard International Index", "International Stocks", 26.21, bal5, "rgba(187, 159, 6, 1)")

  return [port1, port2, port3, port4, port5]
}

// creating the 3 portfolio objects
var conPort = genPortfolioData(0.60, 0.15, 0.10, 0.10, 0.05)
var modPort = genPortfolioData(0.40, 0.20, 0.15, 0.10, 0.15)
var aggPort = genPortfolioData(0.15, 0.30, 0.20, 0.20, 0.25)

// Display Investment Details in Individual Portfolios
function displayInvPortDetails(arr, classname) {
  var portfolioHTML = "";
  $(classname).html(portfolioHTML);
  for (var i = 0; i < arr.length; i++) {
    var invbalance = (arr[i].balance * 100).toFixed(0) + "%";
    var progress = +(arr[i].balance * 100).toFixed(2) + "%"
    portfolioHTML += `<div class="${arr[i].ticker}">${arr[i].category}<span class="pull-right">${invbalance}</span>
    <div class="progress"><div class="progress-bar" style="width: ${progress}; background-color: ${arr[i].color};"></div></div></div> `
  }
  $(classname).html(portfolioHTML);
}

var myConChart = {};
var myModChart = {};
var myAggChart = {};

$().ready(function(){

  //generate chart options for individual portfolio charts
  var optionsInd = {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },

      cutoutPercentage: 30,

      legend: {
        display: false,
      },

      tooltips: {
        bodyFontSize: 14,
        caretSize: 0,
        xPadding: 10,
        yPadding: 10,

        callbacks: {
          label: function(tooltipItem, chartData) {
            return chartData.labels[tooltipItem.index] + " " + " " + ((chartData.datasets[0].data[tooltipItem.index]) * 100) + "%";
          }
        }
      },

      hover: {
        onHover: function(x,y) {
          if (y[0]) {
            for (var i = 0; i < conPort.length; i++) {
              if (y[0]._index === i) {
                $(`.${conPort[i].ticker}`).css("transform", "scale(1.05,1.05)")
                $(`.${conPort[i].ticker}`).css("transition", "1s")
              } else {
                $(`.${conPort[i].ticker}`).css("transform", "scale(1,1)")
                $(`.${conPort[i].ticker}`).css("transition", "1s")
              }
            }
          }
          else {
              for (var i = 0; i < conPort.length; i++) {
                $(`.${conPort[i].ticker}`).css("transform", "scale(1,1)")
                $(`.${conPort[i].ticker}`).css("transition", "1s")
              }
          }
        },
      },

      animation: {
        duration: 2000,
      },
  }
  //generate the 3 static portfolio charts:
  var conChart = $("#conChart");

  myConChart = new Chart(conChart,{
    type: 'doughnut',
    data: [25,25,25,25],
    options: optionsInd
  })

  var modChart = $("#modChart");

  myModChart = new Chart(modChart,{
    type: 'doughnut',
    data: [25,25,25,25],
    options: optionsInd
  })

  var aggChart = $("#aggChart");

  myAggChart = new Chart(aggChart,{
    type: 'doughnut',
    data: [25,25,25,25],
    options: optionsInd
  })

  //Calls Individual Portfolio functions
  displayInvPortDetails(conPort, '.con-data')
  displayInvPortDetails(modPort, '.mod-data')
  displayInvPortDetails(aggPort, '.agg-data')

  // Refresh the individual portfolios on click
  $('.btn-conport').on('click', function(){
    myConChart.data = genData(conPort);
    myConChart.update();
  })

  $('.btn-modport').on('click', function(){
    myModChart.data = genData(modPort);
    myModChart.update();
  })

  $('.btn-aggport').on('click', function(){
    myAggChart.data = genData(aggPort);
    myAggChart.update();
  })

  //buttons to transfer to a different portfolio
  $('#conSelect').on('click',function(){
    var portAlloc = [];
    for (var i = 0; i < conPort.length; i++) {
      portAlloc.push(conPort[i].balance)
    }
    sessionStorage.portAlloc = portAlloc;
    window.location = 'index.html';
    // userAccount = []
    // for (var i = 0; i < conPort.length; i++) {
    //   var userAcctData = new Account(user.id, conPort[i].ticker, conPort[i].fundname, conPort[i].category, +(conPort[i].balance * userBalance / conPort[i].price).toFixed(3), conPort[i].price, +(conPort[i].balance * userBalance).toFixed(2), conPort[i].color)
    //   userAccount.push(userAcctData)
    // }
    // myPieChart.data = genData(userAccount);
    // myPieChart.update();
    // displayMyPortDetails();
    // addInvInfoListeners();
  })

  $('#modSelect').on('click',function(){
    var portAlloc = []
    for (var i = 0; i < modPort.length; i++) {
      portAlloc.push(modPort[i].balance)
    }
    sessionStorage.portAlloc = portAlloc;
    window.location = 'index.html';
    // sessionStorage.portAlloc = portAlloc
    // userAccount = []
    // for (var i = 0; i < modPort.length; i++) {
    //   var userAcctData = new Account(user.id, modPort[i].ticker, modPort[i].fundname, modPort[i].category, +(modPort[i].balance * userBalance / modPort[i].price).toFixed(3), modPort[i].price, +(modPort[i].balance * userBalance).toFixed(2), modPort[i].color)
    //   userAccount.push(userAcctData)
    // }
    // myPieChart.data = genData(userAccount);
    // myPieChart.update();
    // displayMyPortDetails();
    // addInvInfoListeners();
  })

  $('#aggSelect').on('click',function(){

    var portAlloc = []
    for (var i = 0; i < aggPort.length; i++) {
      portAlloc.push(aggPort[i].balance)
    }
    sessionStorage.portAlloc = portAlloc;
    window.location = 'index.html';

    // userAccount = []
    // for (var i = 0; i < aggPort.length; i++) {
    //   var userAcctData = new Account(user.id, aggPort[i].ticker, aggPort[i].fundname, aggPort[i].category, +(aggPort[i].balance * userBalance / aggPort[i].price).toFixed(3), aggPort[i].price, +(aggPort[i].balance * userBalance).toFixed(2), aggPort[i].color)
    //   userAccount.push(userAcctData)
    // }
    // myPieChart.data = genData(userAccount);
    // myPieChart.update();
    // displayMyPortDetails();
    // addInvInfoListeners();
  })
})


