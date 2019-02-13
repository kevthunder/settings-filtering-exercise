# Settings filtering API

## Local Devloppement using Docker

1. Make sure you have [docker](https://www.docker.com/) instaled
2. Clone the project locally
3. Enter the folowing command line inside the project folder `docker-compose up`
4. You should see "Hello, world!" at the end

## Description

Imagine you are building a web page to remote control settings on a Jukebox.

To do this, you have 2 APIs:
1. The Settings API returns the list of settings available for all jukeboxes, along with the components required for them to work.
```
const settings = [
  {
    "name": "Mixer",
    "requires": ["audio", "pcb"],
  },
  {
    "name": "AttractLoop",
    "requires": [],
  }
  {
    "name": "Volume",
    "requires": ["audio"],
  },
  ...
];
```
2. The Jukebox Components API returns a list of "components" which are available on the jukebox you want to remote control.
```
const components = [
  {
    "name": "audio"
  },
  {
    "name": "LED array"
  },
  ...
];
```

The goal of the exercise is to write a function that will filter the settings list, to keep only the entries where the
"requires" array:
1. Is empty, OR
2. Contains at least one element present in the components array
NB: You do not have to write functions to call the APIs. Assume you already have the data.
Bonus Question
1. Include a dockerfile to build and run your application in Docker
2. Create a REST API with your filtering function using ExpressJS

## todo 
- Install needed npm package (eslint, mocha, Express, ect.)
- Create fake apis calls module
- Create filtering module
- Create Express End point