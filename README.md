jquery-flux
============

jquery-flux is a jQuery plugin that supports Flux pattern.

## Description

jquery-flux is assumed to be executable in ES5.
This includes only minimal implementation. Please customize it freely and use it.

## Requirement

- jQuery (1.11 or above)
- Lodash (https://lodash.com/)

## Usage

1. Create container

```html
<div class="container"></div>
```

2. Activate

```js
var dispatcher = function(store, payload) {
  switch(payload.type) {
    case "ACTION":
      return $.extend(true, {}, store, {
        value: store.value + payload.value
      });
    default:
      return store;
  }
};

$(".container").flux(dispatcher);
```

3. Event handling

```js
var actionCreator = function(store) {
  return {
    type: "ACTION",
    value: store.value + 1
  };
};

$(".button").on("click", function() { container.dispatch(actionCreator) });
```

4. Render DOM

```js
var render = function(e, prevStore, store) {
  $(".counter").text(store.value);
};

$(".container").on(":publish", render);
```


## LICENCE

MIT
