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
/*******************************/
/****SET DATE FOR A WEEK AGO****/
/*******************************/

// creating array to set a variable for past 7 days
var sevenDayArray=["day0", "day1", "day2", "day3", "day4", "day5", "day6"]

// looping out array to get the date values
for (var i=0; i<sevenDayArray.length; i++) {
date.setDate(date.getDate() - 1);
// forcing 2 digit month
var sevenDayArrayMonth = (1 + date.getMonth()).toString();
sevenDayArrayMonth = sevenDayArrayMonth.length > 1 ? sevenDayArrayMonth : '0' + sevenDayArrayMonth;
// forcing 2 digit day
var sevenDayArrayDay = date.getDate().toString();
sevenDayArrayDay = sevenDayArrayDay.length > 1 ? sevenDayArrayDay : '0' + sevenDayArrayDay;
// Here I create the variable representing 7 days ago
sevenDayArray[i] = date.getFullYear() + "-" + sevenDayArrayMonth + "-" + sevenDayArrayDay
}

// storing the days in plain view
$('#todaysDateOutput').html(todaysDate);
$('#weekAgosDateOutput').html(sevenDayArray[6]);




/******************/
// API CALL
/******************/
var xmlhttp = new XMLHttpRequest();
var url = "http://bigewiki.com/json/projectdata.json";
xmlhttp.open("GET", url, false);
xmlhttp.send();
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  var result = xmlhttp.responseText;
  var jsObject = JSON.parse(result);
  $('.loading-card').hide();
  $('#main-display').show();
}
// setting complete counter to 0
roger_complete = 0;
johnny_complete = 0;
karen_complete = 0;
penelope_complete = 0;
adrian_complete = 0;
// setting start day
$('#oldest-mig-date').html(jsObject.service_list[0].added.substring(0, 10));
// getting everyone's startday to match
startday=jsObject.service_list[0].added.substring(0, 10);
roger_startday=startday;
johnny_startday=startday;
karen_startday=startday;
penelope_startday=startday;
adrian_startday=startday;
// setting coutner for active days
roger_activedays=0;
penelope_activedays=0;
johnny_activedays=0;
penelope_activedays=0;
karen_activedays=0;
adrian_activedays=0;
// counting total for last 7 days
week_total_complete_counter=0;
// counting 7 day total for all agents
roger_week_complete=0;
penelope_week_complete=0;
johnny_week_complete=0;
penelope_week_complete=0;
karen_week_complete=0;
adrian_week_complete=0;
// setting the zeroes
$("#roger_week_complete").html(roger_week_complete);
$("#penelope_week_complete").html(penelope_week_complete);
$("#johnny_week_complete").html(johnny_week_complete);
$("#karen_week_complete").html(karen_week_complete);
$("#adrian_week_complete").html(adrian_week_complete);
//setting customer Review
total_cxreview_lastweek=0;
// setting cancellations
total_cancel_lastweek=0;
// setting total sold for last week
total_sold_lastweek=0;
// setting second total sold for last week
total_sold_lastweek_2=0;

/************************************/
// Looping through all the projects gathered through the API
/************************************/

