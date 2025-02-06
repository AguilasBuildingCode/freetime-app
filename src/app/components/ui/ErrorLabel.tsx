export default function ErrorLabel({ error }: { error?: string }) {
    return error ? <div className="text-red-600 text-sm text-center">
        {error}
    </div> : <></>
}