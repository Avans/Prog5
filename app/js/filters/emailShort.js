module.exports = function() {
    return function(input) {
        return input ? input.split('@')[0] : "";
  }
}