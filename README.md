# Auth0 Cordova
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fauth0-cordova.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fauth0-cordova?ref=badge_shield)


Library to make it easy to integrate Auth0 login in your Cordova applications.

## Requirements

The library requires these two cordova plugins to work:

- cordova-plugin-safariviewcontroller: Shows Safari/Chrome browser ViewController/CustomTab
- ionic-plugin-deeplinks: Handles the deeplink url intents for callback

Follow the ionic-plugin-deeplinks instructions from - https://github.com/ionic-team/ionic-plugin-deeplinks

you'll need to run

```bash
cordova plugin add cordova-plugin-safariviewcontroller
cordova plugin add ionic-plugin-deeplinks
--variable URL_SCHEME=myapp --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=example.com
--variable ANDROID_PATH_PREFIX=/
```

> In cordova applications, the application package name is the widget's identifier in `config.xml`

in your config you should have some entries like

```xml
<preference name="AndroidLaunchMode" value="singleTask" />
 <plugin name="ionic-plugin-deeplinks" spec="^1.0.20">
        <variable name="URL_SCHEME" value="myapp" />
        <variable name="DEEPLINK_SCHEME" value="https" />
        <variable name="DEEPLINK_HOST" value="example.com" />
        <variable name="ANDROID_PATH_PREFIX" value="/" />
    </plugin>
<plugin name="cordova-plugin-safariviewcontroller" spec="~1.4.6" />
```

## Setup

From [npm](https://npmjs.org)

```sh
npm install @auth0/cordova
```

then in your index.js you need to register the url handler `ondeviceready`

```js
var Auth0Cordova = require('@auth0/cordova');

window.addEventListener('deviceready', function() {
  IonicDeeplink.route({
    '/product/:productId': {
      target: 'product',
      parent: 'products'
    }
  }, function(match) {
    Auth0Cordova.onRedirectUri(match.$link.url);
  }, function(nomatch) {
    console.warn('No match', nomatch.$link);
  });
})

document.addEventListener('deviceready', main);
```

## Usage

```js
const auth0 = new Auth0Cordova({
  domain: "{YOUR_AUTH0_DOMAIN}",
  clientId: "{YOUR_AUTH0_CLIENT_ID}",
  callbackURL: '{YOUR_CALLBACK_DEEPLINK_URL}',
  packageIdentifier: "{WIDGET_ID_IN_CONFIG_XML}"
});

const options = {
  scope: 'openid profile',
};

auth0.authorize(options, function (err, result) {
  if (err) {
    // failure
  }
  // success!
});
```

This will open your tenant's hosted login page in the OS browser and will use OAuth 2.0 code grant flow with [Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636).

## API

For more information about our API please check our [online documentation](https://auth0.github.io/auth0-cordova/)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

For auth0 related questions/support please use the [Support Center](https://support.auth0.com).

## Common Issues

1. The plugin is not working in Ionic / Cordova dev app. 

   The plugin needs to be deployed on a real device to function, this is so because the dev apps do not add the necessary plugins needed for this library to function correctly. You'll need to either create a clone / fork of the Dev App or need to deploy it to a real device to test. 

2. The app hangs after authentication 

   If 1 does not solve your problem, please make sure you have `cordova-plugin-customurlscheme` installed or an appropirate plugin to handle the callback (like deeplinks / universal links) and you are handling the callback appropriately


## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fauth0%2Fauth0-cordova.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fauth0%2Fauth0-cordova?ref=badge_large)