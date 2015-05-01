'use strict';

var assign = require('object-assign');
var audioContext;

/**
 * Thin biquad filter creation wrapper.
 * @param  {Object} defaults Default options (usually just type)
 * @api private
 */
function _createBiquadFilter(defaults) {
    return function(context, opts) {
        if (audioContext) {
            opts = context;
            context = audioContext;
        }
        opts = assign(opts, defaults);

        var filter = context.createBiquadFilter();

        Object.keys(opts).forEach(function(option) {
            if (option !== 'type') {
                filter[option].value = opts[option];
            } else {
                filter.type = opts[option];
            }
        });

        return filter;
    };
}

var lowpass   = _createBiquadFilter({type: 'lowpass'});
var highpass  = _createBiquadFilter({type: 'highpass'});
var bandpass  = _createBiquadFilter({type: 'bandpass'});
var lowshelf  = _createBiquadFilter({type: 'lowshelf'});
var highshelf = _createBiquadFilter({type: 'highshelf'});
var peaking   = _createBiquadFilter({type: 'peaking'});
var notch     = _createBiquadFilter({type: 'notch'});
var allpass   = _createBiquadFilter({type: 'allpass'});

/**
 * Export it
 */

module.exports = function setContext(context) {
    audioContext = context;
    return {
        lowpass: lowpass,
        highpass: highpass,
        bandpass: bandpass,
        lowshelf: lowshelf,
        highshelf: highshelf,
        peaking: peaking,
        notch: notch,
        allpass: allpass
    };
};

module.exports.lowpass   = lowpass;
module.exports.highpass  = highpass;
module.exports.bandpass  = bandpass;
module.exports.lowshelf  = lowshelf;
module.exports.highshelf = highshelf;
module.exports.peaking   = peaking;
module.exports.notch     = notch;
module.exports.allpass   = allpass;
