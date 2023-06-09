function createBubbleChart(error, countries, continentNames) {
  var populations = countries.map(function(country) { return +country.Population; });
  var meanPopulation = d3.mean(populations),
      populationExtent = d3.extent(populations),
      populationScaleX,
      populationScaleY;

  var continents = d3.set(countries.map(function(country) { return country.ContinentCode; }));
  var continentColorScale = d3.scaleOrdinal(d3.schemeCategory20b)
      .domain(continents.values());

  var universe = d3.set(countries.map(function(country) { return country.Universe; }));
  var universeColorScale = d3.scaleOrdinal(['#0476F2', '#e23636'])
      .domain(continents.values());

  var superheroes = d3.set(countries.map(function(country) { return country.Superhero; }));
  var superheroesColorScale = d3.scaleOrdinal(['#000000','#a71814', '#e5e43d','#8b2323','#f6576d','#00991f',
    '#003768','#65A49A','#8E9599','#ab5dee','#988829','#f67861','#ffa500','#f11712','#1d90f3'])
      .domain(superheroes.values());

    var width = 1200,
      height = 1000;
  var svg,
      circles,
      circleSize = { min: 5, max: 70 };
  var circleRadiusScale = d3.scaleSqrt()
      .domain(populationExtent)
      .range([circleSize.min, circleSize.max]);

  var forces,
      forceSimulation;

  createSVG();
  //toggleContinentKey();
  createCircles();
  createForces();
  createForceSimulation();
  //addFlagDefinitions();
  addFillListener();
  addGroupingListeners();

  function createSVG() {
    svg = d3.select("svg.t")
        //.append("svg")
        .attr("width", width)
        .attr("height", height);
  }

//
    svg
        .append("rect")
        .attr("x", 50)
        .attr("y", 900)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#000000');

    svg .append("text")
      .attr("x", 83)
      .attr("y", 912)
      .text("Black Panther")
      .style("font-size", "22px")
      .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 50)
        .attr("y", 933)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#a71814');
  svg .append("text")
      .attr("x", 83)
      .attr("y", 945)
      .text("Spider Man")
      .style("font-size", "22px")
      .attr("alignment-baseline", "middle")
      .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 50)
        .attr("y", 966)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#e5e43d');

    svg .append("text")
        .attr("x", 83)
        .attr("y", 978)
        .text("Captain Marvel")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 275)
        .attr("y", 900)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#8b2323');

    svg .append("text")
        .attr("x", 300)
        .attr("y", 912)
        .text("Deadpool")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 275)
        .attr("y", 933)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#f6576d');

    svg .append("text")
        .attr("x", 300)
        .attr("y", 946)
        .text("Wonder Woman")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 275)
        .attr("y", 966)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#00991f');
    svg .append("text")
        .attr("x", 300)
        .attr("y", 979)
        .text("Avengers")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 500)
        .attr("y", 900)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#003768');
    svg .append("text")
        .attr("x", 525)
        .attr("y", 913)
        .text("Justice League")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');

    svg
        .append("rect")
        .attr("x", 500)
        .attr("y", 933)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#65A49A');
    svg .append("text")
        .attr("x", 525)
        .attr("y", 946)
        .text("Aquaman")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 500)
        .attr("y", 966)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#8E9599');
    svg .append("text")
        .attr("x", 525)
        .attr("y", 979)
        .text("Venom")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 725)
        .attr("y", 900)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#ab5dee');
    svg .append("text")
        .attr("x", 750)
        .attr("y", 913)
        .text("Joker")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 725)
        .attr("y", 933)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#988829');
    svg .append("text")
        .attr("x", 750)
        .attr("y", 946)
        .text("Batman")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 725)
        .attr("y", 966)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#f67861');
    svg .append("text")
        .attr("x", 725)
        .attr("y", 979)
        .text("Guardians of the Galaxy")
        .style("font-size", "20px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 950)
        .attr("y", 900)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#ffa500');
    svg .append("text")
        .attr("x", 975)
        .attr("y", 913)
        .text("Suicide Squad")
        .style("font-size", "22px")
        .attr("alignment-baseline", "middle")
        .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 950)
        .attr("y", 933)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#f11712');
  svg .append("text")
      .attr("x", 975)
      .attr("y", 946)
      .text("Superman")
      .style("font-size", "22px")
      .attr("alignment-baseline", "middle")
      .attr('fill', 'WHITE');
    svg
        .append("rect")
        .attr("x", 950)
        .attr("y", 966)
        .attr("width", 200)
        .attr("height", 25)
        .attr('stroke', 'black')
        .attr('fill', '#1d90f3');
  svg .append("text")
      .attr("x", 975)
      .attr("y", 979)
      .text("X-man")
      .style("font-size", "22px")
      .attr("alignment-baseline", "middle")
      .attr('fill', 'WHITE');





  function toggleContinentKey() {
    var keyElementWidth = 120,
        keyElementHeight = 30;
    var onScreenYOffset = keyElementHeight*1.5,
        offScreenYOffset = 120;

    if (d3.select(".continent-key").empty()) {
      createContinentKey();
    }
    var continentKey = d3.select(".continent-key");



    function createContinentKey() {
      var keyWidth = keyElementWidth * superheroes.values().length;
      var continentKeyScale = d3.scaleBand()
          .domain(superheroes.values())
          .range([(width - keyWidth) / 2, (width + keyWidth) / 2]);

      svg.append("g")
          .attr("class", "continent-key")
          .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
          .selectAll("g")
          .data(superheroes.values())
          .enter()
          .append("g")
          .attr("class", "continent-key-element");

      d3.selectAll("g.continent-key-element")
          .append("rect")
          .attr("width", keyElementWidth)
          .attr("height", keyElementHeight)
          .attr("x", function(d) { return continentKeyScale(d); })
          .attr("fill", function(d) { return superheroesColorScale(d); });

      d3.selectAll("g.continent-key-element")
          .append("text")
          .attr("text-anchor", "middle")
          .attr("x", function(d) { return continentKeyScale(d) + keyElementWidth/2; })
          .text(function(d) { return continentNames[d]; });

      // The text BBox has non-zero values only after rendering
      d3.selectAll("g.continent-key-element text")
          .attr("y", function(d) {
            var textHeight = this.getBBox().height;
            // The BBox.height property includes some extra height we need to remove
            var unneededTextHeight = 4;
            return ((keyElementHeight + textHeight) / 2) - unneededTextHeight;
          });
    }

    function translateContinentKey(translation) {
      continentKey
          .transition()
          .duration(500)
          .attr("transform", translation);
    }
  }

  //function flagFill() {
  //  return isChecked("#flags");
  //}

  function isChecked(elementID) {
    return d3.select(elementID).property("checked");
  }

  function createCircles() {
    var formatPopulation = d3.format(",");
    circles = svg.selectAll("circle")
        .data(countries)
        .enter()
        .append("circle")
        .attr("r", function(d) { return circleRadiusScale(d.Population); })
        .on("mouseover", function(d) {
          updateCountryInfo(d);
        })
        .on("mouseout", function(d) {
          updateCountryInfo();
        });
    updateCircles();

    function updateCountryInfo(country) {
      var info = "";
      if (country) {
        info = [country.CountryName, country.Superhero, formatPopulation(country.Population)].join(": ");
      }
      d3.select("#country-info").html(info);
    }
  }

  function updateCircles() {
    circles
        .attr("fill", function(d) {
          return superheroesColorScale(d.Superhero);
        });
  }

  function createForces() {
    var forceStrength = 0.02;

    forces = {
      combine:        createCombineForces(),
      universe:       createUniverseForces(),
      superheroes:    createSuperheroesForces()
    };

    function createCombineForces() {
      return {
        x: d3.forceX(width / 2).strength(forceStrength),
        y: d3.forceY(height / 2).strength(forceStrength)
      };
    }

    function createCountryCenterForces() {
      var projectionStretchY = 0.25,
          projectionMargin = circleSize.max,
          projection = d3.geoEquirectangular()
              .scale((width / 2 - projectionMargin) / Math.PI)
              .translate([width / 2, height * (1 - projectionStretchY) / 2]);

      return {
        x: d3.forceX(function(d) {
          return projection([d.CenterLongitude, d.CenterLatitude])[0];
        }).strength(forceStrength),
        y: d3.forceY(function(d) {
          return projection([d.CenterLongitude, d.CenterLatitude])[1] * (1 + projectionStretchY);
        }).strength(forceStrength)
      };
    }

    function createContinentForces() {
      return {
        x: d3.forceX(continentForceX).strength(forceStrength),
        y: d3.forceY(continentForceY).strength(forceStrength)
      };

      function continentForceX(d) {
        if (d.ContinentCode === "EU") {
          return left(width);
        } else if (d.ContinentCode === "AF") {
          return left(width);
        } else if (d.ContinentCode === "AS") {
          return right(width);
        } else if (d.ContinentCode === "NA" || d.ContinentCode === "SA") {
          return right(width);
        }
        return center(width);
      }

      function continentForceY(d) {
        if (d.ContinentCode === "EU") {
          return top(height);
        } else if (d.ContinentCode === "AF") {
          return bottom(height);
        } else if (d.ContinentCode === "AS") {
          return top(height);
        } else if (d.ContinentCode === "NA" || d.ContinentCode === "SA") {
          return bottom(height);
        }
        return center(height);
      }

      function left(dimension) { return dimension / 4; }
      function center(dimension) { return dimension / 2; }
      function right(dimension) { return dimension / 4 * 3; }
      function top(dimension) { return dimension / 4; }
      function bottom(dimension) { return dimension / 4 * 3; }
    }

    function createUniverseForces() {
      return {
        x: d3.forceX(universeForceX).strength(forceStrength),
        y: d3.forceY(universeForceY).strength(forceStrength)
      };

      function universeForceX(d) {
        if (d.Universe === "Marvel") {
          return left(width);
        } else if (d.Universe === "DC") {
          return right(width);
        }
        return center(width);
      }

      function universeForceY(d) {
        if (d.Universe === "Marvel") {
          return center(height);
        } else if (d.Universe === "DC") {
          return center(height);
        }
        return top(height);
      }

      function left(dimension) { return dimension / 4; }
      function center(dimension) { return dimension / 2; }
      function right(dimension) { return dimension / 4 * 3; }
      function top(dimension) { return dimension / 4; }
      function bottom(dimension) { return dimension / 4 * 3; }
    }

    function createSuperheroesForces() {
      return {
        x: d3.forceX(superheroesForceX).strength(forceStrength),
        y: d3.forceY(superheroesForceY).strength(forceStrength)
      };

      function superheroesForceX(d) {
        if (d.Superhero === "Black Panther") {
          return left(width);
        } else if (d.Superhero === "Spider Man") {
          return right(width);
        } else if (d.Superhero === "Deadpol") {
          return left(width);
        } else if (d.Superhero === "Avengers") {
          return left(width);
        } else if (d.Superhero === "Justice League") {
          return center(width);
        } else if (d.Superhero === "Aquaman") {
          return center(width);
        } else if (d.Superhero === "Joker") {
          return right(width);
        } else if (d.Superhero === "Venom") {
          return center (width*0.75);
        } else if (d.Superhero === "Batman") {
          return center (width);
        } else if (d.Superhero === "Guardians of the Galaxy") {
          return center (width*0.75);
        } else if (d.Superhero === "Wonder Woman") {
          return right (width*0.5);
        } else if (d.Superhero === "Suicide Squad") {
          return right (width*0.7);
        } else if (d.Superhero === "Superman") {
          return right (width*0.8);
        } else if (d.Superhero === "Captain Marvel" ) {
          return right(width);
        }
        return center(width);
      }

      function superheroesForceY(d) {
        if (d.Superhero === "Black Panther") {
          return bottom(height);
        } else if (d.Superhero === "Spider Man") {
          return top(height);
        } else if (d.Superhero === "Deadpol") {
          return top(height);
        } else if (d.Superhero === "Avengers") {
          return center(height);
        } else if (d.Superhero === "Justice League") {
          return bottom(height);
        } else if (d.Superhero === "Aquaman") {
          return center(height);
        } else if (d.Superhero === "Joker") {
          return center(height);
        } else if (d.Superhero === "Venom") {
          return center(height);
        } else if (d.Superhero === "Batman") {
          return center(height*0.7);
        } else if (d.Superhero === "Guardians of the Galaxy") {
          return center(height*0.7);
        } else if (d.Superhero === "Wonder Woman") {
          return top(height*0.8);
        } else if (d.Superhero === "Suicide Squad") {
          return bottom(height*0.85);
        } else if (d.Superhero === "Superman") {
          return bottom(height*0.85);
        } else if (d.Superhero === "Captain Marvel") {
          return bottom(height);
        }
        return top(height);
      }

      function left(dimension) { return dimension / 4; }
      function center(dimension) { return dimension / 2; }
      function right(dimension) { return dimension / 4 * 3; }
      function top(dimension) { return dimension / 4; }
      function bottom(dimension) { return dimension / 4 * 3; }
    }
    function createPopulationForces() {
      var continentNamesDomain = continents.values().map(function(continentCode) {
        return continentNames[continentCode];
      });
      var scaledPopulationMargin = circleSize.max;

      populationScaleX = d3.scaleBand()
          .domain(continentNamesDomain)
          .range([scaledPopulationMargin, width - scaledPopulationMargin*2]);
      populationScaleY = d3.scaleLog()
          .domain(populationExtent)
          .range([height - scaledPopulationMargin, scaledPopulationMargin*2]);

      var centerCirclesInScaleBandOffset = populationScaleX.bandwidth() / 2;
      return {
        x: d3.forceX(function(d) {
          return populationScaleX(continentNames[d.ContinentCode]) + centerCirclesInScaleBandOffset;
        }).strength(forceStrength),
        y: d3.forceY(function(d) {
          return populationScaleY(d.Population);
        }).strength(forceStrength)
      };
    }

  }

  function createForceSimulation() {
    forceSimulation = d3.forceSimulation()
        .force("x", forces.combine.x)
        .force("y", forces.combine.y)
        .force("collide", d3.forceCollide(forceCollide));
    forceSimulation.nodes(countries)
        .on("tick", function() {
          circles
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
        });
  }

  function forceCollide(d) {
    return circleRadiusScale(d.Population) + 1;
  }

  //function countryCenterGrouping() {
  //  return isChecked("#country-centers");
  //}
