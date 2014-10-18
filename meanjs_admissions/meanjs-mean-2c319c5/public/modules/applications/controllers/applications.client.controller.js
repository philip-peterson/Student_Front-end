'use strict';

// Applications controller
angular.module('applications').controller('ApplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Applications',
	function($scope, $stateParams, $location, Authentication, Applications) {
		$scope.authentication = Authentication;

		// Create new Application
		$scope.create = function() {
			// Create new Application object
			var application = new Applications ({
				name: this.name
			});

			// Redirect after save
			application.$save(function(response) {
				$location.path('applications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Application
		$scope.remove = function( application ) {
			if ( application ) { application.$remove();

				for (var i in $scope.applications ) {
					if ($scope.applications [i] === application ) {
						$scope.applications.splice(i, 1);
					}
				}
			} else {
				$scope.application.$remove(function() {
					$location.path('applications');
				});
			}
		};

		// Update existing Application
		$scope.update = function() {
			var application = $scope.application ;

			application.$update(function() {
				$location.path('applications/' + application._id + '/edit');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Applications
		$scope.find = function() {
			$scope.applications = Applications.query();
		};

		// Find existing Application
		$scope.findOne = function() {
			$scope.application = Applications.get({ 
				applicationId: $stateParams.applicationId
			});
		};
		//Alerts
		 $scope.alerts = [];
		 $scope.addAlert = function() {
			$scope.alerts.push({type: 'success', msg: 'Updated.'});
		  };

		  $scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		  };
		  
		  //majors
		  $scope.majors = [{type: 'Undeclared'},{type: 'Undecided - Science & Engineering Liberal Arts'},{type: 'Undecided - Exploring Engineering Studies'},{type: 'Accounting'},{type: 'Advertising'},{type: 'Aerospace Engineering'},{type: 'Agricultural Education'},{type: 'Communication & Leadership Development'},{type: 'African American Studies'},{type: 'Agricultural Operations Management'},{type: 'Animal Biology'},{type: 'Equine'},{type: 'Food Animal'},{type: 'Anthropology'},{type: 'Exercise Physiology'},{type: 'Fitness/Wellness'},{type: 'Architecture'},{type: 'Athletic Training'},{type: 'Ceramics'},{type: 'Creative Photography'},{type: 'Drawing'},{type: 'Painting'},{type: 'Printmaking'},{type: 'Sculpture'},{type: 'Art and Technology'},{type: 'Visual Art Studies'},{type: 'Art Education'},{type: 'Art History'},{type: 'Astronomy - Bachelor of Science'},{type: 'Astronomy - Bachelor of Arts'},{type: 'Biochemistry'},{type: 'Applied Biology'},{type: 'Biotechnology'},{type: 'Natural Science'},{type: 'Preprofessional'},{type: 'Biology - Bachelor of Arts'},{type: 'Biology - Bachelor of Science'},{type: 'Biosystems Engineering'},{type: 'Biosystems Engineering'},{type: 'Land & Water Resources Engineering'},{type: 'Packaging Engineering'},{type: 'Biomedical Engineering'},{type: 'Basic Botany'},{type: 'Preprofessional Botany'},{type: 'Botany - College of Liberal Arts and Sciences'},{type: 'Chemical Engineering'},{type: 'Chemistry'},{type: 'Civil Engineering'},{type: 'Classical Studies'},{type: 'Communication Sciences and Disorders'},{type: 'Computer Engineering'},{type: 'Computer Engineering - Electrical Engineering Dept'},{type: 'Computer Science Engineering'},{type: 'Computer Science - Liberal Arts&Science'},{type: 'Construction Management'},{type: 'Criminology'},{type: 'Dance'},{type: 'Digital Arts & Sciences-EG'},{type: 'Early Childhood Education'},{type: 'Chinese'},{type: 'Japanese'},{type: 'Economics - College of Liberal Arts and Sciences'},{type: 'Electrical Engineering'},{type: 'Elementary Education'},{type: 'English'},{type: 'Basic Science'},{type: 'Biosecurity'},{type: 'Ecotourism'},{type: 'Plant Protection'},{type: 'Preprofessional'},{type: 'Urban Pest Management'},{type: 'Environmental Engineering Sciences'},{type: 'Environ Mgmt in Agric & Nat Resources Gainesville'},{type: 'Environmental Science - Bachelor of Arts'},{type: 'Environmental Science - Bachelor of Science'},{type: 'Family'},{type: 'Youth and Community Sciences'},{type: 'Finance'},{type: 'Food & Agribusiness Marketing & Management'},{type: 'Environmental  Economics and Policy'},{type: 'International Food and Resource Economics'},{type: 'Dietetics'},{type: 'Food Science'},{type: 'Nutritional Sciences'},{type: 'Environmental Pre-Law'},{type: 'Forest Business Management'},{type: 'Forest Informatics'},{type: 'Forest Resource Management'},{type: 'Protected Areas Management'},{type: 'Recreation Resources Management'},{type: 'Urban Forestry'},{type: 'Watershed Science & Management'},{type: 'French and Francophone Studies'},{type: 'General Business'},{type: 'Geography - Bachelor of Arts'},{type: 'Geography - Bachelor of Science'},{type: 'Environmental Geosciences-BA Degree'},{type: 'Geology - Bachelor of Arts'},{type: 'Geology - Bachelor of Science'},{type: 'Environmental Geosciences - Bachelor of Arts'},{type: 'Geomatics'},{type: 'German'},{type: 'Graphic Design'},{type: 'Health Education & Behavior'},{type: 'Occupational Therapy'},{type: 'Pre Public Health'},{type: 'Health Science'},{type: ' Physical Therapy'},{type: 'Rehabilitative Services'},{type: 'History'},{type: 'Horticultural Production'},{type: 'Horticulture Science'},{type: 'Organic Crop Production'},{type: 'Plant Molecular & Cell Biology'},{type: 'Information Systems'},{type: 'Industrial and Systems Engineering'},{type: 'Interior Design'},{type: 'Africa'},{type: 'Asia'},{type: 'Europe'},{type: 'Latin and Central America'},{type: 'Middle East'},{type: 'Jewish Studies'},{type: 'Journalism'},{type: 'Landscape Architecture'},{type: 'Linguistics'},{type: 'Management'},{type: 'Marine Sciences - College of Lib Arts and Sciences'},{type: 'Marine Sciences - College of Agricultural/Life Sci'},{type: 'Marketing'},{type: 'Materials Science and Engineering'},{type: 'Mathematics - Bachelor of Arts'},{type: 'Mathematics - Bachelor of Science'},{type: 'Mechanical Engineering'},{type: 'Microbiology&Cell Sci-CALS at Gainesville'},{type: 'Microbiology & Cell Sci -College of Lib Arts & Sci'},{type: 'Music'},{type: 'Music Education'},{type: 'Natural Resource Conservation'},{type: 'Nuclear Engineering'},{type: 'Nursing'},{type: 'Philosophy'},{type: 'Physics - Bachelor of Arts'},{type: 'Physics - Bachelor of Science'},{type: 'Crop Ecology'},{type: 'Community Food Systems'},{type: 'Garden Design and Management'},{type: 'Landscape and Nursery Horticulture'},{type: 'Plant Genetics'},{type: 'Plant Health'},{type: 'Restoration Horticulture'},{type: 'Food Production'},{type: 'Political Science'},{type: 'Portuguese'},{type: 'Pre-Dentistry (Freshman Only)'},{type: 'Pre-Law (Freshman Only)'},{type: 'Pre-Medicine (Freshman Only)'},{type: 'Pre-Pharmacy (Freshman Only)'},{type: 'Pre-Vet Medicine (Freshman Only)'},{type: 'Psychology'},{type: 'Public Relations'},{type: 'Public Relations/Technical Comm.'},{type: 'Tourism'},{type: 'Event and Recreation Management'},{type: 'Religion'},{type: 'Russian'},{type: 'Sociology'},{type: 'Soil and Water Science'},{type: 'Soil Science'},{type: 'Water Science'},{type: 'Spanish'},{type: 'Sport Management'},{type: 'Statistics - College of Liberal Arts & Sciences'},{type: 'Sustainability & Built Environment - DCP'},{type: 'Sustainability Studies - CLAS'},{type: 'Telecommunication'},{type: 'Media & Society'},{type: 'News/Broadcasting'},{type: 'Operations'},{type: 'Production'},{type: 'Theatre'},{type: 'Theatre Performance'},{type: 'Acting'},{type: 'Musical Theatre'},{type: 'Theatre Production'},{type: 'Costume Design'},{type: 'Lighting'},{type: 'Scene Design'},{type: 'Wildlife Ecology and Conservation'},{type: 'Preprofessional'},{type: 'Wildlife Ecology and Conservation'},{type: 'Zoology'}]; //{type: 'Women''s Studies'}, Isn't working
		//datepicker
		  $scope.toggleMin = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
		  };
		  $scope.toggleMin();

		  $scope.open_gre = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_gre = true;
		  };
		  $scope.open_gmat = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_gmat = true;
		  };
		  $scope.open_mat = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_mat = true;
		  };
		  $scope.open_fe = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_fe = true;
		  };
		  $scope.open_toeflp = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_toeflp = true;
		  };
		  $scope.open_toefli = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_toefli = true;
		  };
		  $scope.open_ielts = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_ielts = true;
		  };
		  $scope.open_melab = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened_melab = true;
		  };
		  $scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];
	}
]);