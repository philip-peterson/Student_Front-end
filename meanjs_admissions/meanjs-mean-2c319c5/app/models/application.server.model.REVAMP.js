'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    countryList = '../../public/lib/angularjs-country-select/angular.country-select.js'.countries,
	Schema = mongoose.Schema;

var simpleStringValidator = function(property) {
	return (property !== null && property.length > 1);		//first check is because an empty string crashes property.length call
};
var nameValidate = [simpleStringValidator, 'Put your name in, yo'];

var indexUpdate = function(index, value) {
	this.set(index, value);
	this.save();
};
/*
var ApplicationSchema = new Schema({
	f_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 0}, validate: },
	m_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 1}, validate: },
	l_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 2}, validate: },
	suffix: 		{value: {type: String, default: '', enum:['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V']}, index: {type: Number, default: 3}},
	o_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 4}, validate: },
	has_ssn: 		{value: {type: Boolean, default: false}, index: {type: Number, default: 5}},			//Straightup Booleans might end up a lot simpler than this
	ssn: 			{value: {type: String, default: ''}, index: {type: Number, default: 6}, validate: },	//reconsider definitely
	ufid: 			{value: {type: String, default: ''}, index: {type: Number, default: 7}, validate: },
	completion_percent: 	{value: {type: Number, default: 0}, index {type: Number, default: 8}},
	optional_completed: 	{value: {type: Number, default: 0}, index {type: Number, default: 9}},
	prev_application: 		{value: {type: Boolean, default: false}, index: {type: Number, default: 10}},
	prev_attend: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 11}},
	app_started: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 12}},
	app_complete: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 13}},
	birth_month: 	{value: {type: Boolean, default: '', enum: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']},
															 index: {type: Number, default: 14}},
	birth_day: 		{value: {type: Number, min: 1, max: 30}, index {type: Number, default: 15}},		//Need default for day?
	birth_year: 	{value: {type: Number, min: 1920, max: 2020}, index {type: Number, default: 16}},	//NEED NON-STATIC YEAR MAX/MIN LIMITS
	dateofbirth: 	{value: {type: Date}, index: {type: Number, default: 17}},
	gender: 		{value: {type: String, default: '', enum: ['', 'Male', 'Female']}, index: {type: Number, default: 18}},
	nationality: 	{value: {type: String, default: '', enum: countryList}, index: {type: Number, default: 19}},
	eth_hispanic: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 20}},
	eth_amer_ind: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 21}},
	eth_asian: 		{value: {type: Boolean, default: false}, index: {type: Number, default: 22}},
	eth_black: 		{value: {type: Boolean, default: false}, index: {type: Number, default: 23}},
	eth_pac_isl: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 24}},
	eth_white: 		{value: {type: Boolean, default: false}, index: {type: Number, default: 25}},
	email: 			{value: {type: String, default: ''}, index: {type: Number, default: 26}, validate: },
	pers_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 27}, intl: {type: Boolean, default: false}, validate: },
	work_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 28}, intl: {type: Boolean, default: false}, validate: },
	cell_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 29}, intl: {type: Boolean, default: false}, validate: },
	perm_addr_str: 	{value: {type: String, default: ''}, index: {type: Number, default: 30}, validate: },
	perm_addr_cit: 	{value: {type: String, default: ''}, index: {type: Number, default: 31}, validate: }, 
	perm_addr_sta: 	{value: {type: String, default: ''}, index: {type: Number, default: 32}, validate: }, 
	perm_addr_cnt: 	{value: {type: String, default: ''}, index: {type: Number, default: 33}, validate: }, 
	perm_addr_zip: 	{value: {type: String, default: ''}, index: {type: Number, default: 34}, validate: }, 
	curr_addr_str: 	{value: {type: String, default: ''}, index: {type: Number, default: 35}, validate: }, 
	curr_addr_cit: 	{value: {type: String, default: ''}, index: {type: Number, default: 36}, validate: }, 
	curr_addr_sta: 	{value: {type: String, default: ''}, index: {type: Number, default: 37}, validate: }, 
	curr_addr_cnt: 	{value: {type: String, default: ''}, index: {type: Number, default: 38}, validate: }, 
	curr_addr_zip: 	{value: {type: String, default: ''}, index: {type: Number, default: 39}, validate: }, 
	curr_addr_val: 	{value: {type: Date}, index: {type: Number, default: 40}, validate: },
	e_f_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 41}, validate: },
	e_m_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 42}, validate: },
	e_l_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 43}, validate: },
	e_suffix: 		{value: {type: String, default: '', enum:['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V']}, index: {type: Number, default: 44}},
	e_o_name: 		{value: {type: String, default: ''}, index: {type: Number, default: 45}, validate: },
	e_relation: 	{value: {type: String, default: '', enum:['']}, index: {type: Number, default: 46}},		//Not sure if ENUM for dropdown or validate
	e_addr_str: 	{value: {type: String, default: ''}, index: {type: Number, default: 47}, validate: }, 
	e_addr_cit: 	{value: {type: String, default: ''}, index: {type: Number, default: 48}, validate: }, 
	e_addr_sta: 	{value: {type: String, default: ''}, index: {type: Number, default: 49}, validate: }, 
	e_addr_cnt: 	{value: {type: String, default: ''}, index: {type: Number, default: 50}, validate: }, 
	e_addr_zip: 	{value: {type: String, default: ''}, index: {type: Number, default: 51}, validate: }, 
	e_pers_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 52}, intl: {type: Boolean, default: false}, validate: },
	e_work_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 53}, intl: {type: Boolean, default: false}, validate: },
	e_cell_phone: 	{value: {type: String, default: ''}, index: {type: Number, default: 54}, intl: {type: Boolean, default: false}, validate: },
	vet_active: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 55}}, 
	vet_post911: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 56}}, 
	vet_benefits: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 57}}, 
	conduct_disc: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 58}}, 
	conduct_viol: 	{value: {type: Boolean, default: false}, index: {type: Number, default: 59}}, 
	spec_famu: 		
	spec_full: 		
	spec_identify: 	
	spec_mcnair: 	
	spec_mcknight: 	
	spec_natl_sci: 	
	spec_natl_hlth: 
	spec_oth_schol: 
	spec_oth_expln: 
	spec_assistant: 
	spec_distance: 	
	spec_fellow: 	
	spec_joint_deg: 
	spec_three_two: 
	supporting_doc: 
	deg_prog_term: 	
	deg_prog_goal: 	
	deg_prog_study: 
	deg_prog_spec: 	
	deg_prog_dept: 	
	deg_prog_purp: 	
	edu_ugrad_maj: 	
	edu_ugrad_spec: 
	edu_gpa_calc: 	
	edu_gpa_all: 	//will contain A, A_minus, etc...

	****import all test score variables from booleans****
	
	});
*/
var ApplicationSchema = new Schema({
	personal_info: {
		name: {
			first: 	{type: String, default: '',
				validate: nameValidate
			},
			middle: {type: String, default: ''},
			last: 	{type: String, default: '',
				validate: nameValidate
			},
			suffix: {type: String, default: '',
                enum: [         //NOTE: ALL DROPDOWN LISTS GET ENUMS for security reasons
                    '',
                    'None',
                    'Jr.',
                    'Sr.',
                    'II',
                    'III',
                    'IV',
                    'V'
                ]
			},
			other_names: {type: String, default: ''}
		},
		has_ssn: {type: Boolean, default: false},
        ssn: {
        	type: Number,
            min: 0,				//ASSUMPTION: SSN does not start with a 0
            max: 999999999      //SSN is 9 digits
		},
        ufid: {
			type: String,		//Changed Number to String because it needs to be 8 digits
			unique: true,		//'For now, the name will uniquely id things',
			required: true,		//'Required'
		},
		completion_percent: {
			type: Number,
			default: 0,
            //min: 0,
            //max: 100 //this shouldn't require validation
		},
		optional_completion: 	{type: Number, default: 0},
        previous_application: 	{type: Boolean, default: false},
        previous_attendance: 	{type: Boolean, default: false},
		application_started: 	{type: Boolean, default: false},
		application_complete: 	{type: Boolean, default: false},
        dob: Date,		//redundant with next section?
		bd: {
			month: {type: String, default: '',
                enum: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			},
			day: {
				type: Number,  //String? Really guys?
				default: '',
                min: 1,
                max: 30 
			},
			year: {type: Number, 
				/* keeps returning "NaN" for min/max values, having trouble subtracting from correctly cast this_year
                min: (this_year - 100),	//ASSUMPTIONS: Applicants can never be
                max: (this_year - 10) 	//older than 100 or younger than 10 years
                */
			},
		},
        gender: {type: String, default: '',
            enum: ['', 'Male', 'Female']
		},
        nationality: {type: String, default: '',
            enum: countryList
		},
        ethnicity: {
            hispanic: 			{type: Boolean, default: true},
            american_indian: 	{type: Boolean, default: true},
			asian: 				{type: Boolean, default: true},
			black: 				{type: Boolean, default: true},
			pacific_islander: 	{type: Boolean, default: true},
			white: 				{type: Boolean, default: true}
        },
        email: {type: String, default: ''},
        phone: {
            personal: {
                number: Number,
                call: {type: String, default: ''},
            },
            work: {
                number: Number,
                call: {type: String, default: ''},
            },
            cell: {
                number: Number,
                call: {type: String, default: ''},
            }
        },
        address: {
            permanent: {
				street: 	{type: String, default: ''},
				city: 		{type: String, default: ''},
				state: 		{type: String, default: ''},
				country: 	{type: String, default: ''},
				zip: 		{type: String, default: ''}
			},
            current: {
				street: 	{type: String, default: ''},
				city: 		{type: String, default: ''},
				state: 		{type: String, default: ''},
				country: 	{type: String, default: ''},
				zip: 		{type: String, default: ''}
			},
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: 			{type: String, default: ''},
                middle: 		{type: String, default: ''},
                last: 			{type: String, default: ''},
                suffix: 		{type: String, default: ''},
                other_names: 	{type: String, default: ''},
                relationship: 	{type: String, default: ''},
            },
            address: {
				street: 	{type: String, default: ''},
				city: 		{type: String, default: ''},
				state: 		{type: String, default: ''},
				country: 	{type: String, default: ''},
				zip: 		{type: String, default: ''},
            },
            phone: {
                personal: {
	                number: Number,
   	            	call: {type: String, default: ''},
   	        	},
   	        	work: {
   	            	number: Number,
   	        	    call: {type: String, default: ''},
   	       	  	},
   	    	     cell: {
   	    	        number: Number,
   	 	        	call: {type: String, default: ''},
   	    	    }
    	    }
        },
        veteran_status: {
            active_veteran: Boolean,
            post_sep11: Boolean,
            eligible_va_benefits: Boolean
        },
        conduct_disclosure: {
            charged_or_disciplined: Boolean,
            charged_law_violation: Boolean
        }
    },
    special_programs_info: {
        special_programs_application: {
            famu_feeder: 				{type: String, default: ''},
            fullbright_scholar: 		{type: String, default: ''},
			please_identify_program: 	{type: String, default: ''},
            mcnair_scholar: 			{type: String, default: ''},
            mcknight_scholar: 			{type: String, default: ''},
            national_science_foundation_fellowship: 	{type: String, default: ''},
            national_institutes_of_health_fellowship: 	{type: String, default: ''},
            other: {
				scholarship: 	{type: String, default: ''},
				explain: 		{type: String, default: ''},
			},
            check_following: {
				assistantship: 		{type: Boolean, default: false},
				distance_learning: 	{type: Boolean, default: false},
				fellowship: 		{type: Boolean, default: false},
				joint_UF_degree: 	{type: Boolean, default: false},
				three_two_program: 	{type: Boolean, default: false}
			}/* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */ 
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: 	{type: String, default: ''},
            degree_goal: 				{type: String, default: ''},
            program_of_study: 			{type: String, default: ''},
            program_specialization: 	{type: String, default: ''},
            department_contact: 		{type: String, default: ''}
        },
        statement_of_purpose: 			{type: String, default: ''},
    },
    education_and_activities: {
        undergraduate: {
            major: 				{type: String, default: ''},
            specialization: 	{type: String, default: ''},
        },
        self_reported_gpa: {
        	GPA: 		{type: Number, default: 0},
			A: 			{type: Number, default: 0},
			A_minus: 	{type: Number, default: 0},
			B_plus: 	{type: Number, default: 0},
			B: 			{type: Number, default: 0},
			B_minus: 	{type: Number, default: 0},
			C_plus: 	{type: Number, default: 0},
			C: 			{type: Number, default: 0},
			C_minus: 	{type: Number, default: 0},
			D_plus: 	{type: Number, default: 0},
			D: 			{type: Number, default: 0},
			D_minus: 	{type: Number, default: 0},
			F: 			{type: Number, default: 0}
		},
        test_scores: {
            gre: {
            	taken: 					{type:Boolean, default: false},
            	date: 	Date,
            	verbal: 				{type: Number, default: 0},
                quantitative: 			{type: Number, default: 0},
                analytical_writing: 	{type: Number, default: 0},
                total: 					{type: Number, default: 0}
            },
            gmat: {
            	taken: 					{type:Boolean, default: false},
                date: Date,
                verbal: 				{type: Number, default: 0},
                quantitative: 			{type: Number, default: 0},
                analytical_writing: 	{type: Number, default: 0},
                integrated_reasoning: 	{type: Number, default: 0},
                total: 					{type: Number, default: 0}
            },
            mat: {
            	taken: {type: Boolean, default: false},
                date: 	Date,
                score: {type: Number, default: 0}
            },
            fe: {
            	taken: {type: Boolean, default: false},
                date: 	Date,
                score: {type: Number, default: 0}
            },
            toefl: {
            	taken: 		{type: Boolean, default: false},
                paper_date: Date,
                listening: 	{type: Number, default: 0},
                writing: 	{type: Number, default: 0},
                reading: 	{type: Number, default: 0},
                total: 		{type: Number, default: 0},
                internet_date: Date,
                readingi: 	{type: Number, default: 0},
                listeningi: {type: Number, default: 0},
                speakingi: 	{type: Number, default: 0},
                writingi: 	{type: Number, default: 0},
                totali: 	{type: Number, default: 0}
            },
            ielts: {
            	taken: 		{type: Boolean, default: false},
                date: 		Date,
                listening: 	{type: Number, default: 0},
                writing: 	{type: Number, default: 0},
                reading: 	{type: Number, default: 0},
                speaking: 	{type: Number, default: 0},
                total: 		{type: Number, default: 0}
            },
            melab: {
            	taken: 			{type: Boolean, default: false},
                date: 			Date,
                composition: 	{type: Number, default: 0},
                listening: 		{type: Number, default: 0},
                gcvr: 			{type: Number, default: 0},
                total: 			{type: Number, default: 0}
            },
            uf_lang_institute_program: {type: Boolean, default: false}
        },
        activities: {
            activity: 	{type: String, default: ''},
            city: 		{type: String, default: ''},
            country: 	{type: String, default: ''},
            state: 		{type: String, default: ''},
            from: 		{type: String, default: ''},
            day1: 		{type: String, default: ''},
            to: 		{type: String, default: ''},
            day2: 		{type: String, default: ''}
        },
        resume: {
            name: String,
            file: Buffer
        },
        transcript: {
            name: String,
            file: Buffer
        }
    },
    residency_affadivit: {
        florida_residence_categories: {
    	    A: {type: Boolean, default: false},
       	 	B: {type: Boolean, default: false},
			C: {type: Boolean, default: false},
			D: {type: Boolean, default: false},
			E: {type: Boolean, default: false},
			F: {type: Boolean, default: false},
			G: {type: Boolean, default: false},
			H: {type: Boolean, default: false},
			I: {type: Boolean, default: false},
			J: {type: Boolean, default: false},
			K: {type: Boolean, default: false},
			L: {type: Boolean, default: false},
			M: {type: Boolean, default: false},
			N: {type: Boolean, default: false},
			O: {type: Boolean, default: false},
			P: {type: Boolean, default: false},
			Q: {type: Boolean, default: false},
			R: {type: Boolean, default: false},
			S: {type: Boolean, default: false},
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    completed_fields: {
    	type: [Boolean],	//Boolean array, not sure how to declare 125 values
    	default: false,
    },
});

/*
schema.post('init', function (doc) {
  ***set 125 Booleans of completed_fields all to false***
})

/*
ApplicationSchema.pre('save', function(next) {

	next();
});

/*		Generic. Going to save valid parts if possible. Not sure if should occur pre or post validate (pre requires self-validate)
schema.post('validate', function (doc) {
  //console.log('%s has been validated (but not saved yet)', doc._id);
})
*/
mongoose.model('ApplicationRevamp', ApplicationSchema);