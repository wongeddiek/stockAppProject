// User profile object constructor
function User(id, email, password, first, last){
  this.id = id;
  this.email = email;
  this.password = password;
  this.first = first;
  this.last = last;
}

// User Account object constructor
function Account(id, ticker, fundname, category, share, price, balance) {
  this.id = id;
  this.ticker = ticker;
  this.fundname = fundname;
  this.category = category;
  this.price = price;
  this.share = share;
  this.balance = balance;
}

// Creates sample user profile
var user = new User(1, "jdoe@example.com", "123456", "Joe", "Doe")

// Creates sample user account
var user1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bond", 10.81, 370.028, 4000);

var user2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Cap", 61.63, 32.452, 2000)

var user3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Cap", 39.27, 38.197, 1500)

var user4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Cap", 64.69, 15.458, 1000)

var user5 = new Account(1, "VGSTX", "Vanguard International Index", "International", 26.21, 57.230, 1500)

var userAccount = [user1, user2, user3, user4, user5];

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

  var ctx = $("#myChart");

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


  var myPieChart = new Chart(ctx,{
    type: 'doughnut',
    data: data,
    options: options
  })



})  //Ends $().ready function


