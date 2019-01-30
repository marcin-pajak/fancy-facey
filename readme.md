# Fancy Facey

## Description

An application that draws emojis on parts of people's bodies. It applies three different emojis on different parts of the face, which changes every 7 seconds.

Please have a look at demo:
https://fancy-facey.firebaseapp.com/

## Configuration

### Preparation

To install all modules, please run:

```sh
$ yarn install
```

### Run locally

To run app locally, please run

```sh
$ yarn dev
```

### Tests

To run tests please run, please run:

```sh
$ yarn test
```

### Development

To run tests in watch mode for TDD development, please run:

```sh
$ yarn tdd
```

### Release

To release app to firebase, please run

```sh
$ ./release.sh
```

## Possible improvements

- Move frame transformations to a Web Worker using OffscreenCanvas
- Don't create emoji HTMLImageElement until it's used, especially when there are more emojis than now
- Move emojis definition to JSON list
- Create Docker image for local development
- Write more tests

## Currently supported Emojis

- Rudolph (Red nose)
- Cherry Lady (Cherries on both ears)
- Dollar Baby (Dollar signs on both eyes)
