function $ (x) {
    return document.getElementById(x);
}

var width = window.innerWidth-40,
    height = window.innerHeight-130;
console.log(width);
console.log(height);

var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("#frame").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

d3.json("graph.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  link = link.data(graph.links)
    .enter().append("line")
      .attr("class", "link");

    node = node.data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .on("dblclick",dblclick)
            .call(drag);
    node.append("circle").attr("r",18);
    node.append("text")
      .attr("dx", -3)
      .attr("dy", ".45em")
      .text(function(d) { return d.nr.toString() });

});

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}
