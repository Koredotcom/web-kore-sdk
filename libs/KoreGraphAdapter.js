var KoreGraphAdapter = (function($) {
    function drawD3Pie(msgData, dimens, selection, scaleLegend) {
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
        var dataset = [];
        var sum = 0;
        for (var i = 0; i < payload.elements.length; i++) {
            dataset[i] = {};
            dataset[i].label = payload.elements[i].title;
            dataset[i].count = payload.elements[i].value;
            dataset[i].dispVal =payload.elements[i].displayValue;
            if(payload.elements[i].hasOwnProperty('subTitle')) {
                dataset[i].subTitle = payload.elements[i].subTitle;
            }
            sum = sum + Number(dataset[i].count);
        }
        var percentAccumulation=0;    
        for (var i = 0; i < payload.elements.length; i++) {
            dataset[i].percentage = (Math.round(dataset[i].count/sum*100));
            
            if(i===payload.elements.length-1){
                dataset[i].percentage=100-percentAccumulation;
            }
            percentAccumulation=percentAccumulation+dataset[i].percentage;
         }   
        // chart dimensions
        var width = dimens.width ; //dimens.width
        var height = dimens.height ; //dimens.height

        // a circle chart needs a radius
        var radius = (Math.min(width, height) / 2) - 20;

        // legend dimensions
        var legendRectSize = dimens.legendRectSize; // defines the size of the colored squares in legend   dimens.legendRectSize
        var legendSpacing = dimens.legendSpacing; // defines spacing between squares                    dimens.legendSpacing

        // define color scale
       // var color = d3.scaleOrdinal(['#75b0fe','#f78083','#99ed9e','#fde296','#26344a','#5f6bf7','#b3bac8','#99a1fd','#9cebf9','#f7c7f4']);
        var color = d3.scaleOrdinal(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']); 
       
       // more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

        var svg = d3.select(selection) // select element in the DOM with id 'chart'
            .append('svg') // append an svg element to the element we've selected
            .attr('width', width - 15) // set the width of the svg element we just added
            .attr('height', height) // set the height of the svg element we just added
            .append('g') // append 'g' element to the svg element
            .attr('class', 'pieRegular')
            .attr('transform', 'translate(' + ((width / widthDivision) + 3) + ',' + (height / 2) + ')'); // our reference is now to the 'g' element. centerting the 'g' element to the svg element



        var arc = d3.arc()
            .innerRadius(0) // none for pie chart
            .outerRadius(radius); // size of overall chart

        var outerArc = d3.arc()
            .outerRadius(radius* 1.05)
            .innerRadius(radius * 0.9);

        var pie = d3.pie() // start and end angles of the segments
            .value(function(d) {
                return d.count;
            }) // how to extract the numerical data from each entry in our dataset
            .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

        var legendTooltip = d3.select(selection).append("div")
            .attr("class", "legend-tooltip-pie-chart no-show")
            .attr('transform', function(d){
                console.log(d);
            })
            .on("mouseleave", function(d) {
                legendTooltip.attr('class', 'legend-tooltip-pie-chart no-show');
                $('.more-legend').removeClass('no-visible');
            });
        
        $('.listTemplateContainer').on('click', function(){
            $('.legend-tooltip-pie-chart').removeClass('only-show').addClass('no-show');
        });

        var totalHeightLegends = (dataset.length-4)*(legendRectSize + legendSpacing + 20);

        var legendTooltipSvg = legendTooltip.append("svg")
            .attr("width", "150")
            .attr("height", totalHeightLegends + 23);


        // define tooltip
        var tooltip = d3.select(selection) // select element in the DOM with id 'chart'
            .append('div') // append a div element to the element we've selected                                    
            .attr('class', 'tooltip') // add class 'tooltip' on the divs we just selected
            .style("display", "none");

        tooltip.append('div') // add divs to the tooltip defined above                            
            .attr('class', 'label'); // add class 'label' on the selection                         

        tooltip.append('div') // add divs to the tooltip defined above                     
            .attr('class', 'count'); // add class 'count' on the selection                  

        tooltip.append('div') // add divs to the tooltip defined above  
            .attr('class', 'percent'); // add class 'percent' on the selection

        dataset.forEach(function(d) {
            d.count = +d.count; // calculate count as we iterate through the data
            d.enabled = true; // add enabled property to track which entries are checked
        });



        // creating the chart
        var path = svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
            .data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
            .enter() //creates placeholder nodes for each of the values
            .append('g')
            .attr('class', 'arcRegular')
            .append('path') // replace placeholders with path elements
            .attr('d', arc) // define d attribute with arc function above
            .attr('fill', function(d) {
                return color(d.data.label);
            }) // use color scale to define fill of each label in dataset
            .each(function(d) {
                this._current - d;
            }); // creates a smooth animation for each track


        //MOUSE HOVER ENABLE
        // mouse event handlers are attached to path so they need to come after its definition
        path.on('mouseover', function(d) {  // when mouse enters div      
            var total = d3.sum(dataset.map(function(d) { // calculate the total number of tickets in the dataset         
                return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
            }));                                                      
          //  var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
          //  tooltip.select('.label').html(d.data.label); // set current label           
            if($('#myPreviewModal').css('display') === 'block') {
                if(d.data.dispVal) {
                    tooltip.select('#myPreviewModal .count').html(d.data.dispVal); // set current count
                }
                else {
                    tooltip.select('#myPreviewModal .count').html(d.value); // set current count
                }

            }            
            else {
                if(d.data.dispVal) {
                    tooltip.select('.count').html(d.data.dispVal); // set current count       
                }
                else {
                    tooltip.select('.count').html(d.value); // set current count       
                }
            }
           // tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
            tooltip.style('display', 'block'); // set display                     
        });                                                           

        path.on('mouseout', function() { // when mouse leaves div                        
            tooltip.style('display', 'none'); // hide tooltip for that element
        });

        path.on('mousemove', function(d) { // when mouse moves                  
        tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
        .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
        });

       svg.append("g")
       .attr("class", "labels");
   svg.append("g")
       .attr("class", "lines");

   svg.append('g').classed('labels',true);
   svg.append('g').classed('lines',true);

   var polyline = svg.select('.lines')
    .selectAll('polyline')
    .data(pie(dataset))
    .enter().append('polyline')
    .attr('points', function(d) {
       // see label transform function for explanations of these three lines.
       var pos = outerArc.centroid(d);
       pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
       return [arc.centroid(d), outerArc.centroid(d), pos]
    });



   var label = svg.select('.labels').selectAll('text')
           .data(pie(dataset))
           .enter().append('text')
           .attr('dy', '.35em')
           .attr('class', 'chart-disp-val')
           .html(function(d) {
                return d.data.percentage+"%";
           })
           .attr('transform', function(d) {
               var pos = outerArc.centroid(d);
               pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
               return 'translate(' + pos + ')';
           })
           .style('text-anchor', function(d) {
               return (midAngle(d)) < Math.PI ? 'start' : 'end';
           });

       var tt_legend = d3.select(selection).append("div")   
       .attr("class", "tooltip-legend no-show");

        // define legend
        var legend = legendTooltipSvg.selectAll('.legend' + window.PieChartCount) // selecting elements with class 'legend'
            .data(color.domain().slice(4)) // refers to an array of labels from our dataset
            .enter() // creates placeholder
            .append('g') // replace placeholders with g elements
            .attr('class', 'legend' + window.PieChartCount) // each g is given a legend class
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing + 25; // height of element is the height of the colored square plus the spacing      
                var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                if(color.domain() < 4) {
                    offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                }
                else {
                    offset = height * 2;
                }
                var horz = scaleLegend * legendRectSize; // the legend is shifted to the left to make room for the text
                var vert = (i + 6) * height - offset-135; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                return 'translate(10,' + vert + ')'; //return translation   
            });

        // adding colored squares to legend
        legend.append('rect') // append rectangle squares to legend                                   
            .attr('width', '7') // width of rect size is defined above                        
            .attr('height', '7') // height of rect size is defined above                    
            .style('fill', color) // each fill is passed a color
            .style('stroke', color); // each stroke is passed a color

        // adding text to legend
        legend.append('text')
            .attr('x', legendRectSize + legendSpacing + 4)
            .attr('y', legendRectSize - legendSpacing)
            .attr('class', 'legend-title')
            .text(function(d) {
                if(d.length > 15) {
                    return d.slice(0,12) + '...';
                }
                else {
                    return d; 
                }
            })
            .on("mouseover", function(d) {  
                if(d.length > 15) {
                    tt_legend.attr('class','only-show tooltip-legend');      
                    tt_legend.html(d).style("left", (d3.event.pageX - 1090) + "px")     
                    .style("top", (d3.event.pageY - 164) + "px");
                }   
            })                  
            .on("mouseout", function(d) {       
                if(d.length > 15) {
                    tt_legend.attr('class', 'no-show tooltip-legend');
                }
            }); 


        legend.append('text')                 
            .attr('x', legendRectSize + legendSpacing + 4)
            .attr('y', legendRectSize - legendSpacing + 16)
            .attr('class', 'legend-value')
            .attr("font-weight", "bold")
            .text(function(d) {
              for (var i = 0; i < payload.elements.length; i++) {
                if(dataset[i].label == d) {
                    break
                }
              }  
              if(payload.elements[i].hasOwnProperty('subTitle'))    {
                    return payload.elements[i].subTitle;
              }
              return dataset[i].count;
            });

            var legend2 = svg.selectAll('.legend' + window.PieChartCount) // selecting elements with class 'legend'
            .data(color.domain().slice(0,4)) // refers to an array of labels from our dataset
            .enter() // creates placeholder
            .append('g') // replace placeholders with g elements
            .attr('class', 'legend' + window.PieChartCount) // each g is given a legend class
            .attr('transform', function(d, i) {
                // var height = legendRectSize + legendSpacing + 25; // height of element is the height of the colored square plus the spacing      
                // var offset = 0;
                // if(color.domain() < 5) {
                //     offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                // }
                // else {
                //     offset = height * 2;
                // }
                // var horz = scaleLegend * legendRectSize; // the legend is shifted to the left to make room for the text
                // var vert = (i + 4) * height - offset-135; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                // return 'translate(100,' + vert + ')'; //return translation 

                var vert = -60;
                for(var i = 0; i<dataset.length; i++) {
                    if(d == dataset[i].label) {
                        // return 'translate(105,'+ vert + ')';
                        var horizonta = Number(this.parentElement.getAttribute('transform').slice(10, this.parentElement.getAttribute('transform').indexOf(',')));
                        horizonta = horizonta + 15;
                        return 'translate('+horizonta+','+vert+')';
                    }
                    else if(dataset[i].hasOwnProperty('subTitle') && dataset[i].subTitle == ""){
                        vert = vert + 18;
                    }
                    else {
                        vert = vert + 33;
                    }
                }
            });
 
        // adding colored squares to legend
        legend2.append('rect') // append rectangle squares to legend                                   
            .attr('width', '7') // width of rect size is defined above                        
            .attr('height', '7') // height of rect size is defined above                    
            .style('fill', color) // each fill is passed a color
            .style('stroke', color); // each stroke is passed a color

        // adding text to legend
        legend2.append('text')
            .attr('x', legendRectSize + legendSpacing + 4)
            .attr('y', legendRectSize - legendSpacing)
            .attr('class', 'legend-title')
            .text(function(d) {
                if(d.length > 15) {
                    return d.slice(0,12) + '...';
                }
                else {
                    return d; 
                }
            })
            // .attr('fill', '#8a959f')
            .on("mouseover", function(d) {  
                if(d.length > 15) {
                    tt_legend.attr('class','only-show tooltip-legend');      
                    tt_legend.html(d).style("left", (d3.event.pageX - 1090) + "px")     
                    .style("top", (d3.event.pageY - 164) + "px");
                }   
            })                  
            .on("mouseout", function(d) {       
                if(d.length > 15) {
                    tt_legend.attr('class', 'no-show tooltip-legend');
                }
            }); 

        legend2.append('text')                 
            .attr('x', legendRectSize + legendSpacing + 4)
            .attr('y', legendRectSize - legendSpacing + 16)
            .attr('class', 'legend-value')
            .attr("font-weight", "bold")
            .text(function(d) {
                for (var i = 0; i < payload.elements.length; i++) {
                    if(dataset[i].label == d) {
                        break
                    }
                }  
                if(payload.elements[i].hasOwnProperty('subTitle')) {
                    return payload.elements[i].subTitle;
                }
                return dataset[i].count;
            });
        
            if(color.domain().length > 4)  {
                svg.data(color.domain())
                .append('g')
                .append('text')
                .text('More...')
                .attr('class', 'more-legend')
                // .attr('color', '#009dab')
                .attr("fill", "#009dab")
                .attr("font-weight", "bold")
                .attr("cursor", "pointer")
                .attr('transform', function(d){
                    var height = legendRectSize + legendSpacing + 25; // height of element is the height of the colored square plus the spacing      
                    var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                    offset = height * 2;
                    var vert = 7 * height - offset-115;
                    var horz;
                    try {
                        var sel = $(this).parent().siblings('.legend0')[0].getAttribute('transform');
                        horz = sel.slice(10, sel.lastIndexOf(','));
                    }
                    catch (e) {
                        horz = 110;
                    }

                    return 'translate('+horz +',' + vert + ')';
                })
                .on("mouseover", function(d) {
                    var parTop = $(this).closest('.listViewTmplContentChild').offset().top;
                    var parLeft = $(this).closest('.listViewTmplContentChild').offset().left;
                    var morTop = $(this).offset().top;
                    var morLeft = $(this).offset().left;      
                    var posTop = morTop - parTop - 87.5;
                    var posLef = morLeft - parLeft - 15;              
                    legendTooltip.attr('class', 'legend-tooltip-pie-chart only-show')
                                 .style('position', 'absolute').style('left', posLef).style('top', posTop);
                    $(this).addClass('no-visible');
                });
            }

            function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; } 

    }   

    function drawD3PieDonut (msgData, dimens, selection, scaleLegend, chart_type) {
        var width = dimens.width,
            height = dimens.height,
            radius = (Math.min(width, height) / 2) - 10;

        var data = [];
        var sum = 0;
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
        for(var i=0; i< payload.elements.length; i++) {
            data[i] = {};
            data[i].label = payload.elements[i].title;
            data[i].count = Number(payload.elements[i].value);
            data[i].dispVal = payload.elements[i].displayValue;
            if(payload.elements[i].hasOwnProperty('subTitle')) {
                data[i].subTitle = payload.elements[i].subTitle;
            }
            sum = sum + Number(payload.elements[i].value);

        }
        
        var percentAccumulation=0;    
        for (var i = 0; i < payload.elements.length; i++) {
            data[i].percentage = (Math.round(data[i].count/sum*100));
            
            if(i===payload.elements.length-1){
                data[i].percentage=100-percentAccumulation;
            }
            percentAccumulation=percentAccumulation+data[i].percentage;
        }    
        // legend dimensions
        var legendRectSize = dimens.legendRectSize; // defines the size of the colored squares in legend   dimens.legendRectSize
        var legendSpacing = dimens.legendSpacing; // defines spacing between squares                    dimens.legendSpacing

        // var color = d3.scaleOrdinal()
            // .range(['#75b0fe','#f78083','#99ed9e','#fde296','#26344a','#5f6bf7','#b3bac8','#99a1fd','#9cebf9','#f7c7f4']);

        var color = d3.scaleOrdinal(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']);

        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 50);
        
        var outerArc = d3.arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.9);

        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.count; });

        var legendTooltip = d3.select(selection).append("div")
            .attr("class", "legend-tooltip-pie-chart no-show")
            .on("mouseleave", function(d) {
                legendTooltip.attr('class', 'legend-tooltip-pie-chart no-show');
                $('.more-legend').removeClass('no-visible');
            });

        var totalHeightLegends = (data.length-4)*(legendRectSize + legendSpacing + 20);

        var legendTooltipSvg = legendTooltip.append("svg")
            .attr("width", "150")
            .attr("height", totalHeightLegends + 23);
        
        $('.listTemplateContainer').on('click', function(){
            $('.legend-tooltip-pie-chart').removeClass('only-show').addClass('no-show');
        });

        var svg = d3.select(selection).append("svg")
            .attr("width", width + 5)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ((width / widthDivision) + 13) + "," + height / 2 + ")");
        
            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.label); });

        // define tooltip
        var tooltip = d3.select(selection) // select element in the DOM with id 'chart'
            .append('div') // append a div element to the element we've selected                                    
            .attr('class', 'tooltipDonut') // add class 'tooltip' on the divs we just selected
            .style("display", "none");

        tooltip.append('div') // add divs to the tooltip defined above                            
            .attr('class', 'label'); // add class 'label' on the selection                         

        tooltip.append('div') // add divs to the tooltip defined above                     
            .attr('class', 'countDonut'); // add class 'count' on the selection                  

        tooltip.append('div') // add divs to the tooltip defined above  
            .attr('class', 'percent'); // add class 'percent' on the selection

        data.forEach(function(d) {
            d.count = +d.count; // calculate count as we iterate through the data
            d.enabled = true; // add enabled property to track which entries are checked
        });
        svg.append("g")
        .attr("class", "labels");
        svg.append("g")
        .attr("class", "lines");

        svg.append('g').classed('labels',true);
        svg.append('g').classed('lines',true);
        


   
        var polyline = svg.select('.lines')
                   .selectAll('polyline')
                   .data(pie(data))
                 .enter().append('polyline')
                   .attr('points', function(d) {
                       // see label transform function for explanations of these three lines.
                       var pos = outerArc.centroid(d);
                       pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                       return [arc.centroid(d), outerArc.centroid(d), pos]
                   });
           
           
       
          var label = svg.select('.labels').selectAll('text')
                   .data(pie(data))
                 .enter().append('text')
                   .attr('dy', '.35em')
                   .attr('class', 'chart-disp-val')
                   .html(function(d) {
                       return d.data.percentage+"%";
                   })
                   .attr('transform', function(d) {
                       var pos = outerArc.centroid(d);
                       pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                       return 'translate(' + pos + ')';
                   })
                   .style('text-anchor', function(d) {
                       return (midAngle(d)) < Math.PI ? 'start' : 'end';
                   });


   // mouse event handlers are attached to path so they need to come after its definition
        g.on('mouseover', function(d) {  // when mouse enters div      
            var total = d3.sum(data.map(function(d) { // calculate the total number of tickets in the dataset         
            return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
            }));                                                      
          //  var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
          //  tooltip.select('.label').html(d.data.label); // set current label           
            if($('#myPreviewModal').css('display') === 'block') {
                if(d.data.dispVal) {
                    tooltip.select('#myPreviewModal .countDonut').html(d.data.dispVal); // set current count
                }
                else {
                    tooltip.select('#myPreviewModal .countDonut').html(d.value); // set current count
                }
            }            
            else {
                if(d.data.dispVal) {
                    tooltip.select('.countDonut').html(d.data.dispVal); // set current count       
                }
                else {
                    tooltip.select('.countDonut').html(d.value); // set current count       
                }
            }
           // tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
            tooltip.style('display', 'block'); // set display                     
        });                                                           

        g.on('mouseout', function() { // when mouse leaves div                        
            tooltip.style('display', 'none'); // hide tooltip for that element
        });

