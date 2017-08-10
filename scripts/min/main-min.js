function User(id, email, password, first, last){
  this.id = id;
  this.email = email;
  this.password = password;
  this.first = first;
  this.last = last;
}

function Account(id, ticker, fundname, category, share, price, balance) {
  this.id = id;
  this.ticker = ticker;
  this.fundname = fundname;
  this.category = category;
  this.price = price;
  this.share = share;
  this.balance = balance;
}

var jdoe = new User(1, "jdoe@example.com", "123456", "Joe", "Doe")

var jdoe1 = new Account(1, "VBMFX", "Vanguard Total Bond Market Index", "Bond", 10.81, 370.028, 4000);

var jdoe2 = new Account (1, "VTSMX", "Vanguard Total Stock Market Index", "Large Cap", 61.63, 32.452, 2000)

var jdoe3 = new Account(1, "VIMSX", "Vanguard Mid-Cap Index", "Mid Cap", 39.27, 38.197, 1500)

var jdoe4 = new Account(1, "NAESX", "Vanguard Small-Cap Index", "Small Cap", 64.69, 15.458, 1000)

var jdoe5 = new Account(1, "VGSTX", "Vanguard International Index", "International", 26.21, 57.230, 1500)

var jdoeAccount = [jdoe1, jdoe2, jdoe3, jdoe4, jdoe5];

function totalBalance(account) {
  var total = 0;
  for (var i = 0; i < account.length; i++) {
    total += account[i].balance;
  }
  return total;
}

var jdoeBalance = totalBalance(jdoeAccount);

var date = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var fullDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();

$().ready(function(){
  $('.today').text(fullDate);
})


