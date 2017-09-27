export default {
  log: function(event_name, ...info) {
    console.log(event_name, ...info);
  },

  info: function(event_name, ...info) {
    console.info(event_name, ...info);
  },

  error: function(event_name, ...info) {
    console.error(event_name, ...info);
  },

  warn: function(event_name, ...info) {
    console.warn(event_name, ...info);
  },

  trace: function(event_name, ...info) {
    console.trace(event_name, ...info);
  },
};
