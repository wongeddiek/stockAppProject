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

  var user1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bonds", 521.456, 10.81, 5636.94, "rgba(9, 82, 86, 1)");

  var user2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 65.426, 61.63, 4032.20, "rgba(8, 127, 140, 1)");

  var user3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 65.873, 39.27, 2586.83, "rgba(90, 170, 149, 1)");

  var user4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 25.495, 64.69, 1649.27, "rgba(134, 168, 115, 1)");

  var user5 = new Account(1, "VGSTX", "Vanguard International Index", "International Stocks", 175.013, 26.21, 4587.09, "rgba(187, 159, 6, 1)");

  return [user1, user2, user3, user4, user5]

}

var userAccount = userAccountData();

// Create pre-defined portfolio objects
function genPortfolioData(bal1, bal2, bal3, bal4, bal5) {

  var port1 = new Portfolio("VBMFX", "Vanguard Total Bond Market Index", "Bonds", 10.81, bal1, "rgba(9, 82, 86, 1)");

  var port2 = new Portfolio ("VTSMX", "Vanguard Total Stock Market Index", "Large Co. Stocks", 61.63, bal2, "rgba(8, 127, 140, 1)")

  var port3 = new Portfolio("VIMSX", "Vanguard Mid-Cap Index", "Mid Co. Stocks", 39.27, bal3, "rgba(90, 170, 149, 1)")

  var port4 = new Portfolio("NAESX", "Vanguard Small-Cap Index", "Small Co. Stocks", 64.69, bal4, "rgba(134, 168, 115, 1)")

  var port5 = new Portfolio("VGSTX", "Vanguard International Index", "International Stocks", 26.21, bal5, "rgba(187, 159, 6, 1)")

  return [port1, port2, port3, port4, port5]
}

var conPort = genPortfolioData(0.60, 0.15, 0.10, 0.10, 0.05)
var modPort = genPortfolioData(0.40, 0.20, 0.15, 0.10, 0.15)
var aggPort = genPortfolioData(0.15, 0.30, 0.20, 0.20, 0.25)
