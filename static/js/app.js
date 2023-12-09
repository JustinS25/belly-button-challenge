// Set 'url' equal to url variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// init function to select from dropdown menu
function init() {
    // Select element for dropdown menu
    let selectDropdown = d3.select("#selDataset");
  
    // D3 Library to read in url
    d3.json(url).then((data) => {
      let subjectId = data.names;
      console.log(subjectId);
      // for loop to go through all options
      for (let i = 0; i < subjectId.length; i++){
        selectDropdown.append("option").text(subjectId[i]).property("value", subjectId[i]);
      };
    
    // Initialize first option to start website with
    let firstSample = subjectId[0];

    // Test to see first sample output to console log
    console.log(firstSample);

    // Show horizontal bar and bubble charts with demographic info
    createCharts(firstSample);
    demographics(firstSample);
  });
};


// Create function to build horizontal bar chart and bubble chart
function createCharts(newChoice){
    d3.json(url).then((data) =>{
    
    // Create new array to hold updated test subject info
    let resultArray = data.samples.filter(sampleObj => sampleObj.id == newChoice);
    // Store resulting info and output to console log to see if updated properly
    let result = resultArray[0];
    console.log(result);

    // Store sample_values, otu_ids, and otu_labels as requested in directions
    let sample_values = result.sample_values;
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    
    // Console log info to make sure values, labels, and ids are as expected
    console.log(sample_values);
    console.log(otu_ids);
    console.log(otu_labels);


    // Gather plot info for horizontal bar chart
    let trace1 = {
        // need to use .reverse() to go from greatest to least from top to bottom
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        orientation: "h",
        type: "bar"
      };
    
    // set data equal to trace1
    var data = [trace1];

    // Plot horizontal bar chart
    Plotly.newPlot("bar", data);

    // Gather plot info for bubble chart
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
          color: otu_ids,
          size: sample_values
        },
        text: otu_labels
      };
      
    
    // set data equal to trace2
    data = [trace2];

    // Plot bubble chart
    Plotly.newPlot("bubble", data);

})
};


// Create demographics function which displays demographic info
function demographics(newChoice){
    d3.json(url).then((data) =>{

    let resultArray = data.samples.filter(sampleObj => sampleObj.id == newChoice);
    // Store resulting id info to display to demographic info portion
    let result = resultArray[0];
    let resultId = parseInt(result.id);
    console.log(resultId);

    // Add to demographic info
    let demographicInfo = d3.select(".panel-body").text('Id: ' + resultId);
    console.log(demographicInfo);

})
};


// Function to update choice when new dropdown option is chosen
// optionChanged function shown in index.html file
function optionChanged(newChoice) {
    // When new option from drodown menu is chosen, create new charts and demographic info
    createCharts(newChoice);
    demographics(newChoice);
};

// Call init function to run everything
init();