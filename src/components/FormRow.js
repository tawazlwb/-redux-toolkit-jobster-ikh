const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        className='form-input'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormRow
