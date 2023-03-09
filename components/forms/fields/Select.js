const Select = ({
  label,
  name,
  options = [],
  placeholder = "",
  errorMessage = "",
  register,
  ...rest
}) => {
  const className = { ...rest.className };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1">
        <select
          id={name}
          name={name}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-inputfocus focus:border-inputfocus sm:text-sm rounded-md"
          defaultValue=""
          {...register}
        >
          <option value="">Choose an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-sm text-black text-left">{errorMessage}</p>
    </div>
  );
};

export default Select;
