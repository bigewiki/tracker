function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getQuote() {
const quotes = [
  "The best preparation for tomorrow is doing your best today. - H. Jackson Brown, Jr. ",
"Quality is not an act, it is a habit. - Aristotle ",
"The secret of getting ahead is getting started. - Mark Twain ",
"Start where you are. Use what you have. Do what you can. - Arthur Ashe ",
"Be kind whenever possible. It is always possible. - Dalai Lama ",
"We may encounter many defeats but we must not be defeated. - Maya Angelou ",
"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better. - Samuel Beckett ",
"What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar ",
"By failing to prepare, you are preparing to fail. - Benjamin Franklin ",
"Practice isn't the thing you do once you're good. It's the thing you do that makes you good. - Malcolm Gladwell ",
"You just can't beat the person who never gives up. - Babe Ruth ",
"A Jedi's training is never complete.",
"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint-Exupery",
"Success is not final, failure is not fatal. - Winston Churchill"
];

$('#quote-area').html(rando(quotes));
}

function getNewQuote() {
  $("#quote-area").html(getQuote);
}

    /******************/
    /** Get the year **/
    /******************/

function showYear() {
    var d = new Date();
    var n = d.getFullYear();
    $("#showYear").html(n);
}


    /******************/
    /** Initialize tooltips
    /******************/

function regenQuote() {
  $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  });
}

    /******************/
    /** Load functions
    /******************/
showYear();
getQuote();

$("#generate-quote").click(function(){
getNewQuote();
});


/******************/
// Date functions
/******************/

/****SET TODAY****/

// var date = new Date();
var date = new Date('2018-02-03T00:00:00+05:30');//yyyy-dd-mm
// forcing 2 digit month
var todaysMonth = (1 + date.getMonth()).toString();
todaysMonth = todaysMonth.length > 1 ? todaysMonth : '0' + todaysMonth;
// forcing 2 digit day
var todaysDay = date.getDate().toString();
todaysDay = todaysDay.length > 1 ? todaysDay : '0' + todaysDay;
// set today's variable
todaysDate = todaysMonth + '/' + todaysDay + '/' +  date.getFullYear();


/****SET DATE FOR A WEEK AGO****/

// Here I am setting the date to be 7 days in the past
date.setDate(date.getDate() - 7);
// forcing 2 digit month
var weekAgosMonth = (1 + date.getMonth()).toString();
weekAgosMonth = weekAgosMonth.length > 1 ? weekAgosMonth : '0' + weekAgosMonth;
// forcing 2 digit day
var weekAgosDay = date.getDate().toString();
weekAgosDay = weekAgosDay.length > 1 ? weekAgosDay : '0' + weekAgosDay;
// I create the variable representing 7 days ago
weekAgosDate = weekAgosMonth + '/' + weekAgosDay + '/' +  date.getFullYear();
// storing them in plain view
$('#weekAgosDate').html(weekAgosDate);
$('#todaysDate').html(todaysDate);
