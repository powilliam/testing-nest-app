<br />
<p align="center">
  <p align="center">
    Study case of Test Driven Development applied to the NestJS framework
  </p>
</p>

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Getting Started

### Prerequisites

- Node LTS
- NPM or Yarn
- Docker & Docker Compose

### Installation

1. Clone the repo

```sh
$ git clone https://github.com/powilliam/testing-nest-app

# Or with Github CLI
$ gh repo clone powilliam/testing-nest-app
```

3. Install project dependencies

```sh
# With NPM
$ npm install

# With Yarn
$ yarn
```

## Usage

### Running the application

```sh
$ docker-compose -f docker-compose.development.yml up
```

### Testing

```sh
# With NPM
$ npm run test && npm run test:e2e

# With Yarn
$ yarn test && yarn test:e2e
```

Check the [NestJS Documentation](https://docs.nestjs.com) for more details

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

William Porto - [@powilliam\_](https://twitter.com/powilliam_) - powilliam19@gmail.com
