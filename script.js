// create SVG Bar chart
const svgBar = d3.select('#bar-chart')
  .attr('width', width)
  .attr('height', height);

// load data and draw bar chart
d3.csv('data/data.csv', (d) => {
  // coerce data to numbers
  d.value = +d.Value;
  d.category = d.Category;
  return d;
}).then((data) => {
		// create scales
		const xScaleBar = d3.scaleBand()
		.range([0, innerWidth])
		.domain(data.map(d => d.category))
		.paddingInner(0.2)
		.paddingOuter(0.2);
	
		const yScaleBar = d3.scaleLinear()
		.range([innerHeight, 0])
		.domain([0, d3.max(data, d => d.value)]);
	
		// create axis
		const xAxisBar = d3.axisBottom(xScaleBar)
		const yAxisBar = d3.axisLeft(yScaleBar)
	
		// add axis to svgBar
		svgBar.append('g')
		.attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
		.call(xAxisBar);
	
		svgBar.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)
		.call(yAxisBar);
	
	// add bars to svgBar
	svgBar.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', d => xScaleBar(d.category) + margin.left)
		.attr('y', d => yScaleBar(d.value) + margin.top)
		.attr('width', xScaleBar.bandwidth())
		.attr('height', d => innerHeight - yScaleBar(d.value))
		.attr('fill', 'blue')
	});