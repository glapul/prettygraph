var $ = function(s)
{
    return document.getElementById(s);
}
var keep_canvas_size = function()
{
    var outer_width = $("frame").offsetWidth-30;
    var outer_height= window.innerHeight - 130;
    $("myCanvas").width=outer_width;
    $("myCanvas").height=outer_height;
}
keep_canvas_size();
window.onresize=keep_canvas_size;