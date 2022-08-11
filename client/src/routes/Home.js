import CoffeeLogo from '../assets/coffee talk-logo.png';

function Home() {
	return (
		<>
			<div className="home">
				<img className="home--logo" src={CoffeeLogo} alt="logo" />
				<h2 className="home--description">Quick brews and small talk</h2>
			</div>
		</>
	);
};

export default Home;