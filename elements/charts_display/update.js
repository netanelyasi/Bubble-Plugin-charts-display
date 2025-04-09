function(properties, context) {
    const container = document.getElementById('chart-container-' + context.elementId);
    const canvas = document.getElementById('chart-' + context.elementId);
    
    if (!container || !canvas) {
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const chartType = properties.chart_type || 'column';
    const xValues = (properties.x_values || '').split(',').map(x => x.trim());
    const yValues = (properties.y_values || '').split(',').map(y => parseFloat(y.trim()));
    
    // Destroy existing chart if it exists
    if (window.Chart && window.Chart.instances[canvas.id]) {
        window.Chart.instances[canvas.id].destroy();
    }
    
    const data = {
        labels: xValues,
        datasets: [{
            label: properties.chart_title || 'Data',
            data: yValues,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: chartType === 'column' ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.2)',
            fill: chartType === 'area'
        }]
    };
    
    const config = {
        type: chartType === 'column' ? 'bar' : chartType,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: properties.chart_title || 'My Chart'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: properties.x_axis_label || 'X Axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: properties.y_axis_label || 'Y Axis'
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
} 
