let mainRenderer;
let saveForm;
let SaveFormClass;

const renderSaveForm = function(){
	return(
		<div id='saveFormContainer'>
		<form id='saveForm'
			onSubmit={this.handleSubmit}
			name='saveForm'
			action='/'
			method='POST'
			className='saveForm'
		>
		  <input type='hidden' name='_csrf' value={this.props.csrf} />
		  <input className='saveSubmit' type='submit' value='Build Cocoon' />
		</form>
		</div>
	);
};

const setup = function(csrf) {
	OppFormClass = React.createClass({
		handleSubmit: handleMakeOpp,
		render: renderOpp,
	});

	GameClass = React.createClass({
		loadOppsByBookmark: function(){
		getInitialState: function(){
			return{data: []};
		},
		componentDidMount: function(){
			this.loadOppsFromServer();
		},
		handleRSVP: handleRSVPOpp,
		handleBookmark: handleBookmarkOpp,
		render: renderOppList,
	});

	messageBox = ReactDOM.render(
		<OppFormClass csrf={csrf} />, document.querySelector('#messageBox'),
	);


	gameRenderer = ReactDOM.render(
		<OppListClass csrf={csrf}/>, document.querySelector('#opps'),
	);
};

const getToken = () =>{
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
}

$(document).ready(function(){
	getToken();
});