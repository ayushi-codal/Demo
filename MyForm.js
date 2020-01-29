<<<<<<< HEAD
var itemArray = JSON.parse(localStorage.getItem('tempData')) || [];//common array for all the values of table
var selectedItems = -1;//variable to know if current operation is to Add or Edit

function initialLoad()//function executed on body load
{
  let inputs = document.myForm.querySelectorAll('[type="text"]'),
  buttonAdd = document.querySelector('#button1')
  var radioInput = selectedGender() ;//checks if radio button is selected or not
  var hobbiesInput = [] 
  hobbiesInput= selectedHobbies();//checks if checkbox is selected or not
  buttonAdd.disabled = true;
  let values = []
  values.forEach(i => {
    inputs[i].addEventListener('input' ,() => {
      inputs.forEach(v => values.push(v.value))
    });
});
var checkAll = document.getElementById("selectAll");
 if(radioInput && (hobbiesInput.length !== 0 || checkAll.checked == true))
    {
      if(validateMobileNumber() && validateEnrollno() && validateEmail() )
      {
      buttonAdd.disabled = values.includes('');//add button is enabled if all the inputs of form are filled
      }
    }
    //to uncheck select all checkbox
    var checkedbox = document.getElementsByName("checks");
    checkedbox.forEach(result => {
      if(!result.checked)
      {
        checkAll.checked = false;
      }
      
    });
if(hobbiesInput.length == 6) // to check select all button if all checkboxes are checked
  {
    checkAll.checked = true;
  }
      
}
  
 function Add() 
 {
    var formData = AddData();//variable which stores the current values of form
    var table = document.getElementById("mylist");
    
    if(selectedItems == -1)
    {
      deleteTable();
      var row = document.getElementsByTagName("tr");
      AddRow(formData);
      console.log(table.rows.length)
      itemArray.push(formData); // add row 
      var index = itemArray.length ;
      row[index].style.backgroundColor = 'lightblue';// to highlight newly added row
      setTimeout(function(){
        row[index].style.backgroundColor = 'white';
      },
      4000);
      resetForm();
      document.getElementById("button1").disabled = true;
    }
    else
    {
      itemArray.splice(selectedItems,1,formData); //edit selected row 
      var row = document.getElementsByTagName("tr");
      console.log(row[selectedItems+1])
      var index = selectedItems+1;
      row[index].style.color= 'lightblue';
      resetForm();
      deleteTable();
      syncTask();
      viewData();
      table.scrollIntoView();
    
    }
  syncTask(); //local storage
  }
  
function AddData() // function to add new data row
 {
  var formData = {}; //object
  formData["Fname"] = document.getElementById("Fname").value;
  formData["Lname"] = document.getElementById("Lname").value;
  formData["phno"] = document.getElementById("phno").value;
  formData["email"] = document.getElementById("email").value;
  formData["gender"] = selectedGender();
  formData["Enrollno"] = document.getElementById("Enrollno").value;
  formData["Certificates"] = document.getElementById("Certificates").value;
  var Hobbies = [];
  formData["Hobbies"+Hobbies] = selectedHobbies();
  return formData;
 }

function removeRow(button) // function to remove row
{
  var row = button.parentNode.parentNode;
  console.log(row)
  if (confirm("Do you want to delete this data?"))
  {
    var table = document.getElementById("mylist");
    selectedItems = row.rowIndex-1;
    table.deleteRow(row.rowIndex);
    itemArray.splice(selectedItems, 1);

    deleteTable();
    syncTask();
    viewData();

  }
}
function resetForm() //reset form function
{
  var frm = document.getElementsByName('myForm')[0];
  frm.reset()
  return false;
}
//var counter = 0;// counter for index
function AddRow(data)
 {
   var counter = viewData();
    var table = document.getElementById("mylist").getElementsByTagName("tbody")[0];
    var NewRow = table.insertRow(table.length);
    var cel1 = NewRow.insertCell(0);
    cel1.innerHTML = counter+1;
    var cel2 = NewRow.insertCell(1);
    cel2.innerHTML = data.Fname;
    var cel3 = NewRow.insertCell(2);
    cel3.innerHTML = data.Lname;
    var cel4 = NewRow.insertCell(3);
    cel4.innerHTML = data.phno;
    var cel5 = NewRow.insertCell(4);
    cel5.innerHTML = data.email;
    var cel6 = NewRow.insertCell(5);
    cel6.innerHTML = data.gender;
    var cel7 = NewRow.insertCell(6);
    cel7.innerHTML = data.Enrollno;
    var cel8 = NewRow.insertCell(7);
    cel8.innerHTML = data.Certificates;
    var cel9 = NewRow.insertCell(8);
    cel9.innerHTML = data.Hobbies;

    //remove button
    cel10 = NewRow.insertCell(9);
    var btnRemove = document.createElement("INPUT");
    btnRemove.type = "button";
    btnRemove.value = "Remove";
    btnRemove.setAttribute("onclick", "removeRow(this)");
    cel10.appendChild(btnRemove);

    //edit button
    cel11 = NewRow.insertCell(10);
    var btnEdit = document.createElement("INPUT");
    btnEdit.type = "button";
    btnEdit.value = "Edit";
    btnEdit.id = "editData";
    btnEdit.setAttribute("onclick", "editDisplay(this),scrollDown()");
    cel11.appendChild(btnEdit);
    resetForm()
    counter ++;

}
function scrollDown()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function radioCheck(formData) //function to get the checked radio button in form on edit
{
  var radioButton=formData.gender;
  switch(radioButton)
  {
    case "Male":
      var male = document.getElementById("gnd1");
      male.checked = true;
      break;
    case "Female":
      var female = document.getElementById("gnd2");
      female.checked = true;
      break;
    case "Other":
      var other = document.getElementById("gnd3");
      other.checked = true;
      break;
  }
}

