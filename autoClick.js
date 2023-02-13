// ==UserScript==
// @name         Imperial Material System Check
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://172.16.70.243:8080/sql_execute?*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], {type: "text/csv"});

    downloadLink = document.createElement("a");

    downloadLink.download = filename;

    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function exportTableToCSV(filename) {

    var csv = [];
    var rows = document.querySelectorAll("table#result_table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++){
                row.push(cols[j].innerText);
            }
        csv.push(row.join(","));
    }

    downloadCSV(csv.join("\n"), filename);
}

window.setTimeout(function (){
   var sql_id = getUrlVars().sql_id;
   const onoff = document.getElementById('onoffswitch-option');
   console.log(sql_id);
   const sql = document.getElementById('textarea-sql');
   var user_id = getUrlVars().user_id
   if (sql_id === "9999"){
       onoff.click();
       if (user_id === "U1471" || user_id === "U1472") {
           sql.value = "select count(*) from \"order\" \nwhere 1=1 \nand OrderDate = Date(Current_Date)  \nand OrderRecieiveType in ('5','6' ,'7')\nAnd Delflg = '0' ;";
       } else {
           sql.value = "select count(*) from Order\nwhere 1=1\nand orderdate = (current date)\nand OrderRecieiveType='5'\nand Delflg = '0' ;";
       }
   } else if (sql_id === "9998") {
       onoff.click();
       sql.value = "select ORDERNUMBER  from Order\nwhere 1=1\nand orderdate =(current date)\nand SUPPLIERCODE in(select SUPPLIERCODE from SUPPLIER where WEBPURCHASESTATUSTYPE = 1)\nand delflg = 0\norder by OrderNumber asc";
   }else if (sql_id === "9997"){
       onoff.click();
       sql.value = "select ordernumber from Order\nwhere 1=1\nand CHANGETIMESTAMP > (Date(Current Date) - 7 Day)\nand OrderRecieiveType='5'\nand Delflg = 1\norder by ordernumber";
   } else if (sql_id === "9996") {
       onoff.click();
       sql.value = "select d.suppliercode,\ncount(dl.deliverynumber)\nfrom delivery d\nleft join deliveryline dl on d.deliverynumber=dl.deliverynumber and d.PartialDeliveryNumber=dl.PartialDeliveryNumber\nleft join supplier s on d.suppliercode=s.suppliercode\nwhere d.deliverydate = current_date - interval '1 day' and d.delflg='0'\nand s.purchaseorderreceivetype in('5','6','7')\ngroup by d.suppliercode\norder by d.suppliercode";
   } else if (sql_id === "9995") {
       onoff.click();
       sql.value = "SELECT\nSCHEDULEDATE, SCHEDULETIME, COUNT(1)\n, MAX(OrderNumberFrom) AS OrderNumberFrom,MAX(OrderNumberTo) AS OrderNumberTo\n, MIN(ORDERSCHEDULESTARTDATETIME) AS ORDERSCHEDULESTARTDATETIME, MAX(ORDERENDDATETIME) AS ORDERENDDATETIME\nFROM AUTOORDERHISTORY\nWHERE SCHEDULEDATE > CURRENT DATE -2 DAY\nGROUP BY SCHEDULEDATE, SCHEDULETIME\nHAVING COUNT(1) > 1\nORDER BY SCHEDULEDATE DESC ;";
   } else if (sql_id === "9994") {
       onoff.click();
       sql.value = "select ORDERNUMBER  from Order\nwhere 1=1\nand orderdate = (current_date)\nand SUPPLIERCODE in(select SUPPLIERCODE from SUPPLIER where WEBPURCHASESTATUSTYPE = 1)\nand delflg = 0\norder by OrderNumber asc";
   } else if (sql_id === "9993") {
       onoff.click();
       sql.value = "select count(*) from \"order\" \nwhere 1=1 \nand OrderDate = Date(Current_Date)  \nand OrderRecieiveType='5' \nAnd Delflg = '0' ;";
   } else if (sql_id === "9992") {
       onoff.click();
       sql.value = "SELECT T1.* FROM TLLRESERVATIONIMPORTRESULT T1\nWHERE 1=1\nAND PROCESSTYPE IN ( '3' )\nAND EXISTS ( SELECT 1 FROM RESERVATION S1\nWHERE S1.RESERVATIONNUMBER = T1.FRONTRESERVATIONNUMBER\nAND S1.RESERVATIONID <> T1.FRONTRESERVATIONID\nAND S1.CONTROLSTATUSID = 'C' )"
   } else if (sql_id === "9991"){
       onoff.click();
       sql.value = "SELECT count(*) FROM ROOMCHECKINOUTSUMMARYREQUEST";
   }
   document.getElementsByClassName('sql-exec')[0].click();
},1800);
/*

window.setTimeout(function (){
    window.close();
},20000);
*/
