


//experiment variables

let mode: number = 0;  // 0 for input characterisitcs and 1 for output characterisitics

let exp_data = [
	
  ]

let input_ch = [
	{
		'vce': 0,
		'vbe': [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
		'ib': [0, 0.5, 2.1, 6.2, 7.9, 11.4, 14.4, 18.4, 29, 47, 76]
	},

	{
		'vce': 2,
		'vbe': [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
		'ib': [0, 0.4, 1.8, 5.1, 6.8, 10.3, 13.3, 17.3, 27, 44, 72]
	},

	{
		'vce': 4,
		'vbe': [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
		'ib': [0, 0.3, 1.5, 4, 5.7, 9.2, 12.2, 16.2, 25, 41, 68]
	},

	{
		'vce': 6,
		'vbe': [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
		'ib': [0, 0.2, 1.2, 2.9, 4.6, 8.1, 11.1, 15.1, 23, 38, 64]
	},

	{
		'vce': 8,
		'vbe': [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
		'ib': [0, 0.1, 0.9, 1.8, 3.5, 7, 10, 14, 21, 35, 60]
	}
]

let output_ch = [
	{
		'ib': 10,
		'vce': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'ic': [0, 0.7, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	},


	{
		'ib': 20,
		'vce': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'ic': [0, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1]
	},

	{
		'ib': 30,
		'vce': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'ic': [0, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1]
	},

	{
		'ib': 40,
		'vce': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'ic': [0, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2]
	},

	{
		'ib': 50,
		'vce': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'ic': [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	}
	
]

let inp_sim_ib: number = 0;
let inp_sim_ic: number = 0;
let inp_sim_vce: number = 0;
let inp_sim_vbe: number = 0;

let out_sim_ib: number = 0;
let out_sim_ic: number = 0;
let out_sim_vce: number = 0;
let out_sim_vbe: number = 0;

let input_observation_table: number[][] = [

		[
			1,
			0.1,
			0.3
		],
		[
			2,
			0.3,
			4
		],
		[
			3,
			0.4,
			5.7
		],
		[
			4,
			0.6,
			12.2
		],
		[
			5,
			0.8,
			25
		]

];

let output_observation_table: number[][] = [
	[0, 1, 2.1],
	[1, 2,  2.1],
	[2, 3, 2.1],
	[3, 4, 2.1],
	[4, 5, 2.1]
];

let current: number = 2;
let d: number = 0;
let x: number = 10;
let x1 = 0;
let d1 = 0;


let calc_table: number[][] = [];


//[1, 10, 2, 0.995, 0.009999]


let sim_data: any[][] = [];


//planks constant, e, color, lambda(nm), frequency h(z), Sodium (workfunction), Cs (workfunction), Cs (workfunction), Na (C), Cs (C), K (C)
sim_data = [
	[6.62e-34, 1.602e-19, 'violet', 380, 789e12, 2.27, 1.9, 2, 0.99, 1.36, 1.26],
	[6.62e-34, 1.602e-19, 'blue', 450, 666e12, 2.27, 1.9, 2, 0.48, 0.85, 0.75],
	[6.62e-34, 1.602e-19, 'cyan', 485, 618e12, 2.27, 1.9, 2, 0.29, 0.66, 0.56],
	[6.62e-34, 1.602e-19, 'green', 500, 600e12, 2.27, 1.9, 2, 0.21, 0.58, 0.48],
	[6.62e-34, 1.602e-19, 'Yellow', 570, 526e12, null,null, null, null, null],
	[6.62e-34, 1.602e-19, 'Orange', 590, 508e12, null,null, null, null, null],
	[6.62e-34, 1.602e-19, 'Red', 620, 484e12, null,null, null, null, null]
]

let current_freq: number = 0;
let current_voltage: number = 0;
let current_work_function: number = 0;
let selected_metal: number = 0;
let current_i: number = 0;

const planks_constant: number = 6.62e-34;
const e_charge: number = 1.602e-19;

let obs_table = [
    [
        1,
        "violet",
        380,
        789,
        -1.33
    ],
    [
        2,
        "blue",
        450,
        666,
        -1.01
    ],
    [
        3,
        "cyan",
        485,
        618,
        -0.71
    ],
    [
        4,
        "green",
        500,
        600,
        -0.55
    ],
    [
        5,
        "red",
        620,
        484,
        5
    ]
];




					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
