import Sketch from "p5/lib/p5";
/* eslint-disable */


export function special(pointX, pointY) {
  var al = [];

  var s = function( sketch ) {
    sketch.setup = function() {
      sketch.createCanvas(window.innerWidth, window.innerHeight);
      sketch.frameRate(30);
    };

    sketch.draw = function() {
      sketch.background(0);
      /*
      * Array to store reference to each Rays() object 
      */
      al.push( new Rays() );
      
      for( var i = 0; i < al.length; i++ ) {
        var r = al[i];
        r.applyForce( new Sketch.Vector( sketch.random( -0.5, 0.5 ), sketch.random( 0.01, 0.05 ) ) );
        r.update();
        r.render();
        if( r.isDead() )
          al.shift();
      }
    }
  }; 

  var p5 = new Sketch(s);

  function windowResized() {
    resizeCanvas( windowWidth, windowHeight );
  }
  
  function Rays() {
    this.counter = 0;
    this.position = new Sketch.Vector( pointX, pointY );
    this.velocity = new Sketch.Vector( 0, 5 );
    this.acceleration = new Sketch.Vector( 0, 0 );
    this.lifeSpan = 1;
  }
  
  /*
  * Takes p5.Vector object as the initial force 
  * This force provides the required acceleration
  */
  Rays.prototype.applyForce = function( force ) {
    this.acceleration = force;
  }
  
  /*
  * Calculates and updates
  *
  * 1. Velocity
  * 2. Position
  */
  Rays.prototype.update = function() {
    this.velocity.add( this.acceleration );
    this.position.add( this.velocity );
    this.lifeSpan -= 0.04;
  }
  
  /*
  * Displays line on the document
  */
  Rays.prototype.render = function() {
    var r = parseInt(p5.random(0,255))
    var g  = parseInt(p5.random(0,255))
    var b = parseInt(p5.random(0,255))
    var a = this.lifeSpan + 3 > 3 ? 0 : this.lifeSpan + 3.2;
    var c = p5.color( 'rgba('+ r + ',' + g + ',' + b + ', ' + a + ')');
    console.log(this.lifeSpan)
    p5.strokeWeight(0);
    p5.fill( c ); 

    var circle_size = p5.random(5,40)
    p5.ellipse( this.position.x, this.position.y, circle_size, circle_size );
  }
  
  /*
  * Helps in determining whether the shift()
  * method should be called or not
  *
  * [This method is important, if not used the array will
  * be filled infinitely]
  */
  Rays.prototype.isDead = function() {
    if( this.lifeSpan < -3 )
      return true;
    else
      return false;
  }
  

}
