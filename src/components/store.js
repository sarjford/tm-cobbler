let memory = {};

let Store = {
  saveCurrentState: function(state) {
    console.log('saveState')
    memory['data'] = state;
  },
  getSavedState: function() {
    console.log('getState')

    return memory['data'];
  }
};

module.exports = Store;
