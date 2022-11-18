import { Pipe, PipeTransform } from '@angular/core';
import {Password} from "../../models/Password";

@Pipe({
  name: 'filterPasswords'
})
export class FilterPasswordsPipe implements PipeTransform {

  transform(passwords: Password[], input: string): any {
    if(input){
      return passwords.filter(password => password.name.toLowerCase().indexOf(input) >= 0);
    }else{
      return passwords;
    }
  }

}
