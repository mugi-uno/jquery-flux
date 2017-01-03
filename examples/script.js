;(function() {
  var dispatcher = function(store, payload) {
    switch(payload.type) {
      case "@@INITIALIZE":
        return $.extend(true, {}, payload.store);

      case "COUNT_UP":
        return $.extend(true, {}, store, {
          count: store.count + payload.value
        });

      case "RESET":
        return $.extend(true, {}, store, {
          count: 0
        });

      default:
        return store;
    }
  };

  var actions = {
    "countUp": function(store) {
      return {
        type: "COUNT_UP",
        value: store.step
      };
    },
    "reset": function() {
      return {
        type: "RESET"
      }
    }
  };

  var render = function(e, prevStore, store) {
    $(".counter").text(store.count);
  };


  $(function() {
    var container = $(".fluxContainer");

    $(".countUpButton").on("click", function() { container.dispatch(actions.countUp) });
    $(".resetButton").on("click", function() { container.dispatch(actions.reset) });

    container.on(":publish", render);

    container.flux(dispatcher);
  });
})(jQuery);