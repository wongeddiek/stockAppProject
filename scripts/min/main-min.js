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
    portfolioHTML += `<p>${userAccount[i].fundname}   $${invbalance}</p>`
  }
  $('.data').html(portfolioHTML);
}

// run the below when the page loads
$().ready(function(){
  // Displays formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text("$" + userBalance);

  // Calls Investment Details function
  displayPortDetails();

  //Create sample pie Chart

  //grab account balance into an array
  var acctChartData = [];
  for (var i = 0; i < userAccount.length; i++) {
    acctChartData.push(userAccount[i].balance);
  }

  var acctChartLegend = [];
  for (var i = 0; i < userAccount.length; i++) {
    acctChartLegend.push(userAccount[i].category);
  }

  var portChart = $("#portChart");

  data = {
    datasets: [{
      data: acctChartData,
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
    labels: acctChartLegend
  }

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


  var myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: data,
    options: options
  })



})  //Ends $().ready function


