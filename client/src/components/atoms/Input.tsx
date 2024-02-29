import React from 'react';

interface InputFieldProps {
	type: string;
	placeholder: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	type,
	placeholder,
	value,
	onChange,
	className,
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={className}
			value={value}
			onChange={onChange}
		/>
	);
};

export default InputField;
