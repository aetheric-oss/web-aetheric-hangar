![Arrow Banner](https://github.com/Arrow-air/tf-github/raw/main/src/templates/doc-banner-services.png)

# Services Hangar Front-end

![Sanity Checks](https://github.com/arrow-air/web-services-hangar/actions/workflows/sanity_checks.yml/badge.svg?branch=main)
![Arrow DAO Discord](https://img.shields.io/discord/853833144037277726?style=plastic)

## Setup

Install dependencies:

```bash
yarn install
```

## Development

```bash
yarn dev
```

## Static Generation

Use the `generate` command to build your application.

The HTML files will be generated in the .output/public directory and ready to be deployed to any static compatible hosting.

```bash
yarn generate
```

## Preview build

You might want to preview the result of your build locally, to do so, run the following command:

```bash
yarn preview
```
