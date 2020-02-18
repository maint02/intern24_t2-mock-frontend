import {AbstractControl} from '@angular/forms';

export class PasswordMatchValidatorValidator {
    static passwordMatchValidator(controls: AbstractControl) {
        const password = controls.get('newPassword').value;

        const confirmPassword = controls.get('rePassword').value;

        if (password !== confirmPassword) {
            controls.get('rePassword').setErrors({NoPasswordMatch: true});
        }
    }

}
