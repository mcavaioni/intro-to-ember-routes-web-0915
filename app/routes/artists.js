import Ember from 'ember';


export default Ember.Route.extend({
  model: function() {
    var artistObjects = [];
   artistObjects.pushObject(Ember.Object.create({name: "Kanye West"}))
   artistObjects.pushObject(Ember.Object.create({name: "Lady Gaga"}));
    return artistObjects;
  },
  actions: {
    addArtist: function(newArtist){
      
     var name = newArtist;
     var newArtistObj = Ember.Object.create({name: newArtist});
     this.modelFor('artists').pushObject(newArtistObj);
    this.get('controller').set('newArtist', '')
      
    
    }
  }
  })

