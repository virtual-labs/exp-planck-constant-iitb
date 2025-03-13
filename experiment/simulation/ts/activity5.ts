declare var Show_Table_Custom_Fixed;
declare var Updated_Question;

function activity5() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);
	


	pp.showtitle(
		`<p id="exp-title" style='width: 18vw;'>Study the Plot</span><p>`,
		3
	);

	pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 17px;">Here we will study the plot to analyse Input and Output Characteristics </div>` , 3);


	var bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById('offcanvasRight3')
	);
	bsOffcanvas.show();

	let left_panel_text = `
         <div id='act5-left-content' style="position: absolute; font-size: 1.6vw;">

            <div id='t-5'></div>

            <br>
            <div id='q1'></div>
            <br>
            <div id='q2'></div>

         </div>
     `;

	pp.addtoleftpannel(left_panel_text);

	//define the canvas
	pp.addcanvas('mycanvas');
	//pp.addtorightpannel(question_div_box, 3);
	//pp.showscore(0, 3);
	canvas = pp.canvas;
	context = canvas.getContext('2d');

	a5_windowresize();


    let header = [`Sr no.`, `&Delta;I<sub>C</sub> mA`, `&Delta;I<sub>B</sub> &mu;A`, '&beta;', '&alpha;'];

	   
	let parent: HTMLDivElement = <HTMLDivElement> document.getElementById('t-5');

    let tab = new Show_Table_Custom_Fixed(header, calc_table, parent, 4);


	tab.load_table();
    load_questions();

}

function a5_windowresize() {
	//canvas size
	a5_canvas_size();

	//canvas mapping
	a5_canvas_mapping();

}

function a5_canvas_size() {
	canvas.width = window.innerWidth * 0.91;
	canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
	lscale = canvas.width / 1920.0;
	document.getElementById('leftpannel').style.height =
		canvas.height + 5 + 'px';
	document.getElementById('leftpannel').style.margin = '0';
}


function a5_canvas_mapping() {
	context.translate(0, canvas.height);
	context.scale(1, -1);
}

function load_questions() {

    //for question 1
    let parent: HTMLDivElement = <HTMLDivElement> document.getElementById('q1');
    let q1_obj = new Updated_Question(
        `The collector current I<sub>C</sub> is X times the base current, where is average value of X is ?`,
        [
            '10',
            '100',
            '1000',
            '10000'
        ],
        '2',
        parent,
        activity6
    );

    q1_obj.load_question();

}

//activity5();