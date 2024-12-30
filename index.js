import { daysInMonth } from "./date.js";
let if_error = 0;
const now = new Date();
const year = now.getFullYear()
let inputDays = document.getElementById("InputDays")
let inputMonth = document.getElementById("InputMonths")
let inputYear = document.getElementById("InputYears")
let heading1 = document.getElementById("input_days_p")
let heading2 = document.getElementById("input_month_p")
let heading3 = document.getElementById("input_year_p")
let error1 = document.getElementById("error1")
let error2 = document.getElementById("error2")
let error3 = document.getElementById("error3")
let cal_yr = document.getElementById("calculated_year")
let cal_mn = document.getElementById("calculated_month")
let cal_ds = document.getElementById("calculated_day")
let btn = document.getElementById("btn_1st");
inputDays.addEventListener('input', () => {
    if (inputDays.value.length === 2) {  
        inputMonth.focus();  
    }
});

inputMonth.addEventListener('input', () => {
    if (inputMonth.value.length === 2) {  
        inputYear.focus();  
    }
});

inputYear.addEventListener('input', () => {
    if (inputYear.value.length === 0) {  
        inputMonth.focus(); 
    }
});

inputMonth.addEventListener('input', () => {
    if (inputMonth.value.length === 0) {  
        inputDays.focus();  
    }
});

btn.addEventListener("click",  () => {
    if_error=0;
    let daysInput = parseInt(inputDays.value);
    let monthInput = parseInt(inputMonth.value) - 1;  
    let yearInput= parseInt(inputYear.value);

    if (daysInput <= 31 && daysInput >= 1) {
        console.log(" days" + daysInput)
    }
    else if (daysInput === "") {
        console.log("blank 1")
        error1.style.display = "block"
        error1.innerText = "This field is required"
        heading1.style.color = "red"
        inputDays.style.border = "1px solid red"
        if_error = 1
    }
    else {
        console.log("days not between")
        error1.style.display = "block"
        error1.innerText = "Must be a valid date"
        heading1.style.color = "red"
        inputDays.style.border = "1px solid red"
        if_error = 1
    }

    let loop_days = document.createElement("option");
    let i = monthInput
    //  i=month and loop_days=days in month
    loop_days.innerText = daysInMonth[i];
    let leap_day;
    let leap_month;
    // console.log("month--", i)
    // console.log("days--", loop_days.value)
    if (monthInput <= 12 && monthInput >= 1) {

        if (daysInput == 29 && monthInput == 2) {
            if (yearInput % 4 === 0) {
                leap_day = daysInput
                leap_month = monthInput
                console.log(`month=${leap_month} days=${leap_day}`)
                // let leap_day=leap_day+1;
            }

            else {
                error3.style.display = "block"
                error3.innerText = "Must be a valid year"
                heading3.style.color = "red"
                inputYear.style.border = "1px solid red"
                if_error = 1
            }
        }

        else if (monthInput == i && daysInput <= loop_days.value) {
            console.log("proper month and days")
        }

        else {
            error1.style.display = "block"
            error1.innerText = "Must be a valid date"
            heading1.style.color = "red"
            inputDays.style.border = "1px solid red"
            if_error = 1
        }

    }
    else if (monthInput === "") {
        console.log("blank 2")
        error2.style.display = "block"
        error2.innerText = "This field is required"
        heading2.style.color = "red"
        inputMonth.style.border = "1px solid red"
        if_error = 1
    }

    else {
        console.log("months are not between")
        error2.style.display = "block"
        error2.innerText = "Must be a valid month"
        heading2.style.color = "red"
        inputMonth.style.border = "1px solid red"
        if_error = 1
    }

    if (yearInput === "") {
        console.log("blank 3")
        error3.style.display = "block"
        error3.innerText = "This field is required"
        heading3.style.color = "red"
        inputYear.style.border = "1px solid red"
        if_error = 1
    }
    else if (yearInput <= year) {
        console.log("year", yearInput)
    }
    else {
        error3.style.display = "block"
        error3.innerText = "Must be in past"
        inputYear.style.border = "1px solid red"
        heading3.style.color = "red"
        if_error = 1
    }
    let yr_sum
    let month_sum
    if (if_error == 0) {

        let days_sum = loop_days.value - daysInput + (now.getDate() - 1)

        if (monthInput <= now.getMonth()) {
            month_sum = now.getMonth() - monthInput
            yr_sum = year - yearInput
        }
        else {
            month_sum = (12 - monthInput) + now.getMonth()
            yr_sum = (year - yearInput) - 1
        }

        if (days_sum >= loop_days.value) {
            sum()
        }
        function sum() {
            days_sum = days_sum - loop_days.value;
            month_sum = month_sum + 1;
        }

        if (daysInput == "" || monthInput == "" || yearInput == "") {
            cal_yr.innerText = "- -";
            cal_mn.innerText = "- -";
            cal_ds.innerText = "- -";
        }
        else if (daysInput == 29 && monthInput == 2 && yearInput % 4 == 0) {
            cal_yr.innerText = yr_sum;
            cal_mn.innerText = leap_month;
            cal_ds.innerText = days_sum + 2;
        }
        else {
            cal_yr.innerText = yr_sum;
            cal_mn.innerText = month_sum;
            cal_ds.innerText = days_sum;
            console.log(yr_sum, month_sum, days_sum)
        }
    }
    
    else {
        console.log("not valid ")
        setTimeout( function(){
            document.location.reload()
        },2000)
    }
});
