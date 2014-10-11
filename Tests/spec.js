
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
	}
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
	this.click_tab(2);
	var elm = element(by.model('application.special_programs_info.special_programs_application.famu_feeder'));
	elm.element(by.cssContainingText('option', 'Applied for funding')).click();
	elm = element(by.model('application.special_programs_info.special_programs_application.fullbright_scholar'));
	elm.element(by.cssContainingText('option', 'Applied for funding')).click();
	this.updatebtn.click();
	this.refresh(2);
	elm = element(by.model('application.special_programs_info.special_programs_application.famu_feeder'));
	expect(elm.getAttribute('value')).toBe('Applied for funding');
	elm = element(by.model('application.special_programs_info.special_programs_application.fullbright_scholar'));
	expect(elm.getAttribute('value')).toBe('Applied for funding');
  };
};

describe('Main', function() {

  it('should be able to login', function() {
    browser.get('http://localhost:3000/#!/');
	
	var begin = element(by.id('bt1'));
	
	begin.click();
	browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('!')[1]).toBe('/signin');
    });
	
	var signin_page = new Signin_page();
	signin_page.login('test','testtest','test test');
	
	
	
  });


  it('should update the application', function() {
<<<<<<< HEAD
	var app_edit = new Application_edit();
	app_edit.get();
  //Luke test one dropdown for each tab
  //app_edit.update_check(4,'application.education_and_activities.test_scores.gre.taken',1);
  //app_edit.update_text(4,'application.education_and_activities.test_scores.gre.date','15-October-2014');
  // app_edit.update_text(2,'application.special_programs_info.special_programs_application.other.explain','We are clever.');
  // app_edit.update_dropdown(1,'application.personal_info.name.suffix','IV');
  // app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.famu_feeder','Applied for funding');
  // app_edit.update_dropdown(3,'application.degree_programs.primary_program.intended_year_and_term','Fall (August) 2014');
  // app_edit.update_dropdown(4,'application.education_and_activities.undergraduate.major','Computer Engineering'); 
  app_edit.update_block();
=======
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test first tab
  
  app_edit.update_text(1,'application.personal_info.name.first','James');
  app_edit.update_text(1,'application.personal_info.name.middle','Edward');
  app_edit.update_text(1,'application.personal_info.name.last','Franco');
  app_edit.update_dropdown(1,'application.personal_info.name.suffix','IV');
  app_edit.update_text(1,'application.personal_info.ssn','374186987');
  app_edit.update_text(1,'application.personal_info.ufid','57416952');
  app_edit.update_dropdown(1,'application.personal_info.bd.month','April');
  //app_edit.update_dropdown(1,'application.personal_info.bd.day','19');
  app_edit.update_text(1,'application.personal_info.bd.year','1978');

  });

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
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.fullbright_scholar','Funding approved');
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.please_identify_program','IIE');
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.mcnair_scholar','Funding approved');
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.mcknight_scholar','Funding approved');
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.national_science_foundation_fellowship','Funding approved');
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.national_institutes_of_health_fellowship','Funding approved');
  });

it('should update the application', function() {
	var app_edit = new Application_edit();
	app_edit.get();
  //Luke test second tab
  app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.other.scholarship','Funding approved');
  app_edit.update_text(2,'application.special_programs_info.special_programs_application.other.explain','Would you kindly.');
  });
  
  it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test third tab
  app_edit.update_dropdown(3,'application.degree_programs.primary_program.intended_year_and_term','Fall (August) 2014');
  app_edit.update_dropdown(3,'application.degree_programs.primary_program.degree_goal','PhD');
  //program of study here
  app_edit.update_text(3,'application.degree_programs.primary_program.program_specialization','Quantum Computing');
  app_edit.update_text(3,'application.degree_programs.primary_program.department_contact','Andrew Ryan');
>>>>>>> origin/master
  });
  
  it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test fourth tab
  app_edit.update_dropdown(4,'application.education_and_activities.undergraduate.major','Computer Engineering'); 
  app_edit.update_text(4,'application.education_and_activities.undergraduate.specialization','Yup');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.A','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.A_minus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B_plus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.B_minus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C_plus','2');

  });

it('should update the application', function() {
  var app_edit = new Application_edit();
  app_edit.get();
  //Luke test fourth tab
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.C_minus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D_plus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.D_minus','2');
  app_edit.update_text(4,'application.education_and_activities.self_reported_gpa.F','2');
  //Dale fix your code so I can test
  //app_edit.update_text(4,'application.education_and_activities.activities.activity','Gambling');
// app_edit.update_text(4,'application.education_and_activities.activities.city','Gainesville');
  //app_edit.update_text(4,'application.education_and_activities.activities.country','United States');
  //state test here
  //app_edit.update_text(4,'application.education_and_activities.activities.from','5');
  });

});