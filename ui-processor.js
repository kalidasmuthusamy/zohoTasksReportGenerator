function clickFilterIcon(){
  $(".zoho-filter").get(0).click();
}

function selectAllStatus(){
  $("#0_status").prop("checked", true);
  $("#1_status").prop("checked", true);
}

function applyFilter(){
  $("#pfilter").click();
}


function asyncFuncExecutor(){
  var item = uiActions.shift();
  if(item !== undefined){
    item.func();
    setTimeout(asyncFuncExecutor, item.pauseFor);
  }
}

var uiActions = [];
uiActions.push({ func: clickFilterIcon, pauseFor: 2000 });
uiActions.push({ func: selectAllStatus, pauseFor: 2000 });
uiActions.push({ func: applyFilter, pauseFor: 5000 });
uiActions.push({ func: buildTaskObjects, pauseFor: 1000 });

asyncFuncExecutor();
