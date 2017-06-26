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

## example
There are two examples copied from offical redux repo. A little modifications
ensure them to work with redux-copier. Highly recommend you run example and
check code.

    git clone https://github.com/DreamAndDead/redux-copier
    cd examples
    cd counter (or todos)
    npm i
    npm start

## API

## how it works

## LISENCE
MIT

[duck]: https://github.com/erikras/ducks-modular-redux

[react hoc]: https://facebook.github.io/react/docs/higher-order-components.html

[react redux]: https://github.com/reactjs/react-redux
