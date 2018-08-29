#To run android remember to switch JAVA to 1.8
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home

#Convert videos to GIF
https://github.com/ImageOptim/gifski

#Android properties
com.android.support:support-v4:27.1.0

https://gist.github.com/agrcrobles/165ac477a9ee51198f4a870c723cd441

#Build instructions
ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/nickbester/Documents/Sites/prize-system/prize-system/resources/cert.keystore /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk bacardi

/usr/local/share/android-sdk/build-tools/27.0.3/./zipalign -v 4 /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/app/build/outputs/apk/release/bacardi.apk


keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
/usr/local/share/android-sdk/build-tools/27.0.3/./zipalign -v -p 4 app-release-unsigned.apk app-release-unsigned-aligned.apk
/usr/local/share/android-sdk/build-tools/27.0.3/./apksigner sign --ks my-release-key.jks --out my-app-release.apk app-release-unsigned-aligned.apk
/usr/local/share/android-sdk/build-tools/27.0.3/./apksigner verify my-app-release.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore    yourapkalign.apk alias_name
zipalign -v 4 yourapk.apk yourapkalign.apk