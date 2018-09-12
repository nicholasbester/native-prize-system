#To run android remember to switch JAVA to 1.8
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home

#Convert videos to GIF
https://github.com/ImageOptim/gifski

#Android properties
com.android.support:support-v4:27.1.0

https://gist.github.com/agrcrobles/165ac477a9ee51198f4a870c723cd441

#Build instructions
ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/nickbester/Documents/Sites/prize-system/prize-system/resources/cert.keystore /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/build/outputs/apk/android-release-unsigned.apk bacardi

/usr/local/share/android-sdk/build-tools/27.0.3/./zipalign -v 4 /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/build/outputs/apk/android-release-unsigned.apk /Users/nickbester/Documents/Sites/prize-system/prize-system/platforms/android/build/outputs/apk/bacardi.apk

# Alternative
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias bacardi
/usr/local/share/android-sdk/build-tools/27.0.3/./zipalign -v -p 4 android-release-unsigned.apk app-release-unsigned-aligned.apk
/usr/local/share/android-sdk/build-tools/27.0.3/./apksigner sign --ks my-release-key.jks --out bacardi-production.apk app-release-unsigned-aligned.apk
/usr/local/share/android-sdk/build-tools/27.0.3/./apksigner verify bacardi-production.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore yourapkalign.apk alias_name
zipalign -v 4 yourapk.apk yourapkalign.apk

## Emulator creation
sdkmanager "system-images;android-25;google_apis;x86"
sdkmanager --licenses
avdmanager create avd --force --name Tablet -d 34 --abi google_apis/x86 --package 'system-images;android-25;google_apis;x86'
./emulator -avd Tablet

Note: Make sure emulator is in Path using export for the emulator folder