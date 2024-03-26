import logo from '../../assets/images/tasm-logo-p-500.png';

export default function Header({ code='A69Z' }) {
	return (
		<div className="bg-tasm-header-bg bg-no-repeat bg-cover flex ">
			<div>
				<img src={logo} alt='TASM Logo' className="object-scale-down h-20 m-2" />
			</div>

		</div>
	);
}
