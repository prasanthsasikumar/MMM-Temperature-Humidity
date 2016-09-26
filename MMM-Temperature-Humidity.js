/* Magic Mirror
 * Module: MMM-Temperature/Humidity
 *
 * By prasanthsasikumar http://www.github.com/prasanthsasikumar/MMM-Temperature
 * MIT Licensed.
 */

Module.register("MMM-Temperature-Humidity", {

  defaults: {
    refreshInterval: 50000, //Time before successive readings
    temperaturePrefix: "Room temperature: ",
    temperatureSuffix: "°C",
    humidityPrefix: "Humidity: ",
    humiditySuffix: "%"
  },

  start: function() {
    this.temperature = null;
    this.humidity = null;
    Log.info('Starting module: ' + this.name);
    this.sendSocketNotification('CONFIG', this.config);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.className = "small";
    var tempWrapper = document.createElement("tr");;
    tempWrapper.className = "normal";
    var humidWrapper = document.createElement("tr");;
    humidWrapper.className = "normal";
    if (this.temperature != null) {
      var temperature = document.createTextNode(this.config.temperaturePrefix +
        this.temperature +
        this.config.temperatureSuffix);
      temperature.className = " td light";
      tempWrapper.appendChild(temperature);
    }
    if (this.humidity != null) {
      var humidity = document.createTextNode(this.config.humidityPrefix +
        this.humidity +
        this.config.humiditySuffix);
      humidity.className = " td light";
      humidWrapper.appendChild(humidity);
    }
    wrapper.appendChild(tempWrapper);
    wrapper.appendChild(humidWrapper);
    return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "DATA") {
      this.temperature = payload.temperature;
      this.humidity = payload.humidity;
      this.updateDom(2000);
    }
  }
});
