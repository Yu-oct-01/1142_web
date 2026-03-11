$(function(){
    console.log("[jQuery] ready!");
    $("input").on("click",function(){
        // console.log("按按鈕了");
        // alert("yo");
        // $("h1").text("Hello");
        var numberOfLi = $("li").length;
        // console.log(numberOfLi);
        var randomIndex = Math.floor(Math.random()*numberOfLi);
        // console.log(randomIndex);
        $("h1").text($("li").eq(randomIndex).text());
    });
});