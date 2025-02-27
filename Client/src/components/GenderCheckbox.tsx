const GenderCheckbox = ({ handleCheckboxChange, gender }:
	{
		handleCheckboxChange: (gender: '' | 'male' | "female") => void,
		gender: string  
	}) => {
	return (
		<div className='flex py-2 gap-2'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Male</span>
					<input checked={gender=="male"} onChange={e => {
						if (e.target.checked) {
							handleCheckboxChange('male');
						} else {
							handleCheckboxChange("");
						}
					}}
						type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text text-white'>Female</span>
					<input checked={gender=="female"} onChange={e => {
						if (e.target.checked) {
							handleCheckboxChange('female');
						}
					}}
						type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
