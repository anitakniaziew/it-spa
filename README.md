# IT-SPA and Wellness booking platform

## Table of contents

- [General info](#general-info)
- [Requirements](#requirements)
- [Setup](#setup)
- [Contact](#contact)

## General info

This project is a booking plaftorm for SPA and Wellness resort. It allows to preview resort's rooms and treatment offer. User can add required item to the cart.
In order to confirm cart's content user and finish reservation process the user need to login in or register into application.
Logged users can preview last reservation and list of the historic ones.
Application can be used on both mobile and desktop devices.

Backend is written in `Node.js` and `express` and uses `MongoDB`.
Frontend is written in `JavaScript`, using `ES6`.

## Requirements

- Node >= 14
- npm >= 6
- MongoDB

## Setup

Clone this repository

```
$ git clone https://github.com/anitakniaziew/it-spa
```

### Build frontend:

Open a new terminal tab and run:

```
$ cd it-spa/frontend
$ npm install
$ npm run build
```

### Setup the API:

```
$ cd ..
$ npm install
```

Copy `.env.example` file into `.env` and set up the enrvironment variables

```
$ cp .env.example .env
```

Run the API server:

```
$ npm run start:dev
```

Now you're ready to go! To preview the app visit [http://localhost:3000](http://localhost:3000).

## Contact

Created by [@anitakowalska](https://www.kowalska.dev/)
