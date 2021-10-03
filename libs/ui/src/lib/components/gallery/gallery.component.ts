import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shivam-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImage = '';

  @Input() images: string[];

  constructor() { 
    this.images = [];
  }

  ngOnInit(): void {
    if(this.images.length){
      this.selectedImage = this.images[0];
    }
  }

  onImageChange(image: string){
    this.selectedImage = image;
  }

  get hasImages(){
    return this.images?.length > 0;
  }

}
