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
// ===============================
// Render FTF Records
// ===============================

function renderFTF() {

    const table = document.getElementById("ftfTable");
    table.innerHTML = "";

    let totalStudents = 0;
    let totalFTF = 0;
    let grandTotal = 0;

    ftfData.forEach((item, index) => {

        totalStudents += item.strength;
        totalFTF += item.totalFTF;
        grandTotal += item.grandTotal;

        table.innerHTML += `
        <tr>
            <td>${item.cls}</td>
            <td>${item.strength}</td>
            <td>Rs ${item.totalFTF}</td>
            <td>Rs ${item.fine}</td>
            <td>Rs ${item.concession}</td>
            <td>Rs ${item.grandTotal}</td>

            <td>
                <button class="editBtn"
                    onclick="editFTF(${index})">
                    Edit
                </button>

                <button class="deleteBtn"
                    onclick="deleteFTF(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("totalFTF").textContent = totalFTF;
    document.getElementById("grandTotal").textContent = grandTotal;

}

// ===============================
// Delete Record
// ===============================

function deleteFTF(index){

    if(confirm("Delete this record?")){

        ftfData.splice(index,1);

        localStorage.setItem(
            "ftfData",
            JSON.stringify(ftfData)
        );

        renderFTF();

    }

}

// ===============================
// Edit Record
// ===============================

function editFTF(index){

    const item = ftfData[index];

    document.getElementById("schoolName").value = item.school;
    document.getElementById("className").value = item.cls;
    document.getElementById("strength").value = item.strength;
    document.getElementById("rate").value = item.rate;
    document.getElementById("fine").value = item.fine;
    document.getElementById("concession").value = item.concession;
    document.getElementById("month").value = item.month;
    document.getElementById("date").value = item.date;
    document.getElementById("year").value = item.year;

    ftfData.splice(index,1);

    localStorage.setItem(
        "ftfData",
        JSON.stringify(ftfData)
    );

    renderFTF();

}
// ===============================
// NSB Register
// ===============================

document
.getElementById("addNSB")
.addEventListener("click", addNSB);

function addNSB(){

    const total =
    Number(document.getElementById("totalAmount").value);

    const consumption =
    Number(document.getElementById("consumption").value);

    const assets =
    Number(document.getElementById("assets").value);

    if(total <= 0){
        alert("Enter Total Amount");
        return;
    }

    const remaining =
    total - consumption - assets;

    nsbData.push({

        total,
        consumption,
        assets,
        remaining

    });

    localStorage.setItem(
        "nsbData",
        JSON.stringify(nsbData)
    );

    renderNSB();

    clearNSB();

}

// ===============================
// Render NSB Table
// ===============================

function renderNSB(){

    const table =
    document.getElementById("nsbTable");

    table.innerHTML = "";

    nsbData.forEach((item,index)=>{

        table.innerHTML += `

        <tr>

        <td>Rs ${item.total}</td>

        <td>Rs ${item.consumption}</td>

        <td>Rs ${item.assets}</td>

        <td>Rs ${item.remaining}</td>

        <td>

        <button class="editBtn"
        onclick="editNSB(${index})">

        Edit

        </button>

        <button class="deleteBtn"
        onclick="deleteNSB(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

// ===============================
// Delete NSB
// ===============================

function deleteNSB(index){

    if(confirm("Delete this record?")){

        nsbData.splice(index,1);

        localStorage.setItem(
        "nsbData",
        JSON.stringify(nsbData));

        renderNSB();

    }

}

// ===============================
// Edit NSB
// ===============================

function editNSB(index){

    const item = nsbData[index];

    document.getElementById("totalAmount").value =
    item.total;

    document.getElementById("consumption").value =
    item.consumption;

    document.getElementById("assets").value =
    item.assets;

    nsbData.splice(index,1);

    localStorage.setItem(
    "nsbData",
    JSON.stringify(nsbData));

    renderNSB();

}

// ===============================
// Clear NSB Form
// ===============================

function clearNSB(){

document.getElementById("totalAmount").value="";
document.getElementById("consumption").value="";
document.getElementById("assets").value="";

}

// ===============================
// Load Saved Data
// ===============================

renderFTF();
renderNSB();
// ===============================
// Print Register
// ===============================

function printRegister() {
    window.print();
}

// ===============================
// Export FTF Data to CSV
// ===============================

function exportFTFCSV() {

    if (ftfData.length === 0) {
        alert("No FTF data available.");
        return;
    }

    let csv =
"School,Class,Strength,Rate,Fine,Concession,Month,Date,Year,TotalFTF,GrandTotal\n";

    ftfData.forEach(item => {

        csv +=
`${item.school},${item.cls},${item.strength},${item.rate},${item.fine},${item.concession},${item.month},${item.date},${item.year},${item.totalFTF},${item.grandTotal}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "FTF_Register.csv";
    a.click();

    URL.revokeObjectURL(url);

}

// ===============================
// Export NSB Data to CSV
// ===============================

function exportNSBCSV() {

    if (nsbData.length === 0) {
        alert("No NSB data available.");
        return;
    }

    let csv =
"Total,Consumption,Assets,Remaining\n";

    nsbData.forEach(item => {

        csv +=
`${item.total},${item.consumption},${item.assets},${item.remaining}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "NSB_Register.csv";
    a.click();

    URL.revokeObjectURL(url);

}

// ===============================
// Keyboard Shortcut (Ctrl + P)
// ===============================

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key === "p"){

        e.preventDefault();

        printRegister();

    }

});

// ===============================
// Service Worker
// ===============================

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("sw.js")
.then(()=>{

console.log("Service Worker Registered");

})
.catch(err=>{

console.log(err);

});

});

}

// ===============================
// App Started
// ===============================

console.log("School FTF & NSB Register Loaded");