//
  //function populationGrouping() {
  //  return isChecked("#population");
  //}

  function addFlagDefinitions() {
    var defs = svg.append("defs");
    defs.selectAll(".flag")
        .data(countries)
        .enter()
        .append("pattern")
        .attr("id", function(d) { return d.CountryCode; })
        .attr("class", "flag")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("width", 1)
        .attr("height", 1)
        // xMidYMid: center the image in the circle
        // slice: scale the image to fill the circle
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("xlink:href", function(d) {
          return "./flags/" + d.CountryCode + ".svg";
        });
  }




  function addFillListener() {
    d3.selectAll('input[name="fill"]')
        .on("change", function() {
          toggleContinentKey();
          updateCircles();
        });
  }

  function addGroupingListeners() {
    addListener("#combine",         forces.combine);
    addListener("#universe",        forces.universe);
    addListener("#superheroes",        forces.superheroes);

    function addListener(selector, forces) {
      d3.select(selector).on("click", function() {
        updateForces(forces);
        toggleContinentKey();
      });
    }

    function updateForces(forces) {
      forceSimulation
          .force("x", forces.x)
          .force("y", forces.y)
          .force("collide", d3.forceCollide(forceCollide))
          .alphaTarget(0.5)
          .restart();
    }

    function togglePopulationAxes(showAxes) {
      var onScreenXOffset = 40,
          offScreenXOffset = -40;
      var onScreenYOffset = 40,
          offScreenYOffset = 100;

      if (d3.select(".x-axis").empty()) {
        createAxes();
      }
      var xAxis = d3.select(".x-axis"),
          yAxis = d3.select(".y-axis");

      if (showAxes) {
        translateAxis(xAxis, "translate(0," + (height - onScreenYOffset) + ")");
        translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");
      } else {
        translateAxis(xAxis, "translate(0," + (height + offScreenYOffset) + ")");
        translateAxis(yAxis, "translate(" + offScreenXOffset + ",0)");
      }

      function createAxes() {
        var numberOfTicks = 10,
            tickFormat = ".0s";

        var xAxis = d3.axisBottom(populationScaleX)
            .ticks(numberOfTicks, tickFormat);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
            .call(xAxis)
            .selectAll(".tick text")
            .attr("font-size", "16px");

        var yAxis = d3.axisLeft(populationScaleY)
            .ticks(numberOfTicks, tickFormat);
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + offScreenXOffset + ",0)")
            .call(yAxis);
      }

      function translateAxis(axis, translation) {
        axis
            .transition()
            .duration(500)
            .attr("transform", translation);
      }
    }
  }

}
