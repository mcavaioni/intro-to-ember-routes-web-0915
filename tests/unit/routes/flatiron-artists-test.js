/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:artists',
  'Flatiron Artists Route Test',
  {},
  function() {
    it('sets 2 artists as the model', function() {
      // create 2 Ember.Objects in an array with a name property.
      // create The artists should be Kanye West, and Lady Gaga
      // i.e. [Ember.Object.create({name: "Justin Bieber"}), Ember.Object.create({name: "Bob"})]
      var route = this.subject();
      var artists = route.model();

      expect(artists.length).to.eq(2);
      expect(artists[0].get('name')).to.eq("Kanye West");
      expect(artists[1].get('name')).to.eq("Lady Gaga");
    });
  }
);
