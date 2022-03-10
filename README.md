# Domaindle

This is the source code for domaindle, a daily game with domain names. 

[**Try it out here!**](https://maartenbosteels.github.io/domaindle/)

This is a fork of https://github.com/cwackerfuss/react-wordle

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
$> npm install
$> npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


### To build/run docker container:

#### Development

```bash
$> docker build -t game:dev .
$> docker run -d -p 3000:3000 game:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> npm run deploy
```

