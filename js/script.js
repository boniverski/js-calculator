$(document).ready(function() {
  let entries = [];
  let tempEntry = ""; //Temporary entry value

  $("button").on("click", function() {
    let val = $(this).val();
    //returning numbers in calculator's entry
    if(!isNaN(val) || val === "."){
      tempEntry += val;
      $("#entry").val(tempEntry.substring(0,10));
    } //clearing temporary entry value on DEL click
      else if (val === "del"){
        entries = [];
        tempEntry = "";
        $("#entry").val("");
    } else if (val === "/" || val === "*" || val === "-" || val === "+"){
        entries.push(tempEntry);
        entries.push(val);
        tempEntry = "";
        console.log(entries);
    } else if (val === "="){
        entries.push(tempEntry);
        tempEntry = "";
        let arrConvert = entries.join("");
        let evaluate = eval(arrConvert);
        $("#entry").val(evaluate);

        console.log(entries);
        console.log(evaluate);
    }
  });
});
