import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PrismService } from '../../Prism.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements AfterViewInit {
  @ViewChild('json') jsonElement?: ElementRef;
  @ViewChild('code') codeElement?: ElementRef;
  public form: Object;
  constructor(public prism: PrismService) {
    this.form = {
      components: []
    };
    
  }

  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));

  }
  save(formName){
    localStorage.setItem(formName+".json", JSON.stringify(this.form, null, 4));
  }

  

  ngAfterViewInit() {
    this.prism.init();
  }
}
