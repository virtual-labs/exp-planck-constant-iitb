function activity6() {
	pp.clearleftpannel();
	pp.clearrightpannel();

	let left_panel_text = `
         <div id='act5-left-content' style="position: absolute; font-size: 24px; text-align: center;">
                Experiment Completed Successfully!!

         </div>
     `;

	pp.addtoleftpannel(left_panel_text);

	//define the canvas
	pp.addcanvas('mycanvas');
	//pp.addtorightpannel(question_div_box, 3);
	//pp.showscore(0, 3);
	canvas = pp.canvas;
	context = canvas.getContext('2d');

	a6_windowresize();

}

function a6_windowresize() {
	//canvas size
	a6_canvas_size();

	//canvas mapping
	a6_canvas_mapping();

}

function a6_canvas_size() {
	canvas.width = window.innerWidth * 0.91;
	canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
	lscale = canvas.width / 1920.0;
	document.getElementById('leftpannel').style.height =
		canvas.height + 5 + 'px';
	document.getElementById('leftpannel').style.margin = '0';
}


function a6_canvas_mapping() {
	context.translate(0, canvas.height);
	context.scale(1, -1);
}
