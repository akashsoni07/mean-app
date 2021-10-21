import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { ApiConfig } from 'src/app/config/api.config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [LoginComponent],
      providers: [ApiConfig],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check email is invalid', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.hasError('required')).toBeTruthy();
    /*email.setValue('abc');
    expect(email.hasError('email')).toBeTruthy();*/
  });

/*  it('should check correct email is entered', () => {
    let email = component.loginForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
  });*/

  it('should check password errors', () => {
    let pwd = component.loginForm.controls['password'];
    expect(pwd.hasError('required')).toBeTruthy();
  /*  pwd.setValue('1234');
  expect(pwd.hasError('minlength')).toBeTruthy();*/
  });

  /*it('should check password validity', () => {
    let pwd = component.loginForm.controls['password'];
    pwd.setValue('123456');
    expect(pwd.errors).toBeNull();
    expect(pwd.valid).toBeTruthy();
  });*/

  it('should check form is valid when no values entered', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.loginForm.controls['email'].setValue('abc@xyz.com')
    component.loginForm.controls['password'].setValue('123456')
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.loginForm.invalid).toBeTruthy();
    let btn = fixture.debugElement
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy()
    component.loginForm.controls['email'].setValue('abc@xyz.com')
    component.loginForm.controls['password'].setValue('123456')
    fixture.detectChanges()
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy()
    component.login()
    fixture.detectChanges()
  });
});