/*        if($('#myPreviewModal').css('display') === 'block') {
            g.on('mousemove', function(d) { // when mouse moves                  
            tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
            .style('left', (d3.event.layerX + 900) + 'px'); // always 10px to the right of the mouse
            });
        }
    else {  */
            g.on('mousemove', function(d) { // when mouse moves                  
            tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
            .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
            });
    //    }

        if(chart_type === 'donut_legend' || chart_type === 'donut') {
            var tt_legend = d3.select(selection).append("div")   
            .attr("class", "tooltip-legend no-show")

            // define legend
            var legend = legendTooltipSvg.selectAll('.legend' + window.PieChartCount) // selecting elements with class 'legend'
                .data(color.domain().slice(4)) // refers to an array of labels from our dataset
                .enter() // creates placeholder
                .append('g') // replace placeholders with g elements
                .attr('class', 'legend' + window.PieChartCount) // each g is given a legend class
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing + 25; // height of element is the height of the colored square plus the spacing      
                    var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                    if(color.domain() < 5) {
                        offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                    }
                    else {
                        offset = height * 2;
                    }
                    var horz = scaleLegend * legendRectSize; // the legend is shifted to the left to make room for the text
                    var vert = (i + 6) * height - offset-135; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                    return 'translate(10,' + vert + ')'; //return translation          
                });

            // adding colored squares to legend
            legend.append('rect') // append rectangle squares to legend                                   
                .attr('width', '7') // width of rect size is defined above                        
                .attr('height', '7') // height of rect size is defined above                      
                .style('fill', color) // each fill is passed a color
                .style('stroke', color) // each stroke is passed a color


            // adding text to legend
            legend.append('text')
                .attr('x', legendRectSize + legendSpacing + 4)
                .attr('y', legendRectSize - legendSpacing)
                .attr('class', 'legend-title')
                .text(function(d) {
                    if(d.length > 15) {
                        return d.slice(0,12) + '...';
                    }
                    else {
                        return d; 
                    }
                })
                // .attr('fill', '#8a959f')
                .on("mouseover", function(d) {     
                    if(d.length > 11) {
                        tt_legend.attr('class','only-show tooltip-legend');      
                        tt_legend.html(d).style("left", (d3.event.pageX - 1090) + "px")     
                        .style("top", (d3.event.pageY - 164) + "px");
                    }
                })                  
                .on("mouseout", function(d) {       
                    if(d.length > 15) {
                        tt_legend.attr('class', 'no-show tooltip-legend');
                    }
                }); 

            legend.append('text')                 
                .attr('x', legendRectSize + legendSpacing + 4)
                .attr('y', legendRectSize - legendSpacing + 16)
                .attr('class', 'legend-value')
                .attr("font-weight", "bold")
                .text(function(d) {
                    for (var i = 0; i < payload.elements.length; i++) {
                        if(data[i].label == d) {
                            break
                        }
                    }      
                    if(payload.elements[i].hasOwnProperty('subTitle'))    {
                        return payload.elements[i].subTitle;
                    }
                    return payload.elements[i].value;
                });

            var legend2 = svg.selectAll('.legend' + window.PieChartCount) // selecting elements with class 'legend'
                .data(color.domain().slice(0,4)) // refers to an array of labels from our dataset
                .enter() // creates placeholder
                .append('g') // replace placeholders with g elements
                .attr('class', 'legend' + window.PieChartCount) // each g is given a legend class
                .attr('transform', function(d, i) {
                    var vert = -60;
                    for(var i = 0; i<data.length; i++) {
                        if(d == data[i].label) {
                            var horizonta = Number(this.parentElement.getAttribute('transform').slice(10, this.parentElement.getAttribute('transform').indexOf(',')));
                            horizonta = horizonta + 15;
                            return 'translate('+horizonta+','+vert+')';
                        }
                        else if(data[i].hasOwnProperty('subTitle') && data[i].subTitle == ""){
                            vert = vert + 18;
                        }
                        else {
                            vert = vert + 33;
                        }
                    }
                });
     
            // adding colored squares to legend
            legend2.append('rect') // append rectangle squares to legend                                   
                .attr('width', '7') // width of rect size is defined above                        
                .attr('height', '7') // height of rect size is defined above                    
                .style('fill', color) // each fill is passed a color
                .style('stroke', color); // each stroke is passed a color
    
            // adding text to legend
            legend2.append('text')
                .attr('x', legendRectSize + legendSpacing + 4)
                .attr('y', legendRectSize - legendSpacing)
                .attr('class', 'legend-title')
                .text(function(d) {
                    if(d.length > 15) {
                        return d.slice(0,12) + '...';
                    }
                    else {
                        return d; 
                    }
                })
                // .attr('fill', '#8a959f')
                .on("mouseover", function(d) {   
                    if(d.length > 15) {
                        tt_legend.attr('class','only-show tooltip-legend');      
                        tt_legend.html(d).style("left", (d3.event.pageX - 1090) + "px")     
                        .style("top", (d3.event.pageY - 164) + "px");
                    }  
                })                  
                .on("mouseout", function(d) {    
                    if(d.length > 15) {   
                        tt_legend.attr('class', 'no-show tooltip-legend');
                    }
                }); 
    
            legend2.append('text')                 
                .attr('x', legendRectSize + legendSpacing + 4)
                .attr('y', legendRectSize - legendSpacing + 16)
                .attr('class', 'legend-value')
                .attr("font-weight", "bold")
                .text(function(d) {
                    for (var i = 0; i < payload.elements.length; i++) {
                        if(data[i].label == d) {
                            break
                        }
                    }  
                    if(payload.elements[i].hasOwnProperty('subTitle')) {
                        return payload.elements[i].subTitle;
                    }
                    return data[i].count;
                });

                if(color.domain().length > 4)  {
                    svg.data(color.domain())
                    .append('g')
                    .append('text')
                    .text('More...')
                    .attr('class', 'more-legend')
                    // .attr('color', '#009dab')
                    .attr("fill", "#009dab")
                    .attr("font-weight", "bold")
                    .attr("cursor", "pointer")
                    .attr('transform', function(d){
                        var height = legendRectSize + legendSpacing + 25; // height of element is the height of the colored square plus the spacing      
                        var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                        offset = height * 2;
                        var vert = 7 * height - offset-115;
                        var horz;
                        try {
                            var sel = $(this).parent().siblings('.legend0')[0].getAttribute('transform');
                            horz = sel.slice(10, sel.lastIndexOf(','));
                        }
                        catch(e) {
                            horz = 110;
                        }

                        return 'translate('+horz +',' + vert + ')';
                    })
                    .on("mouseover", function(d) {
                        var parTop = $(this).closest('.listViewTmplContentChild').offset().top;
                        var parLeft = $(this).closest('.listViewTmplContentChild').offset().left;
                        var morTop = $(this).offset().top;
                        var morLeft = $(this).offset().left;      
                        var posTop = morTop - parTop - 87.5;
                        var posLef = morLeft - parLeft - 15;              
                        legendTooltip.attr('class', 'legend-tooltip-pie-chart only-show')
                                     .style('position', 'absolute').style('left', posLef).style('top', posTop);
                        $(this).addClass('no-visible');
                    });
                }
        }
        function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; } 
        function type(d) {
          d.count = +d.count;
          return d;
        }
    }

    function drawD3barVerticalStackedChart(msgData, dimens, selection, scaleLegend) {
        var svg = d3.select(selection).append('svg')
            .attr("width", dimens.outerWidth)
            .attr("height", dimens.outerHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = dimens.innerWidth,
            height = dimens.innerHeight,
            g = svg.append("g").attr("transform", "translate(" + 20 + "," + margin.top + ")");
            
            
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']);

    var data = [];
    var cols = [];
    cols.push('xAxis');
    for(var i=0; i<payload.elements.length; i++) {
        cols.push(payload.elements[i].title);
    }
    for(var i=0; i<payload.X_axis.length; i++) {
        data[i] = {};
        data[i].dispVal = [];
        data[i][cols[0]] = payload.X_axis[i];
    }

    for(var i=0; i< payload.elements.length; i++) {
        for(var j=0; j<payload.elements[i].values.length; j++) {
            data[j][cols[i+1]] = payload.elements[i].values[j];
            if(payload.elements[i].displayValues) {
                data[j].dispVal[i] = payload.elements[i].displayValues[j];
            }
        }
    }

      var keys = cols.slice(1);

        for(var i=0; i<data.length; i++) {
            var sum = 0;
            for(key in data[i]) {
                if(key !== 'xAxis' && key !== 'dispVal') {
                    sum = sum + data[i][key];
                }
            }
            data[i]['total'] = sum;
        }

      x.domain(data.map(function(d) { 
        return d.xAxis; 
     }));

      y.domain([0, d3.max(data, function(d) { 
        return d.total; 
    })]).nice();
      z.domain(keys);

    coordsVal = [];

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
          .attr("fill", function(d) { 
            return z(d.key); 
        })
        .selectAll("rect")
        .data(function(d, i) {
            coordsVal[i] = [];
            for(var j=0; j < d.length; j++) {
                coordsVal[i][j] = {
                    'x':    d[j][0],
                    'y':    d[j][1],
                    'val':  d[j].data.dispVal[i]
                };
            }
            return d; 
         })
        .enter().append("rect")
          .attr("x", function(d) { 
            return x(d.data.xAxis); 
        })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", 0.5*x.bandwidth())
        .attr("dispVal", function(d) {
            for(var j = 0; j<coordsVal.length; j++) {
                for(var k=0; k<coordsVal[j].length; k++) {
                    if(coordsVal[j][k].x === d[0] && coordsVal[j][k].y === d[1]) {
                        return coordsVal[j][k].val;
                    }
                }
            }
        }).attr('transform', 'translate('+0.25*x.bandwidth()+',0)')
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 5;
          var yPosition = d3.mouse(this)[1] - 5;
          if(this.attributes.dispVal) {
            var dispTrack = this.attributes.dispVal.value;
          }
          else {
            var dispTrack = d[1] - d[0];
          }
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(dispTrack);
        });

      g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

         g.selectAll('text')
         .attr("class", "chart-disp-val")
        .attr("transform", "rotate(-65) translate(-30, 0)");

      g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) - 10)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
         // .text("Population");
         g.selectAll('text')
         .attr("class", "chart-disp-val")
        g.selectAll(".axis .domain").classed("chart-axis-line", true);
        g.selectAll(".axis line").classed("chart-axis-line", true);

       // .attr("class", "domain chart-axis-line");

      var tt_legend = d3.select(selection).append("div")   
         .attr("class", "tooltip-legend no-show");
      var legend = g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(48," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", z);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .attr("class", "chart-disp-val")
          .text(function(d) { 
            if(d.length > 10) {
                return d.slice(0,7) + '...';
            }
            else {
                return d; 
            }
           }).on("mouseover", function(d) {     
            tt_legend.attr('class','only-show tooltip-legend');      
            tt_legend.html(d).style("left", (d3.event.pageX - 1042) + "px")     
            .style("top", (d3.event.pageY - 178) + "px");
        })                  
        .on("mouseout", function(d) {       
            tt_legend.attr('class', 'no-show tooltip-legend');
        }); 

        var tooltip = svg.append("g")
            .attr("class", "tooltipVSB")
            .style("display", "none");
              
          tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

          tooltip.append("text")
            .attr("x", 30)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");


    }
