const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const p_score = document.getElementById('p_score')

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
                x: 60, y: 400,
                color: this.properties.COLOR_HEAD
            },
            {
                x: 40, y: 400,
                color: this.properties.COLOR_BODY
            },
            {
                x: 20, y: 400,
                color: this.properties.COLOR_BODY
            },
            {
                x: 0, y: 400,
                color: this.properties.COLOR_BODY
            },
            {
                x: -20, y: 400,
                color: this.properties.COLOR_BODY
            },
            {
                x: 0, y: 400,
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        switch (this.direction) {
            case DIRECTION.UP:
                for (let index = this.coordinates.length - 1; index > -1; index--) {
                    if (index == 0) {
                        if (this.coordinates[index].y == 0) {
                            this.coordinates[index].y = canvas.width - CONFIG_SNAKE.WIDTH
                        } else {
                            this.coordinates[index].y = this.coordinates[index].y - this.properties.WIDTH

                        }


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
                        if (this.coordinates[index].y == canvas.width - CONFIG_SNAKE.WIDTH) {
                            this.coordinates[index].y = 0
                        } else {
                            this.coordinates[index].y = this.coordinates[index].y + this.properties.WIDTH

                        }


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
                        if (this.coordinates[index].x == 0) {
                            this.coordinates[index].x = canvas.height - CONFIG_SNAKE.HIGH
                        } else {
                            this.coordinates[index].x = this.coordinates[index].x - this.properties.HIGH
                        }


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
                        if (this.coordinates[index].x == canvas.height - CONFIG_SNAKE.HIGH) {
                            this.coordinates[index].x = 0
                        } else {
                            this.coordinates[index].x = this.coordinates[index].x + this.properties.HIGH
                        }


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
        this.appleFood()

    }
    checkCollisions() {

        const collision = this.coordinates.some((elemt, index, array) => {
            if (index == 0) return false
            if (elemt.x == array[0].x && elemt.y == array[0].y) {
                return true
            } else false
        })
        if (collision) {
            clearInterval(cycle)
            console.log('se choco con sigo misma')
            const game_over = ()=>{
                const img_gamer_over = new Image() 
                img_gamer_over.src = 'https://petrolejonesescritor.files.wordpress.com/2018/08/game-over.png?w=640'
                
                img_gamer_over.addEventListener('load', () => {
                    ctx.drawImage(img_gamer_over, 0, 0)
                    console.log(img_gamer_over)
                })
            }
            game_over()
        }



    }
    appleFood() {
        let food
        const collision = CONFIG_APPLE.APPLES_COORDINATES.some((elemt, index) => {
            if (elemt.x == this.coordinates[0].x
                && elemt.y == this.coordinates[0].y) {
                food = index
                return true
            }
            return false
        })
        if (collision) {
            this.score += 1
            CONFIG_APPLE.APPLES_COORDINATES.splice(food, 1)
            p_score.innerHTML = `score: ${this.score}`
            this.coordinates.push({ ...this.coordinates[this.coordinates.length - 1] })
            this.pocibleApple()

        }


    }
    pocibleApple() {
        const pocible_apple = randomRoordinates()
        const collision = CONFIG_APPLE.APPLES_COORDINATES.some((elemt, index) => {
            if (elemt.x == pocible_apple.x
                && elemt.y == pocible_apple.y) {
                return true
            }
            return false
        })
        if (!collision) {
            const collision = this.coordinates.some((elemt, index, array) => {

                if (elemt.x == pocible_apple.x && elemt.y == pocible_apple.y) {
                    return true
                } else false
            })
            if (!collision) {
                CONFIG_APPLE.APPLES_COORDINATES.push({ ...pocible_apple, color: CONFIG_APPLE.COLOR })
            } else {
                this.pocibleApple()
            }
        } else {
            this.pocibleApple()
        }
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
    WIDTH: 20,
    HIGH: 20,
    COLOR: '#F23030',
    APPLES_COORDINATES: [{
        x: 220, y: 200, color: '#F23030',
    }],

}

const CONFIG_BLOCK = {
    WIDTH: 20,
    HIGH: 20,
    COLOR: '#3B4B8C',
    COORDINATES: [
        { x: 80, y: 80, color: 'black' }
    ]

}
console.log(CONFIG_BLOCK)

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
                    drawBlock()
                    
                }, time);
            } else {
                start = false
                clearInterval(cycle)
            }
            break
    }

    if (start) {


        switch (elemt.keyCode) {

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

}

//dibujar cuadros normales 
function drawSquare(color, x, y) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, CONFIG_SNAKE.WIDTH, CONFIG_SNAKE.HIGH)

}

//dibujar las manzanas
function drawApple() {
    CONFIG_APPLE.APPLES_COORDINATES.map((elemt) => {
        drawSquare(elemt.color, elemt.x, elemt.y)
    })

}

//dibuajr los bloques solidos
function drawBlock() {
    CONFIG_BLOCK.COORDINATES.map((elemt) => {
        drawSquare(elemt.color, elemt.x, elemt.y)
    })

}

//establecer aleatoriamente coorgenadas
function randomRoordinates() {
    const divicibel_width = canvas.width / CONFIG_SNAKE.WIDTH
    const divicibel_high = canvas.height / CONFIG_SNAKE.HIGH
    const ramdom_x = Math.floor(divicibel_width * (Math.random())) * CONFIG_SNAKE.WIDTH
    const ramdom_y = Math.floor(divicibel_high * (Math.random())) * CONFIG_SNAKE.HIGH
    return { x: ramdom_x, y: ramdom_y }
}

