'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    countryList = '../../public/lib/angularjs-country-select/angular.country-select.js'.countries,
    //email = 'user.server.model.js'.UserSchema.email,	Trying to get default email to be already filled
	Schema = mongoose.Schema;

var simpleStringValidator = function(property) {
	return property.length > 0;
};
var nameValidate = [simpleStringValidator, 'Put your name in, yo'];

//var this_year = {type: Number, default: Date.prototype.getFullYear().cast};	(trying to) use in min/max of dob year


var ApplicationSchema = new Schema({
	personal_info: {
		name: {
			first: {
				type: String,
				default: '',
				validate: nameValidate
			},
			middle: {
				type: String,
				default: '',
			},
			last: {
				type: String,
				default: '',
				validate: nameValidate
			},
			suffix: {
				type: String,
				default: '',
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
			other_names: {
				type: String,
				default: '',
			},
		},
		has_ssn: {
			type: Boolean,
			default: false
		},
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
        previous_application: {
			type: Boolean,
			default: false
		},
        previous_attendance: {
			type: Boolean,
			default: false

		},
		application_started: {
			type: Boolean,
			default: false
		},
		application_complete: {
			type: Boolean,
			default: false
		},
        dob: Date,		//redundant with next section?
		bd: {
			month: {
				type: String,
				default: '',
                enum: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			},
			day: {
				type: Number,  //String? Really guys?
				default: '',
                min: 1,
                max: 30 
			},
			year: {
				type: Number,
				/* keeps returning "NaN" for min/max values, having trouble subtracting from correctly cast this_year
                min: (this_year - 100),	//ASSUMPTIONS: Applicants can never be
                max: (this_year - 10) 	//older than 100 or younger than 10 years
                */
			},
		},
        gender: {
			type: String,
			default: '',
            enum: ['', 'Male', 'Female']
		},
        nationality: {
			type: String,
			default: '',
            enum: countryList
		},
        ethnicity: {
            hispanic: {type: Boolean, default: true},
            american_indian: {type: Boolean, default: true},
			asian: {type: Boolean, default: true},
			black: {type: Boolean, default: true},
			pacific_islander: {type: Boolean, default: true},
			white: {type: Boolean, default: true}
        },
        email: {
			type: String,
			default: ''
			//default: 'user.server.model.js'.email
		},
        phone: {
            personal: {
                number: {
					type: Number
				},
                call: {
					type: String,
					default: ''
				},
			
            },
            work: {
                number: {
					type: Number,
				},
                call: {
					type: String,
					default: ''
				},
            },
            cell: {
                number: {
					type: Number
				},
                call: {
					type: String,
					default: ''
				},
            }
        },
        address: {
            permanent: {
				street: {
					type: String,
					default: ''
				},
				city: {
					type: String,
					default: ''
				},
				state: {
					type: String,
					default: ''
				},
				country: {
					type: String,
					default: ''
				}
			},
            current: {
				street: String,
				city: String,
				state: String,
				country: String,
				zip: String
			},
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: String,
                middle: String,
                last: String,
                suffix: String,
                other_names: String,
                relationship: String
            },
            address: {
				street: String,
				city: String,
				state: String,
				country: String,
				zip: String
            },
            phone: {
                personal: {
                    number: Number,
                    us: String,
                    intl: String
					},
					
                work: {
                    number: Number,
                    us: String,
                    intl: String
					},

                cell: {
                    number: Number,
                    us: String,
                    intl: String
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
            famu_feeder: {
				type: String,
				default: ''
			},
            fullbright_scholar: {
				type: String,
				default: ''
			},
			please_identify_program: {
				type: String,
				default: ''
			},
            mcnair_scholar: {
				type: String,
				default: ''
			},
            mcknight_scholar: {
				type: String,
				default: ''
			},
            national_science_foundation_fellowship: {
				type: String,
				default: ''
			},
            national_institutes_of_health_fellowship: {
				type: String,
				default: ''
			},
            other: {
				scholarship: {
					type: String,
					default: ''
				},
				explain: {
					type: String,
					default: ''
				}
			},
            check_following: {
				assistantship: {
					type: Boolean,
					default: false
				},
				distance_learning: {
					type: Boolean,
					default: false
				},
				fellowship: {
					type: Boolean,
					default: false
				},
				joint_UF_degree: {
					type: Boolean,
					default: false
				},
				three_two_program: {
					type: Boolean,
					default: false
				}
			}/* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */ 
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: String,
            degree_goal: String,
            program_of_study: String,
            program_specialization: String,
            department_contact: String
        },
        statement_of_purpose: String
    },
    education_and_activities: {
        undergraduate: {
            major: {
				type: String,
				default: ''
			},
            specialization: {
				type: String,
				default: ''
			}
        },
        self_reported_gpa: {

        	GPA: {

        		type: Number,
        		default: 0
        	},
			A: {
				type: Number,
				default: 0
			},
			A_minus: {
				type: Number,
				default: 0
			},
			B_plus: {
				type: Number,
				default: 0
			},
			B: {
				type: Number,
				default: 0
			},
			B_minus: {
				type: Number,
				default: 0
			},
			C_plus: {
				type: Number,
				default: 0
			},
			C: {
				type: Number,
				default: 0
			},
			C_minus: {
				type: Number,
				default: 0
			},
			D_plus: {
				type: Number,
				default: 0
			},
			D: {
				type: Number,
				default: 0
			},
			D_minus: {
				type: Number,
				default: 0
			},
			F: {
				type: Number,
				default: 0
			}
		},
        test_scores: {
            gre: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
            	date:Date,
            	verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },
           
            gmat: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },
            mat: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                score: Number /* String? */
            },
            fe: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                score: Number /* String? */
            },
            toefl: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                paper_date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                total: Number,
                internet_date: Date,
                readingi: Number,
                listeningi: Number,
                speakingi: Number,
                writingi: Number,
                totali: Number
            },
            ielts: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },
            melab: {
            	taken: {
            		type:Boolean,
                	default: false
            	},
                date: Date,
                composition: Number,
                listening: Number,
                gcvr: Number,
                total: Number
            },
            uf_lang_institute_program: Boolean
        },
        activities: {
            activity: {
				type: String,
				default: ''
			},
            city: String,
            country: String,
            state: String,
            from: String,
            day1: String,
            to: String,
            day2: String
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
    //Planning on using the $set operator with db.collection.update() command for these -Josh
    complete: {
    	filled: {				//No Booleans will have an associated filled Boolean
    		f_name: Boolean,	//Some info-sets have an _ALL to simplify/speed some checks
    		m_name: Boolean,	//Some boolean-sets have an _ANY for optional-but-suggested sections
    		l_name: Boolean,
    		suffix: Boolean,
    		o_name: Boolean,
    		ssn: Boolean,
    		ufid: Boolean,
    		b_month: Boolean,
    		b_day: Boolean,
    		b_year: Boolean,
    		b_day_ALL: Boolean,
    		gender: Boolean,
    		nationality: Boolean,
    		email_addr: Boolean,
    		pers_phone: Boolean,
    		work_phone: Boolean,
    		cell_phone: Boolean,
    		phone_ANY: Boolean,
    		perm_addr_str: Boolean,
    		perm_addr_cit: Boolean,
    		perm_addr_sta: Boolean,
    		perm_addr_cnt: Boolean,
    		perm_addr_zip: Boolean,
    		perm_addr_ALL: Boolean,
    		curr_addr_str: Boolean,
    		curr_addr_cit: Boolean,
    		curr_addr_sta: Boolean,
    		curr_addr_cnt: Boolean,
    		curr_addr_zip: Boolean,
    		curr_addr_val: Boolean,
    		curr_addr_ALL: Boolean,
    		e_f_name: Boolean,
    		e_m_name: Boolean,
    		e_l_name: Boolean,
    		e_suffix: Boolean,
    		e_o_name: Boolean,
    		e_relate: Boolean,
    		e_addr_str: Boolean,
    		e_addr_cit: Boolean,
    		e_addr_sta: Boolean,
    		e_addr_cnt: Boolean,
    		e_addr_zip: Boolean,
    		e_addr_ALL: Boolean,
    		e_phone_pers: Boolean,
    		e_phone_work: Boolean,
    		e_phone_cell: Boolean,
    		e_phone_ANY: Boolean,
    		e_contact_ALL: Boolean,
    		scholar_famu: Boolean,
    		scholar_fullbright: Boolean,
    		scholar_identify: Boolean,
    		scholar_mcnair: Boolean,
    		scholar_mcknight: Boolean,
    		scholar_natl_sci: Boolean,
    		scholar_natl_hlth: Boolean,
    		scholar_other_schol: Boolean,
    		scholar_other_expln: Boolean,
    		scholar_ANY: Boolean,
    		supporting_doc: Boolean,
    		degree_prog_term: Boolean,
    		degree_prog_goal: Boolean,
    		degree_prog_study: Boolean,
    		degree_prog_special: Boolean,
    		degree_prog_contact: Boolean,
    		degree_prog_purpose: Boolean,
    		degree_prog_ALL: Boolean,
    		ugrad_major: Boolean,
    		ugrad_special: Boolean,
    		gpa_calculated: Boolean,
    		test_gre_date: Boolean,
    		test_gre_verb: Boolean,
    		test_gre_qunt: Boolean,
    		test_gre_anal: Boolean,
    		test_gre_totl: Boolean,
    		test_gre_ALL: Boolean,
    		test_gmat_date: Boolean,
    		test_gmat_verb: Boolean,
    		test_gmat_qunt: Boolean,
    		test_gmat_anal: Boolean,
    		test_gmat_reas: Boolean,
    		test_gmat_totl: Boolean,
    		test_gmat_ALL: Boolean,
    		test_mat_date: Boolean,
    		test_mat_scor: Boolean,
    		test_mat_ALL: Boolean,
    		test_fe_date: Boolean,
    		test_fe_scor: Boolean,
    		test_fe_ALL: Boolean,
    		test_toefl_pdate: Boolean,
    		test_toefl_list: Boolean,
    		test_toefl_writ: Boolean,
    		test_toefl_read: Boolean,
    		test_toefl_totl: Boolean,
    		test_toefl_idate: Boolean,
    		test_toefl_iread: Boolean,
    		test_toefl_ilist: Boolean,
    		test_toefl_ispek: Boolean,
    		test_toefl_iwrit: Boolean,
    		test_toefl_itotl: Boolean,
    		test_toefl_ALL: Boolean,
    		test_ielts_date: Boolean,
    		test_ielts_list: Boolean,
    		test_ielts_writ: Boolean,
    		test_ielts_read: Boolean,
    		test_ielts_spek: Boolean,
    		test_ielts_totl: Boolean,
    		test_ielts_ALL: Boolean,
    		test_melab_date: Boolean,
    		test_melab_comp: Boolean,
    		test_melab_list: Boolean,
    		test_melab_gcvr: Boolean,
    		test_melab_totl: Boolean,
    		test_melab_ALL: Boolean,
    		active_type: Boolean,
    		active_city: Boolean,
    		active_stat: Boolean,
    		active_ctry: Boolean,
    		active_from: Boolean,
    		active_day1: Boolean,
    		active_to: Boolean,
    		active_day2: Boolean,
    		active_ALL: Boolean,
    		sub_resume: Boolean,
    		sub_trnscr: Boolean,
    		resident_aff_ANY: Boolean,
    	},
    	valid: {		//for percentage completion, favor _ALL over individuals
    		f_name: Boolean,		//anything with CHECK is used in percentage completion
    		m_name: Boolean,		//some bools exist only in filled{} like residency, as it is always "complete"
    		l_name: Boolean,
    		suffix: Boolean,
    		o_name: Boolean,
    		name_req: Boolean,				//CHECK
    		ssn: Boolean,
    		ufid: Boolean,					//OPTIONAL CHECK
    		b_month: Boolean,
    		b_day: Boolean,
    		b_year: Boolean,
    		b_day_ALL: Boolean,				//CHECK
    		gender: Boolean,				//CHECK
    		nationality: Boolean,			//CHECK
    		email_addr: Boolean,			//CHECK
    		pers_phone: Boolean,
    		work_phone: Boolean,
    		cell_phone: Boolean,
    		phone_ANY: Boolean,				//CHECK
    		perm_addr_str: Boolean,
    		perm_addr_cit: Boolean,
    		perm_addr_sta: Boolean,
    		perm_addr_cnt: Boolean,
    		perm_addr_zip: Boolean,
    		perm_addr_ALL: Boolean,			//CHECK
    		curr_addr_str: Boolean,
    		curr_addr_cit: Boolean,
    		curr_addr_sta: Boolean,
    		curr_addr_cnt: Boolean,
    		curr_addr_zip: Boolean,
    		curr_addr_val: Boolean,
    		curr_addr_ALL: Boolean,			//CHECK
    		e_f_name: Boolean,
    		e_m_name: Boolean,
    		e_l_name: Boolean,
    		e_suffix: Boolean,
    		e_o_name: Boolean,
    		e_relate: Boolean,
    		e_name_req: Boolean,			//CHECK
    		e_addr_str: Boolean,
    		e_addr_cit: Boolean,
    		e_addr_sta: Boolean,
    		e_addr_cnt: Boolean,
    		e_addr_zip: Boolean,
    		e_addr_ALL: Boolean,			//CHECK
    		e_phone_pers: Boolean,
    		e_phone_work: Boolean,
    		e_phone_cell: Boolean,
    		e_phone_ANY: Boolean,			//CHECK
    		e_contact_ALL: Boolean,
    		scholar_famu: Boolean,
    		scholar_fullbright: Boolean,
    		scholar_identify: Boolean,
    		scholar_mcnair: Boolean,
    		scholar_mcknight: Boolean,
    		scholar_natl_sci: Boolean,
    		scholar_natl_hlth: Boolean,
    		scholar_other_schol: Boolean,
    		scholar_other_expln: Boolean,
    		scholar_ANY: Boolean,			//OPTIONAL CHECK
    		supporting_doc: Boolean,
    		degree_prog_term: Boolean,
    		degree_prog_goal: Boolean,
    		degree_prog_study: Boolean,
    		degree_prog_special: Boolean,
    		degree_prog_contact: Boolean,
    		degree_prog_purpose: Boolean,
    		degree_prog_ALL: Boolean,		//CHECK
    		ugrad_major: Boolean,			//CHECK
    		ugrad_special: Boolean,
    		gpa_calculated: Boolean,		//CHECK
    		test_gre_date: Boolean,
    		test_gre_verb: Boolean,
    		test_gre_qunt: Boolean,
    		test_gre_anal: Boolean,
    		test_gre_totl: Boolean,
    		test_gre_ALL: Boolean,			//OPTIONAL CHECK
    		test_gmat_date: Boolean,
    		test_gmat_verb: Boolean,
    		test_gmat_qunt: Boolean,
    		test_gmat_anal: Boolean,
    		test_gmat_reas: Boolean,
    		test_gmat_totl: Boolean,
    		test_gmat_ALL: Boolean,			//OPTIONAL CHECK
    		test_mat_date: Boolean,
    		test_mat_scor: Boolean,
    		test_mat_ALL: Boolean,			//OPTIONAL CHECK
    		test_fe_date: Boolean,
    		test_fe_scor: Boolean,
    		test_fe_ALL: Boolean,			//OPTIONAL CHECK
    		test_toefl_pdate: Boolean,
    		test_toefl_list: Boolean,
    		test_toefl_writ: Boolean,
    		test_toefl_read: Boolean,
    		test_toefl_totl: Boolean,
    		test_toefl_idate: Boolean,
    		test_toefl_iread: Boolean,
    		test_toefl_ilist: Boolean,
    		test_toefl_ispek: Boolean,
    		test_toefl_iwrit: Boolean,
    		test_toefl_itotl: Boolean,
    		test_toefl_ALL: Boolean,		//OPTIONAL CHECK
    		test_ielts_date: Boolean,
    		test_ielts_list: Boolean,
    		test_ielts_writ: Boolean,
    		test_ielts_read: Boolean,
    		test_ielts_spek: Boolean,
    		test_ielts_totl: Boolean,
    		test_ielts_ALL: Boolean,		//OPTIONAL CHECK
    		test_melab_date: Boolean,
    		test_melab_comp: Boolean,
    		test_melab_list: Boolean,
    		test_melab_gcvr: Boolean,
    		test_melab_totl: Boolean,
    		test_melab_ALL: Boolean,		//OPTIONAL CHECK
    		active_type: Boolean,
    		active_city: Boolean,
    		active_stat: Boolean,
    		active_ctry: Boolean,
    		active_from: Boolean,
    		active_day1: Boolean,
    		active_to: Boolean,
    		active_day2: Boolean,
    		active_ALL: Boolean,			//OPTIONAL CHECK
    		sub_resume: Boolean,			//CHECK
    		sub_trnscr: Boolean,			//CHECK
    	}
    }
});

