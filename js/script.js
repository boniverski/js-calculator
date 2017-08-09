$(document).ready(function(){
  let entries = "";
  let tempEntry = [];

  function defaultStyle(){
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

      if((val === ".") && (tempEntry.length === 0)) {
        tempEntry.push(0)
      } tempEntry.push(val);

    } else if (val === "/" || val === "*" || val === "+" || val==="-"){
        if(tempEntry.length > 0) {
          tempEntry.push(val);
      } else {
          tempEntry.push(0);
          tempEntry.push(val); // If math sing is entered before number
        }

    } else if (val === "del"){ tempEntry.pop(); }
      else if (val === "=") {
        $(".del").addClass("hidden");
        $(".clr").removeClass("hidden");
        $("#tempEntry").addClass("hidden");
        $("#entry").css({"height":"100%", "padding-top":"0.5em"});

        let lastEntry = tempEntry[tempEntry.length - 1];
        if(lastEntry === "/" || lastEntry === "*" || lastEntry === "+" || lastEntry ==="-") {
          tempEntry.pop();
        }

        let expression = tempEntry.join("");
        tempEntry = [];
        console.log(`Input entry: ${expression}`);

        // Checking if evaluation has error due to odd entries
        try {
          let result = eval(expression); // Evaluate string with entries
          $("#entry").text(result);
          console.log(`Result: ${result}`);
        } catch (e){
            if (e instanceof SyntaxError){
              $("#entry").html("Bad expression").css("color", "#FF4335");
            }
        }

    } else if (val === "clr"){
        // Clearing all entries
        entries = "";
        tempEntry = [];
        console.clear();
        defaultStyle();
    }
    //printing final result or default value of "0" if tempEntry is empty array
    tempEntry.length > 0 ?
      $("#tempEntry").text(tempEntry.join("")) : $("#tempEntry").text("0");
  });
});
