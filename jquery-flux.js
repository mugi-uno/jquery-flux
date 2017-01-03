;(function($, _) {
  if (!$) {
    console.warn("jquery-flux required jQuery and lodash.");
    return;
  }

  $.fn.flux = function(dispatcher) {
    this.dispatcher = dispatcher;
    this.store = this.dispatcher(null, {});
    var that = this;

    this
    .off(":flux-update")
    .on(":flux-update", function(event, payload) {
      var prevStore = that.store;
      that.store = that.dispatcher(prevStore, payload);
      if (!_.isEqual(prevStore, that.store)) {
        that.forceUpdate(prevStore);
      }
    });

    var initialState = this.attr("data-flux-initial-state");
    if (initialState) {
      that.dispatch(function() {
        return {
          type: "@@INITIALIZE",
          store: JSON.parse(initialState || "{}")
        };
      });
    }

    return this;
  }

  $.fn.forceUpdate = function(prevStore) {
    var prev = prevStore || this.store;
    this.trigger(":publish", [prev, this.store]);
    return this;
  };

  $.fn.dispatch = function(actionCreator) {
    this.trigger(":flux-update", [actionCreator(this.store)]);
    return this;
  }
})(jQuery, _);
