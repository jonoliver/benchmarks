var Benchmark = {};
Benchmark.RUNS = 10;
Benchmark.Group = function(name, benchmarkResults){
  var results = benchmarkResults;
  this.results = results;
  this.name = name;
  this.rank = function rank() {
    this.results = results.sort(function(a, b) {
      return a.getRawAverage() - b.getRawAverage();
    });
    return this;
  };
  return this;
};

Benchmark.Result = function(name, runs) {
  var results = [];

  this.name = name;
  this.runs = runs;
  this.addResult = function(result) { results.push(result); };
  this.getRawResults = function() { return results; };
  this.getResults = formatResults;
  this.getAverage = average;
  this.getRawAverage = rawAverage;

  function formatResults() {
    return results.map(function(result){ return format(result); });
  }

  function rawAverage() {
    var total = results.reduce(function (sum, val) {
      return sum += val;
    }, 0);
    return total / results.length;
  }

  function average() {
    return format(rawAverage());
  }

  function format(result) {
    return result + "ms";
  }
  return this;
};

Benchmark.report = function(results) {
  if (results instanceof Benchmark.Group) {
    console.log("Group: " + results.name);
    reportResults(results.results);
    return results;
  }
  if (results instanceof Benchmark.Result){
    reportResults([results]);
    return results;
  }
  throw new Error("Argument must be Benchmark.Group or Benchmark.Result");

  function reportResults(results){
    if (console.table){
      console.table(results.map(function (result) {
        return formatResult(result);
      }));
    }
    else {
      results.forEach(function(result) {
        console.log(formatResult(result));
      });
    }
  }
  function formatResult(result){
    return {name: result.name, average: result.getAverage(), runs: result.runs };
  }
};

Benchmark.bm = function(name, f, runs) {
  var RUNS = runs || Benchmark.RUNS;
  var results = new Benchmark.Result(name, RUNS);

  for (var i = 0; i < RUNS; i++){
    var start = Date.now();
    f();
    var end = Date.now();
    results.addResult(end - start);
  }
  return results;
};
Benchmark.assert = function(condition) {
  if (condition !== true) throw new Error("Assertion Failed.");
};
