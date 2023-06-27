module.exports = {
  name: 'Majestic Million',
  description: 'Returns domain rank information on the million domains with the most referring subnets.',
  acronym: 'MJM',
  entityTypes: ['domain'],
  defaultColor: 'light-gray',
  styles: ['./styles/majestic.less'],
  block: {
    component: {
      file: './components/majestic-block.js'
    },
    template: {
      file: './templates/majestic-block.hbs'
    }
  },
  logging: {
    level: 'info'
  },
  request: {
    // Provide the path to your certFile. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    cert: '',
    // Provide the path to your private key. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    key: '',
    // Provide the key passphrase if required.  Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    passphrase: '',
    // Provide the Certificate Authority. Leave an empty string to ignore this option.
    // Relative paths are relative to the integration's root directory
    ca: '',
    // An HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for
    // the url parameter (by embedding the auth info in the uri)
    proxy: ""
  },
  options: []
};
