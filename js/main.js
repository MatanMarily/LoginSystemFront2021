$(function() {
	$('#forgot-password-submit').on('click',function(e){
		e.preventDefault();
		var email = $('#email').val();
		forgotPasswordFunc(email);
	});
	
	$('.signup-submit').on('click',function(e){
		e.preventDefault();
		var first_name = $('#firstname').val();
		var last_name = $('#lastname').val();
		var email = $('#email').val();
		var pass = $('#password').val();
		signUpFunc(first_name, last_name, email, pass);
	});
	$('.signin-submit').on('click',function(e){
		e.preventDefault();
		var email = $('#email').val();
		var pass = $('#password').val();
		signInFunc(email, pass);
	});
	$('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});
		
	async function forgotPasswordFunc(email){
		let data = {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json",
		  }
		};

		var ret = await fetch(
		  "http://10.0.0.12:5005/v1/api/forgotPassword?email=" + email,
		  data
		)
			.then(response => response.json())
			.then(res_data => {
				if (typeof res_data.status == 'undefined'){
					$('#signin-res-div #p0').html(res_data.detail);
					$('#signin-res-div #p0').css("color", "green")
				}
				else{
					$('#signin-res-div #p0').html(res_data.detail);
					$('#signin-res-div #p0').css("color", "red")
				}
				})
		  .catch((error) => console.log("error", error));
	}
	
	async function signUpFunc(first_name, last_name, email, pass){
		let data = {
		  method: "POST",
		  body: JSON.stringify({
			first_name: first_name,
			last_name: last_name,
			email: email,
			pass: pass
		  }),
		  headers: {
			"Content-Type": "application/json",
		  }
		};

		var ret = await fetch(
		  "http://10.0.0.12:5005/v1/api/signup",
		  data
		)
			.then(response => response.json())
			.then(res_data => {
				if (typeof res_data.jwt != 'undefined'){
					alert("Signup successfully")
				}
				$('#signup-res-div #p0').html(res_data.detail);
				})
		  .catch((error) => console.log("error", error));
	}
	
	async function signInFunc(email, pass){
		let data = {
		  method: "POST",
		  body: JSON.stringify({
			email: email,
			pass: pass
		  }),
		  headers: {
			"Content-Type": "application/json",
		  }
		};

		var ret = await fetch(
		  "http://10.0.0.12:5005/v1/api/signin",
		  data
		)
			.then(response => response.json())
			.then(res_data => {
				if (typeof res_data.detail == 'undefined'){
					var username = getCookie("JWT");
					setCookie("JWT", res_data.JWT, 183);
					alert("Login successfully")
				}
				$('#signin-res-div #p0').html(res_data.detail);
				$('#signin-forgot-password-a').css("display", "block")
				})
		  .catch((error) => console.log("error", error));
	}
	
	function setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}
	

});