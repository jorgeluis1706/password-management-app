import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddPasswordDialogComponent} from "./components/add-password-dialog/add-password-dialog.component";
import {Password} from "./models/Password";
import {PasswordManagementService} from "./services/password-management/password-management.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'password-management-app';

  passwords: Password[] = [];

  constructor(public dialog: MatDialog, public passwordManagementService: PasswordManagementService) {
    passwordManagementService.getPasswords().subscribe((passwords) => this.passwords = passwords);
  }

  /**
   * Open dialog to create a password register.
   */
  openDialogToCreatePassword(): void {
    const dialogRef = this.dialog.open(AddPasswordDialogComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe((res) => {
      if(res != 'false') {
        this.passwords.push(res);
      }
    });
  }

  /**
   * Open dialog to edit a password register.
   * @param passwordData new password data.
   */
  openDialogToEditPassword(passwordData: Password): void {
    const dialogRef = this.dialog.open(AddPasswordDialogComponent, {
      data: passwordData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((res) => {
      if(res != 'false') {
        this.passwords = this.passwords.map((password) => {
          if (password.id === passwordData.id) {
            password = res;
          }

          return password;
        });
      }
    });
  }

  /**
   * Delete password
   * @param id Password ID
   */
  deletePassword(id: number): void {
    this.passwordManagementService.deletePassword(id).subscribe((_) => {
      console.log("Success");
      this.passwords = this.passwords.filter((passwords) => passwords.id !== id);
    });
  }
}
