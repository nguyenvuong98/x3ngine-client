interface props {
    errors: any
    touched: any
    field: string
}

const InputError = (props: props) => {
    return (
        <>
            {props.errors[props.field] && props.touched[props.field] ? (
                <div className='text-center'>
                    <span className='text-xs' style={{ 'color': 'red' }}>{props.errors[props.field]}</span>
                </div>
            ) : null}

        </>
    )
}

export default InputError;