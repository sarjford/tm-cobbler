let o = {};

let Store = {
  saveProductList: function(state) {
    o['products'] = state;
  },
  getProductList: function() {
    return o['products'];
  }
};

module.exports = Store;
