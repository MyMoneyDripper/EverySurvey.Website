import React from "react";
import { Mail, Twitter, Facebook, Instagram, ToggleLeft } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-gray-50 border-t border-gray-100 mt-16">
			<div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center text-center max-w-4xl">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Quick Filters
						</h3>
						<ul className="space-y-3">
							<li>
								<button className="text-gray-600 hover:text-gray-900">
									Highest Paying
								</button>
							</li>
							<li>
								<button className="text-gray-600 hover:text-gray-900">
									Daily Surveys
								</button>
							</li>
							<li>
								<button className="text-gray-600 hover:text-gray-900">
									PayPal Only
								</button>
							</li>
							<li>
								<button className="text-gray-600 hover:text-gray-900">
									With Referrals
								</button>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
						<div className="flex gap-4 justify-center">
							<a href="#" className="text-gray-600 hover:text-blue-600">
								<Twitter className="w-6 h-6" />
							</a>
							<a href="#" className="text-gray-600 hover:text-blue-600">
								<Facebook className="w-6 h-6" />
							</a>
							<a href="#" className="text-gray-600 hover:text-blue-600">
								<Instagram className="w-6 h-6" />
							</a>
							<a href="#" className="text-gray-600 hover:text-blue-600">
								<Mail className="w-6 h-6" />
							</a>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Resources</h3>
						<ul className="space-y-2">
							<li>
								<a href="#" className="text-gray-600 hover:text-gray-900">
									Getting Started
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-600 hover:text-gray-900">
									Survey Tips
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-600 hover:text-gray-900">
									FAQ
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-600 hover:text-gray-900">
									Contact Us
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
