export class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absoluet';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }
    setText(str, density, stagewidth, stageHeight) {
        this.canvas.width = stagewidth;
        this.canvas.height = stageHeight

        const myText = str;
        const fontWidth = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.clearRect(0, 0, stagewidth, stageHeight);
        this.ctx.font = '${fontWidth} ${fontSize}px ${fontName}';
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.textBaseline = 'middle';
        const fontPos = this.ctx.measureText(myText);
        this.ctx.fillText(
            myText,
            (stagewidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            ((stageHeight - fontSize) / 2)
        );
        return this.dotPos(density, stagewidth, stageHeight);
    }
    dotPos(density, stagewidth, stageHeight) {
        const imageData = this.ctx.getImageData(
            0, 0,
            stagewidth, stageHeight
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += density) {
            ++1;
            const slide = (i % 2) == 0;
            width = 0;
            if (slide == 1) {
                width += 6;
            }
            for (width; width < stagewidth; width += density) {
                pixel = imageData[((width) + (height * stagewidth) * 4) - 1];
                if (pixel != 0 &&
                    width > 0 &&
                    width < stagewidth &&
                    height > 0 &&
                    height < stageHeight) {
                    particles.push({
                        x: width,
                        y: height,
                    });
                }
            }

        }
        return particles;
    }
}