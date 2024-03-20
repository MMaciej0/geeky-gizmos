<br/>
<p align="center">
  <h3 align="center">Geeky Bazzar</h3>

  <p align="center">
    An ecommerce application, where enthusiasts and collectors can browse, purchase a wide range of specialized gadgets.
    <br/>
    <br/>
    <a href="https://geeky-gizmos.vercel.app/">View Demo</a>
    .
    <a href="https://github.com/MMaciej0/geeky-gizmos/issues">Report Bug</a>
    .
  </p>
</p>

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)
- [Working on](#working-on)

## About The Project

Ecommerce application developed for learning purposes. The primary objective of this application is to be fully responsive and functional, encompassing all aspects from product creation to purchasing,

Key Features:

- role-based user authentication enables the creation of an admin panel. Admins can add new brands, categories, and products, and determine when to publish them. All essential images are stored in Cloudinary.

- in fact of release new React hooks, i decided to store basket (cart) information directly in the database. This enables the utilization of optimistic updates for smoother interactions. Additionally, for logged-in users, their basket state becomes more persistent, ensuring it's available even when logging in from other devices.

- product filtering based on search parameters.

## Built With

- TypeScript, [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [React Hook Form](https://react-hook-form.com/), [Zod](https://github.com/colinhacks/zod), [Prisma](https://www.prisma.io/), [Auth.js](https://authjs.dev/), [Cloudinary](https://cloudinary.com/).

## Getting Started

Follow these steps to get your project up and running on your local machine.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/MMaciej0/co-velo.git
```

3. Install NPM packages

```sh
npm install
```

4. Create .env file in root folder

```sh
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE= Vercel postgres database variables [Vercel](https://vercel.com/)
AUTH_SECRET= Your Authentication Secret [Auth.js](https://authjs.dev/)
AUTH_GOOGLE_ID= Your Google Console Project ID
AUTH_GOOGLE_SECRET= Your Google Console Project Secret
CLOUDINARY_KEY=
CLOUDINARY_SECRET= Your clodinary keys [Cloudinary](https://cloudinary.com/)
CRYPTO_KEY= Your key to encrypt/decrypt cookies data
```

## Roadmap

See the [open issues](https://github.com/MMaciej0/co-velo/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/MMaciej0/co-velo/issues/new) to discuss it, or directly create a pull request.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

- **Maciej Mądry** - ** - [Maciej Mądry](https://github.com/MMaciej0) - **

## Working on

- Optimizing loading times,
- Implementing user profile panel,
