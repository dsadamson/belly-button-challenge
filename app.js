// Load data, using D3
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(jsonData => {
    data = jsonData;

// Create function to encompass all plotting and adjustments to plots
function updateCharts(selectedIndex) {
  const sampleData = data.samples[selectedIndex];
  const metadata = data.metadata[selectedIndex];

  // Extract data for bar chart
  const sampleValues = sampleData.sample_values.slice(0, 10).reverse();
  const otuIds = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
  const otuLabels = sampleData.otu_labels.slice(0, 10).reverse();

  // Create trace for bar chart
  const trace = {
    type: 'bar',
    orientation: 'h',
    x: sampleValues,
    y: otuIds,
    text: otuLabels,
    hovertemplate: '%{text}<extra></extra>',
  };

  // Create data array for bar chart
  const barChartData = [trace];

  // Update bar chart
  Plotly.newPlot('chart', barChartData);

  // Extract necessary data for bubble chart
  const otuIdsBubble = sampleData.otu_ids;
  const sampleValuesBubble = sampleData.sample_values;
  const markerSizes = sampleValuesBubble;
  const markerColors = otuIdsBubble;
  const textValues = sampleData.otu_labels;

  // Create trace for bubble chart
  const traceBubble = {
    x: otuIdsBubble,
    y: sampleValuesBubble,
    mode: 'markers',
    marker: {
      size: markerSizes,
      color: markerColors,
    },
    text: textValues,
    // Include line to display information when chart is hovered over
    hovertemplate: 'OTU ID: %{x}<br>Sample Value: %{y}<br>OTU Label: %{text}<extra></extra>',
  };

  // Create the data array for the bubble chart
  const chartData = [traceBubble];

  // Update the bubble chart
  Plotly.newPlot('bubble-chart', chartData);

  // Display sample metadata
  const metadataContainer = document.getElementById('sample-metadata');
  metadataContainer.innerHTML = '';

  Object.entries(metadata).forEach(([key, value]) => {
    const metadataItem = document.createElement('p');
    metadataItem.innerText = `${key}: ${value}`;
    metadataContainer.appendChild(metadataItem);
  });
}

    // Create dropdown menu options
    const dropdownOptions = data.samples.map((sample, index) => ({
      label: sample.id,
      value: index,
    }));

    // Create dropdown menu
    const dropdown = document.getElementById('selDataset');
    dropdownOptions.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option.value;
      optionElem.text = option.label;
      dropdown.appendChild(optionElem);
    });

    // Define function to handle dropdown change
    function handleDropdownChange() {
      const selectedIndex = dropdown.selectedIndex;
      updateCharts(selectedIndex);
    }

    // Add event listener for dropdown change
    dropdown.addEventListener('change', handleDropdownChange);

    // Create chart container for bar chart
    const chartContainer = document.createElement('div');
    chartContainer.id = 'chart';
    document.body.appendChild(chartContainer);

    // Format bar chart
    const barLayout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' },
    };

    // Plot initial bar chart
    Plotly.newPlot('chart', [], barLayout);

    // Create chart container for bubble chart
    const bubbleChartContainer = document.createElement('div');
    bubbleChartContainer.id = 'bubble-chart';
    document.body.appendChild(bubbleChartContainer);

    // Format Bubble chart
    const bubbleLayout = {
      title: 'Bubble Chart - Samples',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
    };

    // Plot initial bubble chart
    Plotly.newPlot('bubble-chart', [], bubbleLayout);

    // Create container for sample metadata
    const metadataContainer = document.createElement('div');
    metadataContainer.id = 'sample-metadata';
    document.body.appendChild(metadataContainer);

    // Call update function initially with the default selected index (0)
    updateCharts(0);
  })
  .catch(error => console.error(error));