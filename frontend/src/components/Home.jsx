import PropTypes from "prop-types";

const Home = () => {
	const Logo = () => (
		<div className="flex items-center text-6xl font-extrabold text-black">
			{/* Updated the logo to the professional gavel icon from the NavBar component */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-16 w-16 mr-4 text-gray-700"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 2L6 8l4 4-6 6 2 2 6-6 4 4 6-6L22 12 12 2zM18 10l-4-4" />
				<path d="M6 18l2 2" />
				<path d="M16 16l-2-2" />
			</svg>
			PrimeBid
		</div>
	);

	const SuccessStats = () => (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bg-gradient-to-r from-blue-50 to-gray-50 p-8 rounded-xl border">
			<div className="text-center">
				<div className="text-3xl font-bold text-blue-600 mb-2">1k+</div>
				<div className="text-sm font-medium text-gray-700">Successful Auctions</div>
			</div>
			<div className="text-center">
				<div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
				<div className="text-sm font-medium text-gray-700">Success Rate</div>
			</div>
			<div className="text-center">
				<div className="text-3xl font-bold text-purple-600 mb-2">2.5k+</div>
				<div className="text-sm font-medium text-gray-700">Assets Traded</div>
			</div>
			<div className="text-center">
				<div className="text-3xl font-bold text-orange-600 mb-2">1k+</div>
				<div className="text-sm font-medium text-gray-700">Active Traders</div>
			</div>
		</div>
	);

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden text-black bg-white">
			<div className="w-full mx-auto max-w-7xl">
				<div className="flex flex-col items-center mb-8">
					<Logo />
					<h1 className="mt-4 text-4xl font-extrabold text-center text-black md:text-6xl">
						Bidding Platform
					</h1>
					<p className="mt-4 text-xl font-semibold text-blue-600">
						Where Professional Traders Achieve Excellence
					</p>
				</div>

				<p className="max-w-4xl mx-auto mb-12 text-lg text-center text-gray-700 md:text-xl">
					Join thousands of successful traders who trust our institutional-grade platform.
					Execute precision bids, maximize returns, and build wealth with proven strategies
					used by financial professionals worldwide.
				</p>

				{/* Success Statistics */}
				<SuccessStats />

				{/* Encouraging Benefits */}
				<div className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border">
					<h2 className="text-3xl font-bold text-center text-black mb-8">
						Why Elite Traders Choose PrimeBid
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<BenefitCard
							icon={<TrophyIcon />}
							title="Proven Success"
							description="Join 15,000+ successful traders who've increased their portfolio value by an average of 47% annually"
							highlight="47% Average Returns"
						/>
						<BenefitCard
							icon={<ShieldCheckIcon />}
							title="Zero Risk Guarantee"
							description="Start with our risk-free demo account. Practice with $100,000 virtual funds before going live"
							highlight="$100K Practice Account"
						/>
						<BenefitCard
							icon={<RocketIcon />}
							title="Fast Track to Profits"
							description="Our AI-powered tools help 9 out of 10 users make their first profitable bid within 7 days"
							highlight="Profit in 7 Days"
						/>
					</div>
				</div>

				{/* Getting Started Section */}
				<div className="mb-16">
					<h2 className="mb-4 text-3xl font-bold text-center text-black">
						Start Winning in 4 Simple Steps
					</h2>
					<p className="text-center text-gray-600 mb-8">
						Join successful traders who are already earning. No experience required.
					</p>
					<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
						<StepCard
							step="01"
							title="Sign Up Free"
							description="Create your professional account in under 2 minutes. No hidden fees, no commitments."
							time="2 minutes"
						/>
						<StepCard
							step="02"
							title="Learn & Practice"
							description="Access our trading academy and practice with virtual funds. Master strategies risk-free."
							time="1-3 days"
						/>
						<StepCard
							step="03"
							title="Make Your First Bid"
							description="Start with our guided bidding assistant. AI recommendations increase your win rate by 73%."
							time="Same day"
						/>
						<StepCard
							step="04"
							title="Scale Your Success"
							description="Use advanced analytics to compound your returns. Our top users earn $10K+ monthly."
							time="Ongoing"
						/>
					</div>
				</div>

				{/* Main Features */}
				<div className="mb-16">
					<h2 className="mb-8 text-3xl font-bold text-center text-black">
						Professional Trading Tools
					</h2>
					<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
						<FeatureCard
							title="AI-Powered Bidding"
							description="Our machine learning algorithms analyze market patterns and recommend optimal bid timing, increasing your success rate by up to 73%."
							icon={<AIIcon />}
							badge="73% Win Rate"
						/>
						<FeatureCard
							title="Real-Time Analytics"
							description="Access institutional-grade market data, predictive modeling, and portfolio optimization tools used by Wall Street professionals."
							icon={<AnalyticsIcon />}
							badge="Wall Street Grade"
						/>
						<FeatureCard
							title="Automated Execution"
							description="Set intelligent bid strategies that execute automatically, allowing you to profit 24/7 even while you sleep."
							icon={<AutomationIcon />}
							badge="24/7 Trading"
						/>
					</div>
				</div>

				{/* Trust Indicators */}
				<div className="mb-16 bg-gray-50 p-8 rounded-xl border">
					<h2 className="mb-8 text-3xl font-bold text-center text-black">
						Trusted by Professionals Worldwide
					</h2>
					<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						<FeatureItem icon={<BankIcon />} title="Bank-Level Security" subtitle="256-bit encryption" />
						<FeatureItem icon={<CertificateIcon />} title="Regulatory Compliant" subtitle="Licensed & audited" />
						<FeatureItem icon={<SupportIcon />} title="24/7 Expert Support" subtitle="1-minute response" />
						<FeatureItem icon={<MobileIcon />} title="Mobile Trading App" subtitle="iOS & Android" />
						<FeatureItem icon={<APIIcon />} title="Professional APIs" subtitle="Institutional access" />
						<FeatureItem icon={<InsuranceIcon />} title="Account Insurance" subtitle="Up to $500K covered" />
					</div>
				</div>

				{/* Updated Call to Action */}
				<div className="text-center bg-white border border-gray-200 p-12 rounded-2xl mb-8 shadow-xl">
					<h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Start Winning?</h2>
					<p className="text-xl mb-6 text-gray-600">
						Join thousands of successful traders. Start your free account today!
					</p>
					<button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => window.location.href = '/auctions'}>
						Start Trading Free →
					</button>
					<p className="text-sm mt-4 text-gray-500">
						✓ No credit card required ✓ $100K practice account ✓ Join in 2 minutes
					</p>
				</div>
			</div>
		</div>
	);
};

