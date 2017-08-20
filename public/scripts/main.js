//get user profile, user account from sessionStroage, user total balance, and cost basis
var user = JSON.parse(sessionStorage.user);
var userAccount = JSON.parse(sessionStorage.userAccount);
var userBalance = +sessionStorage.userBalance;
var userCost = +sessionStorage.userCost;


//function for updating user account investment balance by recalculating share * share price
//duplicate function from sampledata.js
function userAcctBalance(acct){
  for (let i = 0; i < acct.length; i++) {
    acct[i].balance = +(acct[i].price * acct[i].share).toFixed(2);
  }
}

// update current user shares from stored and update balance
if (sessionStorage.userShares) {
  for (let i = 0; i < userAccount.length; i++) {
    userAccount[i].share = (JSON.parse(sessionStorage.userShares)[i]);
    userAcctBalance(userAccount);
  }
}

// if user selected new portfolio, update user account
if (sessionStorage.transferBal) {
  for (let i = 0; i < userAccount.length; i++) {
    userAccount[i].balance = (JSON.parse(sessionStorage.transferBal)[i]);
    userAccount[i].share = +(userAccount[i].balance / userAccount[i].price).toFixed(3);
  }
}

//function to store user share amounts
function getUserShares() {
  var shares = [];
  for (var i = 0; i < userAccount.length; i++) {
    shares.push(userAccount[i].share);
  }
  return shares;
}

//store user updated users to sessionStorage
sessionStorage.userShares = JSON.stringify(getUserShares());


// creates and format current date in MMM dd yyyy format
var date = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var fullDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

// Display Investment Details function
function displayMyPortDetails() {
  var portfolioHTML = "";
  $('.data').html(portfolioHTML);
  for (var i = 0; i < userAccount.length; i++) {
    var invbalance = currencyFormat.format(userAccount[i].balance);
    var progress = +(userAccount[i].balance / +userBalance * 100).toFixed(2) + "%";
    portfolioHTML += `<div class="${userAccount[i].ticker} inv-container" data-toggle="modal" data-target="#modal-inv">${userAccount[i].category}<span class="pull-right">${invbalance}</span>
    <div class="progress"><div class="progress-bar" style="width: ${progress}; background-color: ${userAccount[i].color};"></div></div></div> `;
  }
  $('.data').html(portfolioHTML);
}

//function to display cost basis and account gain/loss
function displayCostGainLoss() {
  $('#cost-basis').html(`${currencyFormat.format(userCost)}`);
  $('#gain-loss').html(`${currencyFormat.format(userBalance - userCost)}`);
  if (userBalance - userCost < 0) {
    $('#gain-loss').css('color', 'red');
  } else {$('#gain-loss').css('color', 'rgba(9, 82, 86, 1)')}
}

// function to add click listener to each investment row and populate investment info in modal
function addInvInfoListeners(fund) {
  $(`.${fund}`).on('click', function(){
    for (var i = 0; i < userAccount.length; i++) {
      if (userAccount[i].ticker === fund) {
        var url = `https://www.morningstar.com/funds/xnas/${userAccount[i].ticker}/quote.html`;
        $('#modal-fundname').html(`<a href=${url} target="_blank">` + userAccount[i].fundname +`</a>`);
        $('#modal-ticker').html(userAccount[i].ticker);
        $('#modal-category').html(userAccount[i].category);
        $('#modal-nav').html(currencyFormat.format(userAccount[i].price));
        $('#modal-share').html(userAccount[i].share);
        $('#modal-info').html(`<a href=${url} target="_blank">Morningstar</a>`);
      }
    }
  });
}


// run the below when the page loads
$().ready(function(){
  // display user name
  $('.username').text(user.first);
  // display formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text(currencyFormat.format(userBalance));

  // display cost basis and gain/loss
  displayCostGainLoss()

  // call portfolio detail function to populate portfolio detail rows
  displayMyPortDetails();

  // call click listener & investment modal information function
  for (var i = 0; i < userAccount.length; i++) {
    addInvInfoListeners(userAccount[i].ticker);
  }

  //generate chart options for my portfolio chart
  var options = {
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

      //customize the tooltip label
      callbacks: {
        label: function(tooltipItem, chartData) {
          return " " + chartData.labels[tooltipItem.index];
          // + " " + " $" + (chartData.datasets[0].data[tooltipItem.index]).toFixed(2);
        }
      }
    },

    //hover over chart section and animate the corresponding investment detail row
    hover: {
      onHover: function(x,y) {
        if (y[0]) {
          for (let i = 0; i < userAccount.length; i++) {
            if (y[0]._index === i) {
              $(`.${userAccount[i].ticker}`).css("transform", "scale(1.05,1.05)").css("transition", "0.5s");
            } else {
              // $(`.${userAccount[i].ticker}`).css("transform", "scale(1,1)");
              // $(`.${userAccount[i].ticker}`).css("transition", "0.5s");
              $(`.${userAccount[i].ticker}`).removeAttr('style');
            }
          }
        }
        else {
          for (let i = 0; i < userAccount.length; i++) {
            // $(`.${userAccount[i].ticker}`).css("transform", "scale(1,1)");
            // $(`.${userAccount[i].ticker}`).css("transition", "0.5s");
            $(`.${userAccount[i].ticker}`).removeAttr('style');
          }
        }
      },
    },

    //chart initialize animation duration
    animation: {
      duration: 1500,
    },
  };

  // grabbing the html canvas element
  var portChart = $("#portChart");

  //initialize the my portfolio chart
  // initialize pie chart object
  var myPieChart = {};
  myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: genData(userAccount),
    options: options
  });

});  //Ends $().ready function
