import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  selectedFile!:File
  constructor(
    private service:ApiServiceService,
  ){

  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onUpload(): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.sendFile(uploadData)
        .subscribe(
          (response) => {
            console.log('Upload successful');
          },
          (error) => {
            console.error('Upload error:', error);
          }
        );
    }
  }
}