function horizontalGroupBarChart(config, dimens) {
    function setReSizeEvent(data) {
        var resizeTimer;
        var interval = 500;
        window.removeEventListener('resize', function () {
        });
        window.addEventListener('resize', function (event) {
            if (resizeTimer !== false) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function () {
                $(data.mainDiv).empty();
                drawHorizontalGroupBarChartChart(data, dimens);
                clearTimeout(resizeTimer);
            }, interval);
        });
    }

    drawHorizontalGroupBarChartChart(config, dimens);
    // setReSizeEvent(config);
}
function createhorizontalGroupBarChartLegend(mainDiv, columnsInfo, colorRange) {
    var z = d3.scaleOrdinal()
        .range(colorRange);
    var mainDivName = mainDiv.substr(1, mainDiv.length);
    mainDivName = mainDivName.replace(/ +/g, '').replace(/#/g, '');
    $(mainDiv).before("<div id='Legend_" + mainDivName + "' class='pmd-card-body' style='margin-top:0; margin-bottom:0;'></div>");
    var keys = Object.keys(columnsInfo);
    keys.forEach(function (d) {
        var cloloCode = z(d);
        $("#Legend_" + mainDivName).append("<span class='team-graph team1' style='display: inline-block; margin-right:10px;margin-left: 20px;'>\
        <span style='background:" + cloloCode + ";width: 10px;height: 10px;display: inline-block;vertical-align: middle;'>&nbsp;</span>\
        <span title="+columnsInfo[d].replace(/[ ]/g,"\u00a0") +" style='padding-top: 0;font-family:Source Sans Pro, sans-serif;font-size: 13px;display: inline;'>" + ((columnsInfo[d].length > 10)?(columnsInfo[d].slice(0, 7) + "..."):(columnsInfo[d])) + " </span>\
    </span>");
    });

}
    function drawHorizontalGroupBarChartChart(config, dimens) {
        var data = config.data;
        var columnsInfo = config.columnsInfo;
        var xAxis = config.xAxis;
        var yAxis = config.yAxis;
        var colorRange = config.colorRange;
        var mainDiv = config.mainDiv;
        var mainDivName = mainDiv.substr(1, mainDiv.length);
        var label = config.label;
        var requireLegend = config.requireLegend;
       // d3.select(mainDiv).append("svg").attr("width", $(mainDiv).width()).attr("height", $(mainDiv).height() * 0.80);
        d3.select(mainDiv).append("svg").attr("width", dimens.outerWidth).attr("height", dimens.outerHeight);
        var svg = d3.select(mainDiv + " svg"),
            margin = { top: 20, right: 20, bottom: 40, left: 70 },
            width = dimens.innerWidth,
            height = dimens.innerHeight;

        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (requireLegend != null && requireLegend != undefined && requireLegend != false) {
            $("#Legend_" + mainDivName).remove();
            createhorizontalGroupBarChartLegend(mainDiv, columnsInfo, colorRange);
        }


        var y0 = d3.scaleBand()
            .rangeRound([height, 0])
            .paddingInner(0.1);


        var y1 = d3.scaleBand()
            .padding(0.05);


        var x = d3.scaleLinear()
            .rangeRound([0, width]);


        var z = d3.scaleOrdinal()
            .range(colorRange);

        var keys = Object.keys(columnsInfo);
        y0.domain(data.map(function (d) {
            return d[yAxis];
        }));
        y1.domain(keys).rangeRound([0, y0.bandwidth()]);
        x.domain([0, d3.max(data, function (d) {
            return d3.max(keys, function (key) {
                return d[key];
            });
        })]).nice();
/*        var maxTicks = d3.max(data, function (d) {
            return d3.max(keys, function (key) {
                return d[key];
            });
        });*/

        maxTicks = 10;

        var element = g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) {
                return "translate(0," + y0(d[yAxis]) + ")";
            });
        var rect = element.selectAll("rect")
            .data(function (d, i) {
                return keys.map(function (key) {
                    return { key: key, value: d[key], index: key + "_" + i + "_" + d[yAxis], dispVal: d[key+'dispVal'] };
                });
            })
            .enter().append("rect")
            .attr("y", function (d) {
                return y1(d.key);
            })
            .attr("width", function (d) {
                return x(d.value);
            })
            .attr("data-index", function (d, i) {
                return d.index;
            })
            .attr('displayVal', function(d){
                return d.dispVal
            })
            .attr("height", y1.bandwidth())
            .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {

// D3 v4

        if($('#myPreviewModal').css('display') === 'block') {
           var x = d3.event.pageX - document.querySelector('.chartContainerDiv').getBoundingClientRect().x + 10;
           var y = d3.event.pageY - document.querySelector('.chartContainerDiv').getBoundingClientRect().y + 10;
        }
        else {
            // if(mainDiv.indexOf('.widgetContParent') == 0) {
            //     mainDiv = mainDiv.slice(17);
            // }
            // var x = d3.event.pageX - document.getElementById(mainDiv.slice(1)).getBoundingClientRect().x + 10;
            var x = d3.event.pageX - document.querySelector(mainDiv).getBoundingClientRect().x + 10;
            var y = d3.event.pageY - document.querySelector(mainDiv).getBoundingClientRect().y + 10;
            // var y = d3.event.pageY - document.getElementById(mainDiv.slice(1)).getBoundingClientRect().y + 10;
        }

        if(this.attributes.displayVal) {
            var ttLabel = this.attributes.displayVal.value;
        }
        else {
            var ttLabel = d.value;
        }
      var xPosition = d3.mouse(this)[0] - 5;
      var yPosition = d3.mouse(this)[1] - 5;
      tooltip.attr("transform", "translate(" + x + "," + y + ")");
      tooltip.select("text").text(ttLabel);
    }).attr("fill", function (d) {
                return z(d.key);
            });
        //CBT:add tooltips
        var self = {};
        self.svg = svg;
        self.cssPrefix = "horgroupBar0_";
        self.data = data;
        self.keys = keys;
        self.height = height;
        self.width = width;
        self.label = label;
        self.yAxis = yAxis;
        self.xAxis = xAxis;
        horBarTooltip.addTooltips(self);

        var tooltip = svg.append("g")
            .attr("class", "tooltipHBC")
            .style("display", "none");
              
          tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

          tooltip.append("text")
            .attr("x", 30)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
