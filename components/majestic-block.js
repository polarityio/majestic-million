polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  showPrevious: false,
  actions: {
    togglePrevious: function() {
      this.toggleProperty('showPrevious');
    }
  }
});
