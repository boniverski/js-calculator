$(document).ready(function() {
  let tempEntry = ""; // Temporary entry value
  let entries = []; // Final entry before calculation

  $("button").on("click", function() {
    let val = $(this).val();

    // Returning numbers in calculator's entry
    if(!isNaN(val) || val === "." || val === "-"){
      tempEntry += val;
      $("#entry").val(tempEntry.substring(0,10));
     // Clearing temporary entry value on DEL click
    } else if (val === "clr"){
        $(".clr").addClass("hidden");
        $(".del").removeClass("hidden");
        $("#entry").val("");
        // Clearing all entries
        entries = [];
        tempEntry = "";
    // Removing last number or sign from entry
    } else if (val === "del"){
        $("#entry").val(
          function(index, value){
            tempEntry = value.substr(0, value.length - 1);
            return value.substr(0, value.length - 1);
          }
        );
        $(".clr").addClass("hidden");
        $(".del").removeClass("hidden");
    //Pushing math signs
    } else if (val === "/" || val === "*" || val === "+"){
        if(tempEntry.length > 0) {
          entries.push(tempEntry); // Pushing number entered before math sign
          entries.push(val);
        } else {
          entries = ["0", val]; // If math sing is entered before number
        }
        tempEntry = "";
    // Calculation logic
    } else if (val === '=') {
        $(".del").addClass("hidden");
        $(".clr").removeClass("hidden");
      	entries.push(tempEntry); // Pushing all entries into array
        let convertedEntry = entries.join(" "); // Than joining all entries into string
        console.log(`Input entry: ${convertedEntry}`);

        // Checking if evaluation has error due to odd entries
        try {
          let result = eval(convertedEntry); // Evaluate string with entries
          $("#entry").val(result);
          console.log(`Result: ${result}`);
        } catch (e){
            if (e instanceof SyntaxError){
              $("#entry").val("NaN");
            }
        }
      }
  });
});
