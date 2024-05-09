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
btn.addEventListener("click",  () => {
    if (inputDays.value <= 31 && inputDays.value >= 1) {
        console.log(" days" + inputDays.value)
    }
    else if (inputDays.value === "") {
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
    let i = inputMonth.value
    //  i=month and loop_days=days in month
    loop_days.innerText = daysInMonth[i];
    let leap_day;
    let leap_month;
    // console.log("month--", i)
    // console.log("days--", loop_days.value)
    if (inputMonth.value <= 12 && inputMonth.value >= 1) {

        if (inputDays.value == 29 && inputMonth.value == 2) {
            if (inputYear.value % 4 === 0) {
                leap_day = inputDays.value
                leap_month = inputMonth.value
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

        else if (inputMonth.value == i && inputDays.value <= loop_days.value) {
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
    else if (inputMonth.value === "") {
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

    if (inputYear.value === "") {
        console.log("blank 3")
        error3.style.display = "block"
        error3.innerText = "This field is required"
        heading3.style.color = "red"
        inputYear.style.border = "1px solid red"
        if_error = 1
    }
    else if (inputYear.value <= year) {
        console.log("year", inputYear.value)
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

        let days_sum = loop_days.value - inputDays.value + (now.getDate() - 1)

        if (inputMonth.value <= now.getMonth()) {
            month_sum = now.getMonth() - inputMonth.value
            yr_sum = year - inputYear.value
        }
        else {
            month_sum = (12 - inputMonth.value) + now.getMonth()
            yr_sum = (year - inputYear.value) - 1
        }

        if (days_sum >= loop_days.value) {
            sum()
        }
        function sum() {
            days_sum = days_sum - loop_days.value;
            month_sum = month_sum + 1;
        }

        if (inputDays.value == "" || inputMonth.value == "" || inputYear.value == "") {
            cal_yr.innerText = "- -";
            cal_mn.innerText = "- -";
            cal_ds.innerText = "- -";
        }
        else if (inputDays.value == 29 && inputMonth.value == 2 && inputYear.value % 4 == 0) {
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
