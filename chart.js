function barChartAdapter(group){
  labels = group.results.map(function(result){
    return result.name;
  });
  data = group.results.map(function(result){
    return result.getRawAverage();
  });
  return {
    labels: labels,
    data: data
  }
}

function createBarChart(ctx, adapter){
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: adapter.labels,
      datasets: [{
        label: 'milliseconds',
        data: adapter.data,
        backgroundColor: [
           'rgba(75, 192, 192, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(255, 159, 64, 0.2)',
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(153, 102, 255, 0.2)'
         ],
         borderColor: [
           'rgba(75, 192, 192, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(255, 159, 64, 1)',
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(153, 102, 255, 1)'
         ],
         borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          // barThickness: 30,
        }],
        xAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
function renderChart(group, i) {
  var container = document.getElementById('results')
  var header = document.createElement('h1')
  header.innerText = group.name;
  container.appendChild(header);
  var ctx = document.createElement("canvas");
  container.appendChild(ctx);
  var adapter = barChartAdapter(group.rank());
  createBarChart(ctx, adapter, 'chart' + i);
}

suite.forEach(function(group, i) {
  renderChart(group, i);
})
