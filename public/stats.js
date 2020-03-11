// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let durations = duration(data);
  let totalDurations = totalDuration(data); 
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let resistanceWorkouts = resistanceNames(data);
  let poundsByCategory = calculateTotalWeightCategory(data);  
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Workout 1",
        "Workout 2",
        "Workout 3",
        "Workout 4",
        "Workout 5",
        "Workout 6",
        "Workout 7"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: totalDurations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Workout 1",
        "Workout 2",
        "Workout 3",
        "Workout 4",
        "Workout 5",
        "Workout 6",
        "Workout 7"
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: resistanceWorkouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: poundsByCategory
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

//finds total duration for each exercise
function totalDuration(data) {
  let durations = [];

  data.forEach(workout => {
    durations.push(workout.totalDuration);
  });

  return durations;
}

//calculates duration and groups by exercise name
function duration(data) {
  let durations = [];
  let names = []; 
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (names.indexOf(exercise.name) !== -1){
        let index= names.indexOf(exercise.name); 
        let sumDuration = durations[index] + exercise.duration; 
        durations[index] = sumDuration; 
      } else {
        durations.push(exercise.duration);
        names.push(exercise.name); 
      }
    });
  });

  return durations;
}

//calculates total weight in a workout for resistance exercises
function calculateTotalWeight(data) {
  let total = [];
  data.forEach(workout => {
    let sumWeight=0; 
    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance"){
        sumWeight+=exercise.weight; 
      }
    });
    total.push(sumWeight); 
  });
  return total;
}

//calculates totalweight over the 7 workouts grouped by categories
function calculateTotalWeightCategory(data) {
  let total = [];
  let names = []; 
  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (names.indexOf(exercise.name) !== -1){
        let index= names.indexOf(exercise.name); 
        let sumWeight = total[index] + exercise.weight; 
        total[index] = sumWeight; 
      } else {
        total.push(exercise.weight);
        names.push(exercise.name); 
      }
    });
  });

  return total;
}

//finds all exercies names
function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (workouts.indexOf(exercise.name) === -1)
      workouts.push(exercise.name);
    });
  });
  return workouts;
}

//finds only resistance exercise names
function resistanceNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (workouts.indexOf(exercise.name) === -1 && exercise.type === "resistance")
      workouts.push(exercise.name);
    });
  });
  return workouts;
}