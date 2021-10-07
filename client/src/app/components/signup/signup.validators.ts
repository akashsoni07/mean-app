export const passwordMatch = (formGroup: any) => {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMatch: true });
  } else {
    confirmPassword.setErrors(null);
  }
};

/*export const mustContainSymbol = (control: any) => {
  if (control.hasError('required')) return null;
  if (control.hasError('minlength')) return null;
  if (control.value.indexOf('@') > -1 ) {
    return null;
  } else {
    return { symbol: true };
  }
};*/
