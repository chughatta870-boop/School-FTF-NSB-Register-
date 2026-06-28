// ===============================
// School FTF & NSB Register
// script.js (Part 3A)
// ===============================

// Tabs
const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        pages.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");

        document
            .getElementById(tab.dataset.tab)
            .classList.add("active");
    });
});

// -------------------------------
// Dark Mode
// -------------------------------

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

themeBtn.onclick = ()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );

};

// -------------------------------
// Local Storage
// -------------------------------

let ftfData =
JSON.parse(localStorage.getItem("ftfData")) || [];

let nsbData =
JSON.parse(localStorage.getItem("nsbData")) || [];

// -------------------------------
// Save FTF Record
// -------------------------------

document
.getElementById("addFTF")
.addEventListener("click", addFTF);

function addFTF(){

const school =
document.getElementById("schoolName").value;

const cls =
document.getElementById("className").value;

const strength =
Number(document.getElementById("strength").value);

const rate =
Number(document.getElementById("rate").value);

const fine =
Number(document.getElementById("fine").value);

const concession =
Number(document.getElementById("concession").value);

const month =
document.getElementById("month").value;

const date =
document.getElementById("date").value;

const year =
document.getElementById("year").value;

if(
school==="" ||
strength<=0 ||
month==="" ||
year==="")
{
alert("Please fill all required fields.");
return;
}

const totalFTF = strength * rate;

const grandTotal =
totalFTF + fine - concession;

ftfData.push({

school,
cls,
strength,
rate,
fine,
concession,
month,
date,
year,
totalFTF,
grandTotal

});

localStorage.setItem(
"ftfData",
JSON.stringify(ftfData)
);

clearFTF();

renderFTF();

}

// -------------------------------
// Clear Form
// -------------------------------

function clearFTF(){

document.getElementById("schoolName").value="";
document.getElementById("strength").value="";
document.getElementById("fine").value="";
document.getElementById("concession").value="";
document.getElementById("month").value="";
document.getElementById("date").value="";
document.getElementById("year").value="";

}

// -------------------------------
// Initial Render
// -------------------------------

renderFTF();
