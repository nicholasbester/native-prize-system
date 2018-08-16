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

  down: Function;
  up: Function;
  drag: Function;
  timer: any;

  ngOnInit() {
    this.scratching = false;
    this.angle = 0;
    this.rotationStart = 0;
    this.rotationOffset = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 400;
    this.timestamp = 0;

    this.down = function(event: any = null) {
      this.scratching = true;
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;

      clearInterval(this.timer);
      TweenMax.killAll();
    };

    this.up = function(event: any = null) {
      this.scratching = false;
      this.rotationOffset = this.angle;
      this.rotationStart = -1;

      // Stop record
      TweenMax.to(this.record.nativeElement, .75, {
        rotation: this.angle + 50,
        ease: Quad.easeOut,
      });
    };

    this.drag = function(event: any = null) {
      if (this.scratching) {
        const deltaX = event.offsetX - this.lastX;
        const deltaY = event.offsetY - this.lastY;

        let rotation = 0;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          const direction = event.offsetY > this.size / 2.0 ? -1.0 : 1.0;
          rotation = (deltaX / this.size) * 180.0 * direction;
        } else {
          const direction = event.offsetX > this.size / 2.0 ? 1.0 : -0.5;
          rotation = (deltaY / this.size) * 180.0 * direction;
        }

        this.angle += rotation;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;

        TweenMax.set(this.record.nativeElement, {
          rotation: this.angle,
          repeat: -1,
          ease: Linear.easeNone
        });
      }
    };

    this.timer = setInterval(() => this.rotateRecord(), 10);
  }

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

  ngOnDestroy() {
    clearInterval(this.timer);
    TweenMax.killAll();
  }
}