/*        rect.on("mouseover", function () {
            var currentEl = d3.select(this);
            var index = currentEl.attr("data-index");
            horBarTooltip.showTooltip(self, index);
        });

        rect.on("mouseout", function () {
            var currentEl = d3.select(this);
            var index = currentEl.attr("data-index");
            horBarTooltip.hideTooltip(self, index);
        });

        rect.on("mousemove", function () {
            horBarTooltip.moveTooltip(self);
        });
*/

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(maxTicks))
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.bottom * 0.7)
            .attr("dx", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
           // .text(label.xAxis);

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y0).ticks(null, "s"))
            .append("text")
            .attr("x", height * 0.4 * -1)
            .attr("y", margin.left * 0.8 * -1)//y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("font-weight", "bold")
            // .attr("text-anchor", "start")
         //   .text(label.yAxis);
         g.selectAll(".axis text").attr("class", "chart-disp-val");
         g.selectAll(".axis line").attr("class", "chart-axis-line");
         g.selectAll(".axis .domain").classed("chart-axis-line", true);


    }
    var helpers = {
        getDimensions: function (id) {
            var el = document.getElementById(id);
            var w = 0, h = 0;
            if (el) {
                var dimensions = el.getBBox();
                w = dimensions.width;
                h = dimensions.height;
            } else {
                console.log("error: getDimensions() " + id + " not found.");
            }
            return { w: w, h: h };
        }
    }
    var horBarTooltip = {
        addTooltips: function (pie) {
            var keys = pie.keys;
            // group the label groups (label, percentage, value) into a single element for simpler positioning
            var element = pie.svg.append("g")
                .selectAll("g")
                .data(pie.data)
                .enter().append("g")
                .attr("class", function (d, i) {
                    return pie.cssPrefix + "tooltips" + "_" + i
                });

            tooltips = element.selectAll("g")
                .data(function (d, i) {
                    return keys.map(function (key) {
                        return { key: key, value: d[key], index: key + "_" + i + "_" + d[pie.yAxis] };
                    });
                })
                .enter()
                .append("g")
                .attr("class", pie.cssPrefix + "tooltip")
                .attr("id", function (d, i) {
                    return pie.cssPrefix + "tooltip" + d.index;
                })
                .style("opacity", 0)
                .append("rect")
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("x", -2)
                .attr("opacity", 0.71)
                .style("fill", "#000000");

            element.selectAll("g")
                .data(function (d, i) {
                    return keys.map(function (key) {
                        return { key: key, value: d[key], index: key + "_" + i + "_" + d[pie.yAxis] };
                    });
                })
                .append("text")
                .attr("fill", function (d) {
                    return "#efefef"
                })
                .style("font-size", function (d) {
                    return 10;
                })
                .style("font-family", function (d) {
                    return "arial";
                })
                .text(function (d, i) {
                    var caption = "" + pie.label.xAxis + ":{value}";

                    return horBarTooltip.replacePlaceholders(pie, caption, i, {
                        value: d.value,
                    });
                });

            element.selectAll("g rect")
                .attr("width", function (d, i) {
                    var dims = helpers.getDimensions(pie.cssPrefix + "tooltip" + d.index);
                    return dims.w + (2 * 4);
                })
                .attr("height", function (d, i) {
                    var dims = helpers.getDimensions(pie.cssPrefix + "tooltip" + d.index);
                    return dims.h + (2 * 4);
                })
                .attr("y", function (d, i) {
                    var dims = helpers.getDimensions(pie.cssPrefix + "tooltip" + d.index);
                    return -(dims.h / 2) + 1;
                });
        },

        showTooltip: function (pie, index) {
            var fadeInSpeed = 250;
            if (horBarTooltip.currentTooltip === index) {
                fadeInSpeed = 1;
            }

            horBarTooltip.currentTooltip = index;
            d3.select("#" + pie.cssPrefix + "tooltip" + index)
                .transition()
                .duration(fadeInSpeed)
                .style("opacity", function () {
                    return 1;
                });

            horBarTooltip.moveTooltip(pie);
        },

        moveTooltip: function (pie) {
            d3.selectAll("#" + pie.cssPrefix + "tooltip" + horBarTooltip.currentTooltip)
                .attr("transform", function (d) {
                    var mouseCoords = d3.mouse(this.parentNode);
                    var x = mouseCoords[0] + 4 + 2;
                    var y = mouseCoords[1] - (2 * 4) - 2;
                    return "translate(" + x + "," + y + ")";
                });
        },

        hideTooltip: function (pie, index) {
            d3.select("#" + pie.cssPrefix + "tooltip" + index)
                .style("opacity", function () {
                    return 0;
                });

            // move the tooltip offscreen. This ensures that when the user next mouseovers the segment the hidden
            // element won't interfere
            d3.select("#" + pie.cssPrefix + "tooltip" + horBarTooltip.currentTooltip)
                .attr("transform", function (d, i) {
                    // klutzy, but it accounts for tooltip padding which could push it onscreen
                    var x = pie.width + 1000;
                    var y = pie.height + 1000;
                    return "translate(" + x + "," + y + ")";
                });
        },

        replacePlaceholders: function (pie, str, index, replacements) {
            var replacer = function () {
                return function (match) {
                    var placeholder = arguments[1];
                    if (replacements.hasOwnProperty(placeholder)) {
                        return replacements[arguments[1]];
                    } else {
                        return arguments[0];
                    }
                };
            };
            return str.replace(/\{(\w+)\}/g, replacer(replacements));
        }
    };
    function drawD3barHorizontalbarChart (msgData, dimens, selection, scaleLegend) {
       window.addEventListener('resize', function (event) {
            $("#chart").width(window.innerWidth * 0.9);
            $("#chart").height(window.innerHeight);
        }); 
        var groupChartData = [];
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
         for(var i=0; i < payload.X_axis.length; i++) {
            groupChartData[i] = {};
            groupChartData[i].date = payload.X_axis[i];
            for(var j=0; j<payload.elements.length; j++) {
                groupChartData[i][payload.elements[j].title] = payload.elements[j].values[i]; 
                if(payload.elements[j].displayValues) {
                    groupChartData[i][payload.elements[j].title + 'dispVal'] = payload.elements[j].displayValues[i]; 
                }
            }
         }       
         var columnsInfo = {};
        for(var j=0; j<payload.elements.length; j++) {
            columnsInfo[payload.elements[j].title] = payload.elements[j].title; 
        }
        //var groupChartData = [{ "2614": 8, "4449": 15, "over": 1 }, { "2614": 7, "4449": 2, "over": 2 }, { "2614": 4, "4449": 5, "over": 3 }, { "2614": 19, "4449": 8, "over": 4 }, { "2614": 3, "4449": 7, "over": 5 }, { "2614": 6, "4449": 1, "over": 6 }, { "2614": 7, "4449": 6, "over": 7 }, { "2614": 13, "4449": 2, "over": 8 }, { "2614": 1, "4449": 8, "over": 9 }, { "2614": 8, "4449": 9, "over": 10 }];
        //var columnsInfo = { "2614": "Team A", "4449": "Team B" };
        $(selection).empty();
        var barChartConfig = {
            mainDiv: selection,
            colorRange: ['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7'],
            data: groupChartData,
            columnsInfo: columnsInfo,
            xAxis: "value",
            yAxis: "date",
            label: {
                xAxis: "Value",
                yAxis: "Dates"
            },
            requireLegend: true
        };
        var groupChart = new horizontalGroupBarChart(barChartConfig, dimens);
    }



    function drawD3barChart(msgData, dimens, selection, scaleLegend) {
        var svg = d3.select(selection).append('svg')
            .attr("width", dimens.outerWidth)
            .attr("height", dimens.outerHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 35},
            width = dimens.innerWidth,
            height = dimens.innerHeight,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var payload=msgData;
        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height,0]);

        var z = d3.scaleOrdinal()
            .range(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']);

        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
        var data = [];
        var cols = [];
        cols.push('xAxis');
        for(var i=0; i<payload.elements.length; i++) {
            cols.push(payload.elements[i].title);
        }
        for(var i=0; i<payload.X_axis.length; i++) {
            data[i] = {};
            data[i][cols[0]] = payload.X_axis[i];
        }

        for(var i=0; i< payload.elements.length; i++) {
            for(var j=0; j<payload.elements[i].values.length; j++) {
                data[j][cols[i+1]] = payload.elements[i].values[j];
                if(payload.elements[i].displayValues) {
                    data[j][cols[i+1]+'dispVal'] = payload.elements[i].displayValues[j];
                }
            }
        }
          var keys = cols.slice(1);

          x0.domain(data.map(function(d) { 
            return d.xAxis; 
          }));
          x1.domain(keys).rangeRound([0, x0.bandwidth()]);
          y.domain([0, d3.max(data, function(d) { 
            return d3.max(keys, function(key) { 
                return d[key]; 
            }); 
          })]).nice();

          g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
              .attr("transform", function(d) { 
                return "translate(" + x0(d.xAxis) + ",0)"; 
            })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { 
                return {key: key, value: d[key], dispVal: d[key+'dispVal']}; 
            }); })

            .enter().append("rect")
                .on("mouseover", function() { tooltip.style("display", null); })
                .on("mouseout", function() { tooltip.style("display", "none"); })
                .on("mousemove", function(d) {
                  var xPosition = 1.25 * this.parentNode.transform.baseVal[0].matrix.e; //d3.mouse(this)[0]-5;
                  var yPosition = d3.mouse(this)[1]-5;
                  if(d.dispVal) {
                    var ttVal = d.dispVal;
                  }
                  else {
                    var ttVal = d.value;
                  }
                  tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                  tooltip.select("text").text(ttVal);
                })  

              .attr("x", function(d) { 
                return x1(d.key); 
            })
              .attr("y", function(d) { 
                return y(d.value); 
            })

              .attr("width", x1.bandwidth())

              .attr("height", function(d) { 
                return height - y(d.value); 
               })
              .attr("fill", function(d) { 
                return z(d.key); 
               })


         // height = height + 30;
          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height  + ")")
              .call(d3.axisBottom(x0));
        
         g.selectAll('text')
        .attr("transform", "rotate(-65) translate(-30, 0)");

          g.append("g")
              .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, "s"))
              .append("text")
              .attr("x", 2)
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.12em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start");
              g.selectAll(".axis text").attr("class", "chart-disp-val");
              g.selectAll(".axis line").attr("class", "chart-axis-line");
              g.selectAll(".axis .domain").classed("chart-axis-line", true);
     

          var tt_legend = d3.select(selection).append("div")   
                .attr("class", "tooltip-legend no-show")

          var legend = g.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 8)
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(60," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend.append("text")
              .attr("class", "chart-disp-val")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .text(function(d) { 
                if(d.length > 10) {
                    return d.slice(0,7) + '...';
                }
                else {
                    return d; 
                }
               }).on("mouseover", function(d) {     
                    tt_legend.attr('class','only-show tooltip-legend');      
                    tt_legend.html(d).style("left", (d3.event.pageX - 1042) + "px")     
                    .style("top", (d3.event.pageY - 178) + "px");
                    })                  
                .on("mouseout", function(d) {       
                    tt_legend.attr('class', 'no-show tooltip-legend');
                });

        var tooltip = svg.append("g")
            .attr("class", "tooltipBC")
            .style("display", "none");
              
          tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

          tooltip.append("text")
            .attr("x", 30)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

    }

    function drawD3barStackedChart (msgData, dimens, selection, scaleLegend) {
        var svg = d3.select(selection).append('svg')
            .attr("width", dimens.outerWidth)
            .attr("height", dimens.outerHeight),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = dimens.innerWidth,
            height = dimens.innerHeight,
            g = svg.append("g").attr("transform", "translate(" + 70 + "," + margin.top + ")");
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
        var y = d3.scaleBand()          // x = d3.scaleBand()   
            .rangeRound([0, height])    // .rangeRound([0, width])
            .paddingInner(0.05)
            .align(0.1);

        var x = d3.scaleLinear()        // y = d3.scaleLinear()
            .rangeRound([0, width]);    // .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']);

        var data = [];
        var cols = [];
        cols.push('xAxis');
        for(var i=0; i<payload.elements.length; i++) {
            cols.push(payload.elements[i].title);
        }
        for(var i=0; i<payload.X_axis.length; i++) {
            data[i] = {};
            data[i].dispVal = [];
            data[i][cols[0]] = payload.X_axis[i];
        }

        for(var i=0; i< payload.elements.length; i++) {
            for(var j=0; j<payload.elements[i].values.length; j++) {
                data[j][cols[i+1]] = payload.elements[i].values[j];
                if(payload.elements[i].displayValues) {
                    data[j].dispVal[i] = payload.elements[i].displayValues[j]; 
                }
            }
        }
            
        var keys = cols.slice(1);

        for(var i=0; i<data.length; i++) {
            var sum = 0;
            for(key in data[i]) {
                if(key !== 'xAxis' && key !== 'dispVal') {
                    sum = sum + data[i][key];
                }
            }
            data[i]['total'] = sum;
        }

/*        data.sort(function(a, b) { 
            return b.total - a.total; 
        });*/
          y.domain(data.map(function(d) { 
            return d.xAxis; 
          }));                  // x.domain...
          x.domain([0, d3.max(data, function(d) { 
            return d.total; 
          })]).nice();  // y.domain...
          z.domain(keys);

          var coordsVal = [];

          g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
              .attr("fill", function(d) { 
                return z(d.key); 
            })
            .selectAll("rect")
            .data(function(d,i) {
                coordsVal[i] = [];
                for(var j=0; j < d.length; j++) {
                    coordsVal[i][j] = {
                        'x':    d[j][0],
                        'y':    d[j][1],
                        'val':  d[j].data.dispVal[i]
                    };
                }
             return d; 
         })
            .enter().append("rect")
              .attr("y", function(d) { 
              return y(d.data.xAxis); 
              })       //.attr("x", function(d) { return x(d.data.State); })
              .attr("x", function(d) { 
              return x(d[0]); 
              })               //.attr("y", function(d) { return y(d[1]); })   
              .attr("width", function(d) { 
              return x(d[1]) - x(d[0]); 
              }) //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
              .attr("height", 0.5*y.bandwidth())                           //.attr("width", x.bandwidth());
              .attr('transform', 'translate(0,'+ 0.25*y.bandwidth() +')')
              .attr("dispVal", function(d) {
                for(var j = 0; j<coordsVal.length; j++) {
                    for(var k=0; k<coordsVal[j].length; k++) {
                        if(coordsVal[j][k].x === d[0] && coordsVal[j][k].y === d[1]) {
                            return coordsVal[j][k].val;
                        }
                    }
                }
              })
              .on("mouseover", function() { tooltip.style("display", null); })
                .on("mouseout", function() { tooltip.style("display", "none"); })
                .on("mousemove", function(d) {
                  var xPosition = d3.mouse(this)[0] - 5;
                  var yPosition = d3.mouse(this)[1] - 5;
                  if(this.attributes.dispVal) {
                    var dispTrack =  this.attributes.dispVal.value;
                  }
                  else {
                    var dispTrack = d[1] - d[0];
                  }
                  tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                  tooltip.select("text").text(dispTrack);
                });    


          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0,"+height+")")             // New line
              .call(d3.axisBottom(x).ticks(null, "s"))                  //  .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
              .attr("y", 40)                                             //     .attr("y", 2)
              .attr("x", x(x.ticks().pop()) + 0.5)                      //     .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")                                     //     .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")
            //  .text("Population")
              .attr("transform", "translate("+ (-width) +",-10)");      // Newline

               g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0,0)")                      //  .attr("transform", "translate(0," + height + ")")
              .call(d3.axisLeft(y));                                    //   .call(d3.axisBottom(x));
              g.selectAll(".axis text").attr("class", "chart-disp-val");
              g.selectAll(".axis line").attr("class", "chart-axis-line");
              g.selectAll(".axis .domain").classed("chart-axis-line", true);
 
          var tt_legend = d3.select(selection).append("div")   
              .attr("class", "tooltip-legend no-show")

          var legend = g.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
             .attr("transform", function(d, i) { return "translate(80," + (150 + i * 20) + ")"; });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .attr("class", "chart-disp-val")
              .text(function(d) { 
                if(d.length > 10) {
                    return d.slice(0,7) + '...';
                }
                else {
                    return d; 
                }
               }).on("mouseover", function(d) {     
                    tt_legend.attr('class','only-show tooltip-legend');      
                    tt_legend.html(d).style("left", (d3.event.pageX - 1042) + "px")     
                    .style("top", (d3.event.pageY - 178) + "px");
                })                  
                .on("mouseout", function(d) {       
                    tt_legend.attr('class', 'no-show tooltip-legend');
                }); 

        var tooltip = svg.append("g")
            .attr("class", "tooltipHStacked")
            .style("display", "none");
              
          tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

          tooltip.append("text")
            .attr("x", 30)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");


    }

    function drawD3lineChartV2(msgData, dimens, selection, scaleLegend) {
        var margin = {top: 35, right: 120, bottom: 30, left: 30};
        var width = dimens.innerWidth;
        var height = dimens.innerHeight;
        var colorRange = ['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7'];
        var z = d3.scaleOrdinal()
            .range(['#5bc8c4','#4a9af2','#8ecb60','#e7cc61','#eeaf4b','#ef7e63','#8e8eb7','#6483c3','#2249ab','#f352b7']); 
        var payload=msgData;//msgData.message[0].component.payload
        var widthDivision=3;
        legendCenterOffset=0;
        if(msgData.message){
            payload=msgData.message[0].component.payload;
        }else{
            fromWidgets=true;
            widthDivision=4;
            legendCenterOffset=-15;
        }
        var xAxisDisp = payload.X_axis;
        var valsTerm = payload.elements;
        // Define the scales and tell D3 how to draw the line   

        var x = d3.scaleLinear().domain([0,xAxisDisp.length-1]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
        var line = d3.line().x(function(d) {
            return x(d.ind);
        }).y(function(d) {
            return y(d.value);
        });

        var svg = d3.select(selection).append('svg')
        .attr("width", dimens.outerWidth)
        .attr("height", dimens.outerHeight);

        var chart = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Add the axes and a title

        var xAxis = d3.axisBottom(x).tickFormat(function(d){return xAxisDisp[d]});
        var yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
        chart.append('g').attr("class", "axis").call(yAxis); 
        chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis).attr('class', 'axis xAxisR');
        chart.selectAll('.xAxisR text')
        .attr("transform", "rotate(-65) translate(-30, 0)");
          
        // Load the data and draw a chart
        var states, tipBox;
        var cols = [];
        var dataset = [];
        var dataMap = [];
        var objDisp = {};
        cols.push('xAxis');
        for(var i=0; i<payload.elements.length; i++) {
            cols.push(payload.elements[i].title);
        }
        for(var i=0; i<payload.elements.length; i++) {
            dataset[i] = {};
            dataset[i].valueSet = [];
            dataset[i].name = payload.elements[i].title;
            dataset[i].currentVal = payload.elements[i].values[payload.elements[i].values.length - 1];
            for(var j=0; j < payload.elements[i].values.length; j++) {
                dataMap[j] = dataMap[j] || {};
                dataMap[j].x_Axis = payload.X_axis[j];
                dataMap[j][cols[i+1]] = payload.elements[i].values[j];
                dataset[i].valueSet[j] = {};
                dataset[i].valueSet[j].value = payload.elements[i].values[j];
                if(payload.elements[i].displayValues) {
                    dataset[i].valueSet[j].dispVal = payload.elements[i].displayValues[j];
                    objDisp[payload.elements[i].title] = payload.elements[i].displayValues[j].replace(/[0-9]/g, '');
                }
                dataset[i].valueSet[j].x_Axis = payload.X_axis[j];
                dataset[i].valueSet[j].ind = j;
            }
        }

        var keys = cols.slice(1);
          var cities = cols.slice(1).map(function(id) {
            return {
              id: id,
              values: dataMap.map(function(d) {
                return {
                    xAxis: d.xAxis, temperature: d[id]
                };
              })
            };
          });

          states = dataset;

          chart.selectAll()
            .data(states).enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', function(d){
                return z(d.name);
            })
            .attr('stroke-width', 2)
            .datum(function(d){
                return d.valueSet;
            })
            .attr('d', line)
            .attr('class', 'lineC');
          
          chart.selectAll()
            .data(states).enter()
            .append('text')
            .html(function(d){
                //return d.name;
            })
            .attr('fill', function(d) {
                return d.color;
            })
            .attr('alignment-baseline', 'middle')
            .attr('x', width)
            .attr('dx', '.5em')
            .attr('y', function(d){
                return y(d.currentVal);
            });

            var mouseG = svg.append("g")
                .attr("class", "mouse-over-effects");

