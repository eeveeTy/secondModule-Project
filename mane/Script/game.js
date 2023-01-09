let game = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    score: 0,
    dimensions: {
        max: {
            width: 640,
            height: 1080
        },
        min: {
            width: 320,
            height: 540
        }
    },
    img: {
        background: null,
        cell: null,
        ball: null,
        platformGame: null
    },
    start() {
        this.init();
        this.preload(() => {
            this.run();
        });
    },
    init() {
        this.canvas = document.getElementById('boardStage');
        this.ctx = this.canvas.getContext('2d');
        this.initImg();
    },
    initImg() {
        const data = {
            maxWidth: this.dimensions.max.width,
            maxHeight: this.dimensions.max.height,
            minWidth: this.dimensions.min.width,
            minHeight: this.dimensions.min.height,
            realWidth: window.innerWidth,
            realHeight: window.innerHeight,
        };

        console.log('data.realWidth / data.realHeight', data.realWidth / data.realHeight);
        console.log('data.maxWidth / data.maxHeight', data.maxWidth / data.maxHeight);

        if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
            this.fitWidth(data);
        } else {
            this.fitHeight(data);
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    fitWidth(data) {
        this.height = Math.round(data.maxWidth * data.realHeight / data.realWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight);
        this.width = Math.round(data.realWidth * this.height / data.realHeight);
        this.canvas.style.height = '100%';
    },
    fitHeight(data) { //ширина не большая
        this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.canvas.style.width = '100%';
    },
    preload(callback) {
        let loaded = 0;
        const required = Object.keys(this.img).length;

        const onAssetLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        }

        this.preloadImg(onAssetLoad);
    },
    preloadImg(onAssetLoadCallback) {
        for (let key in this.img) {
            this.img[key] = new Image();
            this.img[key].src = 'img/' + key + '.png';
            this.img[key].addEventListener('load', onAssetLoadCallback);
        }
    },
    run() {
        console.log('Запуск игры');
        this.create();

        this.gameInterval = setInterval(() => {
            this.update();
        }, 100);
    },
    create() {
        //создание элементов (работа с данными)
        this.board.create();

        //установить игровые события

    },
    update() {
        //перемещение элементов
        this.render();
    },
    render() {
        //обновление canvas
        this.board.render();
    },
    stop() {
        clearInterval(this.gameInterval);
    }
};

window.addEventListener('load', () => {
    game.start();
});