// const JSONFileName = 'assets/sample_data.json';
const color_dict = {'black_coal': 'black',
                    'distillate': 'red',
                    'hydro': 'blue',
                    'gas_ccgt': 'orange',
                    'wind': 'green',
                    };

var globalTableData = {
    keys: [],
    data: [],
};



var globalEnergyData = {
    keys: [],
    data: [],
    // color: []
};

let pieConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    // colors: ['black', 'red','blue','orange', 'green'],
    title: {
        text: 'Engergy Consumption Break-up'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    },
    plotOptions: {
        series: {
            animation: false
        },
        pie: {
            innerSize: '50%',
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.2f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    series: []
};

let barConfig = {
    chart: {
        type: 'bar',
    },
    colors: ['black', 'red','blue','orange', 'green'],
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: 'I am a title'
    },
    xAxis: {
        // categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        series: {
            animation: false
        },
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: []
};

let sharedConfig = [
    {
        chart: {
            type: 'area',
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
            zoomType: 'x',
            reversedStacks: false,
        },
        title: {
            text: 'Generation MW',
            align: 'left',
            margin: 0,
            x: 30
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            area: {
                stacking: 'normal',
            }
        },
        xAxis: {
            crosshair: true,
            labels: {
                format: '{value}'
            }
        },
        yAxis: {
            reversedStacks: false,
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return s + '<br/>' + point.series.name + ': ' +
                        point.y;
                }, '<b>' + this.x + '</b>');
            },
            shared: true
        },
        borderWidth: 0,
        backgroundColor: 'none',
        pointFormat: '{point.x}, {point.y}',
        headerFormat: '',
        shadow: false,
        style: {
            fontSize: '18px'
        },
        series: []
    },
    {
        chart: {
            type: 'line',
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
        },
        title: {
            text: 'Price $/MWh',
            align: 'left',
            margin: 0,
            x: 30
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            crosshair: true,
            events: {
                setExtremes: 100
            },
            labels: {
                format: '{value}'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return s + '<br/>' + point.series.name + ': ' +
                        point.y;
                }, '<b>' + this.x + '</b>');
            },
            shared: true
        },
        borderWidth: 0,
        backgroundColor: 'none',
        // pointFormat: '{point.x}, {point.y}',
        headerFormat: '',
        shadow: false,
        style: {
            fontSize: '18px'
        },
        series: []
    },
    {
        chart: {
            type: 'line',
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20
        },
        title: {
            text: 'Temperature F',
            align: 'left',
            margin: 0,
            x: 30
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            crosshair: true,
            events: {
                setExtremes: 100
            },
            labels: {
                format: '{value}'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return s + '<br/>' + point.series.name + ': ' +
                        point.y;
                }, '<b>' + this.x + '</b>');
            },
            shared: true
        },

        borderWidth: 0,
        backgroundColor: 'none',
        pointFormat: '{point.x}, {point.y}',
        headerFormat: '',
        shadow: false,
        style: {
            fontSize: '18px'
        },
        series: []

}];

// function to do deep-copy on the global data structure
function updateGlobalEnergyData(data) {
    globalEnergyData['data'] = [];
    for (var idx = 0; idx < data[0]['data'].length; idx++) {
        var energyBreakup = data.map(elm => { return elm['data'][idx] });
        globalEnergyData['data'].push(energyBreakup);
    }
    globalEnergyData['keys'] = data.map(elm => elm['name']);
    // globalEnergyData['color'] = data.map(elm => elm['color']);


    // console.log(globalEnergyData)
    console.log('global data loaded!', globalEnergyData);
}

function updateTableData(data) {
    // tableId = 'table';
    // fields = ['sources', 'power', 'contribution', 'price']
    for (var idx = 0; idx < data[0]['data'].length; idx++) {
        var TableBreakup = data.map(elm => { return elm['data'][idx] });
        globalTableData['data'].push(TableBreakup);
    }
    globalTableData['keys'] = data.map(elm => elm['name']);
    globalTableData['color'] = data.map(elm => elm['color']);

    console.log('table data loaded!', globalTableData);
};