/*            mouseG.append("path") // this is the black vertical line to follow mouse
                .attr("class", "mouse-line"+selection.slice(10))
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .style("opacity", "0")
                .attr('transform', 'translate(30,35)');*/

            var lines = document.getElementsByClassName('lineC');

            var mousePerLine = mouseG.selectAll('.mouse-per-line')
                .data(cities)
                .enter()
                .append("g")
                .attr("class", "mouse-per-line");

                mousePerLine.append("circle")
                  .attr("r", 7)
                  .style("stroke", function(d,i) {
                    return colorRange[i];
                  })
                  .style("fill", "none")
                  .style("stroke-width", "3px")
                  .style("opacity", "0").attr("transform", "translate(30,35)");

            mousePerLine.append("text")
                .attr("transform", function(d, i){
                    if(i==0) {
                        return 'translate(40,40)';
                    }
                    else if(i==1) {
                        return 'translate(20,10)';
                    }
                    else {
                        return 'translate(0,40)';
                    }
                });

                    //"translate(0,20)");

            mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
                .attr('width', dimens.innerWidth+5) // can't catch mouse events on a g element
                .attr('height', dimens.innerHeight)
                .attr('transform', 'translate(30,35)')
                .attr('fill', 'none')
                .attr('pointer-events', 'all')
                .on('mouseout', function() { // on mouse out hide line, circles and text
                   // d3.select(".mouse-line"+selection.slice(10))
                   //      .style("opacity", "0");
                    d3.selectAll(".mouse-per-line circle")
                        .style("opacity", "0");
                    d3.selectAll(".mouse-per-line text")
                        .style("opacity", "0"); //.style('font-weight', 'bold');
                })
                .on('mouseover', function() { // on mouse in show line, circles and text

                    if ($('#myPreviewModal').css('display') === 'block') {
                        $('.lineChartChildDiv .mouse-per-line').hide();
                    } else {
                        $('.lineChartChildDiv .mouse-per-line').show();
                    }

/*                    d3.select(".mouse-line"+selection.slice(10))
                        .style("opacity", "1");*/
                    d3.selectAll(".mouse-per-line circle")
                        .style("opacity", "0.5");
                    d3.selectAll(".mouse-per-line text")
                        .style("opacity", "1");
                })
                .on('mousemove', function() { // mouse moving over canvas
                    var mouse = d3.mouse(this);
/*                    d3.select(".mouse-line"+selection.slice(10))
                        .attr("d", function() {
                            var d = "M" + mouse[0] + "," + height;
                            d += " " + mouse[0] + "," + 0;
                            return d;
                        });*/

                    d3.selectAll(".mouse-per-line")
                        .attr("transform", function(d, i) {
                            var xDate = x.invert(mouse[0]),
                                bisect = d3.bisector(function(d) {
                                    return d.date;
                                }).right;
                            idx = bisect(d.values, xDate);

                            var beginning = 0,
                                end = lines[i].getTotalLength() + 2,
                                target = null;

                            while (true) {
                                target = Math.floor((beginning + end) / 2);
                                pos = lines[i].getPointAtLength(target);
                                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                                    break;
                                }
                                if (pos.x > mouse[0]) end = target;
                                else if (pos.x < mouse[0]) beginning = target;
                                else break; //position found
                            }
                            xtempLC = x;
                            d3.select(this).select('text')
                                .text(function(d, i) {
                                    var tempList = [];
                                    for(var j=0; j < valsTerm.length; j++) {
                                        if(valsTerm[j].title === d.id) {
                                            for(var k=0; k< d.values.length; k++) {
                                                tempList[k] = d.values[k].temperature;
                                            }
                                        }
                                    }
                                    if(objDisp[this.__data__.id] !== undefined) {
                                        var tCompare = y.invert(pos.y).toFixed(2); //+ objDisp[this.__data__.id];
                                        if(tempList.indexOf(Math.round(tCompare)) !== -1 && tempList.indexOf(Math.round(tCompare)) === Math.round(xtempLC.invert(pos.x))) {
                                            return y.invert(pos.y).toFixed(2) + "\n" + xAxisDisp[Math.round(xtempLC.invert(pos.x))];
                                        }
                                        return y.invert(pos.y).toFixed(2) + objDisp[this.__data__.id];
                                    }
                                    else {
                                        var tCompare = y.invert(pos.y).toFixed(2); //+ objDisp[this.__data__.id];
                                        if(tempList.indexOf(Math.round(tCompare)) !== -1 && tempList.indexOf(Math.round(tCompare)) === Math.round(xtempLC.invert(pos.x))) {
                                            return y.invert(pos.y).toFixed(2) + "\n" +  xAxisDisp[Math.round(xtempLC.invert(pos.x))];
                                        }
                                        return y.invert(pos.y).toFixed(2);
                                    }
                                });
                            return "translate(" + mouse[0] + "," + pos.y + ")";
                        });
                });



            function type(d, _, columns) {
                d.date = parseTime(d.date);
                for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
                return d;
            }
            chart.selectAll(".axis text").attr("class", "chart-disp-val");
            chart.selectAll(".axis line").attr("class", "chart-axis-line");
            chart.selectAll(".axis .domain").classed("chart-axis-line", true);
   
        var tt_legend = d3.select(selection).append("div")   
            .attr("class", "tooltip-legend no-show");

          var legend = svg.append("g")
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
             .attr("transform", function(d, i) { 
                if(dimens.innerWidth === 230) {
                    return "translate(100," + (250 + i * 20) + ")"; 
                } else {
                    return "translate(100," + (230 + i * 20) + ")"; 
                }
            });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .attr("class", "chart-disp-val")
              .text(function(d) { 
                if(d.length > 10) {
                    return d.slice(0,7) + '...';
                }
                else {
                    return d; 
                }
            }).on("mouseover", function(d) {     
                tt_legend.attr('class','only-show tooltip-legend');      
                tt_legend.html(d).style("left", (d3.event.pageX - 1042) + "px")     
                .style("top", (d3.event.pageY - 178) + "px");
            })                  
            .on("mouseout", function(d) {       
                tt_legend.attr('class', 'no-show tooltip-legend');
            }); 

        }

    return {
        drawD3Pie: drawD3Pie,
        drawD3PieDonut: drawD3PieDonut,
        drawD3barChart: drawD3barChart,
        drawD3barStackedChart: drawD3barStackedChart,
        drawD3barVerticalStackedChart: drawD3barVerticalStackedChart,
        drawD3barHorizontalbarChart: drawD3barHorizontalbarChart,
        drawD3lineChartV2:drawD3lineChartV2
    }
})($);