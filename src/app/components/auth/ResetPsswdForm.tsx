import Forms from "@/app/interfaces/FormsInterface"
import { ResetPsswdFormData } from "@/app/types/ResetPsswdType"
import EmailInput, { EmailInputValidate } from "../inputs/EmailInput"
import ErrorLabel from "../ui/ErrorLabel"
import Button from "../ui/Button"
import { isEmpty, isNotUndefined, isValidEmail } from "@/utils/validatios"

const ResetPsswdForm = ({ email, errors, register, error, isSubmitting }: ResetPsswdFormData & Forms<ResetPsswdFormData>) => {
    const disabledBtn = (): boolean => {
        return  isEmpty(email) || isNotUndefined(errors.email) || !isValidEmail(email);
    }
    
    return <>
        <EmailInput errors={errors} {...register('email', EmailInputValidate)} />

        <ErrorLabel error={error} />

        <Button type="submit" variant='primary' size='lg' className='w-full' disabled={disabledBtn()} isLoading={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar enlace'}
        </Button>
    </>
}

export default ResetPsswdForm