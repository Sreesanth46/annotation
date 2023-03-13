<template>
    <div id="canvas-container" class="canvas-container">
        <canvas ref="canvas" width="1500" height="800"></canvas>
    </div>
</template>

<script>
import { fabric } from "fabric";

export default {
    name: "CanvasComponent",

    mounted() {
        const divElement = document.getElementById("canvas-container");
        this.canvas = new fabric.Canvas(this.$refs.canvas, {
            height: divElement.clientHeight,
            width: divElement.clientWidth,
            isDrawingMode: false,
        });

        this.canvas.on("mouse:down", (event) => this.mouseDown(event));
        this.canvas.on("mouse:move", (event) => this.mouseMove(event));
        this.canvas.on("mouse:up", () => this.mouseUp());
        this.canvas.on("mouse:over", () => this.mouseOver());
        this.canvas.on("before:transform", () => this.objectModified());
        this.canvas.on("before:selection:cleared", () =>
            this.selectionCleared()
        );
    },

    computed: {
        stroke() {
            return this.$store.state.stroke;
        },

        selectedTool() {
            return this.$store.state.tool;
        },
    },

    data() {
        return {
            fileUrl:
                "https://media.istockphoto.com/id/148423909/photo/a-sunset-over-chinese-fishing-nets-by-a-canoe-in-cochin.jpg?s=612x612&w=0&k=20&c=76RtSZhX5iheTAyDuH6Uzl9JNWD5axbWlEWc2bXKChw=",

            drawStraightLine: false,
            isDown: false,
            straightLine: null,
            isModifying: false,
            lastDownTarget: null,
        };
    },

    methods: {
        addImage() {
            fabric.Image.fromURL(this.fileUrl, (image) => {
                image.set({
                    left: this.canvas.getWidth() / 2,
                    top: this.canvas.getHeight() / 2,
                });
                this.canvas.centerObject(image);
                this.canvas.setBackgroundImage(image);
                this.canvas.renderAll();
            });
        },

        loadFromJson(json) {
            this.canvas.loadFromJSON(json);
            this.canvas.renderAll();
        },

        freeHand() {
            this.canvas.isDrawingMode = true;
            this.canvas.freeDrawingBrush.color = this.stroke.color;
            this.canvas.freeDrawingBrush.width = this.stroke.width;
        },

        /* eslint-disable */

        mouseDown(event) {
            if (this.isModifying) return;

            console.log("====>" + this.canvas.getActiveObject());
            this.lastDownTarget = event.target;
            this.isDown = true;
            let pointer = this.canvas.getPointer(event.e);

            switch (this.selectedTool) {
                case "Free hand":
                    this.freeHand();
                    break;

                case "Straight Line":
                    this.canvas.isDrawingMode = false;
                    let points = [pointer.x, pointer.y, pointer.x, pointer.y];

                    this.straightLine = new fabric.Line(points, {
                        strokeWidth: this.stroke.width,
                        fill: this.stroke.color,
                        stroke: this.stroke.color,
                        originX: "center",
                        originY: "center",
                        strokeUniform: true,
                    });
                    this.canvas.add(this.straightLine);

                    break;

                case "Rectangle":
                    break;

                case "Eraser":
                    // this.canvas.remove();
                    break;

                case "Insert Text":
                    break;

                case "Flip Text":
                    break;
                default:
                    this.canvas.isDrawingMode = false;
                    break;
            }
        },

        mouseMove(event) {
            if (!this.isDown) return;
            let pointer = this.canvas.getPointer(event.e);

            switch (this.selectedTool) {
                case "Straight Line":
                    this.straightLine.set({ x2: pointer.x, y2: pointer.y });
                    this.canvas.renderAll();
                    break;

                case "Rectangle":
                    break;

                case "Eraser":
                    break;

                case "Insert Text":
                    break;

                case "Flip Text":
                    break;
            }
        },

        mouseUp() {
            this.isDown = false;

            switch (this.selectedTool) {
                case "Free hand":
                    break;

                case "Straight Line":
                    break;

                case "Rectangle":
                    break;

                case "Eraser":
                    break;

                case "Insert Text":
                    break;

                case "Flip Text":
                    break;
            }
        },

        mouseOver() {
            if (this.selectedTool === "Free hand") {
                this.freeHand();
            } else {
                this.canvas.isDrawingMode = false;
            }
        },

        objectModified() {
            this.isModifying = true;
            this.isDown = false;
            this.canvas.isDrawingMode = false;
        },

        selectionCleared() {
            this.isModifying = false;
        },
    },

    created() {
        this.addImage();
    },
};
</script>

<style scoped>
.canvas-container {
    width: 100%;
    height: 100%;
}
canvas {
    background: whitesmoke;
}
</style>