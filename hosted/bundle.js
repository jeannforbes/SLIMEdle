'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var gameRenderer = void 0;
var SaveFormClass = void 0;
var GameClass = void 0;

var handleSaveGame = function handleSaveGame(e) {
	e.preventDefault();

	$('#messageBox').animate({ width: 'hide' }, 350);

	sendAjax('POST', $('#saveForm').attr('action'), $('#saveForm').serialize() );

	return false;
};

var renderSaveForm = function renderSaveForm() {
	return React.createElement(
		'div',
		{ id: 'saveGameContainer' },
		React.createElement(
			'form',
			{ id: 'saveForm',
				onSubmit: this.handleSubmit,
				name: 'saveForm',
				action: '/',
				method: 'POST',
				className: 'saveForm'
			},
			React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
			React.createElement('input', { className: 'saveGameSubmit', type: 'submit', value: 'Save' })
		)
	);
};

var renderGame = function renderGame() {

	return React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			{ id: 'filters' },
			'THIS IS THE GAME',
			React.createElement(
				'gameContainer',
				{},
				'Game Here'
			),
			React.createElement(
				'messageBox',
				{},
				'Messages'
			)
		)
	);
};

var setup = function setup(csrf) {
	SaveFormClass = React.createClass({
		displayName: 'SaveFormClass',

		handleSubmit: handleSaveGame,
		render: renderGame,
	});

	GameClass = React.createClass({
		displayName: 'GameClass',

		loadGameFromServer: function loadGameFromServer() {
			sendAjax('GET', '/', null, function (data) {
				this.setState({ data: data.opps });
			}.bind(this));
		},
		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadGameFromServer();
		},
		render: renderGame,
	});

	saveForm = ReactDOM.render(React.createElement(SaveFormClass, { csrf: csrf }), document.querySelector('#saveGame'));
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
