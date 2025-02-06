import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export default interface Forms<F extends FieldValues> {
    error?: string;
    isSubmitting: boolean;
    register: UseFormRegister<F>;
    errors: FieldErrors<F>;
}