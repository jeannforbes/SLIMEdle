'use strict';

var handleLogin = function handleLogin(e) {
	e.preventDefault();

	if ($('#user').val() == '' || $('#pass').val() == '') {
		handleError('Username or password is empty');
		return false;
	}

	sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);

	return false;
};

var handleSignup = function handleSignup(e) {
	e.preventDefault();

	if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
		handleError('All fields are required');
		return false;
	}

	if ($('#pass').val() !== $('#pass2').val()) {
		handleError('Passwords do not match');
		return false;
	}

	sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);

	return false;
};

var renderLogin = function renderLogin() {
	return React.createElement(
		'form',
		{ id: 'loginForm',
			name: 'loginForm',
			onSubmit: this.handleSubmit,
			action: '/login',
			method: 'POST',
			className: 'mainForm'
		},
		React.createElement(
			'label',
			{ htmlFor: 'username' },
			'Username: '
		),
		React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
		React.createElement(
			'label',
			{ htmlFor: 'pass' },
			'Password:'
		),
		React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
		React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
		React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign In' })
	);
};

var renderSignup = function renderSignup() {
	return React.createElement(
		'form',
		{ id: 'signupForm',
			name: 'signupForm',
			onSubmit: this.handleSubmit,
			action: '/signup',
			method: 'POST',
			className: 'mainForm'
		},
		React.createElement(
			'label',
			{ htmlFor: 'username' },
			'Username: '
		),
		React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'username' }),
		React.createElement(
			'label',
			{ htmlFor: 'pass' },
			'Password:'
		),
		React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
		React.createElement(
			'label',
			{ htmlFor: 'pass2' },
			'Password:'
		),
		React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'retype password' }),
		React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
		React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign Up' })
	);
};

var createLoginWindow = function createLoginWindow(csrf) {
	var LoginWindow = React.createClass({
		displayName: 'LoginWindow',

		handleSubmit: handleLogin,
		render: renderLogin
	});

	ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow(csrf) {
	var SignupWindow = React.createClass({
		displayName: 'SignupWindow',

		handleSubmit: handleSignup,
		render: renderSignup
	});

	ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
	var loginButton = document.querySelector('#loginButton');
	var signupButton = document.querySelector('#signupButton');

	loginButton.addEventListener("click", function (e) {
		e.preventDefault();
		createLoginWindow(csrf);
		return false;
	});

	signupButton.addEventListener("click", function (e) {
		e.preventDefault();
		createSignupWindow(csrf);
		return false;
	});

	createLoginWindow(csrf);
};

var getToken = function getToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
	$("#errorMessage").animate({
		opacity: 1
	}, 500);
	$("#errorMessage").animate({
		opacity: 0
	}, 3000);
};

var redirect = function redirect(response) {
	window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
};
