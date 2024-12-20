import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import gsap from 'gsap';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  gsap.set(".ball", {xPercent: -50, yPercent: -55});

let xTo = gsap.quickTo(".ball", "x", {duration: 0.2, ease: "power3"});
let yTo = gsap.quickTo(".ball", "y", {duration: 0.2, ease: "power3"});

window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});