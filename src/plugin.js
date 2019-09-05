/*****************************************************************
 ** Author: Asvin Goel, goel@telematique.eu
 **
 ** A plugin replacing the default controls by custom controls.
 **
 ** Version: 1.0.0
 **
 ** License: MIT license (see LICENSE.md)
 **
 ******************************************************************/
const RevealCustomControls = window.RevealCustomControls || {
  id: 'RevealCustomControls',
  init: function (deck) {
    initCustomControls(deck)
  },
}

const initCustomControls = function (Reveal) {
  const config = Reveal.getConfig().customcontrols || {
    slideNumberCSS:
      'position: fixed; display: block; right: 90px; top: auto; left: auto; width: 50px; bottom: 30px; z-index: 31; font-family: Helvetica, sans-serif; font-size:  12px; line-height: 1; padding: 5px; text-align: center; border-radius: 10px; background-color: rgba(128,128,128,.5)',
    controls: [
      {
        icon: '<i class="fa fa-caret-left"></i>',
        css: 'position: fixed; right: 60px; bottom: 30px; z-index: 30; font-size: 24px;',
        action: 'Reveal.prev(); return false;',
      },
      {
        icon: '<i class="fa fa-caret-right"></i>',
        css: 'position: fixed; right: 30px; bottom: 30px; z-index: 30; font-size: 24px;',
        action: 'Reveal.next(); return false;',
      },
    ],
  }

  for (const configItem of config.controls) {
    const control = document.createElement('div')
    control.className = 'customcontrols'
    control.style.cssText = configItem.css
    control.innerHTML =
      '<a href="#" onclick="' +
      configItem.action +
      '">' +
      configItem.icon +
      '</a>'
    document.querySelector('.reveal').appendChild(control)
  }

  Reveal.addEventListener('ready', function () {
    if (Reveal.getConfig().slideNumber && config.slideNumberCSS) {
      const slideNumber = document.querySelector('.reveal .slide-number')
      slideNumber.style.cssText = config.slideNumberCSS
    }
  })

  return this
}

export default { RevealCustomControls }
