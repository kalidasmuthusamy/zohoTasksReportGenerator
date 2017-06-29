function generateCsv(tasks, file_name = "cltve_tasks") {
    var csv = 'Task,Hours\n';
    tasks.forEach(function(row) {
            csv += row.name + "," + row.hours
            csv += "\n";
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = file_name + ' - ' + new Date().toUTCString() + '.csv';
    hiddenElement.click();
}

function processHours(time){
  hourVal = Number.parseInt(time.split(":")[0]);
  minVal = Number.parseFloat(time.split(":")[1]);

  // If minutes are between 1 - 30, decimal should be .5
  if(minVal > 0 && minVal < 31){
    minVal = "5";
  }
  // If minutes are between 31 - 59, decimal should be .0 and hour should be incremented
  else if(minVal > 30 && minVal < 60){
    ++hourVal;
    minVal = "0";
  }
  return (hourVal + "." + minVal);
}

function processName(taskName, taskElement){
  var indendation_level = taskElement.attr('depth');
  for(i = 0; i < indendation_level; i++){
    taskName = "     " + taskName;
  }
  return taskName;
}

function buildTaskObjects(){
  var taskSelectors = {
    row: "tr[name*='taskrow'][data-tt-id*='ttid_']",
    name: "a[name='taskhreflink']",
    hours: 'p[class="pm0"]'
  }

  var tasks = [];
  var totalHours = 0;

  $(taskSelectors.row).each(function(index, elem){
    var $elem = null;
    $elem = $(elem);
    taskName = $elem.find(taskSelectors.name).text();
    taskName = taskName.substr(0, (taskName.length/2));

    var taskObj = {name: null, hours: null};
    taskObj.name = processName(taskName, $elem);
    taskObj.hours = processHours(($elem.children().find(taskSelectors.hours).text()));

    totalHours += Number.parseFloat(taskObj.hours);
    tasks.push(taskObj);
  });

  generateCsv(tasks);

  console.table(tasks);
  console.log("Total Number of tasks : %s", tasks.length);
  console.log("Total Number of Hours : %s", totalHours);

  alert("Total Number of tasks : " +  tasks.length);
  alert("Total Number of Hours : " + totalHours);
}
