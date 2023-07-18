let currentScene = 1;
let scenes = [];
let data = [];
let width = 1200;
let height = 600;
let margin = { top: 30, right: 30, bottom: 50, left: 100 };
let xScale = d3.scaleTime().range([margin.left, width - margin.right]); // Adjust the range of xScale
let yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
let xAxis = d3.axisBottom(xScale).ticks(6);
let yAxis = d3.axisLeft(yScale);
let parseDate = d3.timeParse("%Y-%m-%d");

let line = d3
  .line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.cases));

let tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px");

let svg = d3
  .select("#scene-1")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("/data/new-york-data.csv", (d) => {
  console.log(d);
  return {
    date: parseDate(d.date),
    state: d.state,
    cases: +d.cases,
    deaths: +d.deaths,
  };
}).then((d) => {
  data = d;
  setupScenes();
  showScene(1);
});

function setupScenes() {
  scenes[1] = svg.append("g");
  scenes[2] = svg.append("g").attr("opacity", 0);
  scenes[3] = svg.append("g").attr("opacity", 0);
  scenes[4] = svg.append("g").attr("opacity", 0);
  scenes[5] = svg.append("g").attr("opacity", 0);

  // Scene 1
  createScene1();

  // Scene 2
  createScene2();

  // Scene 3
  createScene3();

  // Scene 4
  createScene4();

  // Scene 5
  createScene5();
}

function showScene(sceneNum) {
  scenes.forEach((s, i) => {
    s.transition()
      .duration(500)
      .attr("opacity", i === sceneNum ? 1 : 0);
  });
  currentScene = sceneNum;
}

