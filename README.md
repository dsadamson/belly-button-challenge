# Using JavaScript to develop a webpage that displays interactive data visualizations

# Overview
For this project, I was provided a JSON file with data about the biodiversity of bacteria in test subjects' belly buttons and an HTML file that contained the outline of an online web application.
I was assigned to use these provided resources to create a web application in JavaScript that would display interactive data visualizations, based upon the selections made in a dropdown menu.
The visualizations I created were a bar chart, a bubble chart, and a box that displays individual test subjects' demographic data. These visualizations change, depending on which ID is selected in a dropdown menu.
To accomplish this task I used standard tools in JavaScript, like d3 to read the JSON object and Plotly to create the visualizations.

# Features
The JavaScript code begins by reading in the JSON object, using d3. Then the code immediately starts a function called 'updateCharts', which parses each sample in the JSON object and the metadata attached to the subject from whom the sample was taken.
The code continues by creating the charts and finding the data needed to make them, using OTU IDs for the x-axis and sample values for the y-axis in the bar chart. The following line of code provides the ability to hover over each bar on the bar chart and display the names of the bacteria attached to the OTU ID: 
    
    hovertemplate: '%{text}<extra></extra>'.

The following code shows a similar process used to create the bubble chart:

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

This block of code shows how the charts parse specific pieces of the JSON object, then can use those pieces to set marker sizes and colors. Again, a hover template is used to display the sample values and the bacteria connected to each OTU ID.

The following event listener is used to update the visualizations and the metadata display:

   // Define function to handle dropdown change
    function handleDropdownChange() {
      const selectedIndex = dropdown.selectedIndex;
      updateCharts(selectedIndex);
    }

    // Add event listener for dropdown change
    dropdown.addEventListener('change', handleDropdownChange);

This block of code updates which subject ID the code searches for, then parses the JSON object according to that ID, finding the necessary OTU IDs and sample values connected to that subject ID.

The HTML code really only features one line of note, displayed below:

      <script src="app.js" defer></script>

By adding the command 'defer' after the relative pathway to "app.js", I avoided a repeated error, caused by the JavaScript file being opened before the HTML file was finished being parsed. The 'defer' command causes the JavaScript file to only open after the HTML file is completely parsed. 

# Instructions
Simply clone this Git repository to your local machine, then open the HTML file in Google Chrome to view the visualizations. The JSON data is included in the folder marked 'data', while the HTML and JavaScript files are not placed in a folder.

Alternatively, visit the following web address: https://dsadamson.github.io/belly-button-challenge/. Inspect the webpage to view its HTML and JavaScript sources.

# Sources
The starter HTML code, JSON data and instructions for this assignment were provided by the edX Data Visualization and Analytics Boot Camp at The Ohio State University, which obtained the data about bacterial biodiversity in belly buttons from the following source:
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.

# Author
Daniel Adamson
