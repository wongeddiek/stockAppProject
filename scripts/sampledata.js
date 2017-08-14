// User profile object constructor
function User(id, email, password, first, last){
  this.id = id;
  this.email = email;
  this.password = password;
  this.first = first;
  this.last = last;
}

// User Account object constructor
function Account(id, ticker, fundname, category, share, price, balance, color) {
  this.id = id;
  this.ticker = ticker;
  this.fundname = fundname;
  this.category = category;
  this.price = price;
  this.share = share;
  this.balance = balance;
  this.color = color;
}

//moved to port.js
function Portfolio(ticker, fundname, category, price, balance, color) {
  this.ticker = ticker;
  this.fundname = fundname;
  this.category = category;
  this.price = price;
  this.balance = balance;
  this.color = color;
}

// Creates sample user profile
var user = new User(1, "jdoe@example.com", "123456", "Joe", "Doe")

// Creates sample user account
function userAccountData() {

  var user1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bonds", 1387.604, 10.81, 15000.00, "rgba(9, 82, 86, 1)");

  var user2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 567.905, 61.63, 35000.00, "rgba(8, 127, 140, 1)");

  var user3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 381.971, 39.27, 15000.00, "rgba(90, 170, 149, 1)");

  var user4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 154.583, 64.69, 10000.00, "rgba(134, 168, 115, 1)");

  var user5 = new Account(1, "VGSTX", "Vanguard International Index", "International Stocks", 953.834, 26.21, 25000.00, "rgba(187, 159, 6, 1)");

  return [user1, user2, user3, user4, user5]

}

// create user account data
var userAccount = userAccountData();

// function to sum all investment balances
function totalBalance(account) {
  var total = 0;
  for (var i = 0; i < account.length; i++) {
    total += account[i].balance;
  }
  return total;
}

// creates user total account balance
var userBalance = totalBalance(userAccount);

// update current user shares from stored and update balance
if (sessionStorage.userShares) {
  for (var i = 0; i < userAccount.length; i++) {
    userAccount[i].share = +(sessionStorage.userShares.split(",")[i]);
    userAccount[i].balance = +(userAccount[i].price * userAccount[i].share).toFixed(2);
  }
}

// if user selected new portfolio, update user account
if (sessionStorage.transferBal) {
  for (var i = 0; i < userAccount.length; i++) {
    userAccount[i].balance = +(sessionStorage.transferBal.split(",")[i]);
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

//store user shares & total balance
sessionStorage.userShares = getUserShares();
sessionStorage.userBalance = userBalance;
