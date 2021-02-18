import {
    Polygon
} from './Polygon.js';

class App {
    constructor() {
        /*canvas를사용하는이유 그래픽적인 요소 그리기 사용되는 
         'html5' 의 새로운 태그*/
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        /* getContext()를 사용하여 위치를 정의할 필요가 있다. 
        기본적으로 2d로 정의되며, 위 요소를 사용하면 canvas에 2d 좌표로 위치를 지정할 수 있게 된다.*/
        this.ctx = this.canvas.getContext('2d');
        //읽기전용 속성 현재표시장치의 물리적 픽셀과 css픽셀의 비율을 반환하다.
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.Polygon = new Polygon(
            this.stageHeight / 2,
            this.stageHeight / 2,
            this.stageHeight / 3.5,
            12
        );
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.moveX *= 0.50;

        this.Polygon.animate(this.ctx, this.moveX);
    }
    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }
    onUp(e) {
        this.isDown = false;

    }
}

window.onload = () => {
    new App();
}