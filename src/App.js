import React from 'react';
import './App.css';
import Snake from './components/snake';
import Food from './components/food'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      snakeDots: [
        [0,0],
        [1,0],
        [1,1],
        [1,2],
        [2,2]
      ],
      direction: "right",
      foodDot: [10,10],
      speed: 150,
      step: 20,
      fieldSize:{
        height: 600,
        width: 1000
      }
    }
  }

  GetRandomPosition = () => {
    let min = 0;
    let maxLeft = 50;
    let maxTop  = 30;
    let x, y;
    do{
      x = Math.floor(Math.random() * (maxLeft - min)) + min;
      y = Math.floor(Math.random() * (maxTop - min)) + min;
    }while(this.IsOnSnake([x,y]));
    return[x,y];
  }

  componentDidMount(){
    setInterval(this.move, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.CheckBorders();
    this.CheckFood();
  }

  CheckBorders(){
    let snake = this.state.snakeDots;
    let head  = snake[snake.length - 1];
    let step  = this.state.step;
    let position  = [
      step * head[0],
      step * head[1]
    ];
    let teleport = (coord) => {
      snake[snake.length - 1] = coord;
      this.setState({
        snakeDots: snake
      });
    }
    if(position[0] >= this.state.fieldSize.width){
      teleport([0, head[1]]);
    }
    else if(position[0] <= -step){
      teleport([(this.state.fieldSize.width / step) - 1, head[1]]);
    }
    else if(position[1] <= -step){
      teleport([head[0], (this.state.fieldSize.height / step) - 1]);
    }
    else if(position[1] >= this.state.fieldSize.height){
      teleport([head[0], 0]);
    }
  }

  CheckDirection(newDir){
    if(!newDir){
      return false;
    }
    switch(this.state.direction){
      case 'left':
        if(newDir == 'right') return false;
        break;
      case 'up':
        if(newDir == 'down') return false;
        break;
      case 'right':
        if(newDir == 'left') return false;
        break;
      case 'down':
        if(newDir == 'up') return false;
        break;
    }
    return  true;
  }

  CheckFood(){
    let snake = this.state.snakeDots;
    let head  = snake[snake.length - 1];
    let food  = this.state.foodDot;
    if(head[0] == food[0] && head[1] == food[1]){
      this.setState({foodDot: this.GetRandomPosition()});
      this.snakeIncrease();
    }
  }

  IsOnSnake(position){
    let result = false;
    let snake = this.state.snakeDots;
    snake.forEach(dot => {
      if(position[0] == dot[0] && position[1] == dot[1]){
        result = true;
      }
    });
    return result;
  }

  snakeIncrease = () => {
    var newSnake = this.state.snakeDots;
    newSnake.unshift([]);
    this.setState({snakeDots: newSnake});
  }

  move = () =>{
    let snake = this.state.snakeDots;
    let head  = snake[snake.length - 1];

    switch(this.state.direction){
      case "left":
          head = [head[0] - 1, head[1]];
        break;
      case "up":
          head = [head[0], head[1] - 1];
        break;
      case "right":
        head = [head[0] + 1, head[1]];
        break;
      case "down":
        head = [head[0], head[1] + 1];
        break;
    }
    snake.push(head);
    snake.shift();
    this.setState({
      snakeDots: snake
    });
  }

  onKeyDown = (evt) => {
    evt = evt || window.event;
    let newDir;
    switch (evt.keyCode) {
      case 37:
        newDir = 'left';
        break;
      case 38:
        newDir = 'up';
        break;
      case 39:
          newDir = 'right';
        break;
      case 40:
          newDir = 'down';
        break;
      case 84:
        this.snakeIncrease();
        break;
    } 
    if(this.CheckDirection(newDir)){
      this.setState({direction: newDir});
    }
   }

  render(){
    return (
      <div className="game-area" style={this.state.fieldSize}>
        <Snake step={this.state.step} snakeDots={this.state.snakeDots} />
        <Food position={this.state.foodDot} step={this.state.step} />
      </div>
    );
  }
}

export default App;
