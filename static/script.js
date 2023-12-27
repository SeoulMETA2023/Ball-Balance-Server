// 팝업 열기
let isShowing = false;

document.getElementById("button").addEventListener("click", function () {
    if (isShowing) {
        isShowing = false;
        popup.style.transition = 'transform 1.5s ease';
        popup.style.transform = 'translateY(0px)';
        const image = document.getElementById('arrow');
        image.style.transform = 'rotate(0deg)';
    } else {
        isShowing = true;
        popup.style.transition = 'transform 1.5s ease';
        popup.style.transform = 'translateY(-255px)';
        const image = document.getElementById('arrow');
        image.style.transform = 'rotate(180deg)';
    }

})

function createChart() {
    var data = {
        labels: ['', '', '', '', ''],
        datasets: [
            {
                label: 'A',
                data: [10, 50, 30, 70, 50],
                borderColor: 'red',
                fill: false
            },
            {
                label: 'B',
                data: [10, 90, 5, 40, 60],
                borderColor: 'blue',
                fill: false
            }
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false,
            }
          },
        scales: {
            y:{
                ticks: {
                    color: '#D9D9D9'
                }
            }
        }
    };

    var ctx = document.getElementById('myLineChart').getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

document.addEventListener("DOMContentLoaded", function () {
    createChart();
});
