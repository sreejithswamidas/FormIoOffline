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
  storedForms:any[]=[" "]
  currentFormName:any;
  constructor(public prism: PrismService) {
    this.form = {
      components: []
    };
    this.getStoredJson();
  }

  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));

  }
  save(formName: string){
    if(formName==""){
      console.log(this.currentFormName)
      localStorage.setItem(this.currentFormName, JSON.stringify(this.form, null, 4));
      return;
    }
    localStorage.setItem(formName+".json", JSON.stringify(this.form, null, 4));
  }

  

  ngAfterViewInit() {
    this.prism.init();
  }

  getForm(formName){
     this.currentFormName=formName
     console.log(this.currentFormName)
      this.form=JSON.parse(localStorage.getItem(formName));
  }

  getStoredJson(){
    for(var i=0, len=localStorage.length; i<len; i++) {
      var key = localStorage.key(i);
      if (key.endsWith(".json")){
      this.storedForms[i]=key}
  }}

  newForm(){
    this.form = {
      components: []
    };
  }
}
