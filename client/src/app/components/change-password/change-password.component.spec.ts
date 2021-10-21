import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ApiConfig } from 'src/app/config/api.config';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ChangePasswordComponent],
      providers: [ApiConfig],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check old password errors', () => {
    let oldPwd = component.changePasswordForm.controls['oldPassword'];
    expect(oldPwd.hasError('required')).toBeTruthy();
   /* oldPwd.setValue('1234');
    expect(oldPwd.hasError('minlength')).toBeTruthy();*/
  });

  /*it('should check old password validity', () => {
    let oldPwd = component.changePasswordForm.controls['oldPassword'];
    oldPwd.setValue('123456');
    expect(oldPwd.errors).toBeNull();
    expect(oldPwd.valid).toBeTruthy();
  });*/

  it('should check new password errors', () => {
    let newPwd = component.changePasswordForm.controls['newPassword'];
    expect(newPwd.hasError('required')).toBeTruthy();
    newPwd.setValue('1234');
    expect(newPwd.hasError('minlength')).toBeTruthy();
  });

  it('should check new password validity', () => {
    let newPwd = component.changePasswordForm.controls['newPassword'];
    newPwd.setValue('123456');
    expect(newPwd.errors).toBeNull();
    expect(newPwd.valid).toBeTruthy();
  });

  it('should check form is valid when no values entered', () => {
    expect(component.changePasswordForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.changePasswordForm.controls['oldPassword'].setValue('123456');
    component.changePasswordForm.controls['newPassword'].setValue('123456')
    component.changePasswordForm.controls['confirmNewPassword'].setValue('123456')
    expect(component.changePasswordForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.changePasswordForm.invalid).toBeTruthy();
    let btn = fixture.debugElement;
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy();
    component.changePasswordForm.controls['oldPassword'].setValue('123456');
    component.changePasswordForm.controls['newPassword'].setValue('123456');
    component.changePasswordForm.controls['confirmNewPassword'].setValue('123456')
    fixture.detectChanges();
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy();
    component.onSubmit();
    fixture.detectChanges();
  });
});
