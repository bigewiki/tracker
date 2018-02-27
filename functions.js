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

roger_complete = 0;
johnny_complete = 0;
karen_complete = 0;
penelope_complete = 0;
adrian_complete = 0;

$('#oldest-mig-date').html(jsObject.service_list[0].added.substring(0, 10));

startday=jsObject.service_list[0].added.substring(0, 10);
roger_startday=startday;
johnny_startday=startday;
karen_startday=startday;
penelope_startday=startday;
adrian_startday=startday;

roger_activedays=0;
penelope_activedays=0;
johnny_activedays=0;
penelope_activedays=0;
karen_activedays=0;
adrian_activedays=0;

total_complete_counter=0;

for (var i=0; i<jsObject.service_list.length; i++) {
// check if complete
  if(jsObject.service_list[i].status=="Complete"){
    // check if it's been within 7 days
    if(jsObject.service_list[i].age < 8){
      total_complete_counter=total_complete_counter+1;
      $("#total_complete_lastweek").html(total_complete_counter);
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
        }//end if check if it's a new day
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
      }
    }
  } // end of completion check

  //  update the latest mig date
  $('#newest-mid-date').html(jsObject.service_list[i].added.substring(0, 10));

  // check if it's a new active day

} // end of service list loop
