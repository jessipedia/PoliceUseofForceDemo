var lon = [];
var lat = [];
var policeKR = [];
var dept = [];
var tempColor;

var margin = {top: 40, right: 10, bottom: 20, left:10};
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var projection = d3.geo.albersUsa();

var path = d3.geo.path().projection(projection);

//Chart 1 
d3.json("us.geojson", function (data) {

  var chart1 = d3.select('#chart1').append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .classed("card", true)
      //.style('background', 'blue')

  var group = chart1.selectAll('g')
    .data(data.features)
    .enter()
    .append('g')

  var map = group.append("path")
      .attr("d", path)
      .attr("class", "area")
      .style({ 
        fill: 'none', 
        stroke: "#6E6E6E",
             })

  d3.csv('UFPD.csv', function(data){

    console.log(data);

    for(key in data){
      policeKR.push(data[key].PoliceKillingsRate)
      dept.push(data[key].PoliceDepartment)
    }

    var rScale = d3.scale.linear()
      .domain([0, d3.max(policeKR)])
      .range([0, 200]);

      console.log(policeKR);
      console.log(dept);
      console.log(d3.max(policeKR));
      console.log(rScale(5));

  var tooltip = d3.select('#chart1').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  var points = chart1.selectAll('circle')
      .data(data)
      .enter()
        .append('circle')
        .attr("cx", function (d) {
          //console.log(d.lon); 
          return projection([d.lon, d.lat])[0]; 
        })
        .attr("cy", function (d) { 
          return projection([d.lon, d.lat])[1]; })
        .attr("r", function (d){
          if (d.PoliceKillingsRate > 0){
          return Math.sqrt(rScale(d.PoliceKillingsRate));
          } else{return 5}
        })
        .style({
          stroke: 'none',
          opacity: .3
        })
        .attr('fill', function (d) {
          if (d.PoliceKillingsRate > 0){
            return '#ED400C';
          } else { 
            return '#6E6E6E';}
        })
        .on('mouseover', function (d){

          tempColor = this.style.fill

          d3.select(this)
            .style('fill', 'orange')


          tooltip.transition()
            .style('opacity', .8)

          tooltip.html(d.PoliceDepartment + " Police Department"  + "<br/>" + "Police Killings Rate: " + d.PoliceKillingsRate)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top', (d3.event.pageY - 60) + 'px')
            .attr('class', 'tooltip')


        })
        .on('mouseout', function (d){
          d3.select(this)
            .style('fill', tempColor);

          tooltip.transition()
            .style('opacity', 0)
        })
  });



});

//Chart 2

var chart2 = d3.select('chart2').append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .style('background', 'blue')

var rect = chart2.selectAll('rect')
  .enter()
    .append('rect')
    .attr('x', 100)
    .attr('y', 100)
    .attr("width", '20')
    .attr("height", '20');