//		UNDER CONSTRUCTION
//		HOLY SHIT GUYS
//		JUST A FEW MORE HOURS

ApplicationSchema.pre('save', function(next) {
    var pi = this.personal_info;				//these are all to shorten path calls used hundreds of times below
    var si = this.special_programs_info;
    var ea = this.education_and_activities;
    var eat = ea.test_scores;
    var frc = this.residency_affadivit.florida_residence_categories;
	var filler = this.complete.filled;

	filler.f_name = !pi.name.first;					//none of compared values are booleans
	filler.m_name = !pi.name.middle;			//but, supposedly, !(value) checks to see if it is
	filler.l_name = !pi.name.last;				//null, "" (empty string), false, or 0 (for numbers)
	filler.o_name = !pi.name.other_names;
	filler.suffix = !pi.name.suffix;
	filler.ssn = !pi.has_ssn && pi.ssn;
	filler.ufid = !pi.ufid;
	filler.b_month = !pi.bd.month;
	filler.b_day = !pi.bd.day;
	filler.b_year = !pi.bd.year;
	filler.b_day_ALL = filler.b_month && filler.b_day && filler.b_year;
	filler.gender = !pi.gender;
	filler.nationality = !pi.nationality;
	filler.email_addr = !pi.email;
	filler.pers_phone = !pi.phone.personal.number;
	filler.work_phone = !pi.phone.work.number;
	filler.cell_phone = !pi.phone.cell.number;
	filler.phone_ANY = filler.pers_phone || filler.work_phone || filler.cell_phone;
	filler.perm_addr_str = !pi.address.permanent.street;
	filler.perm_addr_cit = !pi.address.permanent.city;
	filler.perm_addr_sta = !pi.address.permanent.state;
	filler.perm_addr_cnt = !pi.address.permanent.country;
	filler.perm_addr_zip = !pi.address.permanent.zip;
	filler.perm_addr_ALL = filler.perm_addr_zip && filler.perm_addr_cnt && filler.perm_addr_sta && filler.perm_addr_cit && filler.perm_addr_str;
	filler.curr_addr_str = !pi.address.current.street;
	filler.curr_addr_cit = !pi.address.current.city;
	filler.curr_addr_sta = !pi.address.current.state;
	filler.curr_addr_cnt = !pi.address.current.country;
	filler.curr_addr_zip = !pi.address.current.zip;
	filler.curr_addr_ALL = filler.perm_addr_zip && filler.perm_addr_cnt && filler.perm_addr_sta && filler.perm_addr_cit && filler.perm_addr_str;
	//filler.curr_addr_val = false;  not sure how to compare dates yet
	filler.e_f_name = !pi.emergency_contact.name.first;
	filler.e_m_name = !pi.emergency_contact.name.middle;
	filler.e_l_name = !pi.emergency_contact.name.last;
	filler.e_suffix = !pi.emergency_contact.name.suffix;
	filler.e_o_name = !pi.emergency_contact.name.other_names;
	filler.e_relate = !pi.emergency_contact.name.relationship;
	filler.e_addr_str = !pi.emergency_contact.address.street;
	filler.e_addr_cit = !pi.emergency_contact.address.city;
	filler.e_addr_sta = !pi.emergency_contact.address.state;
	filler.e_addr_cnt = !pi.emergency_contact.address.country;
	filler.e_addr_zip = !pi.emergency_contact.address.zip;
	filler.e_addr_ALL = filler.e_addr_str && filler.e_addr_cit && filler.e_addr_sta && filler.e_addr_cnt && filler.e_addr_zip;
	filler.e_phone_pers = !pi.emergency_contact.phone.personal.number;
	filler.e_phone_work = !pi.emergency_contact.phone.work.number;
	filler.e_phone_cell = !pi.emergency_contact.phone.cell.number;
	filler.e_phone_ANY = filler.e_phone_pers && filler.e_phone_work && filler.e_phone_cell;
	filler.e_contact_ALL = filler.e_f_name && filler.e_l_name && filler.e_relate && filler.e_addr_ALL && filler.e_phone_ANY;
	filler.scholar_famu = !si.special_programs_application.famu_feeder;
	filler.scholar_fullbright = !si.special_programs_application.fullbright_scholar;
	filler.scholar_identify = !si.special_programs_application.please_identify_program;
	filler.scholar_mcnair = !si.special_programs_application.mcnair_scholar;
	filler.scholar_mcknight = !si.special_programs_application.mcknight_scholar;
	filler.scholar_natl_sci = !si.special_programs_application.national_science_foundation_fellowship;
	filler.scholar_natl_hlth = !si.special_programs_application.national_institutes_of_health_fellowship;
	filler.scholar_other_schol = !si.special_programs_application.other.scholarship;
	filler.scholar_other_expln = !si.special_programs_application.other.explain;
	filler.scholar_ANY = filler.scholar_fullbright || filler.scholar_famu || filler.scholar_mcnair || filler.scholar_mcknight || filler.scholar_identify || filler.scholar_other_schol || filler.scholar_natl_sci || filler.scholar_natl_hlth;
	//filler.supporting_doc = false   implement once document uploading is implemented
	filler.degree_prog_term = !this.degree_programs.primary_program.intended_year_and_term;
	filler.degree_prog_goal = !this.degree_programs.primary_program.degree_goal;
	filler.degree_prog_study = !this.degree_programs.primary_program.program_of_study;
	filler.degree_prog_special = !this.degree_programs.primary_program.program_specialization;
	filler.degree_prog_contact = !this.degree_programs.primary_program.department_contact;
	filler.degree_prog_purpose = !this.degree_programs.primary_program.statement_of_purpose;
	filler.degree_prog_ALL = filler.degree_prog_term && filler.degree_prog_goal && filler.degree_prog_study && filler.degree_prog_special && filler.degree_prog_contact && filler.degree_prog_purpose;
	filler.ugrad_major = !ea.undergraduate.major;
	filler.ugrad_special = !ea.undergraduate.specialization;
	filler.gpa_calculated = !ea.self_reported_gpa.GPA;
	filler.test_gre_date = eat.gre.taken && !eat.gre.date;
    filler.test_gre_verb = eat.gre.taken && !eat.gre.verbal;
    filler.test_gre_qunt = eat.gre.taken && !eat.gre.quantitative;
    filler.test_gre_anal = eat.gre.taken && !eat.gre.analytical_writing;
    filler.test_gre_totl = eat.gre.taken && !eat.gre.total;
    filler.test_gre_ALL = eat.gre.taken && filler.test_gre_date && filler.test_gre_verb && filler.test_gre_qunt && filler.test_gre_anal && filler.test_gre_totl;
    filler.test_gmat_date = eat.gmat.taken && !eat.gmat.date;
    filler.test_gmat_verb = eat.gmat.taken && !eat.gmat.verbal;
    filler.test_gmat_qunt = eat.gmat.taken && !eat.gmat.quantitative;
    filler.test_gmat_anal = eat.gmat.taken && !eat.gmat.analytical_writing;
    filler.test_gmat_reas = eat.gmat.taken && !eat.gmat.integrated_reasoning;
    filler.test_gmat_totl = eat.gmat.taken && !eat.gmat.total;
    filler.test_gmat_ALL = eat.gmat.taken && filler.test_gmat_date && filler.test_gmat_verb && filler.test_gmat_qunt && filler.test_gmat_anal && filler.test_gmat_reas && filler.test_gmat_totl;
    filler.test_mat_date = eat.mat.taken && !eat.mat.date;
    filler.test_mat_scor = eat.mat.taken && !eat.mat.score;
    filler.test_mat_ALL = eat.mat.taken && filler.test_mat_date && filler.test_mat.scor;
    filler.test_fe_date = eat.fe.taken && !eat.fe.date;
    filler.test_fe_scor = eat.fe.taken && !eat.fe.score;
    filler.test_fe_ALL = eat.fe.taken && filler.test_fe_date && filler.test_fe_scor;
    filler.test_toefl_pdate = eat.toefl.taken && !eat.toefl.paper_date;
    filler.test_toefl_list = eat.toefl.taken && !eat.toefl.listening;
    filler.test_toefl_writ = eat.toefl.taken && !eat.toefl.writing;
    filler.test_toefl_read = eat.toefl.taken && !eat.toefl.reading;
    filler.test_toefl_totl = eat.toefl.taken && !eat.toefl.total;
    filler.test_toefl_idate = eat.toefl.taken && !eat.toefl.internet_date;
    filler.test_toefl_iread = eat.toefl.taken && !eat.toefl.readingi;
    filler.test_toefl_ilist = eat.toefl.taken && !eat.toefl.listeningi;
    filler.test_toefl_ispek = eat.toefl.taken && !eat.toefl.speakingi;
    filler.test_toefl_iwrit = eat.toefl.taken && !eat.toefl.writingi;
    filler.test_toefl_itotl = eat.toefl.taken && !eat.toefl.totali;
    filler.test_toefl_ALL = eat.toefl.taken && filler.test_toefl_pdate && filler.test_toefl_list && filler.test_toefl_writ && filler.test_toefl_read && filler.test_toefl_totl && filler.test_toefl_idate && filler.test_toefl_iread && filler.test_toefl_ilist && filler.test_toefl_iwrit && filler.test_toefl_ispek && filler.test_toefl_itotl;
    filler.test_ielts_date = eat.ielts.taken && !eat.ielts.date;
    filler.test_ielts_list = eat.ielts.taken && !eat.ielts.listening;
    filler.test_ielts_writ = eat.ielts.taken && !eat.ielts.writing;
    filler.test_ielts_read = eat.ielts.taken && !eat.ielts.reading;
    filler.test_ielts_spek = eat.ielts.taken && !eat.ielts.speaking;
    filler.test_ielts_totl = eat.ielts.taken && !eat.ielts.total;
    filler.test_ielts_ALL = eat.ielts.taken && filler.test_ielts_date && filler.test_ielts_list && filler.test_ielts_writ && filler.test_ielts_read && filler.test_ielts_spek && filler.test_ielts_totl;
    filler.test_melab_date = eat.melab.taken && !eat.melab.date;
    filler.test_melab_comp = eat.melab.taken && !eat.melab.composition;
    filler.test_melab_list = eat.melab.taken && !eat.melab.listening;
    filler.test_melab_gcvr = eat.melab.taken && !eat.melab.gcvr;
    filler.test_melab_totl = eat.melab.taken && !eat.melab.total;
    filler.test_melab_ALL = eat.melab.taken && filler.test_melab_date && filler.test_melab_comp && filler.test_melab_list && filler.test_melab_gcvr && filler.test_melab_totl;
    filler.active_type = !ea.activities.activity;
    filler.active_city = !ea.activities.city;
    filler.active_stat = !ea.activities.state;
    filler.active_ctry = !ea.activities.country;
    filler.active_from = !ea.activities.from;
    filler.active_day1 = !ea.activities.day1;
    filler.active_to = !ea.activities.to;
    filler.active_day2 = !ea.activities.day2;
    filler.active_ALL = filler.active_type && filler.active_city && filler.active_stat && filler.active_ctry && filler.active_from && filler.active_day1 && filler.active_to && filler.active_day2;
    //filler.sub_resume = false; //implement when file uploading is implemented
    //filler.sub_trnscr =  false; //implement when file uploading is implemented
    filler.resident_aff_ANY = frc.A || frc.B || frc.C || frc.D || frc.E || frc.F || frc.G || frc.H || frc.I || frc.J || frc.K || frc.L || frc.M || frc.N || frc.O || frc.P || frc.Q || frc.R || frc.S;

	next();
});

mongoose.model('Application', ApplicationSchema);