function checkBox(formData) //function to get the checked checkboxes in form on edit
{
  var selectedHobbies= formData.Hobbies;
  var checkAll = document.getElementById("selectAll")
  if(selectedHobbies.length == 6)
  {
    checkAll.checked = true;
  }
  selectedHobbies.forEach(i => {
    switch(i)
    {
      case "Singing":
        var checkBoxes = document.getElementById("hobby1");
        checkBoxes.checked = true;
        break;
      case "Dancing":
        var checkBoxes = document.getElementById("hobby2");
        checkBoxes.checked = true;
        break;
      case "Music":
        var checkBoxes = document.getElementById("hobby3");
        checkBoxes.checked = true;
        break;
      case "Sports":
        var checkBoxes = document.getElementById("hobby4");
        checkBoxes.checked = true;
        break;
      case "Painting":
        var checkBoxes = document.getElementById("hobby5");
        checkBoxes.checked = true;
        break;
      case "Other":
        var checkBoxes = document.getElementById("hobby6");
        checkBoxes.checked = true;
        break;
    }
  });
}

function editDisplay(button) //function to display selected row in form inputs field on edit pressed
{
  document.getElementById("button1").disabled = false;
  var rows = button.parentNode.parentNode;
  var table = document.getElementById("mylist").rows;
  var formData = itemArray[rows.rowIndex-1];
  selectedItems = rows.rowIndex-1;
  document.getElementById("Fname").value = formData.Fname;
  document.getElementById("Lname").value = formData.Lname;
  document.getElementById("phno").value = formData.phno;
  document.getElementById("email").value = formData.email;
  document.getElementsByName("gender").value = radioCheck(formData);
  document.getElementById("Enrollno").value = formData.Enrollno;
  document.getElementById("Certificates").title= formData.Certificates;
  document.getElementsByName("Hobbies").value = checkBox(formData);
  document.getElementById("button1").value = "Update";
  return selectedItems;
}

function syncTask() // local storage add and get
{
  window.localStorage.setItem('tempData', JSON.stringify(itemArray));
  tempData = JSON.parse(window.localStorage.getItem('tempData'));
}
function scrollview()
{
  var elmnt = document.getElementById("listTable");
  elmnt.scrollIntoView();
}

