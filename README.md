# FlameCast

https://dev.to/mandiwise/electron-apps-made-easy-with-create-react-app-and-electron-forge-560e

## Generate new executable icon files

To regenerate icons for all platforms, replace `src/app-icon.png` with a new 1024x1024 png file and run:

`npx electron-icon-maker --input=/absolute/path/to/flamecast/src/app-icon.png --output=src`