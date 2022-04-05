module.exports = class Weather {
  constructor(temp, count, msg1, icon1) {
    this.temperature = temp;
    this.country = count;
    this.msg = msg1;
    this.icon = icon1;
  }
};