function viewData() // view data from local storage
{

  var counter = 0; // for index
  let temp = JSON.parse(localStorage.getItem('tempData'));
  var table = document.getElementById("mylist");
    temp.forEach(value => {
      var NewRow = table.insertRow(table.length);
        var cel1 = NewRow.insertCell(0);
        cel1.innerHTML = counter + 1;
        var cel2 = NewRow.insertCell(1);
        cel2.innerHTML = value.Fname;
        var cel3 = NewRow.insertCell(2);
        cel3.innerHTML = value.Lname;
        var cel4 = NewRow.insertCell(3);
        cel4.innerHTML = value.phno;
        var cel5 = NewRow.insertCell(4);
        cel5.innerHTML = value.email;
        var cel6 = NewRow.insertCell(5);
        cel6.innerHTML = value.gender;
        var cel7 = NewRow.insertCell(6);
        cel7.innerHTML = value.Enrollno;
        var cel8 = NewRow.insertCell(7);
        var path = value.Certificates.replace(/^.*[\\\/]/, '');
        cel8.innerHTML = path;
        var cel9 = NewRow.insertCell(8);
        cel9.innerHTML = value.Hobbies;
        //remove button
        cel10 = NewRow.insertCell(9);
        var btnRemove = document.createElement("INPUT");
        btnRemove.type = "button";
        btnRemove.value = "Remove";
        btnRemove.setAttribute("onclick", "removeRow(this);");
        cel10.appendChild(btnRemove);
        //edit button
        cel11 = NewRow.insertCell(10);
        var btnEdit = document.createElement("INPUT");
        btnEdit.type = "button";
        btnEdit.value = "Edit";
        btnEdit.id = "editData";
        btnEdit.setAttribute("onclick", "editDisplay(this),scrollDown()");
        cel11.appendChild(btnEdit);
      
      counter ++;
    
    });
    return counter;
}
function deleteTable()
{
  var table = document.getElementById("mylist");
  for(var i = table.rows.length - 1; i>0; i--)
  {
    table.deleteRow(i)
  }
}

function selectedGender() {  //function to get gender selected
var radioButton=document.myForm.gender;
for(var i=0;i<radioButton.length;i++){
	if(radioButton[i].checked){
    switch(radioButton[i].value)
    {
		case 'Male':
      gender = "Male";
      return gender;
    case 'Female':
      gender = "Female";
      return gender;
    case 'Other':
      gender = "Other";
      return gender;
    default:
      gender = undefined;
    }
	}
}
}

function selectedHobbies() { // function to get selected hobbies
  var vals = []; 
  var items = document.getElementsByName('checks');
  items.forEach(valueHobby => {
    if(valueHobby.checked)
    {
      vals.push(valueHobby.value);
    }
  });

  return vals;
}

function selectAllCheckBoxes(source) { 
  var checkboxes = document.getElementsByName('checks');
  checkboxes.forEach(element => {
    element.checked = source.checked;
  });
}


function validateUsername(userName)
{

  var name = userName.value;
  if (name.length === null ||  name === "" )
  {
    document.getElementById('fnameErr').innerHTML = "Please enter valid name";
    //document.getElementById("lnameErr").innerHTML = "Please enter valid name";
    return false;
  }
  else
  {
    document.getElementById("fnameErr").innerHTML = "";
    document.getElementById("lnameErr").innerHTML = "";
    return true;
  }
}
function onlyNum(numberInput)
{
  var asciiCode = numberInput.which|| numberInput.keycode;
  if(asciiCode >=48 && asciiCode<=57) 
    {
      return true;
    }
    else{
      return false;
    }
}

function validateMobileNumber()
{
  var phnRegex = /^[1-9]\d{9}$/;
  var registerform = document.getElementsByName('myForm')[0];
  var numberMobile = registerform.MobileNumber.value;
    if (numberMobile.length !== 10 || numberMobile === "" || phnRegex.test(numberMobile) == false)
    {
      document.getElementById('phnErr').innerHTML = "Please enter a correct mobile number";
      return false;
    }
    else
    {
      document.getElementById("phnErr").innerHTML = "";
     return true;
    }
}
function validateEmail()
{
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var registerform = document.getElementsByName('myForm')[0];
  var mail = registerform.email.value;
  if(mail === "" || emailRegExp.test(mail) === false)
  {
    document.getElementById('emailErr').innerHTML = "please enter valid email id";
    return false;
  }
  else
  {
    document.getElementById('emailErr').innerHTML = "";
    return true;
  }
}


function validateEnrollno()
{
  var registerform = document.getElementsByName('myForm')[0];
  var regexEnroll = /^[1-9]\d{11}$/;
  var enrollNumber = registerform.Enrollno.value;
  if(enrollNumber  === "" || regexEnroll.test(enrollNumber ) == false)
  {
    document.getElementById('enrollErr').innerHTML = "please enter your enrollment number (12 digit)";
    return false;
  }
  else
  {
    document.getElementById('enrollErr').innerHTML = "";
    return true;
  }
}