for (var i=0; i<jsObject.service_list.length; i++) {

  if(sevenDayArray.includes(jsObject.service_list[i].added.substring(0, 10))==true){
    total_sold_lastweek=total_sold_lastweek+1;
    $("#total_sold_lastweek").html(total_sold_lastweek);
  };

// testzone
  if(jsObject.service_list[i].added.substring(0, 10)=="2018-02-01"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-31"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-30"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-29"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-28"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-27"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }

  if(jsObject.service_list[i].added.substring(0, 10)=="2018-01-26"){
    total_sold_lastweek_2=total_sold_lastweek_2+1;
    $("#total_sold_lastweek_2").html(total_sold_lastweek_2);
  }
// end testzone





  if(jsObject.service_list[i].status=="Customer Review"){
    // check if it's been within 7 days
    if(jsObject.service_list[i].age < 8){
      total_cxreview_lastweek=total_cxreview_lastweek+1;
      $("#total_cxreview_lastweek").html(total_cxreview_lastweek);
    }
  }

    if(jsObject.service_list[i].status=="Cancelled"){
      // check if it's been within 7 days
      if(jsObject.service_list[i].age < 8){
        total_cancel_lastweek=total_cancel_lastweek+1;
        $("#total_cancel_lastweek").html(total_cancel_lastweek);
      }
    }

// check if complete
  if(jsObject.service_list[i].status=="Complete"){
    // check if it's been within 7 days
    if(jsObject.service_list[i].age < 8){
      week_total_complete_counter=week_total_complete_counter+1;
      $("#total_complete_lastweek").html(week_total_complete_counter);
    }

    // check if it belongs to the agent
    if(jsObject.service_list[i].assigned_to=="roger"){
      roger_complete = roger_complete+1;
      $('#roger_complete_display').html(roger_complete);
        // check if it's a new active day
        if(jsObject.service_list[i].added.substring(0, 10)!=roger_startday){
          // reset the day
          roger_startday=jsObject.service_list[i].added.substring(0, 10);
          // add one day to the ticker
          roger_activedays=roger_activedays+1;
          // update the display
          $('#roger_activedays_display').html(roger_activedays);
          // calculate average migs per day
          $('#roger_completionrate_display').html(roger_complete/roger_activedays);
          // count for last 7 days
          if(jsObject.service_list[i].age < 8){
            roger_week_complete=roger_week_complete+1;
            $("#roger_week_complete").html(roger_week_complete);
          }
        }//end if check if it's a new day

    // other agent checks are based on the above if statement for roger
    }
    // to
    if(jsObject.service_list[i].assigned_to=="johnny"){
      johnny_complete = johnny_complete+1;
      $('#johnny_complete_display').html(johnny_complete);
      if(jsObject.service_list[i].added.substring(0, 10)!=johnny_startday){
        johnny_startday=jsObject.service_list[i].added.substring(0, 10);
        johnny_activedays=johnny_activedays+1;
        $('#johnny_activedays_display').html(johnny_activedays);
        $('#johnny_completionrate_display').html(johnny_complete/johnny_activedays);
        if(jsObject.service_list[i].age < 8){
          johnny_week_complete=johnny_week_complete+1;
          $("#johnny_week_complete").html(johnny_week_complete);
        }
      }
    }
    // mc
    if(jsObject.service_list[i].assigned_to=="penelope"){
      penelope_complete = penelope_complete+1;
      $('#penelope_complete_display').html(penelope_complete);
      if(jsObject.service_list[i].added.substring(0, 10)!=penelope_startday){
        penelope_startday=jsObject.service_list[i].added.substring(0, 10);
        penelope_activedays=penelope_activedays+1;
        $('#penelope_activedays_display').html(penelope_activedays);
        $('#penelope_completionrate_display').html(penelope_complete/penelope_activedays);
        if(jsObject.service_list[i].age < 8){
          penelope_week_complete=penelope_week_complete+1;
          $("#penelope_week_complete").html(penelope_week_complete);
        }
      }
    }
    // sh
    if(jsObject.service_list[i].assigned_to=="karen"){
      karen_complete = karen_complete+1;
      $('#karen_complete_display').html(karen_complete);
      if(jsObject.service_list[i].added.substring(0, 10)!=karen_startday){
        karen_startday=jsObject.service_list[i].added.substring(0, 10);
        karen_activedays=karen_activedays+1;
        $('#karen_activedays_display').html(karen_activedays);
        $('#karen_completionrate_display').html(karen_complete/karen_activedays);
        if(jsObject.service_list[i].age < 8){
          karen_week_complete=karen_week_complete+1;
          $("#karen_week_complete").html(karen_week_complete);
        }
      }
    }
    // ta
    if(jsObject.service_list[i].assigned_to=="adrian"){
      adrian_complete = adrian_complete+1;
      $('#adrian_complete_display').html(adrian_complete);
      if(jsObject.service_list[i].added.substring(0, 10)!=adrian_startday){
        adrian_startday=jsObject.service_list[i].added.substring(0, 10);
        adrian_activedays=adrian_activedays+1;
        $('#adrian_activedays_display').html(adrian_activedays);
        $('#adrian_completionrate_display').html(adrian_complete/adrian_activedays);
        if(jsObject.service_list[i].age < 8){
          adrian_week_complete=adrian_week_complete+1;
          $("#adrian_week_complete").html(adrian_week_complete);
        }
      }
    }
  } // end of completion check

  //  update the latest mig date
  $('#newest-mid-date').html(jsObject.service_list[i].added.substring(0, 10));

  // check if it's a new active day

} // end of service list loop
