export const resetPasswordMatch = (formGroup: any) => {
    const password = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmNewPassword');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };