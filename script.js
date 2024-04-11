function calculateProjection() {
    const maintenanceFee = parseFloat(document.getElementById('maintenanceFee').value);
    const maintenanceFee2 = parseFloat(document.getElementById('maintenanceFee2').value);
    const priceIncrease = parseFloat(document.getElementById('priceIncrease').value) / 100;

    let data = [], data2 = [], totalSavings = 0;
    let initialFee = maintenanceFee, initialFee2 = maintenanceFee2;

    for (let year = 1; year <= 20; year++) {
        initialFee *= (1 + priceIncrease);
        initialFee2 *= (1 + priceIncrease);
        data.push(initialFee);
        data2.push(initialFee2);
        totalSavings += (initialFee - initialFee2);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => `Year ${i + 1}`),
            datasets: [{
                label: 'Company 1',
                data: data,
                borderColor: 'red',
                borderWidth: 2
            }, {
                label: 'Spinnaker',
                data: data2,
                borderColor: 'green',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => `$${value.toFixed(2)}`
                    }
                }
            }
        }
    });

    document.getElementById('savings').innerHTML = `20-Year Savings with Spinnaker: $${totalSavings.toFixed(2)}`;
}
