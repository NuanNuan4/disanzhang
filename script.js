// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 导航按钮点击事件
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const cards = document.querySelectorAll('.card');

    // 导航按钮点击
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // 更新活动按钮
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target) {
                    section.classList.add('active');
                }
            });
            
            // 初始化对应图表
            initChartByTarget(target);
        });
    });

    // 卡片点击事件
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // 更新活动按钮
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-target') === target) {
                    btn.classList.add('active');
                }
            });
            
            // 显示对应内容
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target) {
                    section.classList.add('active');
                }
            });
            
            // 初始化对应图表
            initChartByTarget(target);
        });
    });

    // 初始化首页图表
    initSinCosChart();
});

// 根据目标初始化对应图表
function initChartByTarget(target) {
    switch(target) {
        case 'sin-cos':
            initSinCosChart();
            break;
        case 'box-office':
            initBoxOfficeChart();
            break;
        case 'math-functions':
            initMathFunctionsChart();
            break;
        case 'statistical':
            initStatisticalChart();
            break;
        case 'financial':
            initFinancialChart();
            break;
        case '3d-visualization':
            init3DChart();
            break;
    }
}

// 正弦/余弦函数图表
function initSinCosChart() {
    const amplitudeSlider = document.getElementById('amplitude');
    const frequencySlider = document.getElementById('frequency');
    const phaseSlider = document.getElementById('phase');
    
    const amplitudeValue = document.getElementById('amplitude-value');
    const frequencyValue = document.getElementById('frequency-value');
    const phaseValue = document.getElementById('phase-value');
    
    // 更新滑块值显示
    amplitudeSlider.addEventListener('input', updateSinCosChart);
    frequencySlider.addEventListener('input', updateSinCosChart);
    phaseSlider.addEventListener('input', updateSinCosChart);
    
    // 初始更新
    updateSinCosChart();
    
    function updateSinCosChart() {
        const amplitude = parseFloat(amplitudeSlider.value);
        const frequency = parseFloat(frequencySlider.value);
        const phase = parseFloat(phaseSlider.value);
        
        // 更新显示值
        amplitudeValue.textContent = amplitude;
        frequencyValue.textContent = frequency;
        phaseValue.textContent = phase.toFixed(2);
        
        // 生成数据
        const x = [];
        const y1 = []; // 正弦函数
        const y2 = []; // 余弦函数
        
        for (let i = -Math.PI; i <= Math.PI; i += 0.1) {
            x.push(i);
            y1.push(amplitude * Math.sin(frequency * i + phase));
            y2.push(amplitude * Math.cos(frequency * i + phase));
        }
        
        // 创建图表
        const trace1 = {
            x: x,
            y: y1,
            type: 'scatter',
            mode: 'lines',
            name: '正弦函数',
            line: {color: '#ff1493', width: 3}
        };
        
        const trace2 = {
            x: x,
            y: y2,
            type: 'scatter',
            mode: 'lines',
            name: '余弦函数',
            line: {color: '#ff69b4', width: 3}
        };
        
        const layout = {
            title: '正弦和余弦函数曲线',
            xaxis: {
                title: 'x轴',
                tickvals: [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI],
                ticktext: ['-π', '-π/2', '0', 'π/2', 'π']
            },
            yaxis: {title: 'y轴'},
            hovermode: 'closest',
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 60, r: 40, t: 60, b: 60}
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
        };
        
        Plotly.newPlot('sin-cos-chart', [trace1, trace2], layout, config);
    }
}

