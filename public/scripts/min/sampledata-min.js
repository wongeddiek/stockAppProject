// User profile object constructor - no longer used
// function User(id, email, password, first, last){
//   this.id = id;
//   this.email = email;
//   this.password = password;
//   this.first = first;
//   this.last = last;
// }

// User Account object constructor - no longer used
// function Account(id, ticker, fundname, category, share, price, balance, color) {
//   this.id = id;
//   this.ticker = ticker;
//   this.fundname = fundname;
//   this.category = category;
//   this.price = price;
//   this.share = share;
//   this.balance = balance;
//   this.color = color;
// }

//function to send AJAX request to Node js -- to get local JSON data
function getLocalData (url, callback) {
  $.get({
    url: '/getLocalData',
    data: {
      url: url
    },
    success: function(data) {
      //the data received is already an object, no need to JSON.parse it
      callback(data);
    }
  });
}

//get user data
var user;
getLocalData('json/user.json',function(data){
  user = data;
  // store user profile to sessionStorage
  sessionStorage.user = JSON.stringify(user);
});

// Create sample user profile - no longer used
// var user = new User(1, "jdoe@example.com", "123456", "John", "Doe")

// Creates sample user account - no longer used
// function userAccountData() {
//
//   var user1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bonds", 1387.604, 10.81, 15000.00, "rgba(9, 82, 86, 1)")
//
//   var user2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 567.905, 61.63, 35000.00, "rgba(8, 127, 140, 1)")
//
//   var user3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 381.971, 39.27, 15000.00, "rgba(90, 170, 149, 1)")
//
//   var user4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 154.583, 64.69, 10000.00, "rgba(134, 168, 115, 1)")
//
//   var user5 = new Account(1, "VGSTX", "Vanguard International Index", "International Stocks", 953.834, 26.21, 25000.00, "rgba(187, 159, 6, 1)")
//
//   return [user1, user2, user3, user4, user5]
//
// }

//function for updating user account investment balance by recalculating share * share price
function userAcctBalance(acct){
  for (var i = 0; i < acct.length; i++) {
    acct[i].balance = +(acct[i].price * acct[i].share).toFixed(2);
  }
}

//function to generate list of fund tickers in userAccount
//and generate API URL
function getFundAPIURL(acct) {
  var listArr = [];
  acct.forEach((obj) => {
    listArr.push(obj.ticker);
  });
  var url = 'http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A';
  listArr.forEach(data => {
    url += `${data},`;
  });
  return url;
}

//function for API call
function getFundInfo(url, callback) {
  $.get({
    url: '/getFundInfo',
    data: {
      url: url
    },
    success: function(data) {
      console.log(data);
      if (data.status === 404) {
        callback(data);
      } else {
        var dataTrimmed = data.slice(3, -1);
        callback(JSON.parse(dataTrimmed));
      }
    },
    dataType: 'json',
    // async: false
  });
}

//function to update user account fund prices
function priceUpdate(price, acct) {
  for (let i in price) {
    acct.forEach(obj => {
      if (i === obj.ticker) {
        obj.price = +price[i];
      }
    });
  }
}

// function to sum all investment balances
function totalBalance(account) {
  var total = 0;
  for (var i = 0; i < account.length; i++) {
    total += account[i].balance;
  }
  return total;
}

//get user Account
getLocalData('json/userAccount.json',function(data){
  var userAccount = data;
  // call function to create API URL and call Google Finance API
  var fundAPIURL = getFundAPIURL(userAccount);
  // call Google Finance API get request and populate currentFundPrice
  getFundInfo(fundAPIURL, function(data) {
    //if get fund info API returns status 404
    //do session storages and skip price and account balance update
    if (data.status === 404) {
      //store user total balance
      sessionStorage.userBalance = totalBalance(userAccount);
      //stores userAccount
      sessionStorage.userAccount = JSON.stringify(userAccount);
    } else {
      var currentFundPrice = {};
      data.forEach(obj => {
        currentFundPrice[obj.t] = obj.l;
      });
      //call function to update user account's fund price
      priceUpdate(currentFundPrice, userAccount);
      // call function to update user account investment balance
      userAcctBalance(userAccount);
      //store user total balance
      sessionStorage.userBalance = totalBalance(userAccount);
      //stores userAccount
      sessionStorage.userAccount = JSON.stringify(userAccount);
    }
  });
});

//create sample user cost basis
var userCost = 100000;
//store user cost basis
sessionStorage.userCost = userCost;