const StepCard = ({ step, title, description, time }) => (
	<div className="p-6 text-center border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
		<div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
			{step}
		</div>
		<h3 className="mb-3 text-xl font-bold text-black">{title}</h3>
		<p className="text-gray-600 text-sm mb-3">{description}</p>
		<div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
			{time}
		</div>
	</div>
);

const FeatureCard = ({ title, description, icon, badge }) => (
	<div className="p-8 bg-white border-2 border-gray-200 rounded-xl text-center transform transition duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-xl relative">
		<div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
			{badge}
		</div>
		<div className="mb-6">
			{icon}
		</div>
		<h2 className="mb-4 text-2xl font-bold text-black">{title}</h2>
		<p className="text-gray-600">{description}</p>
	</div>
);

const BenefitCard = ({ icon, title, description, highlight }) => (
	<div className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
		<div className="mb-4">{icon}</div>
		<h3 className="text-xl font-bold mb-3 text-black">{title}</h3>
		<p className="text-gray-600 mb-3 text-sm">{description}</p>
		<div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
			{highlight}
		</div>
	</div>
);

const FeatureItem = ({ icon, title, subtitle }) => (
	<div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-300">
		<div className="mr-4">{icon}</div>
		<div>
			<span className="font-bold text-black block">{title}</span>
			<span className="text-sm text-gray-500">{subtitle}</span>
		</div>
	</div>
);

// Professional Icons
const TrophyIcon = () => (
	<svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
		<path d="M6 2l3 6h6l3-6H6zm1.5 7L9 15h6l1.5-6h-9zM12 16.5L10.5 21h3L12 16.5z" />
		<path d="M4 8v2c0 2.21 1.79 4 4 4s4-1.79 4-4V8H4zm12 0v2c0 2.21 1.79 4 4 4s4-1.79 4-4V8h-8z" />
	</svg>
);

const ShieldCheckIcon = () => (
	<svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
		<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
		<path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white" />
	</svg>
);

const RocketIcon = () => (
	<svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
		<path d="M12 2l4.09 8.26L22 12l-5.91 1.74L12 22l-4.09-8.26L2 12l5.91-1.74L12 2z" />
	</svg>
);

const AIIcon = () => (
	<svg className="w-16 h-16 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
		<circle cx="9" cy="9" r="1" fill="currentColor" />
		<circle cx="15" cy="9" r="1" fill="currentColor" />
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
	</svg>
);

const AnalyticsIcon = () => (
	<svg className="w-16 h-16 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
	</svg>
);

const AutomationIcon = () => (
	<svg className="w-16 h-16 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
	</svg>
);

const BankIcon = () => (
	<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M5 21V10a1 1 0 011-1h12a1 1 0 011 1v11M12 3L3 10h18l-9-7z" />
	</svg>
);

const CertificateIcon = () => (
	<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
	</svg>
);

const SupportIcon = () => (
	<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
	</svg>
);

const MobileIcon = () => (
	<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
	</svg>
);

const APIIcon = () => (
	<svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
	</svg>
);

const InsuranceIcon = () => (
	<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
);

// PropTypes
FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	badge: PropTypes.string.isRequired,
};

StepCard.propTypes = {
	step: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
};

BenefitCard.propTypes = {
	icon: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	highlight: PropTypes.string.isRequired,
};

FeatureItem.propTypes = {
	icon: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
};

export default Home;
