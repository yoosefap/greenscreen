var processor = {
    doLoad: function () {
        this.video = document.getElementById('video');
        this.frame = document.createElement("CANVAS");
        this.ctxFrame = this.frame.getContext('2d');
        this.show = document.getElementById('show');
        this.ctxShow = this.show.getContext('2d');
        var self = this;
        this.video.addEventListener('play', function () {
            self.width = self.video.videoWidth / 2;
            self.height = self.video.videoHeight / 2;
            self.timerCallback();
        }, false);
    },
    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        var self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },
    computeFrame: function () {
        this.ctxFrame.drawImage(this.video, 0, 0, this.width, this.height);
        var frame = this.ctxFrame.getImageData(0, 0, this.width, this.height);
        var l = frame.data.length / 4;

        this.red = document.getElementById('red').value;
        this.green = document.getElementById('green').value;
        this.blue = document.getElementById('blue').value;
        this.redOperator = document.getElementById('redOperator').value;
        this.greenOperator = document.getElementById('greenOperator').value;
        this.blueOperator = document.getElementById('blueOperator').value;

        for (var i = 0; i < l; i++) {
            var r = frame.data[i * 4 + 0];
            var g = frame.data[i * 4 + 1];
            var b = frame.data[i * 4 + 2];

            if (this.checkOperator(r, g, b))
                frame.data[i * 4 + 3] = 0;
        }

        this.ctxShow.putImageData(frame, 0, 0);
    },
    checkOperator(r, g, b) {
        return ((this.redOperator === '>' && r > this.red) || (this.redOperator === '<' && r < this.red)) && ((this.blueOperator === '>' && b > this.blue) || (this.blueOperator === '<' && b < this.blue)) && ((this.greenOperator === '>' && g > this.green) || (this.greenOperator === '<' && g < this.green));
    }
};
document.addEventListener("DOMContentLoaded", function () {
    processor.doLoad();
});
