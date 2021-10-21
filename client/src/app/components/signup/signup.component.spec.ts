import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { ApiConfig } from 'src/app/config/api.config';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ SignupComponent ],
      providers: [ ApiConfig ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check firstName errors', () => {
    let fName = component.signupForm.controls['firstName'];
    expect(fName.hasError('required')).toBeTruthy();
    fName.setValue('a');
    expect(fName.hasError('minlength')).toBeTruthy();
  });

  it('should check firstName validity', () => {
    let fName = component.signupForm.controls['firstName'];
    fName.setValue('ab');
    expect(fName.errors).toBeNull();
    expect(fName.valid).toBeTruthy();
  });

  it('should check lastName errors', () => {
    let lName = component.signupForm.controls['lastName'];
    expect(lName.hasError('required')).toBeTruthy();
    lName.setValue('a');
    expect(lName.hasError('minlength')).toBeTruthy();
  });

  it('should check lastName validity', () => {
    let lName = component.signupForm.controls['lastName'];
    lName.setValue('ab');
    expect(lName.errors).toBeNull();
    expect(lName.valid).toBeTruthy();
  });

  it('should check email is invalid', () => {
    let email = component.signupForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.hasError('required')).toBeTruthy();
    email.setValue('abc');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('should check correct email is entered', () => {
    let email = component.signupForm.controls['email'];
    email.setValue('abc@xyz.com');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
  });

  it('should check password errors', () => {
    let pwd = component.signupForm.controls['password'];
    expect(pwd.hasError('required')).toBeTruthy();
    pwd.setValue('1234');
    expect(pwd.hasError('minlength')).toBeTruthy();
  });

  it('should check password validity', () => {
    let pwd = component.signupForm.controls['password'];
    pwd.setValue('123456');
    expect(pwd.errors).toBeNull();
    expect(pwd.valid).toBeTruthy();
  });

  it('should check form is valid when no values entered', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.signupForm.controls['firstName'].setValue('ab')
    component.signupForm.controls['lastName'].setValue('ab')
    component.signupForm.controls['email'].setValue('abc@xyz.com')
    component.signupForm.controls['password'].setValue('123456')
    component.signupForm.controls['confirmPassword'].setValue('123456')
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.signupForm.invalid).toBeTruthy();
    let btn = fixture.debugElement
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy()
    component.signupForm.controls['firstName'].setValue('ab')
    component.signupForm.controls['lastName'].setValue('ab')
    component.signupForm.controls['email'].setValue('abc@xyz.com')
    component.signupForm.controls['password'].setValue('123456')
    component.signupForm.controls['confirmPassword'].setValue('123456')
    fixture.detectChanges()
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy()
    component.signup()
    fixture.detectChanges()
  });
});