function searchValue()
{
  let filter = document.getElementById("myInput").value.toUpperCase();
  var table = document.getElementById("mylist");
  var tra = table.getElementsByTagName('tr');
  Array.prototype.forEach.call(tra,element => {
    
  
    let td1 = element.getElementsByTagName('td')[1];
    let td2 = element.getElementsByTagName('td')[2];
    let td3 = element.getElementsByTagName('td')[3];
    let td4 = element.getElementsByTagName('td')[4];
    let td5 = element.getElementsByTagName('td')[5];
    let td6 = element.getElementsByTagName('td')[6];
    let td7 = element.getElementsByTagName('td')[7];
    let td8 = element.getElementsByTagName('td')[8];
    //get contents of table for compare
    let textValue1 = td1.textContent || td1.innerHTML;
    let textValue2 = td2.textContent || td2.innerHTML;
    let textValue3 = td3.textContent || td3.innerHTML;
    let textValue4 = td4.textContent || td4.innerHTML;
    let textValue5 = td5.textContent || td5.innerHTML;
    let textValue6 = td6.textContent || td6.innerHTML;
    let textValue7 = td7.textContent || td7.innerHTML;
    let textValue8 = td8.textContent || td8.innerHTML;
     if(textValue1.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1 
      || textValue3.toUpperCase().indexOf(filter) > -1 || textValue4.toUpperCase().indexOf(filter) > -1 
      || textValue5.toUpperCase().indexOf(filter) > -1 || textValue6.toUpperCase().indexOf(filter) > -1 
      || textValue7.toUpperCase().indexOf(filter) > -1 || textValue8.toUpperCase().indexOf(filter) > -1 )
      {
        element.style.display = "";
      }
      else{
      
        element.style.display = "none";
        //document.getElementById("noDataFound").innerHTML = "No data found";
      }
    

});

}
function filterTable() // filtering using multiple values
{
  
  table = document.getElementById("mylist");
  let filter_fname = document.getElementById("Fname1").value.toUpperCase();
  let filter_lname = document.getElementById("Lname1").value.toUpperCase();
  let filter_gender = document.getElementById("searchGender");
  var gender_selected = filter_gender.options[filter_gender.selectedIndex].value.toUpperCase();
  let filter_hobbies = document.getElementsByName("checks1");
  var hobbies = [];
  for (var i = 0; i < filter_hobbies.length; i++) {
    if (filter_hobbies[i].checked) {
      hobbies.push(filter_hobbies[i].value);
    }
  }
  let tr = table.getElementsByTagName('tr');
  for( var i=0; i<tr.length; i++){
    let td1 = tr[i].getElementsByTagName('td')[1];
    let td2 = tr[i].getElementsByTagName('td')[2];
    let td8 = tr[i].getElementsByTagName('td')[8];
    let td5 = tr[i].getElementsByTagName('td')[5];
    let textValue1 = td1.textContent || td1.innerHTML;
    let textValue2 = td2.textContent|| td2.innerHTML;
    let textValue8 = td8.textContent || td8.innerHTML;
    let textValue5 = td5.innerHTML|| td5.innerHTML;

    if ((textValue1.toUpperCase() == filter_fname && filter_lname == "" && hobbies == "" && gender_selected == "SELECT")
        || (textValue2.toUpperCase()== filter_lname && filter_fname == "" && hobbies == "" && gender_selected == "SELECT")
        || (textValue8.includes(hobbies) && filter_lname == "" && filter_fname == "" && gender_selected == "SELECT")
        || (textValue5.toUpperCase() == gender_selected && filter_lname == "" && filter_fname == "" && hobbies == "" )
        || ((filter_lname == "") && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies)) && (textValue5.toUpperCase() == gender_selected)
        || ((filter_fname == "") && (textValue5.toUpperCase() == gender_selected) && (textValue2.toUpperCase()== filter_lname) && (str_searchbox.includes(search_hobby)))
        || ((hobbies == "") && (textValue5.toUpperCase() == gender_selected) && (textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname))
        ||((gender_selected == "SELECT")&& (textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies))))
        ||(textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies)) && textValue5.toUpperCase() == gender_selected)
          {
            tr[i].style.display = "";
          }
    else
    {
       tr[i].style.display = "none";
    }
  }
  }

var clicks = 0; // counter for number of clicks
    
function sortTableValues(columnIndex) // ascending and descending sorting
{
  console.log("sort" );
  clicks = clicks +1;
  table = document.getElementById("mylist");
  var colIndex = columnIndex.cellIndex;
  (clicks % 2 == 0) ? sortDescending(colIndex) : sortAscending(colIndex);
}

function sortAscending(colIndex)
  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("mylist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[colIndex];
        y = rows[i + 1].getElementsByTagName("td")[colIndex];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
    }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = !switching;
      }
    }
  }
  function sortDescending(colIndex)
  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("mylist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[colIndex];
        y = rows[i + 1].getElementsByTagName("td")[colIndex];
        if (y.innerHTML.toLowerCase() > x.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
   }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = !switching;
      }
    }
