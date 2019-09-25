import { Component, AfterViewInit } from '@angular/core';
import { PrismService } from '../../Prism.service';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {

  form: any;
  error: any;
  storedForms: any[] = [" "]
  currentFormName: any;


  constructor(public prism: PrismService) { }
  ngAfterViewInit() {
    this.prism.init();
    this.getStoredJson();
  }

  getForm(formName) {
    this.currentFormName = formName
    this.error = null;
    try {
      this.form = JSON.parse(localStorage.getItem(formName));
    }
    catch (e) {
      this.error = e
    }
  }

  buildForm(jsonString) {
    this.error = null;
    try {
      this.form = JSON.parse(jsonString);
    }
    catch (e) {
      this.error = e
    }

  }

  getStoredJson() {
    for (var i = 0, len = localStorage.length; i < len; i++) {
      var key = localStorage.key(i);
      if (key.endsWith(".json")) {
        this.storedForms[i] = key
      }
    }
  }
  save(saveFormName, jsonString) {
    this.buildForm(jsonString)
    localStorage.setItem(saveFormName + ".json", JSON.stringify(this.form, null, 4));
  }


}
