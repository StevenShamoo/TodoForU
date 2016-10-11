
$(document).ready(function(){

//Listeners

$('#addItemToList').on('click', addToList);

$('#addTaskClick').on('click', addButton);

$('#showTaskListClick').on('click', showButton, populateTable);

$('#updateTaskButton').on('click', updateTask);



//Functions
$('#TableWrapperAdd').hide();
populateTable();
//initially set the table you want to be sorted (everytime we do it again we will do $('#populateThis').trigger('update') so it doesnt duplicate the table.)
$('#populateThis').tablesorter();




var taskData;

function addButton(event){
  if(event){
  event.preventDefault();
  }
  $('#activeShowList').attr('class', '');
  $('#activeAddTask').attr('class', 'activeMe');
  $('#TableWrapper').hide();
  $('#TableWrapperAdd').show();
  $('#populateThis').hide();
  $('#addDueDate').datepicker();
}

function showButton(event){
  if(event){
  event.preventDefault();
  }
  $('#activeShowList').attr('class', 'activeMe');
  $('#activeAddTask').attr('class', '');
  $('#TableWrapperAdd').hide();
  $('#TableWrapper').show();
  $('#populateThis').show();

}

function clickAdd(){
  
}

function populateTable(event){
  showButton(event);
  
  if(event){
    event.preventDefault();
  }
  var tableData = '';

  $.ajax({
    type:'GET',
    url: '/filltable'
  }).done(function(response){
    taskData = response;
    _.each(response,function(data){
        tableData += '<tr>';
        tableData += '<td>' + data.taskName + '</td>';
        tableData += '<td>' + data.taskDate + '</td>';
        tableData += '<td>' + data.taskTime + data.taskAmPm + '</td>';
        tableData += '<td class="tableDescription"><div class=wordWrapper>' + data.taskDescription + '</div></td>';
        tableData += '<td><button type="button" class="btn btn-xs buttonDelete" title="Delete" rel="'+ data._id + '"><span class="glyphicon glyphicon-remove"></span></button> '+
        '/ <button type="button" class="btn btn-xs buttonUpdate" title="Update" rel="' + data._id + '"data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-pencil"></span></button></td>';
        tableData += '</tr>';
    });
    $('#targetTbody').html(tableData);
    $('.buttonDelete').on('click', deleteTask);
    $('.buttonUpdate').on('click', makeUpdateModal);
    $('#populateThis').trigger('update');
  });
}

function addToList(event){
  
  event.preventDefault();

  var dataToSend = {
    'taskName': $('#addTaskName').val(),
    'taskDate': $('#addDueDate').val(),
    'taskTime': $('#addTime').val(),
    'taskAmPm': $('#amPm').val(),
    'taskDescription': $('#addDescription').val()

  };
  var errorcount = 0;
  
  _.each(dataToSend, function(data){
    if(data === ''){
      errorcount++;
    }else {
      return false;
    }
  });

  if(errorcount === 0) {
    $.ajax({
      type: 'POST',
      data: dataToSend,
      url: '/addtask',
      dataType: 'JSON'
    }).done(function(res) {

      if(res.msg === '') {
        $('#addDescription').val('');
        $('.addInputForm input').val('');
        $('#addTime').val('12');
        $('#amPm').val('AM');
        alert('You have successfully added a task!');
      }else{
        return alert(res.msg);
      }
    });
  }else {
    alert('Error, please fill out all the fields before clicking the add button.');
  }
}

function deleteTask(event) {
  if(event) {
    event.preventDefault();
  }
  var confirmIt = confirm('Are you sure you want to delete?');

  if (confirmIt === true) {
    $.ajax({
      type: 'DELETE',
      url:'/deletetask/' + $(this).attr('rel')
    }).done(function(response){
      if (response.msg === ''){
        alert('Task has been deleted.');
        populateTable();
      }else{
        return alert('Error occured while trying to delete.');
      }
    });
  }else {
    return false;
  }
}


function makeUpdateModal(event) {
  if(event) {
    event.preventDefault();
  }
  $.ajax({
    type:'GET',
    url:'/makeupdatemodal/' + $(this).attr('rel')
  }).done(function(results){
    $('#updateDueDate').datepicker();

    var modalData = results[0];

    $('#updateTaskName').val(modalData.taskName);
    $('#updateDueDate').val(modalData.taskDate);
    $('#updateTime').val(modalData.taskTime);
    $('#updateamPm').val(modalData.taskAmPm);
    $('#updateDescription').val(modalData.taskDescription);

    var idSet = modalData._id;
    $('#updateTaskButton').attr('rel', idSet);

  });
}



function updateTask(event) {
  if(event){
    event.preventDefault();
  }
  dataToSend = {

    'taskName': $('#updateTaskName').val(),
    'taskDate': $('#updateDueDate').val(),
    'taskTime': $('#updateTime').val(),
    'taskAmPm': $('#updateamPm').val(),
    'taskDescription': $('#updateDescription').val()
  };

  $.ajax({
    type:'POST',
    url:'/updatetask/' + $(this).attr('rel'),
    data: dataToSend,
    dataType: 'JSON' 
  }).done(function(results){
    if (results.msg === ''){
      $('#closeUpdate').click();
    }else{
      return alert('Error while updating');
    }
    populateTable();
  });

}


});