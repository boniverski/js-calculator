$(document).ready(function() {
  let entries = [];
  let tempEntry = ""; //Temporary entry value

  $("button").on("click", function() {
    let val = $(this).val();
    //returning numbers in calculator's entry
    if(!isNaN(val) || val === "."){
      tempEntry += val;
      $("#entry").val(tempEntry.substring(0,10));
      if(tempEntry.includes(".")){
        $("#point").prop("disabled", true);
      }
    } //clearing temporary entry value on DEL click
      else if (val === "del"){
        $("#entry").val("");
        entries = [];
        tempEntry = "";
        $("#point").prop("disabled", false);
        //$("#point").val(".");
    } else if (val === "/" || val === "*" || val === "+"){
        if(tempEntry.length > 0) {
          entries.push(tempEntry);
          entries.push(val);
        } else {
          entries = [];
        }
        tempEntry = "";
    } else if (val === '=') {
      	entries.push(tempEntry);

        //testing in console
        var consoledEntry = entries.join(" ");
        console.log(`Input entry: ${consoledEntry}`);

        var nt = Number(entries[0]);
        for (var i = 1; i < entries.length; i++) {
          var nextNum = Number(entries[i+1])
          var symbol = entries[i];

          if (symbol === '+') { nt += nextNum; }
          else if (symbol === '-') { nt -= nextNum; }
          else if (symbol === '*') { nt *= nextNum; }
          else if (symbol === '/') { nt /= nextNum; }

          i++;
        }
        // Swap the '-' symbol so text input handles it correctly
        if (nt < 0) {
          nt = Math.abs(nt) + '-';
        }

        $("#entry").val(nt);
    		entries = [];
        tempEntry = '';

        //testing in console
        console.log(`Result: ${nt}`);
      }
  });
});
