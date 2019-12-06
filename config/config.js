module.exports = {
  name: 'Majestic Million',
  description:
    'Returns domain rank information on the million domains with the most referring subnets.',
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
