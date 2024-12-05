import { Component, EventEmitter, Output } from '@angular/core';
import {NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'app-image-upload-component',
  standalone: true,
  imports: [],
  templateUrl: './image-upload-component.component.html',
  styleUrls: ['./image-upload-component.component.css'],
})
export class ImageUploadComponentComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  @Output() imageUploaded = new EventEmitter<string>();
  constructor(private imageCompress: NgxImageCompressService) {}

  // Handle file selection and preview image
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = e.target.result as string;
        this.imageCompress.compressFile(image, -1, 50, 50).then(
          (compressedImage) => {
            console.log('Compressed Image:', compressedImage);
            this.imageUploaded.emit(compressedImage);
            this.clearSelection();
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private clearSelection(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
