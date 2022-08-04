const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const time = 200
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
            }]
        console.log(this.coordinates)

        this.score = 0
        this.history = []
        this.direction = DIRECTION.RIGHT

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

                break;
            case DIRECTION.DOWN:

                break;
            case DIRECTION.LEFT:

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
                this.coordinates.map((elem) => console.log(elem))
                break;

            default:
                break;
        }
        this.draw()
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
    WIDTH: 10,
    HIGH: 10,
    COLOR_BODY: '#001010',
    COLOR_HEAD: '#F2BB5C',
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
                }, time);
            } else {
                start = false
                clearInterval(cycle)
            }
            break
        case KEYS.UP:
            snake_1.direction == DIRECTION.DOWN
                ? snake_1.direction == snake_1.direction
                : snake_1.direction = DIRECTION.UP
            break
        case KEYS.DOWN:
            snake_1.direction == DIRECTION.UP
                ? snake_1.direction == snake_1.direction
                : snake_1.direction = DIRECTION.DOWN
            break
        case KEYS.LEFT:
            snake_1.direction == DIRECTION.RIGHT
                ? snake_1.direction == snake_1.direction
                : snake_1.direction = DIRECTION.LEFT
            break
        case KEYS.RIGHT:
            snake_1.direction == DIRECTION.LEFT
                ? snake_1.direction == snake_1.direction
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

function reversedd(invest) {
    const reverse_move = invest.map((elemt, index, array) => {
        return elemt = array[index]
    })
    return reverse_move
}

