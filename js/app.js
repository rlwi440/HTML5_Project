import {
    Text
} from 'js/Text.js';

class app {
    constructor() {
        WebFont.load({
            google: {
                families: ['Hind:700 ']
            },
            fontactive: () => {
                this.Text = new Text();
                this.Text.setText(
                    'a',
                    2,
                    document.body.clientWidth,
                    document.body.clientHeight,
                );
            }
        });
    }
}
window.onload = () => {
    new app();
}