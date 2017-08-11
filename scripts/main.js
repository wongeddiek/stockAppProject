// function to sum all investment balances
function totalBalance(account) {
  var total = 0;
  for (var i = 0; i < account.length; i++) {
    total += account[i].balance;
  }
  return total;
}

// creates sample user total account balance
var userBalance = totalBalance(userAccount).toFixed(2);

// creates and format current date in MMM dd yyyy format
var date = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var fullDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

// Display Investment Details function
function displayMyPortDetails() {
  var portfolioHTML = "";
  $('.data').html(portfolioHTML);
  for (var i = 0; i < userAccount.length; i++) {
    var invbalance = userAccount[i].balance.toFixed(2);
    var progress = +(userAccount[i].balance / +userBalance * 100).toFixed(2) + "%"
    portfolioHTML += `<div class="${userAccount[i].ticker} container" data-toggle="modal" data-target="#modal-inv">${userAccount[i].category}<span class="pull-right">$${invbalance}</span>
    <div class="progress"><div class="progress-bar" style="width: ${progress}; background-color: ${userAccount[i].color};"></div></div></div> `
  }
  $('.data').html(portfolioHTML);
}

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

// populate investment modal function
function invModalInfo(fund) {
  for (var i = 0; i < userAccount.length; i++) {
    if (userAccount[i].ticker === fund) {
      $('#modal-fundname').html(userAccount[i].fundname);
      $('#modal-ticker').html(userAccount[i].ticker);
      $('#modal-category').html(userAccount[i].category);
      $('#modal-nav').html(userAccount[i].price);
      $('#modal-share').html(userAccount[i].share);
    }
  }
}

// add click listener to popuate modal function
function addInvInfoListeners() {
  $('.data .VBMFX').on('click', function(){
    invModalInfo('VBMFX')
  })

  $('.data .VTSMX').on('click', function(){
    invModalInfo('VTSMX')
  })

  $('.data .VIMSX').on('click', function(){
    invModalInfo('VIMSX')
  })

  $('.data .NAESX').on('click', function(){
    invModalInfo('NAESX')
  })

  $('.data .VGSTX').on('click', function(){
    invModalInfo('VGSTX')
  })
}

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
        'rgba(9, 82, 86, 0.7)',
        'rgba(8, 127, 140, 0.7)',
        'rgba(90, 170, 149, 0.7)',
        'rgba(134, 168, 115, 0.7)',
        'rgba(187, 159, 6, 0.7)',
      ],
      borderWidth: 5,
      borderColor: [
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
      ],
      hoverBorderColor: [
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0)',
      ],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: genChartLegend(arr)
  }
  return data;
}

var myPieChart = {};
var myConChart = {};
var myModChart = {};
var myAggChart = {};

// run the below when the page loads
$().ready(function(){
  $('.username').text(user.first);
  // Displays formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text("$" + userBalance);

  // Call Investment Details function
  displayMyPortDetails();

  // populates investment modal information:
  addInvInfoListeners();


  //generate chart options for my portfolio chart
  var options = {
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
        bodyFontSize: 16,
        caretSize: 0,
        xPadding: 10,
        yPadding: 10,

        callbacks: {
          label: function(tooltipItem, chartData) {
            return chartData.labels[tooltipItem.index] + " " + " $" + (chartData.datasets[0].data[tooltipItem.index]).toFixed(2);
          }
        }
      },

      animation: {
        duration: 2000,
      },
    }

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
          bodyFontSize: 16,
          caretSize: 0,
          xPadding: 10,
          yPadding: 10,

          callbacks: {
            label: function(tooltipItem, chartData) {
              return chartData.labels[tooltipItem.index] + " " + " " + ((chartData.datasets[0].data[tooltipItem.index]) * 100) + "%";
            }
          }
        },

        animation: {
          duration: 2000,
        },
      }

  // grabbing the html canvas element
  var portChart = $("#portChart");

  //initialize the chart
  myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: genData(userAccount),
    options: options
  })

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
    userAccount = []
    for (var i = 0; i < conPort.length; i++) {
      var userAcctData = new Account(user.id, conPort[i].ticker, conPort[i].fundname, conPort[i].category, +(conPort[i].balance * userBalance / conPort[i].price).toFixed(3), conPort[i].price, +(conPort[i].balance * userBalance).toFixed(2), conPort[i].color)
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayMyPortDetails();
    addInvInfoListeners();
  })

  $('#modSelect').on('click',function(){
    userAccount = []
    for (var i = 0; i < modPort.length; i++) {
      var userAcctData = new Account(user.id, modPort[i].ticker, modPort[i].fundname, modPort[i].category, +(modPort[i].balance * userBalance / modPort[i].price).toFixed(3), modPort[i].price, +(modPort[i].balance * userBalance).toFixed(2), modPort[i].color)
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayMyPortDetails();
    addInvInfoListeners();
  })
  $('#aggSelect').on('click',function(){
    userAccount = []
    for (var i = 0; i < aggPort.length; i++) {
      var userAcctData = new Account(user.id, aggPort[i].ticker, aggPort[i].fundname, aggPort[i].category, +(aggPort[i].balance * userBalance / aggPort[i].price).toFixed(3), aggPort[i].price, +(aggPort[i].balance * userBalance).toFixed(2), aggPort[i].color)
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayMyPortDetails();
    addInvInfoListeners();
  })

})  //Ends $().ready function
