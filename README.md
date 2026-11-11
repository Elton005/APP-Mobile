# Loop Avante Mobile

Standalone Expo / React Native app. This folder contains the app source, assets,
dependency manifest, and lockfile; it does not require the web project.

## Requirements

- Node.js compatible with the Expo SDK version declared in `package.json`
- npm

## Install and run

```sh
npm ci
npm start
```

For Android, run `npm run android` or scan the Expo Go QR code with a device on
the same network. If the network blocks local connections, run
`npx expo start --tunnel`.

The `assets/` directory is part of this app and must stay alongside the source
when moving or sharing the project.
