/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Watcher.init();

  setInits(cb);
};

global.initVars = {};

function setInits(done){
  Hashtag.find().limit(1).sort('createdAt desc').exec(function(err, hastags){
    if(err || !hastags.length){
      Hashtag.create({'text': '#lol'}).exec(function(err, h){
        done();
        console.log('default');
      });
      global.initVars.hashtag = '#lol';
    }else{
      global.initVars.hashtag = hastags[0].text;
      done();
    }
  });
}
