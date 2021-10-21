import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditProfileComponent } from './edit-profile.component';
import { ApiConfig } from 'src/app/config/api.config';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ EditProfileComponent ],
      providers: [ ApiConfig ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check firstName errors', () => {
    let fName = component.editProfileForm.controls['firstName'];
    expect(fName.hasError('required')).toBeTruthy();
    fName.setValue('a');
    expect(fName.hasError('minlength')).toBeTruthy();
  });

  it('should check firstName validity', () => {
    let fName = component.editProfileForm.controls['firstName'];
    fName.setValue('ab');
    expect(fName.errors).toBeNull();
    expect(fName.valid).toBeTruthy();
  });

  it('should check lastName errors', () => {
    let lName = component.editProfileForm.controls['lastName'];
    expect(lName.hasError('required')).toBeTruthy();
    lName.setValue('a');
    expect(lName.hasError('minlength')).toBeTruthy();
  });

  it('should check lastName validity', () => {
    let lName = component.editProfileForm.controls['lastName'];
    lName.setValue('ab');
    expect(lName.errors).toBeNull();
    expect(lName.valid).toBeTruthy();
  });

  it('should check email is invalid', () => {
    let email = component.editProfileForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.hasError('required')).toBeTruthy();
    email.setValue('abc');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('should check correct email is entered', () => {
    let email = component.editProfileForm.controls['email'];
    email.setValue('abc@xyz.com');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
  });

  it('should check form is valid when no values entered', () => {
    expect(component.editProfileForm.valid).toBeFalsy();
  });

  it('should check form is valid when values entered', () => {
    component.editProfileForm.controls['firstName'].setValue('ab')
    component.editProfileForm.controls['lastName'].setValue('ab')
    component.editProfileForm.controls['email'].setValue('abc@xyz.com')
    expect(component.editProfileForm.valid).toBeTruthy();
  });

  it('should check form is submitted', () => {
    expect(component.editProfileForm.invalid).toBeTruthy();
    let btn = fixture.debugElement;
    expect(btn.nativeElement.querySelector('button').disabled).toBeTruthy();
    component.editProfileForm.controls['firstName'].setValue('ab')
    component.editProfileForm.controls['lastName'].setValue('ab')
    component.editProfileForm.controls['email'].setValue('abc@xyz.com')
    fixture.detectChanges();
    expect(btn.nativeElement.querySelector('button').disabled).toBeFalsy();
    component.onSubmit();
    fixture.detectChanges();
  });
});
