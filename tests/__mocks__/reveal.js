/*eslint-env node, jest, amd*/
const Reveal = jest.createMockFromModule('reveal.js')

Reveal.getTotalSlides = () => 10
Reveal.initialize = () => {}
Reveal.layout = () => {}
Reveal.getSlides = () => []
Reveal.addKeyBinding = () => {}
Reveal.slide = () => {}
Reveal.sync = () => {}
Reveal.layout = () => {}
Reveal.prev = () => {}
Reveal.next = () => {}
Reveal.configure = () => {}
Reveal.next = () => {}
Reveal.next = () => {}
Reveal.getIndices = () => ({ h: 1 })
Reveal.availableRoutes = () => ({ left: true, right: true })

export default Reveal
