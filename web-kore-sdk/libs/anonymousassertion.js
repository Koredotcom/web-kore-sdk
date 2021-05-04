var bind = _.bind;
/*
validates the claims and returns the access token for this session.
*/
function koreAnonymousFn(options) {
	console.info("anonymous user login");
	/*
     generates the UUID for anonymous user.
    */
	function koreGenerateUUID() {
		console.info("generating UUID");
		var d = new Date().getTime();
		if (window.performance && typeof window.performance.now === "function") {
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}

	var korecookie = localStorage.getItem("korecom");
	var uuid = (korecookie) || koreGenerateUUID();

	localStorage.setItem("korecom", uuid);

	if (!options.clientId) {
		console.log("clientId should be there for anonymous user");
		return;
	}
	var assertion = {};
	assertion.issuer = options.clientId;
	assertion.subject = uuid;

	options.assertion = assertion;

	this.options = options;
	this.claims = options.assertion;
	this.WebClient = new this.clients.KoreWebClient({}, this.options);
	this.WebClient.claims = this.claims;
	this.WebClient.anonymouslogin.login({
		"assertion": options.assertion,
		"botInfo": this.options.botInfo
	}, bind(this.onLogIn, this));

}