// 票房数据图表
function initBoxOfficeChart() {
    const sortOrderSelect = document.getElementById('sort-order');
    const minRevenueSlider = document.getElementById('min-revenue');
    const minRevenueValue = document.getElementById('min-revenue-value');
    
    // 2019年内地电影票房数据（示例数据）
    const boxOfficeData = [
        {movie: '哪吒之魔童降世', revenue: 50.13},
        {movie: '流浪地球', revenue: 46.86},
        {movie: '复仇者联盟4：终局之战', revenue: 42.50},
        {movie: '我和我的祖国', revenue: 31.71},
        {movie: '中国机长', revenue: 29.12},
        {movie: '疯狂的外星人', revenue: 22.13},
        {movie: '飞驰人生', revenue: 17.28},
        {movie: '烈火英雄', revenue: 17.06},
        {movie: '少年的你', revenue: 15.58},
        {movie: '速度与激情：特别行动', revenue: 14.34}
    ];
    
    // 更新滑块值显示
    minRevenueSlider.addEventListener('input', updateBoxOfficeChart);
    sortOrderSelect.addEventListener('change', updateBoxOfficeChart);
    
    // 初始更新
    updateBoxOfficeChart();
    
    function updateBoxOfficeChart() {
        const minRevenue = parseFloat(minRevenueSlider.value);
        const sortOrder = sortOrderSelect.value;
        
        // 更新显示值
        minRevenueValue.textContent = minRevenue;
        
        // 过滤和排序数据
        let filteredData = boxOfficeData.filter(item => item.revenue >= minRevenue);
        
        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.revenue - b.revenue);
        } else {
            filteredData.sort((a, b) => b.revenue - a.revenue);
        }
        
        // 准备图表数据
        const movies = filteredData.map(item => item.movie);
        const revenues = filteredData.map(item => item.revenue);
        
        // 创建柱状图
        const trace = {
            x: revenues,
            y: movies,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: revenues.map(revenue => {
                    // 根据票房值生成渐变色
                    const maxRevenue = Math.max(...revenues);
                    const ratio = revenue / maxRevenue;
                    return `rgb(${255}, ${105 + ratio * 150}, ${180 + ratio * 75})`;
                }),
                line: {
                    color: 'rgba(255,20,147,0.8)',
                    width: 1
                }
            },
            text: revenues.map(revenue => revenue.toFixed(2) + '亿元'),
            textposition: 'auto',
            hoverinfo: 'y+text'
        };
        
        const layout = {
            title: '2019年内地电影票房排行榜',
            xaxis: {
                title: '总票房(亿元)',
                gridcolor: 'rgba(255,182,193,0.3)',
                zerolinecolor: 'rgba(255,182,193,0.5)'
            },
            yaxis: {
                title: '电影名称',
                automargin: true,
                gridcolor: 'rgba(255,182,193,0.3)'
            },
            hovermode: 'closest',
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 200, r: 40, t: 60, b: 60},
            showlegend: false
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
        };
        
        Plotly.newPlot('box-office-chart', [trace], layout, config);
    }
}

// 添加窗口调整大小时的响应式处理
window.addEventListener('resize', function() {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection && activeSection.id === 'sin-cos') {
        initSinCosChart();
    } else if (activeSection && activeSection.id === 'box-office') {
        initBoxOfficeChart();
    }
});

// 添加键盘导航支持
document.addEventListener('keydown', function(event) {
    const activeSection = document.querySelector('.content-section.active');
    
    if (activeSection && activeSection.id === 'sin-cos') {
        handleSinCosKeyboard(event);
    }
});

function handleSinCosKeyboard(event) {
    const amplitudeSlider = document.getElementById('amplitude');
    const frequencySlider = document.getElementById('frequency');
    const phaseSlider = document.getElementById('phase');
    
    let currentSlider = null;
    
    // 确定当前焦点滑块
    if (document.activeElement === amplitudeSlider) currentSlider = amplitudeSlider;
    else if (document.activeElement === frequencySlider) currentSlider = frequencySlider;
    else if (document.activeElement === phaseSlider) currentSlider = phaseSlider;
    
    if (currentSlider) {
        const step = parseFloat(currentSlider.step);
        const min = parseFloat(currentSlider.min);
        const max = parseFloat(currentSlider.max);
        let currentValue = parseFloat(currentSlider.value);
        
        switch(event.key) {
            case 'ArrowUp':
            case 'ArrowRight':
                currentValue = Math.min(currentValue + step, max);
                currentSlider.value = currentValue;
                updateSinCosChart();
                event.preventDefault();
                break;
            case 'ArrowDown':
            case 'ArrowLeft':
                currentValue = Math.max(currentValue - step, min);
                currentSlider.value = currentValue;
                updateSinCosChart();
                event.preventDefault();
                break;
        }
    }
}

