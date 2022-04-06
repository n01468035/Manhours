class Employee {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }
}

class ManHours {
    constructor(id, date, hours) {
        this.id = id;
        this.date = date;
        this.hours = hours;
    }
}




//-----------------ADDING EMPLOYEE---------------------

let employees = [];

function saveEmp() {
    var id = document.getElementById("empID").value;
    var name = document.getElementById("empName").value;
    if(id == "" || name == ""){
        alert("Please enter the required fields");
    }
    else{
        if (employees.length === 0) {
            var employee = new Employee(id, name);
            employees.push(employee);
            clearEmpDetails();
            addingList(id);
        }
        else {
            for (i = 0; i < employees.length; i++) {
                if (employees[i].id === id) {
                    alert("Entered ID already exists !!!");
                    break;
                }
                else if (i === (employees.length - 1)) {
                    var employee = new Employee(id, name);
                    employees.push(employee);
                    clearEmpDetails();
                    addingList(id);
                    break;
                }
            }
        }
        console.log(employees);        
    }
    
}



function clearEmpDetails() {
    document.getElementById("empID").value = "";
    document.getElementById("empName").value = "";
}




// --------------ADDING HOURS------------------------



let manhours = [];
let empList = "";

function addingList(id) {
    empList += "<option default='Select'>" + id + "</option>";
    document.getElementById("emp-id").innerHTML = empList;
}


function saveHours() {
    var empID = document.getElementById("emp-id").value;
    var empDate = document.getElementById("emp-date").value;
    var empHours = document.getElementById("emp-hours").value;

    if(empDate == "" || empHours == ""){
        alert("Please enter the required fields!!!");
    }
    else{
        if (employees.length === 0) {
            alert("No records found!!!")
        }
        else {
            if(manhours.length === 0){
                var manhour = new ManHours(empID, empDate, empHours);
                manhours.push(manhour);
                clearHoursDetails();
            }
            else{
                for(let i = 0; i < manhours.length; i++){
                    if(manhours[i].id === empID && manhours[i].date === empDate){
                        manhours[i].hours = empHours;
                        clearHoursDetails();
                        alert("Employee-hours details for employee with ID= "+ manhours[i].id + " on " + manhours[i].date + " are changed successfully !!!")
                    }
                    else if(i === manhours.length - 1){
                        var manhour = new ManHours(empID, empDate, empHours);
                        manhours.push(manhour);
                        clearHoursDetails();
                        break;
                    }
                }
            }
        }
    
        console.log(manhours);
        update();      
    }
    
}

function clearHoursDetails() {
    document.getElementById("emp-id").value = "";
    document.getElementById("emp-date").value = "";
    document.getElementById("emp-hours").value = "";
}




// -------------------DATE GENERATION----------------------------

var today = new Date();
var changedDate = new Date(today);



function displayDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return year + '-' + month + '-' + day;
}



for (var i = 0; i < 7; i++) {
    document.getElementById(`${i + 1}-day`).innerHTML = displayDate(changedDate);
    if (i !== 6) {
        changedDate.setDate(changedDate.getDate() - 1);
    }

}


for (i = 0; i < employees.length; i++) {
    document.getElementById("data").innerHTML += "<tr>"
    document.getElementById("data").innerHTML += "<td>" + employees[i].id + "</td>";
    document.getElementById("data").innerHTML += "<td>" + employees[i].name + "</td>";

    for (j = 0; j < 7; j++) {
        var workHours = employees[i].hours[employees[i].date.findIndex(changedDate)];
        document.getElementById("data").innerHTML += "<td>" + workHours + "</td>";
    }
    document.getElementById("data").innerHTML += "</tr>"
}



function prevDate() {
    console.log("previous");
    changedDate.setDate(changedDate.getDate() - 1);
    for (var i = 0; i < 7; i++) {
        document.getElementById(`${i + 1}-day`).innerHTML = displayDate(changedDate);
        if (i !== 6) {
            changedDate.setDate(changedDate.getDate() - 1);
        }
    }

    update();
}

function nextDate() {
    console.log("next");
    changedDate.setDate(changedDate.getDate() + 13);
    for (var i = 0; i < 7; i++) {
        document.getElementById(`${i + 1}-day`).innerHTML = displayDate(changedDate);
        if (i !== 6) {
            changedDate.setDate(changedDate.getDate() - 1);
        }

    }
    update();
}



// --------------------------DISPLAYING HOURS--------------------------



function update() {
    let output = "";
    
    for (let i = 0; i < employees.length; i++) {
        let output1 = "";
        output += "<tr>";

        output += "<td>" + employees[i].id + "</td>";
        output += "<td>" + employees[i].name + "</td>";

        var empID = document.getElementById("emp-id").value;

        let empSumLast7Days = 0;
        for (let j = 6; j >= 0; j--) {
            let workingDate = document.getElementById(`${j+ 1}-day`).textContent;
            let hours = getHours(employees[i].id , workingDate);
            output1 += "<td>" + hours + "</td>";
            empSumLast7Days += parseFloat(hours);
        }
        output1 += "<td>" + empSumLast7Days + "</td>";
        output += output1 + "</tr>";
    }

    document.getElementById("data").innerHTML = output;

}

function getHours(id, date){
    console.log(id + " ----" + date);
    if(manhours.length === 0){
        return 0;
    }
    else{
        for(let i = 0 ; i < manhours.length; i++){
            if((manhours[i].id === id) && (manhours[i].date === date)){
                console.log("function run success");
                return manhours[i].hours;
            }
            else if(i=== manhours.length-1){
                return 0;
            }
        }
    } 
}