/* Title: Twitch.tv JSON API v1 (for freeCodeCamp), August 2017
* Author: Boško Rabrenović
* https://github.com/boniverski/js-calculator
* Description: Simple JavaScript Calculator with basci operations.
*/

$(document).ready(function(){
  let tempEntry = [];

  function defaultStyle(){ // Taking care of default style values on certain clicks
    $(".clr").addClass("hidden");
    $(".del").removeClass("hidden");
    $("#entry").text("0");
    $("#entry").css({"color": "", "height":"50%", "padding-top":""});
    $("#tempEntry").removeClass("hidden");
  }

  $("button").on("click", function() {
    let val = $(this).val();

    if(!isNaN(val) || val === "." || val === "-"){
      defaultStyle();

      // Adding zero before point symbol if there's no entry
      if((val === ".") && (tempEntry.length === 0)) {
        tempEntry.push(0)
      }

      tempEntry.push(val);

      // Pushing num entries and math signs
    } else if (val === "/" || val === "*" || val === "+" || val==="-"){
        if(tempEntry.length > 0) {
          tempEntry.push(val);
      } else { // If math sing is entered before number
          tempEntry.push(0);
          tempEntry.push(val);
        }

    } else if (val === "del"){ tempEntry.pop(); } // Remove last entry
      else if (val === "=") {
        $(".del").addClass("hidden");
        $(".clr").removeClass("hidden");
        $("#tempEntry").addClass("hidden");
        $("#entry").css({"height":"100%", "padding-top":"0.5em"});

        // Checking if last entry is math symbol, before equal sign.
        let lastEntry = tempEntry[tempEntry.length - 1];
        if(lastEntry === "/" || lastEntry === "*" || lastEntry === "+" || lastEntry ==="-") {
          tempEntry.pop(); // If true, remove it.
        }

        // Covert tempEntry arr before evaulation
        let expression = tempEntry.join("");
        tempEntry = [];
        console.log(`Input entry: ${expression}`);

        // Checking if evaluation has error due to odd entries
        try {
          let result = eval(expression);
          $("#entry").text(result);
          console.log(`Result: ${result}`);
        } catch (e){
            if (e instanceof SyntaxError){
              $("#entry").html("Bad expression").css("color", "#FF4335");
            }
        }

    } else if (val === "clr"){
      defaultStyle();
      // Clearing all entries
      entries = "";
      tempEntry = [];
      console.clear();
    }

    // Printing out final result or default value of "0" if tempEntry is empty array
    tempEntry.length > 0 ?
      $("#tempEntry").text(tempEntry.join("")) : $("#tempEntry").text("0");
  });
});