// 数学函数图表
function initMathFunctionsChart() {
    const functionTypeSelect = document.getElementById('function-type');
    const coefficientSlider = document.getElementById('coefficient');
    const coefficientValue = document.getElementById('coefficient-value');
    
    // 更新滑块值显示
    coefficientSlider.addEventListener('input', updateMathFunctionsChart);
    functionTypeSelect.addEventListener('change', updateMathFunctionsChart);
    
    // 初始更新
    updateMathFunctionsChart();
    
    function updateMathFunctionsChart() {
        const functionType = functionTypeSelect.value;
        const coefficient = parseFloat(coefficientSlider.value);
        
        // 更新显示值
        coefficientValue.textContent = coefficient;
        
        // 生成数据
        const x = [];
        const y = [];
        
        for (let i = -5; i <= 5; i += 0.1) {
            x.push(i);
            
            switch(functionType) {
                case 'polynomial':
                    y.push(coefficient * Math.pow(i, 2) + 2*i + 1);
                    break;
                case 'exponential':
                    y.push(Math.exp(coefficient * i));
                    break;
                case 'logarithmic':
                    y.push(i > 0 ? coefficient * Math.log(i) : null);
                    break;
                case 'rational':
                    y.push(i !== 0 ? (coefficient * i + 1) / i : null);
                    break;
            }
        }
        
        // 创建图表
        const trace = {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            name: getFunctionName(functionType),
            line: {color: '#ff1493', width: 3}
        };
        
        const layout = {
            title: getFunctionName(functionType) + '函数图像',
            xaxis: {title: 'x轴'},
            yaxis: {title: 'y轴'},
            hovermode: 'closest',
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 60, r: 40, t: 60, b: 60}
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
        };
        
        Plotly.newPlot('math-functions-chart', [trace], layout, config);
    }
    
    function getFunctionName(type) {
        const names = {
            'polynomial': '多项式',
            'exponential': '指数',
            'logarithmic': '对数',
            'rational': '有理'
        };
        return names[type] || '函数';
    }
}

// 统计分析图表
function initStatisticalChart() {
    const chartTypeSelect = document.getElementById('chart-type');
    const dataSizeSlider = document.getElementById('data-size');
    const dataSizeValue = document.getElementById('data-size-value');
    
    // 更新滑块值显示
    dataSizeSlider.addEventListener('input', updateStatisticalChart);
    chartTypeSelect.addEventListener('change', updateStatisticalChart);
    
    // 初始更新
    updateStatisticalChart();
    
    function updateStatisticalChart() {
        const chartType = chartTypeSelect.value;
        const dataSize = parseInt(dataSizeSlider.value);
        
        // 更新显示值
        dataSizeValue.textContent = dataSize;
        
        // 生成随机数据
        const data = generateRandomData(dataSize, chartType);
        
        // 创建图表
        let traces = [];
        let layout = {};
        
        switch(chartType) {
            case 'scatter':
                traces = [{
                    x: data.x,
                    y: data.y,
                    mode: 'markers',
                    type: 'scatter',
                    marker: {
                        size: 8,
                        color: '#ff1493',
                        opacity: 0.7
                    }
                }];
                layout = {
                    title: '散点图 - 随机数据分布',
                    xaxis: {title: 'X值'},
                    yaxis: {title: 'Y值'}
                };
                break;
                
            case 'box':
                traces = [{
                    y: data.y,
                    type: 'box',
                    name: '数据分布',
                    boxpoints: 'all',
                    jitter: 0.3,
                    pointpos: -1.8,
                    marker: {color: '#ff1493'},
                    line: {color: '#ff0066'}
                }];
                layout = {
                    title: '箱线图 - 数据统计分布'
                };
                break;
                
            case 'heatmap':
                traces = [{
                    z: data.z,
                    type: 'heatmap',
                    colorscale: 'Reds'
                }];
                layout = {
                    title: '热力图 - 数据密度分布'
                };
                break;
                
            case 'histogram':
                traces = [{
                    x: data.x,
                    type: 'histogram',
                    marker: {color: '#ff1493'},
                    opacity: 0.7
                }];
                layout = {
                    title: '直方图 - 数据频率分布',
                    xaxis: {title: '数值区间'},
                    yaxis: {title: '频数'}
                };
                break;
        }
        
        layout = {
            ...layout,
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 60, r: 40, t: 60, b: 60}
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false
        };
        
        Plotly.newPlot('statistical-chart', traces, layout, config);
    }
    
    function generateRandomData(size, type) {
        const data = {};
        
        switch(type) {
            case 'scatter':
                data.x = Array.from({length: size}, () => Math.random() * 100);
                data.y = Array.from({length: size}, (_, i) => data.x[i] * 0.8 + Math.random() * 20);
                break;
                
            case 'box':
                data.y = Array.from({length: size}, () => Math.random() * 100);
                break;
                
            case 'heatmap':
                const gridSize = Math.ceil(Math.sqrt(size));
                data.z = Array.from({length: gridSize}, () => 
                    Array.from({length: gridSize}, () => Math.random())
                );
                break;
                
            case 'histogram':
                data.x = Array.from({length: size}, () => Math.random() * 100);
                break;
        }
        
        return data;
    }
}

