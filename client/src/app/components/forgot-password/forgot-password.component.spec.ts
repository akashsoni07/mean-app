import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ApiConfig } from 'src/app/config/api.config';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ForgotPasswordComponent ],
      providers: [ ApiConfig ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check email is invalid', () => {
    let email = component.forgotPasswordForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.hasError('required')).toBeTruthy();
    email.setValue('abc');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('should check correct email is entered', () => {
    let email = component.forgotPasswordForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
  });

  it('should check form is valid when no values entered', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.forgotPasswordForm.controls['email'].setValue('abc@xyz.com')
    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.forgotPasswordForm.invalid).toBeTruthy();
    let btn = fixture.debugElement
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy()
    component.forgotPasswordForm.controls['email'].setValue('abc@xyz.com')
    fixture.detectChanges()
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy()
    component.onSubmit()
    fixture.detectChanges()
  });
});
