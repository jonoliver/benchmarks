var suite = [
(function () {
  var RUNS = 100000;
  var group = new Benchmark.Group('DOM Element retrieval', [

    Benchmark.bm('querySelector', function(){
      for (var i = 0; i < RUNS; i++) {
        el = document.querySelector('#test');
        Benchmark.assert(el.id == 'test')
      }
    }),

    Benchmark.bm('getElementById', function(){
      for (var i = 0; i < RUNS; i++) {
        el = document.getElementById('test')
        Benchmark.assert(el.id == 'test')
      }
    })
  ]);

  Benchmark.report(group.rank());
  return group;
})(),

(function () {
  Benchmark.RUNS = 1;
  var RUNS = 10000000;
  var array = new Array(RUNS);
  for (var i = 0; i < array.length; i++) {
    array[i] = "hello"
  }
  Benchmark.assert(array.length == RUNS);

  group = new Benchmark.Group('Iterating through an array 10,000,000 times', [

    Benchmark.bm('forEach', function(){
      array.forEach(function(item, i) {
        Benchmark.assert(array[i] == 'hello');
      });
    }),

    Benchmark.bm('for loop', function(){
      for (var i = 0; i < array.length; i++) {
        Benchmark.assert(array[i] == 'hello');
      }
    })
  ])

  Benchmark.report(group.rank());
  return group;
})()

,

(function () {
  Benchmark.RUNS = 1;
  var RUNS = 100000000;
  var array = new Array(RUNS);
  for (var i = 0; i < array.length; i++) {
    array[i] = "hello"
  }
  Benchmark.assert(array.length == RUNS);

  group = new Benchmark.Group('Iterating through an array 100,000,000 times', [

    Benchmark.bm('forEach', function(){
      array.forEach(function(item, i) {
        Benchmark.assert(array[i] == 'hello');
      });
    }),

    Benchmark.bm('for loop', function(){
      for (var i = 0; i < array.length; i++) {
        Benchmark.assert(array[i] == 'hello');
      }
    })
  ]);

  Benchmark.report(group.rank());
  return group;
})()
];