=======
var itemArray = JSON.parse(localStorage.getItem('tempData')) || [];//common array for all the values of table
var selectedItems = -1;//variable to know if current operation is to Add or Edit

function initialLoad()//function executed on body load
{
  let inputs = document.myForm.querySelectorAll('[type="text"]'),
  buttonAdd = document.querySelector('#button1')
  var radioInput = selectedGender() ;//checks if radio button is selected or not
  var hobbiesInput = [] 
  hobbiesInput= selectedHobbies();//checks if checkbox is selected or not
  buttonAdd.disabled = true;
  let values = []
  values.forEach(i => {
    inputs[i].addEventListener('input' ,() => {
      inputs.forEach(v => values.push(v.value))
    });
});
var checkAll = document.getElementById("selectAll");
 if(radioInput && (hobbiesInput.length !== 0 || checkAll.checked == true))
    {
      if(validateMobileNumber() && validateEnrollno() && validateEmail() )
      {
      buttonAdd.disabled = values.includes('');//add button is enabled if all the inputs of form are filled
      }
    }
    //to uncheck select all checkbox
    var checkedbox = document.getElementsByName("checks");
    checkedbox.forEach(result => {
      if(!result.checked)
      {
        checkAll.checked = false;
      }
      
    });
if(hobbiesInput.length == 6) // to check select all button if all checkboxes are checked
  {
    checkAll.checked = true;
  }
      
}
  
 function Add() 
 {
    var formData = AddData();//variable which stores the current values of form
    var table = document.getElementById("mylist");
    
    if(selectedItems == -1)
    {
      var rows = document.getElementsByTagName("tr");
      AddRow(formData);
      itemArray.push(formData); // add row 
      var index = itemArray.length ;
      rows[index].style.backgroundColor = 'lightblue';// to highlight newly added row
      setTimeout(function(){
        rows[index].style.backgroundColor = 'white';
      },
      2000);
      resetForm();
      document.getElementById("button1").disabled = true;
    }
    else
    {
      itemArray.splice(selectedItems,1,formData); //edit selected row 
      resetForm();
      deleteTable();
      syncTask();
      viewData();
      table.scrollIntoView();
    
    }
  syncTask(); //local storage
  }
  
function AddData() // function to add new data row
 {
  var formData = {}; //object
  formData["Fname"] = document.getElementById("Fname").value;
  formData["Lname"] = document.getElementById("Lname").value;
  formData["phno"] = document.getElementById("phno").value;
  formData["email"] = document.getElementById("email").value;
  formData["gender"] = selectedGender();
  formData["Enrollno"] = document.getElementById("Enrollno").value;
  formData["Certificates"] = document.getElementById("Certificates").value;
  var Hobbies = [];
  formData["Hobbies"+Hobbies] = selectedHobbies();
  return formData;
 }

function removeRow(button) // function to remove row
{
  var row = button.parentNode.parentNode;
  console.log(row)
  if (confirm("Do you want to delete this data?"))
  {
    var table = document.getElementById("mylist");
    selectedItems = row.rowIndex-1;
    table.deleteRow(row.rowIndex);
    itemArray.splice(selectedItems, 1);

    deleteTable();
    syncTask();
    viewData();

  }
}
function resetForm() //reset form function
{
  var frm = document.getElementsByName('myForm')[0];
  frm.reset()
  return false;
}
//var counter = 0;// counter for index
function AddRow(data)
 {
   var counter = viewData();
    var table = document.getElementById("mylist").getElementsByTagName("tbody")[0];
    var NewRow = table.insertRow(table.length);
    var cel1 = NewRow.insertCell(0);
    cel1.innerHTML = counter+1;
    var cel2 = NewRow.insertCell(1);
    cel2.innerHTML = data.Fname;
    var cel3 = NewRow.insertCell(2);
    cel3.innerHTML = data.Lname;
    var cel4 = NewRow.insertCell(3);
    cel4.innerHTML = data.phno;
    var cel5 = NewRow.insertCell(4);
    cel5.innerHTML = data.email;
    var cel6 = NewRow.insertCell(5);
    cel6.innerHTML = data.gender;
    var cel7 = NewRow.insertCell(6);
    cel7.innerHTML = data.Enrollno;
    var cel8 = NewRow.insertCell(7);
    cel8.innerHTML = data.Certificates;
    var cel9 = NewRow.insertCell(8);
    cel9.innerHTML = data.Hobbies;

    //remove button
    cel10 = NewRow.insertCell(9);
    var btnRemove = document.createElement("INPUT");
    btnRemove.type = "button";
    btnRemove.value = "Remove";
    btnRemove.setAttribute("onclick", "removeRow(this)");
    cel10.appendChild(btnRemove);

    //edit button
    cel11 = NewRow.insertCell(10);
    var btnEdit = document.createElement("INPUT");
    btnEdit.type = "button";
    btnEdit.value = "Edit";
    btnEdit.id = "editData";
    btnEdit.setAttribute("onclick", "editDisplay(this),scrollDown()");
    cel11.appendChild(btnEdit);
    resetForm()
    counter ++;

}
function scrollDown()
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function radioCheck(formData) //function to get the checked radio button in form on edit
{
  var radioButton=formData.gender;
  switch(radioButton)
  {
    case "Male":
      var male = document.getElementById("gnd1");
      male.checked = true;
      break;
    case "Female":
      var female = document.getElementById("gnd2");
      female.checked = true;
      break;
    case "Other":
      var other = document.getElementById("gnd3");
      other.checked = true;
      break;
  }
}

