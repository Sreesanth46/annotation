
<template>
    <div class="tool-container">
        <div class="icon-container" v-for="(data, index) in iconData" :key="index">
            <div class="icon-content">
                <button role="link" @click="showSelections(data.title)" :class="{ active: clicked === data.title }">
                    <span class="tooltip" :title="data.title">
                        <Icon :icon="data.icon" />
                    </span>
                </button>
            </div>
        </div>
        <div class="bgcolor" style="align-items: center;">
            <input type="color" id="background" title="Change Background color" style="width:30px; cursor: pointer;" />
        </div>
        <div class="dropicons">
            <div class="dropdown">
                <button id="textTools" @click="toggleText()" class="dropbtn" title="Text"
                    :class="{ active: clicked == 'Insert Text' || clicked == 'Flip Text' }">
                    <Icon :icon="textType == 1 ? 'material-symbols:insert-text' : 'material-symbols:text-rotation-down'"
                        id="shownId" />
                </button>
                <div id="textDropdown" class="dropdown-content">
                    <Icon :icon="textIconData[0].icon" id="textId" @click="showItem(1)"
                        :class="{ active: textType == 1 }" />
                    <Icon :icon="textIconData[1].icon" id="textVertId"
                        @click="showItem(2)" :class="{ active: textType == 2  }" />
                </div>
            </div>


            <div class="dropdown">
                <button @click="toggleInk(); showSelections('colorButton')" class="dropbtn" title="Change Color"
                    :class="{ active: clicked === 'colorButton' }">
                    <Icon icon="ri:ink-bottle-line" />
                </button>
                <div id="inkDropdown" class="dropdown-content">
                    <input type="color" id="selectcolor" style="width:30px;" />
                </div>
            </div>

            <div class="dropdown">
                <button @click="toggleThickness(); showSelections('thickButton')" class="dropbtn"
                    title="Change line thickness and opacity" :class="{ active: clicked === 'thickButton' }">
                    <Icon icon="ri:edit-2-line" />
                </button>
                <div id="thickDropdown" class="dropdown-content">
                    <div class="pen-container">
                        <div class="ball-pen-content">
                            <Icon icon="ri:ball-pen-line" />
                        </div>
                        <div class="mark-pen-content">
                            <Icon icon="ri:mark-pen-line" />
                        </div>
                    </div>
                    <div class="slider-content">
                        <div class="thickness-container">
                            <span class="labeled">Thickness</span>
                            <input type="range" v-model="sliderThick" name="textThickness" min="1" max="20"
                                @change="updateThickness(this.sliderThick);" />
                            &nbsp;&nbsp;
                            <input type="text" id="thickvalue" :value="sliderThick" /> px
                            <br /><br />
                            <span class="labeled">Opacity</span>
                            <input type="range" v-model="sliderOpacity" name="textOpacity" min="10" max="100"
                                @change="updateOpacity(this.sliderOpacity);" />
                            &nbsp;&nbsp;
                            <input type="text" id="opacityvalue" :value="sliderOpacity" /> %
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { Icon } from '@iconify/vue';

export default
    {
        name: "CanvasToolBar",
        components: { Icon },
        data() {
            return {
                clicked: 'none',
                sliderThick: 10,
                sliderOpacity: 50,
                textType: 0,
                iconData: [
                    {
                        icon: 'mdi:vector-rectangle',
                        title: 'Rectangle'
                    },
                    {
                        icon: 'material-symbols:pen-size-2',
                        title: 'Straight Line'
                    },
                    {
                        icon: 'ri:quill-pen-line',
                        title: 'Free hand'
                    },
                    {
                        icon: 'ph:eraser-light',
                        title: 'Eraser'
                    },
                    {
                        icon: 'material-symbols:back-hand',
                        title: 'Hand Tool'
                    },
                    {
                        icon: 'ic:baseline-zoom-in',
                        title: 'Drag to specify the zoom range'
                    },
                ],
                textIconData: [
                    {
                        icon: 'material-symbols:insert-text',
                        title: 'Insert Text'
                    },
                    {
                        icon: 'material-symbols:text-rotation-down',
                        title: 'Flip Text'
                    }
                ]
            };
        },
        methods: {
            showSelections(title) {
                if (this.clicked == title) {
                    this.clicked = 'none';
                    this.$store.commit("updateTool", this.clicked)
                }
                else {
                    this.clicked = title
                    this.$store.commit("updateTool", this.clicked)
                }
            },

            showItem(e) {
                if(this.textType == e) {
                    this.textType = 0
                } else {
                    this.textType = e
                }
                
                if (e == 1) {
                    this.showSelections(this.textIconData[0].title)
                }
                else if (e == 2) {
                    this.showSelections(this.textIconData[1].title)
                }
            },

            updateThickness(val) {
                document.getElementById('textThickness').value = val;
                this.thicknessvalue = val;
                this.$store.commit("updateStrokeWidth", this.thicknessvalue)
            },
            updateOpacity(val) {
                document.getElementById('textOpacity').value = val;
                this.opacityvalue = val;
                this.$store.commit("updateStrokeOpacity", this.opacityvalue)
            },

            toggleText() {
                document.getElementById("textDropdown").classList.toggle("show");
            },

            toggleInk() {
                document.getElementById("inkDropdown").classList.toggle("show");
            },

            toggleThickness() {
                document.getElementById("thickDropdown").classList.toggle("show");
            },
        }
    };

</script>

<style scoped>
.tool-container {
    width: 5vw;
    height: 100%;
    padding: 8px 0;
    border-right: 2px solid #292929;
    text-align: center;
    background-color: #404040;
    color: #fafbfc;
    box-sizing: border-box;
    display: flex;
    flex-direction: column
}

.dropicons {
    width: 5vw;
    height: 100%;
    padding: 6px 2px;
    border-right: 2px solid #292929;
    text-align: center;
    background-color: #404040;
    color: #fafbfc;
    box-sizing: border-box;
    display: flex;
    flex-direction: column
}

.icon-container {
    position: relative;
    text-align: center;
    font-size: x-large;
}

.icon-container :hover {
    cursor: pointer;
}

.active {
    color: red;
}

.dropbtn {
    padding: 6px;
    font-size: x-large;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #404040;
    font-size: x-large;
    width: max-content;
    border-radius: 2px;
    z-index: 1;
    left: 100%;
    top: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.pen-container {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    border-radius: 5%;
    border: 1px solid gray;
    border-top: 1px solid gray;
    padding: 5px 5px 2px 6px;
}

.ball-pen-content {
    border-right: 0.5px solid gray;
}

.show {
    display: block;
}

#textTool ::after {
    display: none;
}

.slider-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    flex-wrap: nowrap;
    font-size: 14px;
}

.slider-content input {
    flex: 1 1 auto;
}

#thickvalue {
    width: 40px;
    font-size: 14px;
}

#opacityvalue {
    width: 40px;
    font-size: 14px;

}
</style>