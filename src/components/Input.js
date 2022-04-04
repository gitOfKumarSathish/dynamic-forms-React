import React from 'react'

const input = (props) => {
    let inputData = null
    const inputClass = [];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push('classesInvalid')
        validationError = <p>Please enter a valid value!</p>;
    }
    switch (props.elementtype) {
        case ('input'):
            inputData = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onchange} />
            break;
        case ('textarea'):
            inputData = <textarea className={inputClass} {...props.elementConfig} value={props.value} onChange={props.onchange} />
            break;
        case ('select'):
            inputData = (<select onChange={props.onchange} className={inputClass}>
                {(props.elementConfig.options).map((x, i) => {
                    return <option key={i} value={x.value}>{x.displayValue}</option>
                })}
            </select>)
            break;
        default:
            inputData = <input className={inputClass} {...props.elementConfig} value={props.value} onChange={props.onchange} />
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputData}
            {validationError}
        </div>
    )
}

export default input