// 金融数据图表
function initFinancialChart() {
    const stockTypeSelect = document.getElementById('stock-type');
    const timePeriodSelect = document.getElementById('time-period');
    
    // 更新事件
    stockTypeSelect.addEventListener('change', updateFinancialChart);
    timePeriodSelect.addEventListener('change', updateFinancialChart);
    
    // 初始更新
    updateFinancialChart();
    
    function updateFinancialChart() {
        const stockType = stockTypeSelect.value;
        const timePeriod = timePeriodSelect.value;
        
        // 生成模拟股票数据
        const data = generateStockData(stockType, timePeriod);
        
        // 创建K线图
        const trace = {
            x: data.dates,
            close: data.close,
            high: data.high,
            low: data.low,
            open: data.open,
            
            // 定义K线图
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            
            // 颜色设置
            increasing: {line: {color: '#00ff00'}},
            decreasing: {line: {color: '#ff0000'}}
        };
        
        const layout = {
            title: getStockName(stockType) + ' - 股票价格走势',
            xaxis: {title: '日期'},
            yaxis: {title: '价格(元)'},
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 60, r: 40, t: 60, b: 60}
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false
        };
        
        Plotly.newPlot('financial-chart', [trace], layout, config);
    }
    
    function generateStockData(type, period) {
        const basePrice = {
            'tech': 100,
            'finance': 50,
            'energy': 80,
            'consumer': 70
        }[type] || 100;
        
        const days = {
            '1d': 1,
            '1w': 7,
            '1m': 30,
            '1y': 365
        }[period] || 30;
        
        const dates = [];
        const open = [];
        const high = [];
        const low = [];
        const close = [];
        
        let currentPrice = basePrice;
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
            
            const volatility = 0.02; // 2%波动率
            const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
            
            open.push(currentPrice);
            currentPrice += change;
            close.push(currentPrice);
            
            const dailyHigh = Math.max(open[i], close[i]) + Math.random() * volatility * currentPrice;
            const dailyLow = Math.min(open[i], close[i]) - Math.random() * volatility * currentPrice;
            
            high.push(dailyHigh);
            low.push(dailyLow);
        }
        
        return {dates, open, high, low, close};
    }
    
    function getStockName(type) {
        const names = {
            'tech': '科技股',
            'finance': '金融股',
            'energy': '能源股',
            'consumer': '消费股'
        };
        return names[type] || '股票';
    }
}

