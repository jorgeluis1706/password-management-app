import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Clipboard} from '@angular/cdk/clipboard';
import {PasswordManagementService} from "../../services/password-management/password-management.service";
import {Password} from "../../models/Password";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-password-dialog',
  templateUrl: './add-password-dialog.component.html',
  styleUrls: ['./add-password-dialog.component.scss']
})
export class AddPasswordDialogComponent implements OnInit {

  /**
   * Hide text in password input.
   */
  hidePassword: boolean = true;

  /**
   * Form password.
   */
  passwordForm = this.fb.group({
    url: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private clipboard: Clipboard,
              public dialogRef: MatDialogRef<AddPasswordDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public passwordData: Password,
              private passwordManagementService: PasswordManagementService) { }

  ngOnInit(): void {
    if(this.passwordData){
      this.passwordForm.setValue({
        url: this.passwordData.url,
        name: this.passwordData.name,
        username: this.passwordData.username,
        password: this.passwordData.password
      });
    }
  }

  /**
   * Save changes when we submit de password form.
   */
  onSubmit(): void {
    const password: Password = this.passwordForm.value as Password;

    if(!this.passwordData){
      this.passwordManagementService.createPassword(password).subscribe(
        response => {
          this.dialogRef.close(response);
        }
      );
    }else{
      this.passwordManagementService.updatePassword(this.passwordData.id, password).subscribe(
        response => {
          this.dialogRef.close(response);
        }
      )
    }
  }

  /**
   * Copy password from the input.
   * @param password Password to copy.
   */
  copyPassword(password: string): void {
    this.clipboard.copy(password);
  }
}