function renderTable(nodeId, fields) {

    function convertTableData(data) {
        console.log('globalTableData', globalTableData);
    
        // var jsonData = [
        //     { field1: 'value a1', field2: 'value a2', field3: 'value a3', field4: 'value a4' },
        //     { field1: 'value b1', field2: 'value b2', field3: 'value b3', field4: 'value b4' },
        //     { field1: 'value c1', field2: 'value c2', field3: 'value c3', field4: 'value c4' }
        // ];
    }

    var selectedKey = globalTableData['keys'];
    var selectedVal = globalTableData['data'][nodeId];
    // var selectedColor = ['black', 'red','orange','blue', 'green'];
    // console.log('selectedVal', selectedVal);



    var tableDataSetPro = [];
    var tableDataSet = [{name: selectedKey,
                        data: selectedVal,}];
                        // color: selectedColor}];

    console.log('tableDataSet', tableDataSet);

    for (var i = 0; i < tableDataSet[0]['data'].length; i++) {
        // count sum
        var sum = 0
        for (var j = 0; j < tableDataSet[0]['data'].length; j++) {
            sum += tableDataSet[0]['data'][j]
          }
        console.log(sum)
        var contribution = (100 * tableDataSet[0]['data'][i] / sum) + '';


        tableDataSetPro.push(
            {'resources': tableDataSet[0]['name'][i],
            'power': tableDataSet[0]['data'][i],
            'contribution': contribution.slice(0, 4) + '%',
            'price' : tableDataSet[0]['data'][7],
            }
        );
    };

    console.log('tableDataSetPro', tableDataSetPro);


    var fields = ['resources', 'power', 'contribution', 'price'];
    var rows = '';
    $.each(tableDataSetPro, function(index, item) {
        var row = '<tr>';
        $.each(fields, function(index, field) {
            // console.log(field)
            row += '<td>' + item[field] + '</td>';
        });
        rows += row + '<tr>';
    });
    $('#table').html(rows);
}

function renderPieChart(nodeId) {
    // const categories = ['black_coal','distillate','hydro','gas_ccgt','wind'];

    // console.log(globalEnergyData)
    // var selectedKey = globalEnergyData['keys'][nodeId];
    var selectedKey = globalEnergyData['keys'];
    var selectedVal = globalEnergyData['data'][nodeId];
    var selectedColor = ['black', 'red','orange','blue', 'green'];
    // console.log('selectedKey', selectedKey);



    var pieDataSetPro = [];
    var pieDataSet = [{name: selectedKey,
                        data: selectedVal,
                        color: selectedColor}];

    console.log(pieDataSet);

    for (var i = 0; i < pieDataSet[0]['data'].length; i++) {
        pieDataSetPro.push(
            {'name': pieDataSet[0]['name'][i],
            'y': pieDataSet[0]['data'][i],
            'color': pieDataSet[0]['color'][i],
            }
        );
    };

    console.log('pieDataSetPro', pieDataSetPro);


    pieConfig.series = [{'data': pieDataSetPro}];
    pie = Highcharts.chart('pieGrid', pieConfig)
};

function renderBar(nodeId) {
    var selectedKey = globalEnergyData['keys'];
    var selectedVal = globalEnergyData['data'][nodeId];
    var selectedColor = ['black', 'red','orange','blue', 'green'];
    
    var barDataSetPro = [];
    var barDataSet = [{name: selectedKey, 
                        data: selectedVal,
                        color: selectedColor}];

    // console.log('barDataSet', barDataSet);

    for (var i = 0; i < barDataSet[0]['data'].length; i++) {
        barDataSetPro.push(
            {'name': barDataSet[0]['name'][i],
            'data': [barDataSet[0]['data'][i]],
            'color': barDataSet[0]['color'][i],
            }
        );
    };

    console.log('barDataSetPro', barDataSetPro);

    barConfig.series = barDataSetPro;
    bar = Highcharts.chart('barGrid', barConfig);
}

