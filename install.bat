@ECHO off
cls

:start
ECHO.
ECHO 1. Build Android Prod Release MySimpleList
ECHO 2. Jar Signer
ECHO 3. Copy Apk
ECHO 4. Copy Web

set choice=
set /p choice=Task Number :
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto BUILD_IONIC
if '%choice%'=='2' goto JAR_SIGNER
if '%choice%'=='3' goto COPY_APK
if '%choice%'=='4' goto COPY_WEB
ECHO "%choice%" is not valid, try again
ECHO.
goto start

:BUILD_IONIC
call ionic cordova build android  --prod --release
goto JAR_SIGNER

:JAR_SIGNER
call jarsigner -verbose -keystore mysimplelist.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk mysimplelist
goto COPY_APK

:COPY_APK
call xcopy /b /v /y /f platforms\android\build\outputs\apk\android-release-unsigned.apk Y:\mysimplelist-release.apk
goto COPY_WEB

:COPY_WEB
call xcopy www\** Y:\mysimplelist /s /h /e /k /f /c
goto END

:END
pause;
