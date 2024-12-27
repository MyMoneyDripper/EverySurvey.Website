import React from "react";

const Header = () => {
	return (
		<header className="w-full bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-gray-900">
						All Survey Websites
					</h1>
					<p className="text-gray-600 mt-1">No fluff. No ads. No referrals.</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
