


gsap.registerPlugin(ScrollTrigger);




gsap.set('.madeleine', {xPercent:-225, autoAlpha: 1})
gsap.set('.toast', {autoAlpha: 1})

var controller = new ScrollMagic.Controller();

var bottomEnd = 0.35 * innerHeight;

const tween = gsap.timeline({
    /*scrollTrigger: {
        trigger: "#kitchen",
        pin:true,
        start: "top top",
        end: "+=1000",
        scrub:true,
      }*/
}).add('start')

tween.to('.madeleine', {
    autoAlpha:1, 
    y:0, 
    duration:3, 
    stagger:1,
    xPercent: -60,
    yPercent: -20,
}, 'start');

tween.to('.coffee', {
    autoAlpha: 1,
    y:0, 
    duration: 3,
    stagger:1,
    xPercent: -110,
    yPercent: -15,

}, '-=4');

tween.to()
/*var scene = new ScrollMagic.Scene({
    triggerElement: '.choppedcarrots',
    duration: "50%",
    triggerHook: 0.25
})
.setTween(tween)
.addTo(controller);*/
