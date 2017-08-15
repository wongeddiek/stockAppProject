
// creates and format current date in MMM dd yyyy format
var date = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var fullDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

// Display Investment Details function
function displayMyPortDetails() {
  var portfolioHTML = "";
  $('.data').html(portfolioHTML);
  for (var i = 0; i < userAccount.length; i++) {
    var invbalance = currencyFormat.format(userAccount[i].balance);
    var progress = +(userAccount[i].balance / +userBalance * 100).toFixed(2) + "%"
    portfolioHTML += `<div class="${userAccount[i].ticker} inv-container" data-toggle="modal" data-target="#modal-inv">${userAccount[i].category}<span class="pull-right">${invbalance}</span>
    <div class="progress"><div class="progress-bar" style="width: ${progress}; background-color: ${userAccount[i].color};"></div></div></div> `
  }
  $('.data').html(portfolioHTML);
}

// function to add click listener to each investment row and populate investment info in modal
function addInvInfoListeners(fund) {
  $(`.${fund}`).on('click', function(){
    for (var i = 0; i < userAccount.length; i++) {
      if (userAccount[i].ticker === fund) {
        var url = `https://www.morningstar.com/funds/xnas/${userAccount[i].ticker}/quote.html`
        $('#modal-fundname').html(`<a href=${url} target="_blank">` + userAccount[i].fundname +`</a>`);
        $('#modal-ticker').html(userAccount[i].ticker);
        $('#modal-category').html(userAccount[i].category);
        $('#modal-nav').html(currencyFormat.format(userAccount[i].price));
        $('#modal-share').html(userAccount[i].share);
        $('#modal-info').html(`<a href=${url} target="_blank">Morningstar</a>`);
      }
    }
  })
}

// initialize pie chart object
var myPieChart = {};

// run the below when the page loads
$().ready(function(){
  // display user name
  $('.username').text(user.first);
  // display formatted date
  $('.today').text(fullDate);
  // Display current account balance
  $('.acctbalance').text(currencyFormat.format(userBalance));

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
            return chartData.labels[tooltipItem.index]
            // + " " + " $" + (chartData.datasets[0].data[tooltipItem.index]).toFixed(2);
          }
        }
      },

      //hover over chart section and animate the corresponding investment detail row
      hover: {
        onHover: function(x,y) {
          if (y[0]) {
            for (var i = 0; i < userAccount.length; i++) {
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
              for (var i = 0; i < userAccount.length; i++) {
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
    }

  // grabbing the html canvas element
  var portChart = $("#portChart");

  //initialize the my portfolio chart
  myPieChart = new Chart(portChart,{
    type: 'doughnut',
    data: genData(userAccount),
    options: options
  })

})  //Ends $().ready function


