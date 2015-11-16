/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: ManageArtists', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit artists page', function() {
    visit('/artists');

    andThen(function() {
      expect(currentPath()).to.equal('artists');
    });
  });

  it('lists all of the artists',  function(){
    visit('/artists');
    andThen(function(){
      let artists = find(".artist");
      expect(artists.length).to.eq(2);
      expect($(artists[0]).text().trim()).to.eq("Kanye West");
      expect($(artists[1]).text().trim()).to.eq("Lady Gaga");
    });
  });

  it('lets you add an artist', function(){
    visit('/artists');
    fillIn(".new-artist", "Rush");
    click(".add-artist");
    andThen(function(){
      let artists = find(".artist");
      expect(artists.length).to.eq(3);
      expect($(artists[2]).text().trim()).to.eq("Rush");
    });
  });

  it("clears the name in the input field after submission", function(){
    // Super Double Bonus Grand Prize
    visit('/artists');
    fillIn(".new-artist", "Rush");
    andThen(function(){
      expect($(".new-artist").val()).to.eq("Rush");
      click(".add-artist");
      andThen(function(){
        expect($(".new-artist").val()).to.eq("");
      });
    });
  });
});
