# Intro To Routes

In Rails, the router's job is to match a URL to a controller#action. The controller's job is to load data, and render a template.

```ruby
# routes.rb
#...
get "home", to: "home#index"
#...
# home_controller.rb
#...
def index
  @widgets = Widget.all
  # app/views/home/index.html.erb is rendered implicitly **magic**
end
#...

```

We would then reference our data in our templates using `<%= @widgets %>`.

In Ember, the router's job is to match a URL to a Ember.Route object. The routes's job is to load data, and render a template.

```javascript
// router.js
Router.map(function() {
  this.route("home");
});

// app/routes/home.js
import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return $.getJSON("/api/widgets.json"); // Load data from an api
    // app/templates/home.hbs is rendered implicitly **magic**
  }
});
```
We would then reference our data in our templates using `{{ model }}`.

## Similarities with Rails
The similarities with Rails isn't a mistake. [Yehuda Katz](https://twitter.com/wycats) was a Rails Core contributor and believes in [Convention Over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration). This is great and terrible at the same time. It's great because once you learn the conventions, you'll be able to do a lot with a small bit of effort. It's *terrible* because UNTIL you learn the conventions it all feels like magic.

![Bad Magic](http://media0.giphy.com/media/1e8B14OXoESs0/200.gif)

## Routes out the box

By creating a new Ember application you get a route for free! Start your server with `ember s`, and visit `http://localhost:4200` you'll be welcomed by Ember.

## Generators
We'll be working with a bunch of generators over the course of this track. The first one we'll see is the `route` generator. This generator will create do 3(!) things. It will generate a route file in `app/routes`, a template  in `app/templates` AND it will add a line to the router in `app/router.js`.

## Templates
Running `ember g route home` will set up everything you need to handle visiting `http://localhost:4200/home`.
Editing `app/templates/home.hbs` will show up whenever you visit `/home`.

## Models
This is a change from rails. In Rails we set an instance variable, and use it in the view by that same name. In Ember, we always reference our object using `model`. Typically, a route sets one object to be the model. This object can be an array, or a single object.

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return [];
  }
});
```

In this case, referencing `model` in a template would return that empty array. When we work with [Ember-Data](http://guides.emberjs.com/v2.1.0/models/), we'll be loading data from an API.

## Actions
In un-Embered applications, events require you to find an element, identify an event to listen for, and provide code to be triggered when that event happens. Here's some code that logs a message to the console when you press a button.

```javascript
$('.myButton').click(function(){
  console.log("You clicked me!");
});
```

```html
<button class="myButton">Click Me!</button>
```

In Ember, it would look like this:

```javascript
// app/routes/home.js
import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    handleClick: function(){
      console.log("You clicked me!");
    }
  }
});
```

```html
/* app/templates/home.hbs */
<button {{action "handleClick"}}>Click Me!</button>
```

Here we tie an action between our home route and template. We can also pass arguments. Let's create 2 buttons that pass in different values:

```javascript
// app/routes/home.js
import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    handleClick: function(argument){
      console.log(`You clicked ${argument}`);
    }
  }
});
```

```html
/* app/templates/home.hbs */
<button {{action "handleClick" 1}}>Click Me!</button>
<button {{action "handleClick" 2}}>Now Click Me!</button>
```

While these buttons are pretty demanding, they show us a something cool. We can pass in arguments to functions right there in the HTML. Consider what this would look like in regular JavaScript/jQuery:

```javascript
$('.myButton').click(function(){
  var value = $(this).data('value');
  console.log(`You clicked ${value}`);
});
```

```html
<button class="myButton" data-value='1'>Click Me!</button>
<button class="myButton" data-value='2'>Now Click Me!</button>
```

I know which one I'd rather maintain!

## Bringing it all together.
Let's create a route, setup a model, display it on the template, and modify it after clicking a button.
Generate the route

```sh
ember g route about
```
Modify the template, adding a button and displaying totalPresses
```html
Total Presses: {{model.totalPresses}}
<button {{action "incrementPresses"}}>Increment</button>
```
The Route is beefy:
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  // 1
  model: function(){
    return Ember.Object.create({totalPresses: 0})
  },
  actions: {
    // 2
    incrementPresses: function(){
      // 3
      let model = this.modelFor(this.routeName);
      // 4
      model.incrementProperty('totalPresses');
    }
  }
});
```

1. We set the Model object to be an Ember Object.
2. We define an action we use in the template above
3. We get the current model using a bit of ceremony. It lets us keep this code generic.
4. We call the `[#incrementProperty](http://emberjs.com/api/classes/Ember.Object.html#method_incrementProperty)` method  to increment to total number of clicks.


## Reading from Inputs

Chances are you're going to want to read the value of an input and pass it to a route action. Incoming code:
```html
{{input value=newArtist class="new-artist"}}
<button {{action "addArtist" newArtist}} class='add-artist'>Add Artist</button>
```

That input is part of a family of helpers [Ember provides](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_input). We'll be doing more with templates in the future but let's look at this one. This creates a regular input box with a class of "new-artist". The funky part is the value property. That's not a regular HTML value property! Notice there aren't quotes. Ember is creating a variable named `newArtist`. We then pass that value, whatever it is, to the `addArtist` action as an argument.

Side Note: You can pass a string to `value` but then the value won't change as you type in the input box:

```html
{{input value="Jukebox the Ghost" class="new-artist"}}
```
That's less fun though.


# Running the tests
You'll be generating a `artists` route. That will create a file in `app/templates` named `artists.hbs`.

Put this in there
```html
{{input value=artistName class="new-artist"}}
<button {{action "addArtist" artistName}} class='add-artist'>Add Artist</button>

{{#each model as |artist|}}
  <div class="artist">
    {{artist.name}}
  </div>
{{/each}}
```

This code will create an input box, and a button to submit a new artist. The loop under it will show all of the artists you have so far.

You'll be setting the model the route to be an array of Ember.Objects. The details are outlined in `tests/unit/routes/flatiron-artists-test.js`. Then you'll get the Route to work by implementing the `addArtist` action.

To get started, run `ember server` then visit `http://localhost:4200/tests`

**Happy Hacking**
