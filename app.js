const app = Vue.createApp({
  data() {
    return {
      baseColor: "#c23bb0",
      palette: [],
      hoverIndex: null,
      colorInfo: "",
    };
  },
  methods: {
    showColorInfo(color) {
      this.hoverIndex = this.palette.indexOf(color);
      this.colorInfo = color;
    },

    hideColorInfo() {
      this.hoverIndex = null;
      this.colorInfo = "";
    },
    generatePalettes() {
      this.palette = [];
      const baseRGB = this.hexToRGB(this.baseColor);
      for (let i = 1; i <= 6; i++) {
        const shade = this.calculateShade(baseRGB, i * -22);
        const tint = this.calculateShade(baseRGB, i * 22);
        this.palette.push(shade, tint);
      }
    },
    generatePalette() {
      this.palette = [];
      this.palette.push(this.baseColor);
    },
    addRandomColor() {
      const randomColor = this.generateRandomColor();
      this.palette.push(randomColor);
    },
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    copyToClipboard() {
      const textarea = document.createElement("textarea");
      textarea.value = this.palette.join("\n");
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Palette copied to clipboard!");
    },
    resetPalette() {
      this.palette = [];
    },

    hexToRGB(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
    calculateShade(baseRGB, amount) {
      const r = this.clamp(baseRGB.r + amount, 0, 255);
      const g = this.clamp(baseRGB.g + amount, 0, 255);
      const b = this.clamp(baseRGB.b + amount, 0, 255);
      return `rgb(${r}, ${g}, ${b})`;
    },
    clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    },
  },
});

app.mount("#app");