function checkBox(formData) //function to get the checked checkboxes in form on edit
{
  var selectedHobbies= formData.Hobbies;
  var checkAll = document.getElementById("selectAll")
  if(selectedHobbies.length == 6)
  {
    checkAll.checked = true;
  }
  selectedHobbies.forEach(i => {
    switch(i)
    {
      case "Singing":
        var checkBoxes = document.getElementById("hobby1");
        checkBoxes.checked = true;
        break;
      case "Dancing":
        var checkBoxes = document.getElementById("hobby2");
        checkBoxes.checked = true;
        break;
      case "Music":
        var checkBoxes = document.getElementById("hobby3");
        checkBoxes.checked = true;
        break;
      case "Sports":
        var checkBoxes = document.getElementById("hobby4");
        checkBoxes.checked = true;
        break;
      case "Painting":
        var checkBoxes = document.getElementById("hobby5");
        checkBoxes.checked = true;
        break;
      case "Other":
        var checkBoxes = document.getElementById("hobby6");
        checkBoxes.checked = true;
        break;
    }
  });
}

function editDisplay(button) //function to display selected row in form inputs field on edit pressed
{
  document.getElementById("button1").disabled = false;
  var rows = button.parentNode.parentNode;
  var table = document.getElementById("mylist").rows;
  var formData = itemArray[rows.rowIndex-1];
  selectedItems = rows.rowIndex-1;
  document.getElementById("Fname").value = formData.Fname;
  document.getElementById("Lname").value = formData.Lname;
  document.getElementById("phno").value = formData.phno;
  document.getElementById("email").value = formData.email;
  document.getElementsByName("gender").value = radioCheck(formData);
  document.getElementById("Enrollno").value = formData.Enrollno;
  document.getElementById("Certificates").title= formData.Certificates;
  document.getElementsByName("Hobbies").value = checkBox(formData);
  document.getElementById("button1").value = "Update";
  return selectedItems;
}

function syncTask() // local storage add and get
{
  window.localStorage.setItem('tempData', JSON.stringify(itemArray));
  tempData = JSON.parse(window.localStorage.getItem('tempData'));
}
function scrollview()
{
  var elmnt = document.getElementById("listTable");
  elmnt.scrollIntoView();
}

function viewData() // view data from local storage
{

  var counter = 0; // for index
  let temp = JSON.parse(localStorage.getItem('tempData'));
  var table = document.getElementById("mylist");
    temp.forEach(value => {
      var NewRow = table.insertRow(table.length);
        var cel1 = NewRow.insertCell(0);
        cel1.innerHTML = counter + 1;
        var cel2 = NewRow.insertCell(1);
        cel2.innerHTML = value.Fname;
        var cel3 = NewRow.insertCell(2);
        cel3.innerHTML = value.Lname;
        var cel4 = NewRow.insertCell(3);
        cel4.innerHTML = value.phno;
        var cel5 = NewRow.insertCell(4);
        cel5.innerHTML = value.email;
        var cel6 = NewRow.insertCell(5);
        cel6.innerHTML = value.gender;
        var cel7 = NewRow.insertCell(6);
        cel7.innerHTML = value.Enrollno;
        var cel8 = NewRow.insertCell(7);
        var path = value.Certificates.replace(/^.*[\\\/]/, '');
        cel8.innerHTML = path;
        var cel9 = NewRow.insertCell(8);
        cel9.innerHTML = value.Hobbies;
        //remove button
        cel10 = NewRow.insertCell(9);
        var btnRemove = document.createElement("INPUT");
        btnRemove.type = "button";
        btnRemove.value = "Remove";
        btnRemove.setAttribute("onclick", "removeRow(this);");
        cel10.appendChild(btnRemove);
        //edit button
        cel11 = NewRow.insertCell(10);
        var btnEdit = document.createElement("INPUT");
        btnEdit.type = "button";
        btnEdit.value = "Edit";
        btnEdit.id = "editData";
        btnEdit.setAttribute("onclick", "editDisplay(this),scrollDown();viewData()");
        cel11.appendChild(btnEdit);
      
      counter ++;
    
    });
    return counter;
}
function deleteTable()
{
  var table = document.getElementById("mylist");
  for(var i = table.rows.length - 1; i>0; i--)
  {
    table.deleteRow(i)
  }
}

