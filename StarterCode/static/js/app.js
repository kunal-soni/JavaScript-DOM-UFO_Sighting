// from data.js
var tableData = data;

// YOUR CODE HERE!

// Use D3 to select the table
var table = d3.select("table");

// Use d3 to create a bootstrap striped table
// http://getbootstrap.com/docs/3.3/css/#tables-striped
table.attr("class", "table table-striped");

// Get a reference to the table body
var tbody = d3.select("tbody");

// Define function to populate Data
function populateData(dataset){
    dataset.forEach((attr) => {
    // First get each row
    var row = tbody.append("tr");
    Object.entries(attr).forEach(([key, value]) => {
      // Inside each row get all the values
      // td means it does not include header rows
      var cell = tbody.append("td");
      cell.text(value);
    });
    });
};

// Initially populate all the data from the data.js file by calling the function defined
populateData(tableData);

// Function to Reset and clear data
function resetTable(){
    table.selectAll("td").remove();
    //table.selectAll("tr").remove();
};

// Select the filter button
var filter = d3.select("#filter-btn");

// Use D3 `.on` to attach a click handler for the filter
filter.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputDateElement = d3.select("#datetime");
    var inputCityElement = d3.select("#city");
    var inputStateElement = d3.select("#state");
    var inputCountryElement = d3.select("#country");
    var inputShapeElement = d3.select("#shape");
    // Get the value property of the input element
    var inputDateValue = inputDateElement.property("value");
    //console.log(inputDateValue);
    var inputCityValue = inputCityElement.property("value");
    var inputStateValue = inputStateElement.property("value");
    var inputCountryValue = inputCountryElement.property("value");
    var inputShapeValue = inputShapeElement.property("value");
    // Create a dictionary to store filtered info
    // This should be exactly like the data.js file to get mapped correctly
    var filter1 = [{
        'datetime': [],
        'city': [],
        'state': [],
        'country': [],
        'shape': [],
        'minutes': [],
        'comments': []
    }];
    
    // Filter data based on user input of date
    // If-Else1
    if(inputDateValue !== "")
    {
    filter1 = tableData.filter(observation => observation.datetime === inputDateValue);
    }
    else
    {
        filter1 = tableData;
    }

    // Only filter city if it is not blank
    // If-Else2
    if(inputCityValue!== "")
    {
    var filter2 = filter1.filter(observation => observation.city === inputCityValue);
    }
    else
    {
        var filter2 = filter1;
    }

    // Only filter state if it is not blank
    // If-Else3
    if(inputStateValue!== "")
    {
    var filter3 = filter2.filter(observation => observation.state === inputStateValue);
    }
    else
    {
        var filter3 = filter2;
    }
    
    // Only filter country if it is not blank
    // If-Else4
    if(inputCountryValue!== "")
    {
    var filter4 = filter3.filter(observation => observation.country === inputCountryValue);
    }
    else
    {
        var filter4 = filter3;
    }
    
    // Only filter shape if it is not blank
    // If-Else5
    if(inputShapeValue!== "")
    {
    var filter5 = filter4.filter(observation => observation.shape === inputShapeValue);
    }
    else
    {
        var filter5 = filter4;
    }
    // Add condition if user clears all input and hits button to populate all data
    //If
    if(inputCityValue === "" && inputDateValue === "" && inputStateValue === "" && inputCountryValue === "" && inputShapeValue === "")
    {
        populateData(filter5);
    }
    // Function to clear data
    resetTable();
    
    // Call function to populate data from the filtered dictionary
    populateData(filter5);
    
// Below is end of function  
});

// Select the clear fields button
var clearFields = d3.select("#clearfields-btn");
// Use D3 `.on` to attach a click handler for the filter
clearFields.on("click", function() {
    // Using d3.select, clear all the fields values when this button is pressed
    d3.select("#datetime").property("value").clear();
    d3.select("#city").property("value").clear();    
});    
