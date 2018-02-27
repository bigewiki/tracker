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
