let img_slider;
let img_led;
let assembly_image;
var led_color;
let power = false;
let current_ele;
let l_ele;
let x_ele;
let intensity = 0.3; //varies from 0 to 20;
let ib_dsp;
let ic_dsp;
let vbe_dsp;
let vce_dsp;
let extra_vce_dsp;
let extra_ib_dsp;
let obs_index = 0;
let record_btn;
let offcanvas4_content;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.addoffcanvas(4);
    input_observation_table = [];
    output_observation_table = [];
    customize_canvas4();
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Input Characteristics Observations</span><p>`, 3);
    pp.showtitle(`<p id="exp-title" style='width: 23vw;'>Observation Table</span><p>`, 4);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">1. Select the metal <br>2. Click on start <br>3. Vary frequency and applied voltage <br> -When the "Add Reading button" turns green, take the reading <br> - Repeat the process from step 3 <br> 4. If there is no emission of electrons, input value 5 volts as the stopping potential. <br> <span style='color: red;'> Note: You need to take total 5 observations to proceed further </span> </div>`, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
    let left_panel_text = `
         <div id='act3-left-content' style="position: absolute; font-size: 1.6vw;">

		    <img src='./images/assembly.webp' style='position: absolute; width: 30vw; z-index: -1; left: 55vw; top: 2vw;' />

			<div style="position: absolute; width: 7vw; padding: 2px; font-size: 1.1vw; left: 66.3vw; top: 19.8vw;"><input id='dis-stp-pot' style='background-color: transparent; border: none;' type='text' value='' /></div>

			<div id='light-sim' style="
				display: none;
				position: absolute;  
				width: 9vw; 
				left: 62.5vw;
				top: 3.5vw;
				height: 12vw;
				background-color: blue;
				opacity: 0.5;
				clip-path: polygon(75% 15%, 85% 25%, 0% 89%, 0% 50%);

			"></div>




			<div id='zero-step' style='width: 20vw;'>
				<h4>Select the metal</h4>
				<select id='metal-dd' class='form-select' onchange='select_metal();' >
					<option value='' default >---Select--</option>
					<option value='0' >Sodium (Na)</option>
					<option value='1' >Cesium (Cs)</option>
					<option value='2' >Potassium (K)</option>
				</select>

			</div>

		

			<div id='first-step' style='display: none;'>
				<h3 id='f-heading' style='width: 25vw; font-size: 1.4vw;' >Step :1 Start the supply voltage</h3>
					<button id ='st-btn-1' class='btn btn-success' style='font-size: 1.6vw;' onclick='use_setup();' >Start</button>

					<div id='all-btn' style='display: none;'>

						<h3 id='s-heading' style='width: 25vw; font-size: 1.4vw;' >Step :2 Observe and add readings</h3>

						<p>Move slider to set voltage</p>
						<span><input type='range' min='-2' max='2' step='0.01' value='0' id ='set-voltage'      onchange='set_voltage();' style='display: inline; width: 20vw; font-size: 1.2vw;' /></span>

						<br><br>
						<span><button id ='f-plus' class='btn btn-dark' style='display: inline; width: 10vw; font-size: 1.2vw;' onclick='inc_freq()' >Decrease frequency</button></span>

						<span><button id ='f-minus' class='btn btn-dark' style='display: inline; width: 10vw; font-size: 1.2vw;' onclick='dec_freq()' >Increase frequency</button></span>

						<br> <br>

						<span><button id ='i-plus' onclick='i_dec();' class='btn btn-dark' style='display: inline; width: 10vw; font-size: 1.2vw;'>Decrease Intensity</button></span>

						<span><button id ='i-minus' onclick='i_inc();' class='btn btn-dark' style='display: inline; width: 10vw; font-size: 1.2vw;'>Increase Intensity</button></span>

						<br> <br>

						<div id='section-1'>
							<input type='text' id='frequency-dsp' style='width: 20vw; font-1.1vw;' value='Frequency: ' />
							<br>
							<input type='text' id='voltage-dsp' style='width: 20vw; font-1.1vw;' value='Voltage: ' />
							<br><br>
							<button id ='add-reading' class='btn btn-dark' style='width: 10vw; font-size: 1.2vw;' disabled onclick='add_readings_in_obs();' >Add Reading</button>
						<br> <br>
						</div>

					</div>
			</div>

         </div>
     `;
    pp.addtoleftpannel(left_panel_text);
    //define the canvas
    pp.addcanvas('mycanvas');
    // pp.addtorightpannel(question_div_box, 3);
    pp.showscore(0, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
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
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
    //load_colors();
    window.addEventListener('click', (event) => a3_mouseclick(event));
    obs_table = [[]];
    load_obs_table();
}
function a3_mouseclick(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    //draw scene
    //scene.draw();
}
function a2_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a2_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function customize_canvas4() {
    let offcanvsbtn = (document.getElementsByClassName('offcanvasbtn')[1]);
    let offcanvsicon = (document.getElementsByClassName('bi bi-arrow-bar-left offcanvasicon')[1]);
    offcanvsbtn.style.position = 'absolute';
    offcanvsbtn.style.top = '5vw';
    offcanvsicon.className = 'bi bi-table offcanvasicon';
    let offcanvas4_body = (document.getElementById('offcanvasRight4'));
    offcanvas4_body.style.width = '70vw';
    offcanvas4_content = document.getElementById('pannel4');
}
function simulate_light(frequency, intensity) {
    let light = document.getElementById('light-sim');
    if (frequency == null) {
        light.style.display = 'none';
        return;
    }
    light.style.display = 'block';
    light.style.backgroundColor = frequencyToRGB(frequency / (1e12));
    light.style.opacity = intensity.toString();
    //light.style.opacity = 
}
function select_metal() {
    let ele_0 = (document.getElementById('zero-step'));
    let ele_1 = (document.getElementById('first-step'));
    let dd_ele = (document.getElementById('metal-dd'));
    if (dd_ele.value == '') {
        alert('You need to select metal to continue.');
        return;
    }
    selected_metal = parseInt(dd_ele.value);
    ele_0.style.display = 'none';
    ele_1.style.display = 'block';
    let dsp = document.getElementById('dis-stp-pot');
    dsp.value = '00.00 Volts';
    simulate_light(null, 0);
}
function use_setup() {
    let ele_0 = (document.getElementById('st-btn-1'));
    let ele_1 = (document.getElementById('all-btn'));
    let ele_2 = (document.getElementById('f-heading'));
    let dsp = document.getElementById('dis-stp-pot');
    ele_0.style.display = 'none';
    ele_2.style.display = 'none';
    ele_1.style.display = 'block';
    current_voltage = sim_data[current_i][7 + selected_metal];
    current_freq = sim_data[current_i][4];
    update_display(current_voltage, current_freq);
    dsp.value = `${current_voltage} Volts`;
    simulate_light(current_freq, intensity);
}
function set_voltage() {
    let add_btn = (document.getElementById('add-reading'));
    add_btn.className = 'btn btn-success';
    add_btn.disabled = true;
    let slider = (document.getElementById('set-voltage'));
    current_voltage = parseFloat(parseFloat(slider.value).toFixed(2));
    update_display(current_voltage, current_freq);
    let dsp = document.getElementById('dis-stp-pot');
    dsp.value = `${current_voltage} Volts`;
    simulate_light(current_freq, intensity);
}
function inc_freq() {
    let add_btn = (document.getElementById('add-reading'));
    add_btn.className = 'btn btn-success';
    add_btn.disabled = true;
    current_i++;
    if (current_i < 7) {
        current_freq = sim_data[current_i][4];
        update_display(current_voltage, current_freq);
        let dsp = document.getElementById('dis-stp-pot');
        dsp.value = `${current_voltage} Volts`;
        simulate_light(current_freq, intensity);
    }
    else {
        current_i--;
    }
}
function dec_freq() {
    let add_btn = (document.getElementById('add-reading'));
    add_btn.className = 'btn btn-success';
    add_btn.disabled = true;
    current_i--;
    if (current_i > -1) {
        current_freq = sim_data[current_i][4];
        update_display(current_voltage, current_freq);
        let dsp = document.getElementById('dis-stp-pot');
        dsp.value = `${current_voltage} Volts`;
        simulate_light(current_freq, intensity);
    }
    else {
        current_i++;
    }
}
function update_display(voltage, frequency) {
    let v_dsp = (document.getElementById('frequency-dsp'));
    let f_dsp = (document.getElementById('voltage-dsp'));
    let add_btn = (document.getElementById('add-reading'));
    if (!voltage || !frequency) {
        alert('No emission of electrons');
        return;
    }
    else {
        v_dsp.value = 'Stopping Potential: ' + voltage + ' v';
        f_dsp.value = 'Frequency: ' + frequency / 1e12 + ' THz';
    }
    if (current_voltage < -sim_data[current_i][8 + selected_metal]) {
        add_btn.className = 'btn btn-success';
        add_btn.disabled = false;
        return;
    }
    if (!sim_data[current_i][8 + selected_metal]) {
        add_btn.className = 'btn btn-success';
        add_btn.disabled = false;
        return;
    }
    add_btn.className = 'btn btn-success';
    add_btn.disabled = true;
}
function load_obs_table() {
    let header = [
        `Sr no.`,
        `Color`,
        `&lambda; (nm)`,
        'frequency (Thz)',
        'Stopping Potential (Volts)',
    ];
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, obs_table, [0], [[4]], '', offcanvas4_content, true, true, () => { }, 5);
    tab.load_table();
}
function add_readings_in_obs() {
    let header = [
        `Sr no.`,
        `Color`,
        `&lambda; (nm)`,
        'frequency (Thz)',
        'Stopping Potential (Volts)',
    ];
    offcanvas4_content.innerHTML = '';
    if (obs_index == 0) {
        obs_table = [];
    }
    if (current_i > 4) {
        alert('There is no emission of electrons for this value, Click add reading if you want to add this reading.');
    }
    // check for duplicate entries
    for (let i = 0; i < sim_data.length; i++) {
        if (sim_data[current_i][2] == obs_table[1]) {
            alert('You have already taken reading for the same frequency value');
            return;
        }
    }
    let arr = [
        obs_index + 1,
        sim_data[current_i][2],
        sim_data[current_i][3],
        parseInt((sim_data[current_i][4] / 1e12).toFixed(0)),
        sim_data[current_i][8 + selected_metal] != null ? current_voltage : 5,
    ];
    obs_table.push(arr);
    let tab = new Verify_Rows_Cols_Custom_Fixed_Update1(header, obs_table, [obs_index], [[4]], '', offcanvas4_content, true, true, () => {
        let add_btn = (document.getElementById('add-reading'));
        add_btn.className = 'btn btn-success';
        add_btn.disabled = false;
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
        bsOffcanvas.hide();
        if (obs_index == 5) {
            activity4();
        }
    }, 3);
    tab.load_table();
    let bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
    obs_index++;
}
function frequencyToRGB(frequency) {
    // Define the range of visible light in THz
    const minFreq = 400; // THz (red)
    const maxFreq = 790; // THz (violet)
    if (frequency < minFreq || frequency > maxFreq) {
        return "rgb(0,0,0)"; // Out of visible range, return black
    }
    let wavelength = 3e8 / (frequency * 1e12); // Convert frequency to wavelength in meters
    let R = 0, G = 0, B = 0;
    if (wavelength >= 620e-9) { // Red
        R = 255;
        G = Math.round(255 * (680e-9 - wavelength) / (680e-9 - 620e-9));
        B = 0;
    }
    else if (wavelength >= 590e-9) { // Orange
        R = 255;
        G = Math.round(255 * (620e-9 - wavelength) / (620e-9 - 590e-9));
        B = 0;
    }
    else if (wavelength >= 570e-9) { // Yellow
        R = 255;
        G = 255;
        B = 0;
    }
    else if (wavelength >= 495e-9) { // Green
        R = Math.round(255 * (wavelength - 495e-9) / (570e-9 - 495e-9));
        G = 255;
        B = 0;
    }
    else if (wavelength >= 450e-9) { // Blue
        R = 0;
        G = Math.round(255 * (wavelength - 450e-9) / (495e-9 - 450e-9));
        B = 255;
    }
    else { // Violet
        R = Math.round(255 * (450e-9 - wavelength) / (450e-9 - 400e-9));
        G = 0;
        B = 255;
    }
    return `rgb(${R}, ${G}, ${B})`;
}
function i_inc() {
    if (intensity < 20) {
        intensity += 0.05;
        simulate_light(current_freq, intensity);
    }
    else {
        alert("Maximum Intensity Reached");
    }
}
function i_dec() {
    if (intensity > 0) {
        intensity -= 0.05;
        simulate_light(current_freq, intensity);
    }
    else {
        alert("Minimum Intensity Reached");
    }
}
// activity3();
//# sourceMappingURL=activity3.js.map