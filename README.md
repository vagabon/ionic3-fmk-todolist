ionic start <PROJECT> blank

cordova platform add android
cordova platform add ios

install_plugin.bat > 
  
  npm install @ngx-translate/core --save
  npm install @ngx-translate/http-loader --save
  
  ionic cordova plugin add cordova-plugin-geolocation --save
  npm install --save @ionic-native/geolocation
  
  ionic cordova plugin add cordova-plugin-statusbar
  npm install --save @ionic-native/status-bar
  
  ionic cordova plugin add cordova-plugin-google-analytics
  npm install --save @ionic-native/google-analytics
  
  npm install --save-dev @types/google.analytics
  
  ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="" --variable APP_NAME=""
  
  npm install --save @ionic-native/facebook
  
  npm i --save ngx-facebook
  
  ionic cordova plugin add cordova-plugin-admob-free
  npm install --save @ionic-native/admob-free
  
  ionic cordova plugin add com.paypal.cordova.mobilesdk
  npm install --save @ionic-native/paypal


keytool -genkey -v -keystore mysimplelist.keystore -alias mysimplelist -keyalg RSA -keysize 2048 -validity 10000
keytool -exportcert -alias mysimplelist -keystore mysimplelist.keystore | openssl sha1 -binary | openssl base64
