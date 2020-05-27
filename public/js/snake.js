
export default class Snake{
    constructor(scene) {
        this.scene = scene;
        this.snakeLength = 1;
        this.body=[];
        this.xCord = 120;
        this.yCord = 120;
        this.lastBox ;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.box =this.scene.add.rectangle(0,0,15,15,0xff0000).setOrigin(0);
        this.body.push(this.box);
        this.timeInstance = 0;
        this.moveInterval = 100;
        this.apple = {};
        this.tileSize = 15;
        this.setApple();
        this.score = 0;
        this.scoreP = document.getElementById('score');
        scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
          });
    }
    setApple(){
        //console.log('called')
        this.apple.x = Math.floor((Math.random() * this.scene.game.config.width) / this.tileSize) * this.tileSize;
        this.apple.y = Math.floor((Math.random() * this.scene.game.config.height) / this.tileSize) * this.tileSize;
        console.log(this.apple);
        this.apple = this.scene.add.rectangle(this.apple.x,this.apple.y,15,15,0xff0000).setOrigin(0);
    }
    moveApple(){
      this.apple.x = Math.floor((Math.random() * this.scene.game.config.width) / this.tileSize) * this.tileSize;
      this.apple.y = Math.floor((Math.random() * this.scene.game.config.height) / this.tileSize) * this.tileSize;
    }
    keydown = (e)=>{
        switch (e.keyCode) {
            case 37: //left
              if (this.direction !== Phaser.Math.Vector2.RIGHT) this.direction = Phaser.Math.Vector2.LEFT;
              break;
            case 38: //up
              if (this.direction !== Phaser.Math.Vector2.DOWN) this.direction = Phaser.Math.Vector2.UP;
              break;
            case 39: //right
              if (this.direction !== Phaser.Math.Vector2.LEFT) this.direction = Phaser.Math.Vector2.RIGHT;
              break;
            case 40: //down
              if (this.direction !== Phaser.Math.Vector2.UP) this.direction = Phaser.Math.Vector2.DOWN;
              break;
            case 65: //a
              this.add = true;
              break;
            case 32: //space
              this.stop = true;
              break;
        }
    }

    increaseSnake(){
        this.xCord = this.body[this.snakeLength -1].x -15;
        this.yCord = this.body[this.snakeLength -1].y;
        this.box  = this.scene.add.rectangle(this.xCord, this.yCord,15,15,0xff00ff).setOrigin(0);
        this.body.push(this.box);
        this.snakeLength ++;
    }
    update(time){
        if(time >= (this.timeInstance + this.moveInterval)){
            this.timeInstance = time;
            this.moveSnake();
        }
    }
    moveSnake(){
        
        for(let i = this.snakeLength - 1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.body[0].x =this.body[0].x + this.direction.x * 15;
        this.body[0].y =this.body[0].y + this.direction.y * 15;
       // console.log(this.direction);

       //check if head has eaten the aple
       if(this.body[0].x == this.apple.x && this.body[0].y  == this.apple.y){
           this.increaseSnake();
           this.moveApple();
           this.score += 10;
           console.log('scorep',this.scoreP);
           this.scoreP.innerHTML = `Your Score: ${this.score}`;

       }

       //check if head has bite its tail
      var bodyMinusHead = this.body.slice(1);
      if(bodyMinusHead.some((box)=>{
        return(this.body[0].x == box.x && this.body[0].y  == box.y)
       })){
         alert(`game over ,Your score ${this.score}`);
         this.scene.scene.restart();
       }
      
      //  check if its goes beyond the boundry
      if (
        this.body[0].x < 0 ||
        this.body[0].x >= this.scene.game.config.width ||
        this.body[0].y < 0 ||
        this.body[0].y >= this.scene.game.config.height
      ) {
        alert(`Game over,Your Score ${this.score}`);
        this.scene.scene.restart();
      }

    }
    checkHead(){
        
    }
}