module.exports = {
  name: 'Majestic Million',
  acronym: 'MJM',
  entityTypes: ['domain'],
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
  options: []
};
