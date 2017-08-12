
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

// populate investment modal function
function invModalInfo(fund) {
  for (var i = 0; i < userAccount.length; i++) {
    if (userAccount[i].ticker === fund) {
      var url = `https://www.morningstar.com/funds/xnas/${userAccount[i].ticker}/quote.html`
      $('#modal-fundname').html(`<a href=${url} target="_blank">` + userAccount[i].fundname +`</a>`);
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

var myPieChart = {};

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
        bodyFontSize: 14,
        caretSize: 0,
        xPadding: 10,
        yPadding: 10,

        callbacks: {
          label: function(tooltipItem, chartData) {
            return chartData.labels[tooltipItem.index]
            // + " " + " $" + (chartData.datasets[0].data[tooltipItem.index]).toFixed(2);
          }
        }
      },

      //hover over chart section and link to the individual investments
      hover: {
        onHover: function(x,y) {
          if (y[0]) {
            for (var i = 0; i < userAccount.length; i++) {
              if (y[0]._index === i) {
                $(`.${userAccount[i].ticker}`).css("transform", "scale(1.1,1.1)")
                $(`.${userAccount[i].ticker}`).css("transition", "1s")
              } else {
                $(`.${userAccount[i].ticker}`).css("transform", "scale(1,1)")
                $(`.${userAccount[i].ticker}`).css("transition", "1s")
              }
            }
          }
          else {
              for (var i = 0; i < userAccount.length; i++) {
                $(`.${userAccount[i].ticker}`).css("transform", "scale(1,1)")
                $(`.${userAccount[i].ticker}`).css("transition", "1s")
              }
          }
      },
    },

      animation: {
        duration: 1500,
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




})  //Ends $().ready function