function onSuccessCb(jsonData) {    
    // console.log('parsing data:', jsonData)
    energyData = jsonData.filter(function (elm) {
        // console.log('parsing data:', elm)
        return ((elm['fuel_tech'] === 'wind') ||
        (elm['fuel_tech'] === 'hydro') || 
        (elm['fuel_tech'] === 'gas_ccgt') ||
        (elm['fuel_tech'] === 'distillate') ||
        (elm['fuel_tech'] === 'black_coal'));
    }).map(function (elm) {
        return {
            data: elm['history']['data'],
            name: elm['fuel_tech'],
            color: color_dict[elm['fuel_tech']],
        };
    });

    tableData  = jsonData.filter(function (elm) {
        // console.log('parsing data:', elm)
        return ((elm['fuel_tech'] === 'wind') ||
        (elm['fuel_tech'] === 'hydro') || 
        (elm['fuel_tech'] === 'gas_ccgt') ||
        (elm['fuel_tech'] === 'distillate') ||
        (elm['fuel_tech'] === 'black_coal') ||
        (elm['fuel_tech'] === 'exports') ||
        (elm['fuel_tech'] === 'pumps') ||
        (elm['type'] === 'price'));
    }).map(function (elm) {
        if (elm['fuel_tech']) {
            return {
                data: elm['history']['data'],
                name: elm['fuel_tech'],
                color: color_dict[elm['fuel_tech']],
            }
        } 
        else if (elm['type']) {
            return {
                data: elm['history']['data'],
                name: elm['type'],
                color: color_dict[elm['type']],
        };
        }
    });


    console.log("tableData", tableData)
    updateGlobalEnergyData(energyData);
    updateTableData(tableData);

    priceData = jsonData.filter(function (elm) {
        return elm['type'] === 'price';
    }).map(function (elm) {
        return {
            data: elm['history']['data'],
            name: elm['type'],
            color: 'red'
        };
    });
    tempData = jsonData.filter(function (elm) {
        return elm['type'] === 'temperature';
    }).map(function (elm) {
        return {
            data: elm['history']['data'],
            name: elm['type'],
            color: 'red'
        };
    });

    // console.log(energyData)
    // console.log('priceData', priceData)
    // console.log(tempData)


    sharedConfig[0].series = energyData;
    sharedConfig[1].series = priceData;
    sharedConfig[2].series = tempData;

    for (i = 0; i < 3; i++) {

        var div = document.createElement('div');
            // div.setAttribute('id', 'sharedChart' + i);
            div.setAttribute('id', 'sharedChart' + i)
            div.setAttribute('style', 'height: 250px; width: 100%');
            // div.setAttribute("onmouseover", "onMouseoverChart()")

        document.getElementById('sharedGrid').appendChild(div);
        chart = Highcharts.chart(div.id, sharedConfig[i]);

    //     var chart = Highcharts.chart('sharedChart' + i, sharedConfig[i]);
    }

    // sharedPrice = Highcharts.chart('sharedGrid Price', sharedConfig[1])
    // sharedTemp = Highcharts.chart('sharedGrid Temp', sharedConfig[2])

    renderPieChart(0);
    renderBar(0);

    renderTable(0);

    console.log('table loaded')
};

function fetchJSONFile(filePath, callbackFunc) {
    console.debug("Fetching file:", filePath);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                console.info("Loaded file:", filePath);
                var data = JSON.parse(httpRequest.responseText);
                console.debug("Data parsed into valid JSON!");
                console.debug(data);
                if (callbackFunc) callbackFunc(data);
            } else {
                console.error("Error while fetching file", filePath,
                    "with error:", httpRequest.statusText);
            }
        }
    };
    httpRequest.open('GET', filePath);
    httpRequest.send();
}

function showPie() {
  var p = document.getElementById("pieGrid");
  var b = document.getElementById("barGrid");

  p.style.display = "block";
  b.style.display = "none";
//   style.visibility ='hidden';
}

function showBar() {
    var p = document.getElementById("pieGrid");
    var b = document.getElementById("barGrid");
    p.style.display = "none";
    b.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {

    const JSONFileName = 'assets/springfield_converted.json'
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    Highcharts.Point.prototype.highlight = function (event) {
        event = this.series.chart.pointer.normalize(event);
        this.onMouseOver(); // Show the hover marker
        this.series.chart.tooltip.refresh(this); // Show the tooltip
        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };



    ['mousemove'].forEach(function (eventType) {
        document.getElementById('sharedGrid').addEventListener(
            eventType,
            function (e) {
                var chart,
                    point,
                    i,
                    event;
    
                for (i = 0; i < 3; i++) {
                    // console.log('len'+ Highcharts.charts.length % 3)
                    j = Highcharts.charts.length % 3

                    chart = Highcharts.charts[j];
                    // Find coordinates within the chart
                    event = chart.pointer.normalize(e);
                    // Get the hovered point
                    point = chart.series[0].searchPoint(event, true);
                    // console.log('point', point.x)
                    renderPieChart(point.x);
                    renderBar(point.x);
                    renderTable(point.x);

                    if (point) {
                        point.highlight(e);
                        // renderPieChart(point.x)
                    }
                }
            }
        );
    });

    fetchJSONFile(JSONFileName, onSuccessCb);
    console.log('main works')
});