var data = d3.json("samples.json")
dropdown = d3.select("#selDataset")
demo = d3.select("#sample-metadata")
data.then(function(data){
var metadata = data.metadata[0]
console.log(metadata)
        Object.entries(metadata).forEach(([key, value]) => {demo.append("h6").text(`${key}:${value}`);

    })
})
function dropdownManue() {
    data.then(data => {
        var ids = data.names
        ids.forEach(ids => dropdown.append("option").text(ids))

    })
}
// console.log(data)
dropdownManue()
data.then(function (data) {
    var ids = data.samples[0].otu_ids

    var otuids = ids.map(ids => "OTU " + ids)
    var values = data.samples[0].sample_values
    var otulabels = data.samples[0].otu_labels
    console.log(data.samples.id)
    var bar = {
        type: "bar",
        x: values.slice(0, 10).reverse(),
        y: otuids.slice(0, 10).reverse(),
        hovertext: otulabels.slice(0, 10).reverse(),
        hoverinfo: "hovertext",
        orientation: "h"
    }

    var layout = {
        margin: {

            t: 20,
            b: 20,

        },
        width: 400,
        height: 500,
    };

    var data = [bar]
    Plotly.newPlot("bar", data, layout)

    var bubble = {
        x: ids,
        y: values,
        mode: "markers",
        marker: {
            color: ids,
            size: values,
            autocolorscale: false,
            colorscale: 'Earth'
        }


    }

    var layout = {
        showlegend: false,
        xaxis: {
            title: {
                text: 'OTU ID',
            }
        },

        margin: {

            t: 20,

        }
    }
    data = [bubble]
    Plotly.newPlot("bubble", data, layout)


})

d3.selectAll("#selDataset").on("change", optionChanged)

function optionChanged() {
    
    data.then((data) => {


        var id = dropdown.property("value")
        // console.log(data)
        // console.log(data.samples)

        var updata = data.samples.filter(data => data.id === id)
        // console.log(updata)
        var otuids = updata[0].otu_ids.map(x => 'OTU' + x)
        var values = updata[0].sample_values
        // console.log(values)
        var otulabels = updata[0].otu_labels
        // console.log(otulabels)
        var x = []
        var y = []
        var hovert = []
        var text=[]
        x = values.slice(0, 10).reverse(),
        y = otuids.slice(0, 10).reverse(),
        hovertext = otulabels.slice(0, 10).reverse(),

        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "hovertext", [hovert]);
        demo.html("")
        var metadata = data.metadata.filter(data => data.id === +id)
        console.log(1)
        Object.entries(metadata[0]).forEach(([key, value]) => {demo.append("h6").text(`${key}:${value}`);

        x=updata[0].otu_ids
        
        y=values
        text=otulabels
        Plotly.restyle("bubble", "x", [x] );
        Plotly.restyle("bubble", "y", [y] );
        Plotly.restyle("bubble","text",[text]);

    })
        
    }
    )
}
