import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storedForms:any[]=[" "];
  form:any;

  constructor() { 
    this.getStoredJson();
  }

  getStoredJson(){
    for(var i=0, len=localStorage.length; i<len; i++) {
      var key = localStorage.key(i);
      if (key.endsWith(".json")){
      this.storedForms[i]=key}
  }
  return this.storedForms
  }

  getForm(formName){
    this.form=JSON.parse(localStorage.getItem(formName));
}

save(formName){
  localStorage.setItem(formName+".json", JSON.stringify(this.form, null, 4));
}


  
}
