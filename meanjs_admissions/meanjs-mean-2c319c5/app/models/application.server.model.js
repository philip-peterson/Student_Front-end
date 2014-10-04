'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    personal_info: {
        name: {
            first: String,
            middle: String,
            last: String,
            suffix: String,
            other_names: String
        },
        ssn: Number,
        ufid: Number,
        previous_application: Boolean,
        previous_attendance: Boolean,
	application_started: Boolean,
	application_complete: Boolean,
        dob: Date,
        gender: String,
        nationality: String,
        ethnicity: {
            hispanic: Boolean,
            ethnicity: Number
        },
        email: String,
        phone: {
            personal: {
                number: Number,
                us: Boolean
            },
            work: {
                number: Number,
                us: Boolean
            },
            cell: {
                number: Number,
                us: Boolean
            }
        },
        address: {
            permanent: [ String ],
            current: [ String ],
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: String,
                middle: String,
                last: String,
                suffix: String,
                other_names: String
            },
            relationship: String,
            address: [ String ],
            phone: {
                personal: {
                    number: Number,
                    us: Boolean
                },
                work: {
                    number: Number,
                    us: Boolean
                },
                cell: {
                    number: Number,
                    us: Boolean
                }
            }
        },
        veteran_status: {
            active_veteran_no: Number,
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
        colleges: [ String ], /* opening another link*/ 
        self_reported_gpa: {
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
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },
            gmat: {
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },
            mat: {
                date: Date,
                score: String /* String? */
            },
            fe: {
                date: Date,
                score: String /* String? */
            },
            toefl: {
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
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },
            melab: {
                date: Date,
                composition: Number,
                listening: Number,
                gcvr: Number,
                total: Number
            },
            uf_lang_institute_program: Boolean
        },
        activities: [ {
            activity: String,
            city: String,
            country: String,
            state: String,
            from: String
        } ],
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
            /* fields not defined yet */
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Application', ApplicationSchema);
