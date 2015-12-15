Tests = new Mongo.Collection('tests');

    var counter = new ReactiveVar(0);

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);

  Template.hello.helpers({

    getCounter: function () {
      return counter.get();
    },
    getTests: function() {
      return Tests.find({}).count()
    }
  });

  Template.hello.events({
    'click button': function () {
      var me = this;
      var n = 100;
      var start = new Date();
      for (i = 0; i < n; i++) {
        Tests.insert({value: i}, function (err, res) {
          counter.set(i);
          if (counter.get() === n) {
            var end = new Date();
            console.log((end - start) + "ms");
          }
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
