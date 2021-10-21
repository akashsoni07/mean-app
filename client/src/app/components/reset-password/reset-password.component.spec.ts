import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { ApiConfig } from 'src/app/config/api.config';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ ResetPasswordComponent ],
      providers: [ ApiConfig ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check new password errors', () => {
    let newPwd = component.resetPasswordForm.controls['newPassword'];
    expect(newPwd.hasError('required')).toBeTruthy();
    newPwd.setValue('1234');
    expect(newPwd.hasError('minlength')).toBeTruthy();
  });

  it('should check new password validity', () => {
    let newPwd = component.resetPasswordForm.controls['newPassword'];
    newPwd.setValue('123456');
    expect(newPwd.errors).toBeNull();
    expect(newPwd.valid).toBeTruthy();
  });

 /* it('should check confirm new password errors', () => {
    let confNewPwd = component.resetPasswordForm.controls['confirmNewPassword'];
    expect(confNewPwd.hasError('required')).toBeTruthy();
    confNewPwd.setValue('1234');
    expect(confNewPwd.hasError('minlength')).toBeTruthy();
  });*/

  /*it('should check confirm new password validity', () => {
    let confNewPwd = component.resetPasswordForm.controls['confirmNewPassword'];
    confNewPwd.setValue('123456');
    expect(confNewPwd.errors).toBeNull();
    expect(confNewPwd.valid).toBeTruthy();
  });*/

  it('should check form is valid when no values entered', () => {
    expect(component.resetPasswordForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.resetPasswordForm.controls['newPassword'].setValue('123456')
    component.resetPasswordForm.controls['confirmNewPassword'].setValue('123456')
    expect(component.resetPasswordForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.resetPasswordForm.invalid).toBeTruthy();
    let btn = fixture.debugElement
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy()
    component.resetPasswordForm.controls['newPassword'].setValue('123456')
    component.resetPasswordForm.controls['confirmNewPassword'].setValue('123456')
    fixture.detectChanges()
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy()
    component.onSubmit()
    fixture.detectChanges()
  });
});
