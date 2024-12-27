import React from "react";
import { ExternalLink } from "lucide-react";

interface SurveyCardProps {
	name: string;
	url: string;
	minPayout: number;
	avgPay: {
		min: number;
		max: number;
	};
	frequency: string;
	paymentMethods: string[];
	requirements: string[];
	specialFeatures: string[];
	notes: string;
}

const SurveyCard = ({
	name,
	url,
	minPayout,
	avgPay,
	frequency,
	paymentMethods,
	requirements,
	specialFeatures,
	notes,
}: SurveyCardProps) => {
	// Calculate a summary of the program
	const programSummary = [].join(" • ");

	return (
		<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-bold text-gray-900">{name}</h3>
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
				>
					Visit Site <ExternalLink className="w-4 h-4" />
				</a>
			</div>

			<div className="grid grid-cols-2 gap-3 mb-4">
				<div className="bg-gray-50 p-3 rounded-lg">
					<p className="text-xs text-gray-600 mb-1">Min Payout</p>
					<p className="font-semibold text-gray-900">${minPayout.toFixed(2)}</p>
				</div>
				<div className="bg-gray-50 p-3 rounded-lg">
					<p className="text-xs text-gray-600 mb-1">Pay Per Survey</p>
					<p className="font-semibold text-gray-900">
						${avgPay.min} - ${avgPay.max}
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<h4 className="text-sm font-semibold text-gray-700 mb-2">
						Requirements
					</h4>
					<div className="flex flex-wrap gap-2">
						{requirements.map((req) => (
							<span
								key={req}
								className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
							>
								{req}
							</span>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-sm font-semibold text-gray-700 mb-2">
						Payment Methods
					</h4>
					<div className="flex flex-wrap gap-2">
						{paymentMethods.map((method) => (
							<span
								key={method}
								className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
							>
								{method}
							</span>
						))}
					</div>
				</div>

				{specialFeatures.length > 0 && (
					<div>
						<h4 className="text-sm font-semibold text-gray-700 mb-2">
							Special Features
						</h4>
						<div className="flex flex-wrap gap-2">
							{specialFeatures.map((feature) => (
								<span
									key={feature}
									className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
								>
									{feature}
								</span>
							))}
						</div>
					</div>
				)}

				<div className="text-sm text-gray-600 font-medium">
					<p className="mb-2 font-bold text-gray-900">Program Summary:</p>
					{notes && <p className="text-sm text-gray-600">{notes}</p>}
				</div>
			</div>
		</div>
	);
};

export default SurveyCard;
