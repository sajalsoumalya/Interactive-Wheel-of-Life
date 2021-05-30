var Areas = [];
var Rating = [];
var TunedRating = [];
var DiffRating = [];
var result = [];
var balancedRating = [8, 9, 7, 7, 6, 6, 8, 8, 6, 6];
var unBalancedrating = [9, 8, 6, 3, 2, 3, 4, 3, 2, 9];
var TunedCorrelation;
var myCorrelation;

///Plus Minus Span
$(document).ready(function () {
  $(".minus").click(function () {
    var $input = $(this).parent().find("input[type=number]");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".plus").click(function () {
    var $input = $(this).parent().find("input[type=number]");
    var count = parseInt($input.val()) + 1;
    count = count > 10 ? 10 : count;
    $input.val(count);
    $input.change();
    return false;
  });
});

///Calculate correlationCoefficient
function pearsonCorrelation(prefs, p1, p2) {
  var si = [];

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }

  var n = si.length;

  if (n == 0) return 0;

  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  var sum2 = 0;
  for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];

  var sum1Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  }

  var sum2Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  }

  var pSum = 0;
  for (var i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  }

  var num = pSum - (sum1 * sum2) / n;
  var den = Math.sqrt(
    (sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n)
  );

  if (den == 0) return 0;

  return num / den;
}

///Geting Inputer From teh From Feilds

var myForm = document.getElementById("myForm");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  $("input[name='areas[]']").each(function () {
    Areas.push($(this).val());
  });
  $("input[name='rating[]']").each(function () {
    result.push($(this).val());
    var i = 10;
    Rating = result.map((i) => Number(i));
  });
  document.getElementById("myRating0").value = Rating[0];
  document.getElementById("myRating1").value = Rating[1];
  document.getElementById("myRating2").value = Rating[2];
  document.getElementById("myRating3").value = Rating[3];
  document.getElementById("myRating4").value = Rating[4];
  document.getElementById("myRating5").value = Rating[5];
  document.getElementById("myRating6").value = Rating[6];
  document.getElementById("myRating7").value = Rating[7];
  document.getElementById("myRating8").value = Rating[8];
  document.getElementById("myRating9").value = Rating[9];

  var data = new Array(balancedRating, Rating);
  var coooo = pearsonCorrelation(data, 0, 1);
  var cor = 100 * coooo;
  var myCorrelation = Math.round(cor);
  console.log(myCorrelation);
  $("#scale_bar").val(myCorrelation);
  $("#scale_bar1").val(myCorrelation);
  $("#scale_bar2").val(myCorrelation);
  console.log(Rating);

  var ctx = document.getElementById("chart");
  var data = {
    labels: Areas,
    datasets: [
      {
        label: "Blanced Life",
        data: balancedRating,
        fill: true,
        backgroundColor: "rgba(26, 239, 30, 0.28)",
        borderColor: "rgba(93, 226, 70, 0.55)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Unbalanced Life",
        data: unBalancedrating,
        fill: true,
        backgroundColor: "rgba(240, 5, 5, 0.61)",
        borderColor: "rgba(240, 5, 5, 0.69)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Your Life",
        data: Rating,
        fill: true,
        backgroundColor: "rgba(26, 30, 239, 0.51)",
        borderColor: "rgba(26, 30, 239, 1)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  var mychart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
            },
          },
          position: "bottom",
        },
        datalabels: {
          color: "blue",
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
            value: {
              color: "green",
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 1,
        },
      },
      scales: {
        r: {
          pointLabels: {
            color: "white",
            font: {
              size: 15,
            },
          },

          min: 0,
          max: 10,

          angleLines: {
            color: "white",
          },
          grid: {
            color: "white",
          },
        },
      },
    },
    scaleOverride: true,
    scaleSteps: 5,
    scaleStepWidth: 1,
    scaleStartValue: 2,
  });
});

///Onchnage Function
function myFunction() {
  var newRating = [];
  $("input[name='myRating[]']").each(function () {
    newRating.push($(this).val());
    result = newRating;
    var i = 10;
    TunedRating = result.map((i) => Number(i));
  });
  var data = new Array(balancedRating, TunedRating);
  var coooo = pearsonCorrelation(data, 0, 1);
  var cor = 100 * coooo;
  var TunedCorrelation = Math.round(cor);

  $("#scale_bar2").val(TunedCorrelation);
}

var myForm = document.getElementById("myForm2");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  for (var i = 0; i <= Rating.length - 1; i++)
    DiffRating.push(TunedRating[i] - Rating[i]);

  var options = {
    series: [
      {
        data: DiffRating,
      },
    ],
    chart: {
      type: "bar",
      background: "#1B1F22",
    },
    fill: {
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value < 0) {
            return "#0abf0d";
          } else {
            return "#FF0000";
          }
        },
      ],
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Areas,
      labels: {
        style: {
          colors: ["white"],
          fontSize: "0.7rem",
        },
      },
      axisBorder: {
        show: false,
        color: "#78909C",
      },
      lines: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
          ],
          fontSize: ".7rem",
        },
      },
      axisBorder: {
        show: false,
        color: "#78909C",
      },
      lines: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
  };
  var chart = new ApexCharts(document.querySelector("#myBarChart"), options);
  chart.render();
});
