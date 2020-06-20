class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y + 200,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        for(var i = 0; i<displayWidth; i++){
          var bar1 = rect (i, 0, 50, 100);
          //bar1.addImage("bar1",bar_img);
          var bar2 = rect (i, 0+400, 50, 100);
          //bar2 = addImage("bar2", bar_img);
          var bar3 = rect (i, 0-400, 50, 100);
          // bar3 = addImage("bar3", bar_img);
          var bar4 = rect (i, 0-800, 50, 100);
          // bar4 = addImage("bar4", bar_img);
          var bar5 = rect (i, 0-1200, 50, 100);
          // bar5 = addImage("bar5", bar_img);
          var bar6 = rect (i, 0-1600, 50, 100);
          // bar6 = addImage("bar6", bar_img);
          var bar7 = rect (i, 0-2000, 50, 100);
          // bar7 = addImage("bar7", bar_img);
          var bar8 = rect (i, 0-2400, 50, 100);
          // bar8 = addImage("bar8", bar_img);
          var bar9 = rect (i, 0-2800, 50, 100);
          // bar9 = addImage("bar9", bar_img);
          var bar10 = rect (i, 0-3200, 50, 100);
          // bar10 = addImage("bar10", bar_img);
        
        }
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 50
      player.update();
    }

    if(keyIsDown(32)){
      player.distance += 30
      player.update();
      console.log("jump!");
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
  
}
