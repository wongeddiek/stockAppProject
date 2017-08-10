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
var jdoe = new User(1, "jdoe@example.com", "123456", "Joe", "Doe")

// Creates sample user account
var jdoe1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bond", 10.81, 370.028, 4000);

var jdoe2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Cap", 61.63, 32.452, 2000)

var jdoe3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Cap", 39.27, 38.197, 1500)

var jdoe4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Cap", 64.69, 15.458, 1000)

var jdoe5 = new Account(1, "VGSTX", "Vanguard International Index", "International", 26.21, 57.230, 1500)

var jdoeAccount = [jdoe1, jdoe2, jdoe3, jdoe4, jdoe5];

// function to sum all investment balances
function totalBalance(account) {
  var total = 0;
  for (var i = 0; i < account.length; i++) {
    total += account[i].balance;
  }
  return total;
}

// creates sample user total account balance
var jdoeBalance = totalBalance(jdoeAccount).toFixed(2);

// creates and format current date in MMM dd yyyy format
var date = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var fullDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

$().ready(function(){
  // Displays formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text("$" + jdoeBalance);

  // Display portfolio details
  var investmentHTML = "";
  for (var i = 0; i < jdoeAccount.length; i++) {
    var invbalance = jdoeAccount[i].balance.toFixed(2);
    investmentHTML += `<p>${jdoeAccount[i].fundname}   $${invbalance}</p>`
  }
  $('.data').append($(investmentHTML));

  //Create sample pie Chart

  var ctx = $("#myChart");

  data = {
    datasets: [{
      data: [25, 50, 25],
      backgroundColor: [
        'rgba(255,0,0,0.2)',
        'rgba(255,255,0,0.2)',
        'rgba(0,0,255,0.2)'
      ],
      borderWidth: 1,
      borderColor: [
        'rgba(0,0,0,1)',
        'rgba(0,0,0,1)',
        'rgba(0,0,0,1)'
      ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Red',
      'Yellow',
      'Blue'
    ]
  };

  var options = {
      layout: {
        padding: {
          left: 75,
          right: 75,
          top: 0,
          bottom: 0
        }
            },
      cutoutPercentage: 30
    }


  var myPieChart = new Chart(ctx,{
    type: 'doughnut',
    data: data,
    options: options
  });



})
