
var Signup_page = function() {
  this.first = element(by.model('credentials.firstName'));
  this.last = element(by.model('credentials.lastName'));
  this.email = element(by.model('credentials.email'));
  this.user = element(by.model('credentials.username'));
  this.pass = element(by.model('credentials.password'));
  this.signupbtn = element(by.id('signup'));

  this.get = function() {
    browser.get('http://localhost:3000/#!/signup');
  };
  this.create = function(firstname,lastname,email,username,password) {
    this.first.sendKeys(firstname);
    this.last.sendKeys(lastname);
    this.email.sendKeys(email);
    this.user.sendKeys(username);
    this.pass.sendKeys(password);
    this.signupbtn.click();
  };
};

var Signin_page = function() {
  this.user = element(by.model('credentials.username'));
  this.pass = element(by.model('credentials.password'));
  this.signinbtn = element(by.id('signin'));

  this.get = function() {
    browser.get('http://localhost:3000/#!/signin');
  };
  this.login = function(username,password,display) {
  this.user.sendKeys(username);
	this.pass.sendKeys(password);
	this.signinbtn.click();
	browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('!')[1]).toBe('/');
    });
	expect(element(by.id('user_display')).getText()).toBe(display);
  };
};

var Application_edit = function() {

  this.updatebtn = element(by.id('updatebtn'));

  this.get = function() {
    browser.get('http://localhost:3000/#!/applications/543756a259b39a6c26b8b7bc/edit');
  };
  this.click_tab = function(tab) {
    switch(tab){
		case 1: element(by.id('tab1')).click(); break;
		case 2: element(by.id('tab2')).click(); break;
		case 3: element(by.id('tab3')).click(); break;
		case 4: element(by.id('tab4')).click(); break;
    case 5: element(by.id('tab5')).click(); break;

	}
  };
  this.getRandomNumber = function (numberLength) {
    var randomNumber = "";
    var possible = "123456789";
    for (var i = 0; i < numberLength; i++)
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    return randomNumber;
};
  this.refresh = function(tab) {
    this.get();
	this.click_tab(tab);
  };
  this.update_dropdown = function(tab,form,value) {
	this.click_tab(tab);
	var elm = element(by.model(form));
	elm.element(by.cssContainingText('option', value)).click();
	this.updatebtn.click();
	this.refresh(tab);
	expect(elm.getAttribute('value')).toBe(value);
  };
  this.update_text = function(tab,form,value) {
	this.click_tab(tab);
	var elm = element(by.model(form));
	elm.clear();
	elm.sendKeys(value);
	this.updatebtn.click();
	this.refresh(tab);
	expect(elm.getAttribute('value')).toBe(value);
  };
  this.update_check = function(tab,form,value) {
	this.click_tab(tab);
	var elm = element(by.model(form));
	elm.click();
	this.updatebtn.click();
	this.refresh(tab);
	if(value == 0){
		expect(elm.isSelected()).toBeFalsy();
	}
	else{
		expect(elm.isSelected()).toBeTruthy();
	}
};
	this.update_block = function() {
  	this.click_tab(4);
    var elm = element(by.model('application.education_and_activities.undergraduate.major'));
    elm.element(by.cssContainingText('option', 'Computer Science Engineering')).click();
    elm = element(by.model('application.education_and_activities.undergraduate.specialization'));
    elm.clear();
    elm.sendKeys('Software Development');
  	elm = element(by.model('application.education_and_activities.test_scores.gre.taken'));
  	elm.click();
  	elm = element(by.model('application.education_and_activities.test_scores.gre.date'));
  	elm.clear();
    elm.sendKeys('15-October-2014');
    elm = element(by.model('application.education_and_activities.test_scores.gre.verbal'));
    elm.clear();
    var num1 = this.getRandomNumber(3);
    elm.sendKeys(num1);
    elm = element(by.model('application.education_and_activities.test_scores.gre.quantitative'));
    elm.clear();
    var num2 = this.getRandomNumber(3);
    elm.sendKeys(num2);
    elm = element(by.model('application.education_and_activities.test_scores.gre.analytical_writing'));
    elm.clear();
    var num3 = this.getRandomNumber(3);
    elm.sendKeys(num3);
    elm = element(by.model('application.education_and_activities.test_scores.gre.total'));
    elm.clear();
    var num4 = this.getRandomNumber(3);
    elm.sendKeys(num4);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.taken'));
    elm.click();
    elm = element(by.model('application.education_and_activities.test_scores.gmat.date'));
    elm.clear();
    elm.sendKeys('10-December-2000');
    elm = element(by.model('application.education_and_activities.test_scores.gmat.verbal'));
    elm.clear();
    var num5 = this.getRandomNumber(3);
    elm.sendKeys(num5);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.quantitative'));
    elm.clear();
    var num6 = this.getRandomNumber(3);
    elm.sendKeys(num6);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.integrated_reasoning'));
    elm.clear();
    var num7 = this.getRandomNumber(3);
    elm.sendKeys(num7);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.analytical_writing'));
    elm.clear();
    var num8 = this.getRandomNumber(3);
    elm.sendKeys(num8);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.total'));
    elm.clear();
    var num9 = this.getRandomNumber(3);
    elm.sendKeys(num9);
  	this.updatebtn.click();
  	this.refresh(4);
  	elm = element(by.model('application.education_and_activities.undergraduate.major'));
  	expect(elm.getAttribute('value')).toBe('Computer Science Engineering');
    elm = element(by.model('application.education_and_activities.undergraduate.specialization'));
    expect(elm.getAttribute('value')).toBe('Software Development');
  	elm = element(by.model('application.education_and_activities.test_scores.gre.date'));
  	expect(elm.getAttribute('value')).toBe('15-October-2014');
    elm = element(by.model('application.education_and_activities.test_scores.gre.verbal'));
    expect(elm.getAttribute('value')).toBe(num1);
    elm = element(by.model('application.education_and_activities.test_scores.gre.quantitative'));
    expect(elm.getAttribute('value')).toBe(num2);
    elm = element(by.model('application.education_and_activities.test_scores.gre.analytical_writing'));
    expect(elm.getAttribute('value')).toBe(num3);
    elm = element(by.model('application.education_and_activities.test_scores.gre.total'));
    expect(elm.getAttribute('value')).toBe(num4);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.date'));
    expect(elm.getAttribute('value')).toBe('10-December-2000');
    elm = element(by.model('application.education_and_activities.test_scores.gmat.verbal'));
    expect(elm.getAttribute('value')).toBe(num5);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.quantitative'));
    expect(elm.getAttribute('value')).toBe(num6);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.integrated_reasoning'));
    expect(elm.getAttribute('value')).toBe(num7);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.analytical_writing'));
    expect(elm.getAttribute('value')).toBe(num8);
    elm = element(by.model('application.education_and_activities.test_scores.gmat.total'));
    expect(elm.getAttribute('value')).toBe(num9);
  };

  this.app_fill = function(first,last,ufid) {
    this.click_tab(1);
    elm = element(by.model('application.personal_info.name.first'));
    elm.clear();
    elm.sendKeys(first);
    elm = element(by.model('application.personal_info.name.last'));
    elm.clear();
    elm.sendKeys(last);
    elm = element(by.model('application.personal_info.ufid'));
    elm.clear();
    elm.sendKeys(ufid);
    this.updatebtn.click();
  };
};
describe('Main', function() {

 //  it('should be able to login', function() {
 //    browser.get('http://localhost:3000/#!/');
	
	// var begin = element(by.id('bt1'));
	
	// begin.click();
	// browser.getLocationAbsUrl().then(function(url) {
 //        expect(url.split('!')[1]).toBe('/signin');
 //    });	
	// var signin_page = new Signin_page();
	// signin_page.login('test','testtest','test test');	
 //  });
 //  it('should update the application', function() {
 //    var app = element(by.id('bt2'));
 //    app.click();
 //    var app_edit = new Application_edit();
 //    app_edit.app_fill('test','test','73577357');
 //  });
var user1 = ["cteyp6P","g9","D83cJS5yW@gUPO.com","GHA37CsDQZecN","texKZOJ2Mi","79012777","q3A86enCu","42eqdrHKUJWkTzU","euoHGbO7CprMFY3@j08.com","aVrDYrxz","zLper","36091192","2gyESQ","lh6HpugDA","ACRcmz8vF6WQa@D7S.com","Rvx","HYNkz3fb846pL1","13746382","ezn6Z","Ywfe33","orVu@tKX2l.com","oQMjlO","zk4oTodL1","10455930","GuvFaEoqB2FNjkj","3o9DZ","RlnIDiwq@BBHE.com","Nk9qEQ","CnfqYLQ765U7K","69619630","oVttc2JtYx7gH","RdpVXB","n6ywE8ZYB3hCo@l5f.com","PKGkjUD0EW0","cHvB8wwRUW","18976089","keK2LkzKezvcDsT","8LqE3HpYDxEPS9","SdYLmFCiiwhQ@Z3c74.com","DYhrMN","rYU9kAog4LS","93525691","8KRnhITEekoXGTu","j56JmXD5tii","wy35SEx9Lr@Xd.com","BVX","B3eSQVpcz","01505853","Zr8uzPXR","tUlJidXOuej5","yIQ2KzXJqNb8@0I4O.com","OZTwJqC7KqZqZ","koAuhV","73546999","28feYOPss5q","6WM","Nv2sm3iXldJcRQD@kMHt2.com","ebeFJdQzzGf8Flp","dtRkK2IiMkhWd","75340626","y14ygBbKphd88f","TrgS","SL4JiO3XSb4aZ21@YdP.com","6Au4dN","DQ3wxPdlb","36395279","3RIDb","qAPKLtcR3C9UZ4G","ky5B1BnuS@65B.com","zYHwhNpSAKp","Eiy0W3sRKvU","20277664","R3suk2vD","Z7q","3jYbPObxntrbH@ueSW.com","pTdZymgFdxsE","y02XT","22073393","G8MBnZQ4ZDoczEa","E0NF1IwWqF3K","jzDP0LH@eCuXV.com","50XW8","qoOnihma961OEV","09306387","KTxrraKeOQ","IfWELFA6v","eexf@O5.com","Kt7c","75aMS3knM","70726555","7rocOToHUM7","Btj5fEkue","7N4MXZ9g@Fy.com","7pmtqZRty","cdxei14yk","54195589","D1CUYDGRB3ypau","XQbEueFTnZ","zSsc@ofnZq.com","lZ3ab47BrenM","m8ri7i4","37128435","yBrut","tzAqlUVL","FEO4s7LFRCam@Io34o.com","PBfgU","9Ec5N","03816090","x4i2mR8IcE","TlcUqYQQqk0","Z1yTvC@Tbq.com","klblXrXSfRdMY","Lj","94726879","iYEfGHTGRd5VDNy","iXUrWR","Pg2XVw0LUewA3@MXx.com","ay0ZIekDU0ggx","W6","87195894","eHod7K54Nf","jLXG","5Ov6HRy9iJXB@kP7.com","6Z5dob","OhIghFDzgXJS1","66702212","W0Z","L2qeU1abHj","q87QuFS9Z@AkEc.com","00urkisNz","WiSt","88710885","86","GuTXzB0ip","O9@fl.com","TXzw","AE","04791113","054PleO5","o5d4L9FfHN","beoRSAHcFni4H@HmqCd.com","8GLbLlDy","vElcK7CEBdQvQXs","21168225"];
for(j = 0; j < user1.length; j+=6){
  (function(i){
    it('should create a user', function() {
      var signup_page = new Signup_page();
      signup_page.get();
      signup_page.create(user1[i],user1[i+1],user1[i+2],user1[i+3],user1[i+4]); 
    });
    it('should update the application', function() {
      var app = element(by.id('bt2'));
      app.click();
      var app_edit = new Application_edit();
      app_edit.app_fill(user1[i],user1[i+1],user1[i+5]);
    });
    it('should update be able to logout', function() {
      browser.get('http://localhost:3000/auth/signout');
    });
  })(j);
}
  




  //it('should update the application', function() {
  //var app_edit = new Application_edit();
  //app_edit.get();
  //Luke test one dropdown for each tab
  //app_edit.update_check(4,'application.education_and_activities.test_scores.gre.taken',1);
  //app_edit.update_text(4,'application.education_and_activities.test_scores.gre.date','15-October-2014');
  // app_edit.update_text(2,'application.special_programs_info.special_programs_application.other.explain','We are clever.');
  // app_edit.update_dropdown(1,'application.personal_info.name.suffix','IV');
  // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.famu_feeder','Applied for funding');
  // app_edit.update_dropdown(3,'application.degree_programs.primary_program.intended_year_and_term','Fall (August) 2014');
  // app_edit.update_dropdown(4,'application.education_and_activities.undergraduate.major','Computer Engineering'); 
  //app_edit.update_block();
 /* var app_edit = new Application_edit();
  app_edit.get();

  app_edit.update_text(1,'application.personal_info.name.first','James');
  //app_edit.update_text(1,'application.personal_info.name.middle','Edward');
  //app_edit.update_text(1,'application.personal_info.name.last','Franco');
  app_edit.update_dropdown(1,'application.personal_info.name.suffix','IV');
  //app_edit.update_text(1,'application.personal_info.ssn','374186987');
  //app_edit.update_text(1,'application.personal_info.ufid','57416952');
  //app_edit.update_dropdown(1,'application.personal_info.bd.month','April');
  //app_edit.update_dropdown(1,'application.personal_info.bd.day','19');
  app_edit.update_text(1,'application.personal_info.bd.year','1978');*/

  //});
/*
it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test first tab
  app_edit.update_dropdown(1,'application.personal_info.gender','Male');
  app_edit.update_dropdown(1,'application.personal_info.nationality','United States');
  app_edit.update_text(1,'application.personal_info.email','James_Franco@gmail.com');
  app_edit.update_text(1,'application.personal_info.address.permanent.street','9601 Wilshire Blvd');
  app_edit.update_text(1,'application.personal_info.address.permanent.city','Beverly Hills');
  app_edit.update_dropdown(1,'application.personal_info.address.permanent.state','California');
  app_edit.update_dropdown(1,'application.personal_info.address.permanent.country','United States');
  app_edit.update_text(1,'application.personal_info.address.current.street','9601 Wilshire Blvd');
  
  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test first tab
  app_edit.update_text(1,'application.personal_info.address.current.city','Beverly Hills');
  app_edit.update_dropdown(1,'application.personal_info.address.current.state','California');
  app_edit.update_text(1,'application.personal_info.address.current.zip','90210');
  app_edit.update_dropdown(1,'application.personal_info.address.current.country','United States');
  app_edit.update_text(1,'application.personal_info.emergency_contact.name.first','Dave');
  app_edit.update_text(1,'application.personal_info.emergency_contact.name.last','Franco');
  app_edit.update_dropdown(1,'application.personal_info.emergency_contact.name.relationship','Father');
  app_edit.update_text(1,'application.personal_info.emergency_contact.address.street','9601 Wilshire Blvd');
  
  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
app_edit.update_text(1,'application.personal_info.emergency_contact.address.city','Beverly Hills');
  //state test here
  app_edit.update_dropdown(1,'application.personal_info.emergency_contact.address.country','United States');
  app_edit.update_text(1,'application.personal_info.emergency_contact.address.zip','90210');
  app_edit.update_text(1,'application.personal_info.emergency_contact.phone.personal.number','5555555555');
  app_edit.update_text(1,'application.personal_info.emergency_contact.phone.work.number','5555555555');
  app_edit.update_text(1,'application.personal_info.emergency_contact.phone.cell.number','5555555555');
  });


  
  it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test second tab
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.famu_feeder','Applied for funding');
  //app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.fullbright_scholar','Funding approved');
 // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.please_identify_program','IIE');
 // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.mcnair_scholar','Funding approved');
 // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.mcknight_scholar','Funding approved');
 // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.national_science_foundation_fellowship','Funding approved');
 // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.national_institutes_of_health_fellowship','Funding approved');
  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test second tab
  //app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.other.scholarship','Funding approved');
  app_edit.update_text(2,'application.special_programs_info.special_programs_application.other.explain','Would you kindly.');
  });
  
  it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test third tab
  app_edit.update_dropdown(3,'application.degree_programs.primary_program.intended_year_and_term','Fall (August) 2014');
 // app_edit.update_dropdown(3,'application.degree_programs.primary_program.degree_goal','PhD');
  //program of study here
  app_edit.update_text(3,'application.degree_programs.primary_program.program_specialization','Quantum Computing');
  //app_edit.update_text(3,'application.degree_programs.primary_program.department_contact','Andrew Ryan');
  });
  
  it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test fourth tab
  app_edit.update_dropdown(4,'application.education_and_activities.undergraduate.major','Computer Engineering'); 
  app_edit.update_text(4,'application.education_and_activities.undergraduate.specialization','Yup');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.A','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.A_minus','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B_plus','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B_minus','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C_plus','2');

  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test fourth tab
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C_minus','2');
 // app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D_plus','2');
//  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D','2');
//  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D_minus','2');
//  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.F','2');
  //Dale fix your code so I can test
  //app_edit.update_text(4,'application.education_and_activities.activities.activity','Gambling');
// app_edit.update_text(4,'application.education_and_activities.activities.city','Gainesville');
  //app_edit.update_text(4,'application.education_and_activities.activities.country','United States');
  //state test here
  //app_edit.update_text(4,'application.education_and_activities.activities.from','5');
  });


  

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test first tab
  app_edit.update_check(1,'application.personal_info.has_ssn',1);
  //app_edit.update_check(1,'application.personal_info.previous_application',1);
 // app_edit.update_check(1,'application.personal_info.previous_attendance',1);
 // app_edit.update_check(1,'application.personal_info.ethnicity.hispanic',1);
 // app_edit.update_check(1,'application.personal_info.ethnicity.american_indian',1);
 // app_edit.update_check(1,'application.personal_info.ethnicity.asian',1);
 // app_edit.update_check(1,'application.personal_info.ethnicity.black',1);



  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test first tab continued

  app_edit.update_check(1,'application.personal_info.ethnicity.pacific_islander',1);
  app_edit.update_check(1,'application.personal_info.ethnicity.white',1);
  app_edit.update_check(1,'application.personal_info.veteran_status.active_veteran',1);
  app_edit.update_check(1,'application.personal_info.veteran_status.post_sep11',1);
  app_edit.update_check(1,'application.personal_info.veteran_status.eligible_va_benefits',1);
  app_edit.update_check(1,'application.personal_info.conduct_disclosure.charged_or_disciplined',1);
  app_edit.update_check(1,'application.personal_info.conduct_disclosure.charged_law_violation',1);
  });



it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test second tab 

  app_edit.update_check(2,'application.special_programs_info.special_programs_application.check_following.assistantship',1);
 // app_edit.update_check(2,'application.special_programs_info.special_programs_application.check_following.distance_learning',1);
 // app_edit.update_check(2,'application.special_programs_info.special_programs_application.check_following.fellowship',1);
 // app_edit.update_check(2,'application.special_programs_info.special_programs_application.check_following.joint_UF_degree',1);
 // app_edit.update_check(2,'application.special_programs_info.special_programs_application.check_following.three_two_program',1);

  });



it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test fifth tab p1 

  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.A',1);
 // app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.B',1);
 // app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.C',1);
 // app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.D',1);
 // app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.E',1);

  });

/*
it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test fifth tab p2 

  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.F',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.G',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.H',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.I',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.J',1);

  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test fifth tab p3 

  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.K',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.L',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.M',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.N',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.O',1);

  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Omeed test fifth tab p4 

  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.P',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.Q',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.R',1);
  app_edit.update_check(5,'application.residency_affadivit.florida_residence_categories.S',1);

  });
*/

});