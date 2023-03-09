const Input = ({
  label,
  name,
  type,
  placeholder = "",
  errorMessage = "",
  register,
  ...rest
}) => {
  const className = { ...rest.className };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className="shadow-sm focus:ring-selectedtxt focus:border-selectedtxt block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          {...register}
          {...rest}
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-left text-black">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
