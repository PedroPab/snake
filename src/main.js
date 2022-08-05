const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const time = 100
let start = false
let cycle
if (!ctx) console.log(new Error('no se inicio el canvas correctamente'))

//la clase snake para tener todo en orden y sea escalable 
class snake {
    constructor() {
        this.properties = CONFIG_SNAKE
        this.coordinates = [
            {
                x: 50, y: 400,
                color: this.properties.COLOR_HEAD
            },
            {
                x: 40, y: 400,
                color: this.properties.COLOR_BODY
            },
            {
                x: 30, y: 400,
                color: this.properties.COLOR_BODY
            }]

        this.score = 0
        this.history = []
        this.direction = DIRECTION.RIGHT
        this.direction_real = DIRECTION.RIGHT

    }
    draw() {
        this.coordinates.map((piece) => {
            drawSquare(piece.color, piece.x, piece.y)
        })
    }
    update() {
        ctx.clearRect(0, 0, 500, 500)

        switch (this.direction) {
            case DIRECTION.UP:
                for (let index = this.coordinates.length - 1; index > -1; index--) {
                    if (index == 0) {
                        this.coordinates[index].y = this.coordinates[index].y - this.properties.WIDTH


                    } else {
                        this.coordinates[index].x = this.coordinates[index - 1].x
                        this.coordinates[index].y = this.coordinates[index - 1].y
                    }
                }
                this.direction_real = DIRECTION.UP
                break;
            case DIRECTION.DOWN:
                for (let index = this.coordinates.length - 1; index > -1; index--) {
                    if (index == 0) {
                        this.coordinates[index].y = this.coordinates[index].y + this.properties.WIDTH


                    } else {
                        this.coordinates[index].x = this.coordinates[index - 1].x
                        this.coordinates[index].y = this.coordinates[index - 1].y
                    }
                }
                this.direction_real = DIRECTION.DOWN
                break;
            case DIRECTION.LEFT:
                for (let index = this.coordinates.length - 1; index > -1; index--) {
                    if (index == 0) {
                        this.coordinates[index].x = this.coordinates[index].x - this.properties.HIGH


                    } else {
                        this.coordinates[index].x = this.coordinates[index - 1].x
                        this.coordinates[index].y = this.coordinates[index - 1].y
                    }
                }
                this.direction_real = DIRECTION.LEFT
                break;
            case DIRECTION.RIGHT:
                for (let index = this.coordinates.length - 1; index > -1; index--) {
                    if (index == 0) {
                        this.coordinates[index].x = this.coordinates[index].x + this.properties.HIGH


                    } else {
                        this.coordinates[index].x = this.coordinates[index - 1].x
                        this.coordinates[index].y = this.coordinates[index - 1].y
                    }
                }
                this.direction_real = DIRECTION.RIGHT
                break;

            default:
                break;
        }
        this.draw()
        this.checkCollisions()
        this.checkCollisionsApple()

    }
    checkCollisions(){

    }
    checkCollisionsApple(){
        
    }
}
//cosntstes del key code de las teclas
const KEYS = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    ESC: 27,

}
const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
}

//configuracion y propiedades de la serpiente
const CONFIG_SNAKE = {
    WIDTH: 20,
    HIGH: 20,
    COLOR_BODY: '#2A7A8C',
    COLOR_HEAD: '#090A0D',
}

const CONFIG_APPLE = {
    WIDTH: 10,
    HIGH: 10,
    COLOR: '#F23030',
    APPLES_COORDINATES: [{
        x: 210, y: 200, color: '#F23030',
    }],
}

//temporalmente luego esto se deve de poner de manera mas eficiente
let snake_1 = new snake()
document.addEventListener('keydown', keyDown)


function keyDown(elemt) {
    switch (elemt.keyCode) {
        case KEYS.SPACE:
            if (!start) {
                start = true
                snake_1.draw()
                cycle = setInterval(() => {
                    snake_1.update()
                    drawApple()
                }, time);
            } else {
                start = false
                clearInterval(cycle)
            }
            break
        case KEYS.UP:
            snake_1.direction_real == DIRECTION.DOWN
                ? false
                : snake_1.direction = DIRECTION.UP

            break
        case KEYS.DOWN:
            snake_1.direction_real == DIRECTION.UP
                ? false
                : snake_1.direction = DIRECTION.DOWN

            break
        case KEYS.LEFT:
            snake_1.direction_real == DIRECTION.RIGHT
                ? false
                : snake_1.direction = DIRECTION.LEFT

            break
        case KEYS.RIGHT:
            snake_1.direction_real == DIRECTION.LEFT
                ? false
                : snake_1.direction = DIRECTION.RIGHT

            break
        default:
            break
    }

}

//dibujar cuadros normales 
function drawSquare(color, x, y) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, CONFIG_SNAKE.WIDTH, CONFIG_SNAKE.HIGH)

}

//dibujar las manzanas
function drawApple(){
    CONFIG_APPLE.APPLES_COORDINATES.map((elemt)=>{
        drawSquare(elemt.color, elemt.x, elemt.y)
    })

}


