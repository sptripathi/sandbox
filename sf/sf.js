var jsforce = require('jsforce');
var username="satripa@demosmb.com";
var password = "Satya@1978"+ "my_security_token";

var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
  loginUrl : 'https://demosmb-dev-ed.my.salesforce.com'
});
conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }

  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  
	// ...


	/*
	// Single record creation
	conn.sobject("SamlSsoConfig").create(
		{
		attributeName : 'js-test-SSO',
		loginUrl : 'https://login.microsoftonline.com/46445fff-625f-47fd-83fc-ac945cd10de8/saml2',
		samlEntityId : 'https://demosmb-dev-ed.my.salesforce.com',
		issuer : 'https://sts.windows.net/46445fff-625f-47fd-83fc-ac945cd10de8/',
		requestSignatureMethod : 'RSA-SHA256'
	  },
		function(err, ret) {
  	if (err || !ret.success) { return console.error(err, ret); }
  	console.log("Created record id : " + ret.id);
  	// ...
	});


conn.sobject("AuthConfig").describe(function(err, meta) {
  if (err) { return console.error(err); }
  console.log('Label : ' + meta.label);
  console.log('Num of Fields : ' + meta.fields.length);
	console.log(meta.fields);
});
	*/


var records = [];
//var query = conn.query("SELECT AuthProviderId,AuthConfigId FROM AuthConfigProviders")
//var query = conn.query("SELECT IsActive, AuthOptionsSaml, MasterLabel, DeveloperName,  Type, Url FROM AuthConfig")
//var query = conn.query("SELECT AuthorizeUrl, ConsumerKey, ConsumerSecret, CreatedDate, CustomMetadataTypeRecord, DefaultScopes, DeveloperName, ErrorUrl, ExecutionUserId, FriendlyName, IconUrl, IdTokenIssuer, LogoutUrl, OptionsIncludeOrgIdInId, OptionsSendAccessTokenInHeader, OptionsSendClientCredentialsInHeader, PluginId, ProviderType, RegistrationHandlerId, TokenUrl, UserInfoUrl FROM AuthProvider")
//var query = conn.query("SELECT attributeName, errorUrl, executionUserId, identityLocation, identityMapping, issuer, loginUrl, logoutUrl, samlJitHandlerId, validationCert FROM SamlSsoConfig")
var query = conn.query("SELECT Address, PreferencesLightningLoginEnabled FROM Organization")
  .on("record", function(record) {
    records.push(record);
  })
  .on("end", function() {
    console.log("total in database : " + query.totalSize);
    console.log("total fetched : " + query.totalFetched);
		console.log(records);
  })
  .on("error", function(err) {
    console.error(err);
  })
  .run({ autoFetch : true, maxFetch : 4000 }); // synonym of Query#execute();
/*
*/


});