function createScene1() {
  // Filter the data for the time period of this scene
  let sceneData = data.filter(
    (d) =>
      d.date >= parseDate("2021-01-23") && d.date <= parseDate("2021-05-01")
  );

  xScale.domain(d3.extent(sceneData, (d) => d.date));
  yScale.domain([0, 90000]);

  // draw x-axis
  scenes[1]
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Add label for the x-axis
  scenes[1]
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom + 40})`
    )
    .style("text-anchor", "middle")
    .text("Date");

  // draw y-axis
  scenes[1]
    .append("g")
    .attr("transform", `translate(${margin.left},0)`) // Shift the y-axis to the right
    .call(yAxis);

  // Add label for the y-axis
  scenes[1]
    .append("text")
    .attr(
      "transform",
      `translate(${margin.left / 2},${height / 2}) rotate(-90)`
    ) // Adjust the label position
    .style("text-anchor", "middle")
    .text("Cases");

  // draw line
  scenes[1]
    .append("path")
    .datum(sceneData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // draw title
  scenes[1]
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text(
      "New reported cases by day in New York from 2021-01-23 to 2021-05-01"
    );

  // draw dot
  scenes[1]
    .selectAll(".dot")
    .data(sceneData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.cases);
    })
    .attr("r", 5)
    .on("mouseover", function (event, d) {
      // Add stroke around dot on hover
      d3.select(this).attr("stroke-width", 2).attr("r", 7); // Increase the radius here
      tooltip
        .html(
          `Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Cases: ${d.cases}`
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", d3.pointer(event, this)[1] + 160 + "px")
        .style("left", d3.pointer(event, this)[0] + 80 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", null)
        .attr("stroke-width", null)
        .attr("r", 5); // Restore the original radius here
      tooltip.style("visibility", "hidden");
    });

  // Add dialog box (a rectangle in SVG)
  scenes[1]
    .append("rect")
    .attr("x", 490) // x position of the box, adjust as needed
    .attr("y", 70) // y position of the box, adjust as needed
    .attr("width", 540) // width of the box, adjust as needed
    .attr("height", 105) // height of the box, adjust as needed
    .style("fill", "#FFEFD5") // color of the box
    .style("stroke", "black") // border color of the box
    .style("stroke-width", 1); // border width of the box

  // Add general annotation
  scenes[1]
    .append("text")
    .attr("x", 500) // Adjust x position as needed
    .attr("y", 90) // Adjust y position as needed
    .style("font-size", "16px")
    .style("fill", "black")
    .html(
      "During the first time period, the line chart of new reported case shows</tspan> <tspan x='500' dy='1.2em'>a recession, which decreases from 13909 to 2199 with several vibrations.<tspan x='500' dy='1.2em'>State Government Response: On February 10, 2021, Large capacity</tspan> <tspan x='500' dy='1.2em'>areas reopen at 10% capacity, effective February 24, with a negative PCR</tspan> <tspan x='500' dy='1.2em'>test within 72 hours or full COVID-19 vaccination status required to attend.</tspan>"
    );

  let vertexPoint = sceneData.find((d) => +d.date === +parseDate("2021-03-24"));
  let vertexX = xScale(vertexPoint.date);
  let vertexY = yScale(vertexPoint.cases);

  // Define the arrow marker
  scenes[1]
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "#000000");

  // Add an arrow using line
  scenes[1]
    .append("line")
    .attr("x1", vertexX - 10) // start of the line (arrow tail)
    .attr("y1", vertexY - 40)
    .attr("x2", vertexX) // end of the line (arrow head)
    .attr("y2", vertexY)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-end");

  // Add annotation
  scenes[1]
    .append("text")
    .attr("x", vertexX - 175) // Adjust x position as needed
    .attr("y", vertexY - 45) // Adjust y position as needed
    .style("font-size", "16px")
    .style("fill", "black")
    .text(
      "The new covid case reaches a vertex of 20184 on 2021-03-24 in the first period"
    );
}

function createScene2() {
  let sceneData = data.filter(
    (d) =>
      d.date >= parseDate("2021-05-02") && d.date <= parseDate("2021-08-08")
  );

  xScale.domain(d3.extent(sceneData, (d) => d.date));
  yScale.domain([0, 90000]);

  // draw x-axis
  scenes[2]
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Add label for the x-axis
  scenes[2]
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom + 40})`
    )
    .style("text-anchor", "middle")
    .text("Date");

  // draw y-axis
  scenes[2]
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  // Add label for the y-axis
  scenes[2]
    .append("text")
    .attr(
      "transform",
      `translate(${margin.left / 2},${height / 2}) rotate(-90)`
    ) // Adjust the label position
    .style("text-anchor", "middle")
    .text("Cases");

  // draw line
  scenes[2]
    .append("path")
    .datum(sceneData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // draw title
  scenes[2]
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text(
      "New reported cases by day in New York from 2021-05-02 to 2021-08-08"
    );

  // draw dot
  scenes[2]
    .selectAll(".dot")
    .data(sceneData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.cases);
    })
    .attr("r", 5)
    .on("mouseover", function (event, d) {
      // Add stroke around dot on hover
      d3.select(this).attr("stroke-width", 2).attr("r", 7); // Increase the radius here
      tooltip
        .html(
          `Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Cases: ${d.cases}`
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", d3.pointer(event, this)[1] + 160 + "px")
        .style("left", d3.pointer(event, this)[0] + 80 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", null)
        .attr("stroke-width", null)
        .attr("r", 5); // Restore the original radius here
      tooltip.style("visibility", "hidden");
    });
}

function createScene3() {
  let sceneData = data.filter(
    (d) =>
      d.date >= parseDate("2021-08-09") && d.date <= parseDate("2021-11-15")
  );

  xScale.domain(d3.extent(sceneData, (d) => d.date));
  yScale.domain([0, 90000]);

  // draw x-axis
  scenes[3]
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Add label for the x-axis
  scenes[3]
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom + 40})`
    )
    .style("text-anchor", "middle")
    .text("Date");

  // draw y-axis
  scenes[3]
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  // Add label for the y-axis
  scenes[3]
    .append("text")
    .attr(
      "transform",
      `translate(${margin.left / 2},${height / 2}) rotate(-90)`
    ) // Adjust the label position
    .style("text-anchor", "middle")
    .text("Cases");

  // draw line
  scenes[3]
    .append("path")
    .datum(sceneData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // draw title
  scenes[3]
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text(
      "New reported cases by day in New York from 2021-08-09 to 2021-11-15"
    );

  // draw dot
  scenes[3]
    .selectAll(".dot")
    .data(sceneData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.cases);
    })
    .attr("r", 5)
    .on("mouseover", function (event, d) {
      // Add stroke around dot on hover
      d3.select(this).attr("stroke-width", 2).attr("r", 7); // Increase the radius here
      tooltip
        .html(
          `Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Cases: ${d.cases}`
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", d3.pointer(event, this)[1] + 160 + "px")
        .style("left", d3.pointer(event, this)[0] + 80 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", null)
        .attr("stroke-width", null)
        .attr("r", 5); // Restore the original radius here
      tooltip.style("visibility", "hidden");
    });
}

function createScene4() {
  // Filter the data for the time period of this scene
  let sceneData = data.filter(
    (d) =>
      d.date >= parseDate("2021-11-16") && d.date <= parseDate("2022-02-23")
  );

  xScale.domain(d3.extent(sceneData, (d) => d.date));
  yScale.domain([0, 90000]);

  // draw x-axis
  scenes[4]
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Add label for the x-axis
  scenes[4]
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom + 40})`
    )
    .style("text-anchor", "middle")
    .text("Date");

  // draw y-axis
  scenes[4]
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  // Add label for the y-axis
  scenes[4]
    .append("text")
    .attr(
      "transform",
      `translate(${margin.left / 2},${height / 2}) rotate(-90)`
    ) // Adjust the label position
    .style("text-anchor", "middle")
    .text("Cases");

  // draw line
  scenes[4]
    .append("path")
    .datum(sceneData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // draw title
  scenes[4]
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text(
      "New reported cases by day in New York from 2021-11-16 to 2022-02-23"
    );

  // draw dot
  scenes[4]
    .selectAll(".dot")
    .data(sceneData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.cases);
    })
    .attr("r", 5)
    .on("mouseover", function (event, d) {
      // Add stroke around dot on hover
      d3.select(this).attr("stroke-width", 2).attr("r", 7); // Increase the radius here
      tooltip
        .html(
          `Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Cases: ${d.cases}`
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", d3.pointer(event, this)[1] + 160 + "px")
        .style("left", d3.pointer(event, this)[0] + 80 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", null)
        .attr("stroke-width", null)
        .attr("r", 5); // Restore the original radius here
      tooltip.style("visibility", "hidden");
    });
}

function createScene5() {
  // Filter the data for the time period of this scene
  let sceneData = data.filter(
    (d) =>
      d.date >= parseDate("2021-01-23") && d.date <= parseDate("2022-02-23")
  );

  xScale.domain(d3.extent(sceneData, (d) => d.date));
  yScale.domain([0, 90000]);

  // draw x-axis
  scenes[5]
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Add label for the x-axis
  scenes[5]
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height - margin.bottom + 40})`
    )
    .style("text-anchor", "middle")
    .text("Date");

  // draw y-axis
  scenes[5]
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  // Add label for the y-axis
  scenes[5]
    .append("text")
    .attr(
      "transform",
      `translate(${margin.left / 2},${height / 2}) rotate(-90)`
    ) // Adjust the label position
    .style("text-anchor", "middle")
    .text("Cases");

  // draw line
  scenes[5]
    .append("path")
    .datum(sceneData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // draw title
  scenes[5]
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text(
      "New reported cases by day in New York from 2021-01-23 to 2022-02-23"
    );

  // draw dot
  scenes[5]
    .selectAll(".dot")
    .data(sceneData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) {
      return xScale(d.date);
    })
    .attr("cy", function (d) {
      return yScale(d.cases);
    })
    .attr("r", 5)
    .on("mouseover", function (event, d) {
      // Add stroke around dot on hover
      d3.select(this).attr("stroke-width", 2).attr("r", 7); // Increase the radius here
      tooltip
        .html(
          `Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Cases: ${d.cases}`
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", d3.pointer(event, this)[1] + 160 + "px")
        .style("left", d3.pointer(event, this)[0] + 80 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", null)
        .attr("stroke-width", null)
        .attr("r", 5); // Restore the original radius here
      tooltip.style("visibility", "hidden");
    });
}

// Add an event listener to the buttons
d3.select("#button1").on("click", function () {
  showScene(1);
});

d3.select("#button2").on("click", function () {
  showScene(2);
});

d3.select("#button3").on("click", function () {
  showScene(3);
});

d3.select("#button4").on("click", function () {
  showScene(4);
});

d3.select("#button5").on("click", function () {
  showScene(5);
});