// 3D可视化图表
function init3DChart() {
    const functionSelect = document.getElementById('3d-function');
    const rotationSlider = document.getElementById('rotation-speed');
    const rotationValue = document.getElementById('rotation-speed-value');
    
    // 更新事件
    functionSelect.addEventListener('change', update3DChart);
    rotationSlider.addEventListener('input', update3DChart);
    
    // 初始更新
    update3DChart();
    
    function update3DChart() {
        const functionType = functionSelect.value;
        const rotationSpeed = parseInt(rotationSlider.value);
        
        // 更新显示值
        rotationValue.textContent = rotationSpeed;
        
        // 生成3D数据
        const data = generate3DData(functionType);
        
        // 创建3D曲面图
        const trace = {
            x: data.x,
            y: data.y,
            z: data.z,
            type: 'surface',
            colorscale: 'Hot',
            opacity: 0.8
        };
        
        const layout = {
            title: get3DFunctionName(functionType) + ' - 3D可视化',
            scene: {
                xaxis: {title: 'X轴'},
                yaxis: {title: 'Y轴'},
                zaxis: {title: 'Z轴'},
                camera: {
                    eye: {x: 1.5, y: 1.5, z: 1.5}
                }
            },
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            font: {family: 'Microsoft YaHei, Arial, sans-serif'},
            margin: {l: 0, r: 0, t: 60, b: 0}
        };
        
        const config = {
            responsive: true,
            displayModeBar: true,
            displaylogo: false
        };
        
        Plotly.newPlot('3d-chart', [trace], layout, config);
        
        // 添加旋转动画
        if (rotationSpeed > 0) {
            startRotation(rotationSpeed);
        }
    }
    
    function generate3DData(type) {
        const size = 20;
        const x = [];
        const y = [];
        const z = [];
        
        for (let i = 0; i < size; i++) {
            x[i] = [];
            y[i] = [];
            z[i] = [];
            
            for (let j = 0; j < size; j++) {
                const xi = (i - size/2) / 2;
                const yj = (j - size/2) / 2;
                
                x[i][j] = xi;
                y[i][j] = yj;
                
                switch(type) {
                    case 'paraboloid':
                        z[i][j] = xi*xi + yj*yj;
                        break;
                    case 'saddle':
                        z[i][j] = xi*xi - yj*yj;
                        break;
                    case 'sphere':
                        z[i][j] = Math.sqrt(4 - xi*xi - yj*yj);
                        break;
                    case 'wave':
                        z[i][j] = Math.sin(Math.sqrt(xi*xi + yj*yj));
                        break;
                    default:
                        z[i][j] = 0;
                }
            }
        }
        
        return {x, y, z};
    }
    
    function get3DFunctionName(type) {
        const names = {
            'paraboloid': '抛物面',
            'saddle': '马鞍面',
            'sphere': '球面',
            'wave': '波形曲面'
        };
        return names[type] || '3D函数';
    }
    
    function startRotation(speed) {
        const scene = document.querySelector('#3d-chart .scene');
        if (scene) {
            let angle = 0;
            const interval = setInterval(() => {
                angle += speed * 0.01;
                Plotly.relayout('3d-chart', {
                    'scene.camera': {
                        eye: {
                            x: 1.5 * Math.cos(angle),
                            y: 1.5 * Math.sin(angle),
                            z: 1.5
                        }
                    }
                });
            }, 50);
            
            // 停止旋转的函数
            window.stop3DRotation = () => {
                clearInterval(interval);
            };
        }
    }
}

// 工具函数：更新正弦/余弦图表（需要在全局作用域中）
function updateSinCosChart() {
    const amplitudeSlider = document.getElementById('amplitude');
    const frequencySlider = document.getElementById('frequency');
    const phaseSlider = document.getElementById('phase');
    
    const amplitudeValue = document.getElementById('amplitude-value');
    const frequencyValue = document.getElementById('frequency-value');
    const phaseValue = document.getElementById('phase-value');
    
    const amplitude = parseFloat(amplitudeSlider.value);
    const frequency = parseFloat(frequencySlider.value);
    const phase = parseFloat(phaseSlider.value);
    
    // 更新显示值
    amplitudeValue.textContent = amplitude;
    frequencyValue.textContent = frequency;
    phaseValue.textContent = phase.toFixed(2);
    
    // 生成数据
    const x = [];
    const y1 = []; // 正弦函数
    const y2 = []; // 余弦函数
    
    for (let i = -Math.PI; i <= Math.PI; i += 0.1) {
        x.push(i);
        y1.push(amplitude * Math.sin(frequency * i + phase));
        y2.push(amplitude * Math.cos(frequency * i + phase));
    }
    
    // 创建图表
    const trace1 = {
        x: x,
        y: y1,
        type: 'scatter',
        mode: 'lines',
        name: '正弦函数',
        line: {color: '#ff1493', width: 3}
    };
    
    const trace2 = {
        x: x,
        y: y2,
        type: 'scatter',
        mode: 'lines',
        name: '余弦函数',
        line: {color: '#ff69b4', width: 3}
    };
    
    const layout = {
        title: '正弦和余弦函数曲线',
        xaxis: {
            title: 'x轴',
            tickvals: [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI],
            ticktext: ['-π', '-π/2', '0', 'π/2', 'π']
        },
        yaxis: {title: 'y轴'},
        hovermode: 'closest',
        paper_bgcolor: 'rgba(255,255,255,0)',
        plot_bgcolor: 'rgba(255,255,255,0)',
        font: {family: 'Microsoft YaHei, Arial, sans-serif'},
        margin: {l: 60, r: 40, t: 60, b: 60}
    };
    
    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
    };
    
    Plotly.newPlot('sin-cos-chart', [trace1, trace2], layout, config);
}