function selectedGender() {  //function to get gender selected
var radioButton=document.myForm.gender;
for(var i=0;i<radioButton.length;i++){
	if(radioButton[i].checked){
    switch(radioButton[i].value)
    {
		case 'Male':
      gender = "Male";
      return gender;
    case 'Female':
      gender = "Female";
      return gender;
    case 'Other':
      gender = "Other";
      return gender;
    default:
      gender = undefined;
    }
	}
}
}

function selectedHobbies() { // function to get selected hobbies
  var vals = []; 
  var items = document.getElementsByName('checks');
  items.forEach(valueHobby => {
    if(valueHobby.checked)
    {
      vals.push(valueHobby.value);
    }
  });

  return vals;
}

function selectAllCheckBoxes(source) { 
  var checkboxes = document.getElementsByName('checks');
  checkboxes.forEach(element => {
    element.checked = source.checked;
  });
}


function validateUsername(userName)
{

  var name = userName.value;
  if (name.length === null ||  name === "" )
  {
    document.getElementById('fnameErr').innerHTML = "Please enter valid name";
    //document.getElementById("lnameErr").innerHTML = "Please enter valid name";
    return false;
  }
  else
  {
    document.getElementById("fnameErr").innerHTML = "";
    document.getElementById("lnameErr").innerHTML = "";
    return true;
  }
}
function onlyNum(numberInput)
{
  var asciiCode = numberInput.which|| numberInput.keycode;
  if(asciiCode >=48 && asciiCode<=57) 
    {
      return true;
    }
    else{
      return false;
    }
}

function validateMobileNumber()
{
  var phnRegex = /^[1-9]\d{9}$/;
  var registerform = document.getElementsByName('myForm')[0];
  var numberMobile = registerform.MobileNumber.value;
    if (numberMobile.length !== 10 || numberMobile === "" || phnRegex.test(numberMobile) == false)
    {
      document.getElementById('phnErr').innerHTML = "Please enter a correct mobile number";
      return false;
    }
    else
    {
      document.getElementById("phnErr").innerHTML = "";
     return true;
    }
}
function validateEmail()
{
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var registerform = document.getElementsByName('myForm')[0];
  var mail = registerform.email.value;
  if(mail === "" || emailRegExp.test(mail) === false)
  {
    document.getElementById('emailErr').innerHTML = "please enter valid email id";
    return false;
  }
  else
  {
    document.getElementById('emailErr').innerHTML = "";
    return true;
  }
}


function validateEnrollno()
{
  var registerform = document.getElementsByName('myForm')[0];
  var regexEnroll = /^[1-9]\d{11}$/;
  var enrollNumber = registerform.Enrollno.value;
  if(enrollNumber  === "" || regexEnroll.test(enrollNumber ) == false)
  {
    document.getElementById('enrollErr').innerHTML = "please enter your enrollment number (12 digit)";
    return false;
  }
  else
  {
    document.getElementById('enrollErr').innerHTML = "";
    return true;
  }
}


