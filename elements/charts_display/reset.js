function(properties, context) {
    const canvas = document.getElementById('chart-' + context.elementId);
    if (canvas && window.Chart && window.Chart.instances[canvas.id]) {
        window.Chart.instances[canvas.id].destroy();
    }
    
    const container = document.getElementById('chart-container-' + context.elementId);
    if (container) {
        container.remove();
    }
} 
