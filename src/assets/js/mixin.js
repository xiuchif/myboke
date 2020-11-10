const overEle = {
  methods: {
    addUnderLine(e) {
      e.target.classList.add("underLine");
      e.target.style.color = "#2d8cf0";
    },
    removeUnderLine(e) {
      console.log(e)
      e.target.classList.remove("underLine");
      e.target.style.color = "";
    },
  },
};
export default {
  overEle,
};
