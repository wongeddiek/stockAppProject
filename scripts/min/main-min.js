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
function displayPortDetails() {
  var portfolioHTML = "";
  $('.data').html(portfolioHTML);
  for (var i = 0; i < userAccount.length; i++) {
    var invbalance = userAccount[i].balance.toFixed(2);
    portfolioHTML += `<p class="${userAccount[i].ticker}">${userAccount[i].category} ${userAccount[i].fundname}   $${invbalance}</p>`
  }
  $('.data').html(portfolioHTML);
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

  // Calls Investment Details function
  displayPortDetails();

  //Generate portfolio chart
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
        position: 'bottom'
      }
    }

  var portChart = $("#portChart");

  myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: genData(userAccount),
    options: options
  })

  //generate the 3 static portfolio charts:
  var conChart = $("#conChart");

  myConChart = new Chart(conChart,{
    type: 'doughnut',
    data: genData(conPort),
    options: options
  })

  var modChart = $("#modChart");

  myModChart = new Chart(modChart,{
    type: 'doughnut',
    data: genData(modPort),
    options: options
  })

  var aggChart = $("#aggChart");

  myAggChart = new Chart(aggChart,{
    type: 'doughnut',
    data: genData(aggPort),
    options: options
  })

  //button to transfer to a different portfolio
  $('#conSelect').on('click',function(){
    userAccount = []
    for (var i = 0; i < conPort.length; i++) {
      var userAcctData = new Account(user.id, conPort[i].ticker, conPort[i].fundname, conPort[i].category, conPort[i].price, +(conPort[i].balance * userBalance / conPort[i].price).toFixed(3), +(conPort[i].balance * userBalance).toFixed(2))
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayPortDetails();
  })

  $('#modSelect').on('click',function(){
    userAccount = []
    for (var i = 0; i < modPort.length; i++) {
      var userAcctData = new Account(user.id, modPort[i].ticker, modPort[i].fundname, modPort[i].category, modPort[i].price, +(modPort[i].balance * userBalance / modPort[i].price).toFixed(3), +(modPort[i].balance * userBalance).toFixed(2))
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayPortDetails();
  })
  $('#aggSelect').on('click',function(){
    userAccount = []
    for (var i = 0; i < aggPort.length; i++) {
      var userAcctData = new Account(user.id, aggPort[i].ticker, aggPort[i].fundname, aggPort[i].category, aggPort[i].price, +(aggPort[i].balance * userBalance / aggPort[i].price).toFixed(3), +(aggPort[i].balance * userBalance).toFixed(2))
      userAccount.push(userAcctData)
    }
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayPortDetails();
  })

})  //Ends $().ready function


