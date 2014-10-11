
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
	var app_edit = new Application_edit();
	app_edit.get();
  //Luke test one dropdown for each tab
  app_edit.update_text(2,'application.special_programs_info.special_programs_application.other.explain','We are clever.');
  app_edit.update_dropdown(1,'application.personal_info.name.suffix','IV');
	app_edit.update_dropdown(2,'application.special_programs_info.special_programs_application.famu_feeder','Applied for funding');
  app_edit.update_dropdown(3,'application.degree_programs.primary_program.intended_year_and_term','Fall (August) 2014');
  app_edit.update_dropdown(4,'application.education_and_activities.undergraduate.major','Computer Engineering'); //Dale please fix your code so I can test it
  });
  
});