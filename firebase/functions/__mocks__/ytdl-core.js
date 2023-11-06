const original = require('ytdl-core');

function ytdl(...args) {
  return {
    ...original(...args),
    pipe() {
      return {
        on(_e, cb) {
          cb();
        },
      };
    },
  };
}

// extend
Object.assign(ytdl, original);

module.exports = ytdl;