function searchValue()
{
  let filter = document.getElementById("myInput").value.toUpperCase();
  var table = document.getElementById("mylist");
  var tra = table.getElementsByTagName('tr');
  Array.prototype.forEach.call(tra,element => {
    
  
    let td1 = element.getElementsByTagName('td')[1];
    let td2 = element.getElementsByTagName('td')[2];
    let td3 = element.getElementsByTagName('td')[3];
    let td4 = element.getElementsByTagName('td')[4];
    let td5 = element.getElementsByTagName('td')[5];
    let td6 = element.getElementsByTagName('td')[6];
    let td7 = element.getElementsByTagName('td')[7];
    let td8 = element.getElementsByTagName('td')[8];
    //get contents of table for compare
    let textValue1 = td1.textContent || td1.innerHTML;
    let textValue2 = td2.textContent || td2.innerHTML;
    let textValue3 = td3.textContent || td3.innerHTML;
    let textValue4 = td4.textContent || td4.innerHTML;
    let textValue5 = td5.textContent || td5.innerHTML;
    let textValue6 = td6.textContent || td6.innerHTML;
    let textValue7 = td7.textContent || td7.innerHTML;
    let textValue8 = td8.textContent || td8.innerHTML;
     if(textValue1.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1 
      || textValue3.toUpperCase().indexOf(filter) > -1 || textValue4.toUpperCase().indexOf(filter) > -1 
      || textValue5.toUpperCase().indexOf(filter) > -1 || textValue6.toUpperCase().indexOf(filter) > -1 
      || textValue7.toUpperCase().indexOf(filter) > -1 || textValue8.toUpperCase().indexOf(filter) > -1 )
      {
        element.style.display = "";
      }
      else{
      
        element.style.display = "none";
        //document.getElementById("noDataFound").innerHTML = "No data found";
      }
    

});

}
function filterTable() // filtering using multiple values
{
  
  table = document.getElementById("mylist");
  let filter_fname = document.getElementById("Fname1").value.toUpperCase();
  let filter_lname = document.getElementById("Lname1").value.toUpperCase();
  let filter_gender = document.getElementById("searchGender");
  var gender_selected = filter_gender.options[filter_gender.selectedIndex].value.toUpperCase();
  let filter_hobbies = document.getElementsByName("checks1");
  var hobbies = [];
  for (var i = 0; i < filter_hobbies.length; i++) {
    if (filter_hobbies[i].checked) {
      hobbies.push(filter_hobbies[i].value);
    }
  }
  let tr = table.getElementsByTagName('tr');
  for( var i=0; i<tr.length; i++){
    let td1 = tr[i].getElementsByTagName('td')[1];
    let td2 = tr[i].getElementsByTagName('td')[2];
    let td8 = tr[i].getElementsByTagName('td')[8];
    let td5 = tr[i].getElementsByTagName('td')[5];
    let textValue1 = td1.textContent || td1.innerHTML;
    let textValue2 = td2.textContent|| td2.innerHTML;
    let textValue8 = td8.textContent || td8.innerHTML;
    let textValue5 = td5.innerHTML|| td5.innerHTML;

    if ((textValue1.toUpperCase() == filter_fname && filter_lname == "" && hobbies == "" && gender_selected == "SELECT")
        || (textValue2.toUpperCase()== filter_lname && filter_fname == "" && hobbies == "" && gender_selected == "SELECT")
        || (textValue8.includes(hobbies) && filter_lname == "" && filter_fname == "" && gender_selected == "SELECT")
        || (textValue5.toUpperCase() == gender_selected && filter_lname == "" && filter_fname == "" && hobbies == "" )
        || ((filter_lname == "") && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies)) && (textValue5.toUpperCase() == gender_selected)
        || ((filter_fname == "") && (textValue5.toUpperCase() == gender_selected) && (textValue2.toUpperCase()== filter_lname) && (str_searchbox.includes(search_hobby)))
        || ((hobbies == "") && (textValue5.toUpperCase() == gender_selected) && (textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname))
        ||((gender_selected == "SELECT")&& (textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies))))
        ||(textValue2.toUpperCase()== filter_lname) && (textValue1.toUpperCase() == filter_fname) && (textValue8.includes(hobbies)) && textValue5.toUpperCase() == gender_selected)
          {
            tr[i].style.display = "";
          }
    else
    {
       tr[i].style.display = "none";
    }
  }
  }

var clicks = 0; // counter for number of clicks
    
function sortTableValues(columnIndex) // ascending and descending sorting
{
  console.log("sort" );
  clicks = clicks +1;
  table = document.getElementById("mylist");
  var colIndex = columnIndex.cellIndex;
  (clicks % 2 == 0) ? sortDescending(colIndex) : sortAscending(colIndex);
}

function sortAscending(colIndex)
  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("mylist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[colIndex];
        y = rows[i + 1].getElementsByTagName("td")[colIndex];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
    }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = !switching;
      }
    }
  }
  function sortDescending(colIndex)
  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("mylist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[colIndex];
        y = rows[i + 1].getElementsByTagName("td")[colIndex];
        if (y.innerHTML.toLowerCase() > x.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
   }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = !switching;
      }
    }
>>>>>>> parent of 95df7dd... Update MyForm.js
}