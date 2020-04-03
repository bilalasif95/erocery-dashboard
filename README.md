# Erocery Storefront

A GraphQL-powered, single-page dashboard application for Erocery

### Prerequisites

- Node.js 10.0+
- A running instance of Erocery BackEnd

### Installing

Clone the repository:

```
git clone https://{username}@bitbucket.org/Shehrozerao/erocery-dashboard.git
```

Enter the project directory:

```
$ cd erocery-dashboard
```

Install NPM dependencies:

```
$ npm i
```

### Configuration

There are two environment variables available for configuration:

- `API_URI` (required) - URI of a running instance of Saleor GraphQL API.
  If you are running Saleor locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

  ```
  $ export API_URI = "http://localhost:8000/graphql/"
  ```

### Development

To start the development server run:

```
$ npm start
```

### Production

To build the application bundle run:

```
$ npm run build
```

Go to `http://localhost:9000` to access the Erocery Dashbooard.