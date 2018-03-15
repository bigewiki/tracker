/******************/
// Date functions
/******************/

/******SETUP ROUNDING FUNCTION****/

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/****SET TODAY****/

// var date = new Date();
var date = new Date('2018-01-30T00:00:00+05:30');//yyyy-dd-mm
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
// Get JSON and create objects
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
// setting customer review queue
total_customer_review=0;
// setting waiting for customer queue
total_waiting_for_customer=0;
// setting new queue
total_new=0;
// setting agent review queue
total_agent_review=0;
// setting ages
total_new_age=0;
total_cxreview_age=0;
total_waiting_age=0;
total_agentreview_age=0;
/************************************/
// Looping through all the projects gathered through the API
/************************************/

for (var i=0; i<jsObject.service_list.length; i++) {

  if(sevenDayArray.includes(jsObject.service_list[i].added.substring(0, 10))==true){
    total_sold_lastweek=total_sold_lastweek+1;
    $("#total_sold_lastweek").html(total_sold_lastweek);
  };


  if(jsObject.service_list[i].status=="Customer Review"){
    //count up total_customer_review
    total_customer_review=total_customer_review+1;
    //update display for total_customer_review
    $('#total_customer_review').html(total_customer_review);
    //total up the amount for total_cxreview_age (all projects combined)
    total_cxreview_age=total_cxreview_age+jsObject.service_list[i].age;
    //calculate and round average age for customer review
    cxreview_avg_age=precisionRound(total_cxreview_age/total_customer_review, 1);
    //update cxreview_avg_age display
    $('#cxreview_avg_age').html(cxreview_avg_age);
    // check if it's been within 7 days
    if(jsObject.service_list[i].age < 8){
      total_cxreview_lastweek=total_cxreview_lastweek+1;
      $("#total_cxreview_lastweek").html(total_cxreview_lastweek);
    }
  }

  if(jsObject.service_list[i].status=="Waiting For Cust"){
    //count up total_waiting_for_customer
    total_waiting_for_customer=total_waiting_for_customer+1;
    //update display for the total in queue for waiting for customer
    $('#total_waiting_for_customer').html(total_waiting_for_customer);
    //add up sum for all age values for all projects in this queue
    total_waiting_age=total_waiting_age+jsObject.service_list[i].age;
    // calculate and round the average age
    waiting_avg_age=precisionRound(total_waiting_age/total_waiting_for_customer, 1);
    // update the display
    $('#waiting_avg_age').html(waiting_avg_age);
  }

  if(jsObject.service_list[i].status=="New"){
    //count up total_new
    total_new=total_new+1;
    // update the display for the total in this queue
    $('#total_new').html(total_new);
    //add up the total age for all all new projects
    total_new_age=total_new_age+jsObject.service_list[i].age;
    //calculate the average age and round it
    new_avg_age=precisionRound(total_new_age/total_new, 1);
    //update the display for the average age
    $('#new_avg_age').html(new_avg_age);
  }

  if(jsObject.service_list[i].status=="Agent Review"){
    //count up total_agent_review
    total_agent_review=total_agent_review+1;
    //update display for the total in this queue
    $('#total_agent_review').html(total_agent_review);
    //add up the total age for all all agent review projects
    total_agentreview_age=total_agentreview_age+jsObject.service_list[i].age;
    //calculate the average age and round it
    agentreview_avg_age=precisionRound(total_agentreview_age/total_agent_review, 1);
    //update the display for the average age
    $('#agentreview_avg_age').html(agentreview_avg_age);
  }

    if(jsObject.service_list[i].status=="Cancelled"){
      // check if it's been within 7 days
      if(jsObject.service_list[i].age < 8){
        total_cancel_lastweek=total_cancel_lastweek+1;
        $("#total_cancel_lastweek").html(total_cancel_lastweek);
      }
    }

// check if complete
  if(jsObject.service_list[i].status=="Complete" || jsObject.service_list[i].status_name=="customer_review"){
    // check if it's been within 7 days
    if(jsObject.service_list[i].age < 8){
      week_total_complete_counter=week_total_complete_counter+1;
      $("#total_complete_lastweek").html(week_total_complete_counter);
    }

    // check if it belongs to the agent
    if(jsObject.service_list[i].assigned_to=="roger"){
      roger_complete = roger_complete+1;
      $('#roger_complete_display').html(roger_complete);
        // count for last 7 days
        if(jsObject.service_list[i].age < 8){
          roger_week_complete=roger_week_complete+1;
          $("#roger_week_complete").html(roger_week_complete);
        }

    // other agent checks are based on the above if statement for roger
    }
    // to
    if(jsObject.service_list[i].assigned_to=="johnny"){
      johnny_complete = johnny_complete+1;
      $('#johnny_complete_display').html(johnny_complete);
      if(jsObject.service_list[i].age < 8){
        johnny_week_complete=johnny_week_complete+1;
        $("#johnny_week_complete").html(johnny_week_complete);
      }
    }
    // mc
    if(jsObject.service_list[i].assigned_to=="penelope"){
      penelope_complete = penelope_complete+1;
      $('#penelope_complete_display').html(penelope_complete);
      if(jsObject.service_list[i].age < 8){
        penelope_week_complete=penelope_week_complete+1;
        $("#penelope_week_complete").html(penelope_week_complete);
      }
    }
    // sh
    if(jsObject.service_list[i].assigned_to=="karen"){
      karen_complete = karen_complete+1;
      $('#karen_complete_display').html(karen_complete);
      if(jsObject.service_list[i].age < 8){
        karen_week_complete=karen_week_complete+1;
        $("#karen_week_complete").html(karen_week_complete);
      }
    }
    // ta
    if(jsObject.service_list[i].assigned_to=="adrian"){
      adrian_complete = adrian_complete+1;
      $('#adrian_complete_display').html(adrian_complete);
      if(jsObject.service_list[i].age < 8){
        adrian_week_complete=adrian_week_complete+1;
        $("#adrian_week_complete").html(adrian_week_complete);
      }
    }
  } // end of completion check

  //  update the latest mig date
  $('#newest-mid-date').html(jsObject.service_list[i].added.substring(0, 10));



} // end of service list loop
