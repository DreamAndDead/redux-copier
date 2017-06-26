# redux-copier

redux-copier helps to make High Order Component reusable again.

## why need redux-copier

### what is redux module

React Component is reusable. We make a component and place it on many different
pages for many times.

Component is the View in MVC. Redux take charge of the MC part. Someday an idea
occurs, why do we pack action and reducer together as a reusable module? We call
it redux module or a [duck][duck].

### what is HOC(High Order Component)

Read [this][react hoc] from react official site. It's a brilliant idea and
that's exactly how connect in [react-redux][react redux] works.

The process of creating HOC is more like jigsaw game.

> component require property(data or function)

![component](./images/component.png)

> duck provide data and function

![duck](./images/duck.png)

> connect

![connect](./images/connect.png)

HOC essentially is still a component. That means we can connect with more other
ducks.

> connect more

![connect-more](./images/connect-more.png)

### something wrong?

Assume `SimpleComponent` is pure React Component, `HocComponent` is a component
produced by react-redux `connect`.

React Component is reusable.

    <div>
      <SimpleComponent />
      <SimpleComponent />
    </div>

two instances from one abstract component function. that's all right.

But when

    <div>
      <HocComponent />
      <HocComponent />
    </div>

something wrong happens. **Because two HocComponents share the same data in redux store
tree. They have the same behavior!** HOC Component is not reusable here.

That's why we need redux-copier, making HOC Component reusable again.

## API

**copifyActions**

```javascript
function copifyActions(actionCreators, customKey) {
  // ....
  // ....
  return {
    actionCreators: newActionCreators,
    selector: dataSelector
  }
}
```
param:
- actionCreators: object, key is just a name, value must be an actionCreator.
- customKey: string. if customKey is undefined, function will generate a random
    key inside. see more in section how it works.

return:
- newActionCreators: object, same shape with param actionCreators.
- dataSelector: function. see more in section how it works.

**copifyReducer**

```javascript
function copifyReducer(reducer) {
  // ...
  // ...
  return newReducer
}
```
param:
- reducer: reducer shape function.

return:
- newReducer: reducer shape function too.

## test

    npm install
    npm run test

**Highly recommend** reading test script to see how to use redux-copier API

## example
There are two examples copied from offical redux repo. A little modifications
ensure them to work with redux-copier. **Highly recommend** you run example and
check code.

    git clone https://github.com/DreamAndDead/redux-copier
    cd examples
    cd counter (or todos)
    npm i
    npm start

## how it works

A duck is made up with two part: data and interface to mutate data. Data is
placed in redux store; interface is action, we dispatch action causing reducer
to mutate data in store.

Let's talk about an example.

Assume `addTodo` is an action creator, reducer handle the action and add a
new todo item in store data, `{ todos: [..., newItem] }`

If we connect the duck with a component, component should retrive todos array as
its data source and be able to trigger addTodo. Evething's fine except it'll
make hoc doesn't work.

Here's what redux-copier does.

To action, every action is identified with a key. Same action creators connected
with different hoc produce actions with different key.

To reducer, reducer analyze actions it receives and update different data field
marked by action key.

To data, every key marks a field of data. `{ todos: [...] }` is more like
```
{
  todos: {
    k1: [...],
    k2: [...],
    ...
  }
}
```

**If you know my key, you know every thing**,
customKey in API section is the key we describe.

selector select data needed by key from `todos` object.

## LISENCE
MIT

[duck]: https://github.com/erikras/ducks-modular-redux

[react hoc]: https://facebook.github.io/react/docs/higher-order-components.html

[react redux]: https://github.com/reactjs/react-redux
