import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "vinyl",
  templateUrl: "vinyl.html"
})
export class VinylComponent {
  @ViewChild("record")
  record: ElementRef;

  scratching: Boolean;
  angle: number;
  rotationStart: number;
  rotationOffset: number;
  lastX: number;
  lastY: number;
  size: number;
  timestamp: number;
  timer: any;

  ngOnInit() {
    this.scratching = false;
    this.angle = 0;
    this.rotationStart = 0;
    this.rotationOffset = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 512;
    this.timestamp = 0;
  }

  ngAfterViewInit() {
    TweenMax.to(this.record.nativeElement, 3, {
      rotation: 360,
      repeat: -1,
      ease: Linear.easeNone,
      onUpdate: this.updateVars,
      onUpdateParams: [this.record]
    });
  }

  updateVars(record) {
    this.angle = (<ElementRef>record).nativeElement._gsTransform.rotation;
  }

  down(event: any = null) {
    this.scratching = true;

    if (event.type == 'mousedown') {
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    } else if (event.type == 'touchstart') {
      this.lastX = event.touches[0].clientX;
      this.lastY = event.touches[0].clientY;
    }

    TweenMax.killTweensOf(this.record.nativeElement);
  };

  up(event: any = null) {
    this.scratching = false;
    this.rotationOffset = this.angle;
    this.rotationStart = -1;

    // Stop record
    TweenMax.to(this.record.nativeElement, .75, {
      rotation: this.angle + 10,
      ease: Quad.easeOut,
    });
  };

  drag(event: any = null) {
    if (this.scratching) {
      let deltaX;
      let deltaY;
      let rotation = 0;

      if (event.type == 'mousemove') {
        deltaX = event.offsetX - this.lastX;
        deltaY = event.offsetY - this.lastY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          let direction = event.offsetY > this.size / 2.0 ? -1.0 : 1.0;
          rotation = (deltaX / this.size) * 180.0 * direction;
        } else {
          let direction = event.offsetX > this.size / 2.0 ? 1.0 : -0.5;
          rotation = (deltaY / this.size) * 180.0 * direction;
        }

        this.angle += rotation;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
      } else if (event.type == 'touchmove') {
        deltaX = event.changedTouches[0].clientX - this.lastX;
        deltaY = event.changedTouches[0].clientY - this.lastY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          let direction = event.changedTouches[0].clientY > this.size / 2.0 ? -1.0 : 1.0;
          rotation = (deltaX / this.size) * 180.0 * direction;
        } else {
          let direction = event.changedTouches[0].clientX > this.size / 2.0 ? 1.0 : -0.5;
          rotation = (deltaY / this.size) * 180.0 * direction;
        }

        this.angle += rotation;
        this.lastX = event.changedTouches[0].clientX;
        this.lastY = event.changedTouches[0].clientY;
      }

      TweenMax.set(this.record.nativeElement, {
        rotation: this.angle,
        repeat: -1,
        ease: Linear.easeNone
      });
    }
  };

  rotateRecord() {
    if (!this.scratching) {
      if (this.timestamp >= 0) {
        if (this.rotationStart < 0) {
          this.rotationStart = this.timestamp;
        }

        this.angle =
          (((this.timestamp - this.rotationStart) / 5.0) % 360.0) +
          this.rotationOffset;
      }

      this.timestamp += 10;

      TweenMax.set(this.record.nativeElement, {
        rotation: this.angle,
        repeat: -1,
        ease: Linear.easeNone
      });
    }
  }

  stopSpinning() {

    // Stop record
    TweenMax.to(this.record.nativeElement, .75, {
      rotation: this.angle + 20,
      ease: Quad.easeOut,
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    TweenMax.killAll();
  }
}
