function(properties, context) {
    // Create container div
    const container = document.createElement('div');
    container.id = 'chart-container-' + context.elementId;
    container.style.width = '100%';
    container.style.height = '100%';
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'chart-' + context.elementId;
    container.appendChild(canvas);
    
    // Load Chart.js if not already loaded
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            initializeChart();
        };
        document.head.appendChild(script);
    } else {
        initializeChart();
    }
    
    function initializeChart() {
        const ctx = canvas.getContext('2d');
        const chartType = properties.chart_type || 'column';
        const xValues = (properties.x_values || '').split(',').map(x => x.trim());
        const yValues = (properties.y_values || '').split(',').map(y => parseFloat(y.trim()));
        
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
    
    return container;
} 
