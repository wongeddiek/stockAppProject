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
        'rgba(255,0,0,0.2)',
        'rgba(255,255,0,0.2)',
        'rgba(0,0,255,0.2)',
        'rgba(100,100,200,0.2)',
        'rgba(0,255,0,0.2)',
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

// run the below when the page loads
$().ready(function(){
  // Displays formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text("$" + userBalance);

  // Calls Investment Details function
  displayPortDetails();

  //Generate portfolio chart
  var portChart = $("#portChart");

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

  myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: genData(userAccount),
    options: options
  })

  //button to refresh chart
  $('#chartRefresh').on('click',function(){
    myPieChart.data = genData(userAccount);
    myPieChart.update();
    displayPortDetails();
  })

})  //Ends $().ready function


