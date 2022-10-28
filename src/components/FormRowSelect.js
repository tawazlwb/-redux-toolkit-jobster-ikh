const FormRowSelect = ({ name, value, options, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        id={name}
        className='form-input'
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
