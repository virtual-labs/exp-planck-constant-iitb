let inp_ib_y = [];
let inp_vbe_x = [];
let out_ic_y = [];
let out_vce_x = [];
let in_others = [];
let out_others = [];
let sorted_freq = [];
let sorted_voltage = [];
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Study the Plot</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">Here we will study the plot to analyse Input and Output Characteristics </div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
    let left_panel_text = `
         <div id='act4-left-content' style="position: absolute; font-size: 1.6vw;">

            <div><canvas style='border: 1px solid black; width: 80vw;' id='my-canvas1' ></canvas></div>

         </div>
     `;
    pp.addtoleftpannel(left_panel_text);
    //define the canvas
    pp.addcanvas('mycanvas');
    //pp.addtorightpannel(question_div_box, 3);
    //pp.showscore(0, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    // canvas.style.cursor = 'crosshair';
    // rect = canvas.getBoundingClientRect();
    //scene = new Scene();
    // assembly_image = new Chemistry.Custome_image(
    // 	assembly,
    // 	new Chemistry.Point(1050, 450),
    // 	815 * 1.3,
    // 	635 * 1.3,
    // 	canvas
    // );
    // img_slider = new Chemistry.Custome_image(
    // 	rheostat_slider,
    // 	new Chemistry.Point(1210, 800),
    // 	41,
    // 	74,
    // 	canvas
    // );
    // scene.add(assembly_image);
    // scene.add(img_slider);
    // add canvas sizing
    // window.onload = a2_windowresize;
    // window.onresize = a2_windowresize;
    a4_windowresize();
    sort_data();
    plot_input();
    //load_colors();
    // window.addEventListener('click', (event) => a3_mouseclick(event));
}
function a4_windowresize() {
    //canvas size
    a4_canvas_size();
    //canvas mapping
    a4_canvas_mapping();
    //draw scene
    //scene.draw();
}
function a4_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a4_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function sort_data() {
    if (obs_table.length <= 1) {
        return;
    }
    // Traverse through all array elements
    for (let i = 0; i < obs_table.length - 1; i++) {
        for (let j = 0; j < obs_table.length - 1 - i; j++) {
            // Swap if element is greater than next index
            if (obs_table[j][3] > obs_table[j + 1][3]) {
                //[obs_table[i][3], obs_table[j+1][3]] = [obs_table[j+1][3], obs_table[i][3]];
                var temp = obs_table[j][3];
                obs_table[j][3] = obs_table[j + 1][3];
                obs_table[j + 1][3] = temp;
                if (obs_table[i][4] == 5) {
                    obs_table[i][4] = null;
                }
                if (obs_table[j + 1][4] == 5) {
                    obs_table[j + 1][4] = null;
                }
                var temp2 = obs_table[j][4];
                obs_table[j][4] = obs_table[j + 1][4];
                obs_table[j + 1][4] = temp2;
            }
        }
    }
    for (let i = 0; i < obs_table.length - 1; i++) {
        sorted_freq.push(obs_table[i][3]);
        sorted_voltage.push(-obs_table[i][4]);
    }
    sorted_freq.unshift(0);
    sorted_voltage.unshift(-sim_data[0][5 + selected_metal]);
}
function plot_input() {
    var ctx = document.getElementById('my-canvas1');
    ctx.style.backgroundColor = 'white';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: sorted_freq,
            datasets: [
                {
                    label: 'Voltage',
                    data: sorted_voltage,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: true,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Voltage',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Frequency',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `Frequency Vs Voltage`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
}
// activity4();
//# sourceMappingURL=activity4.js.map