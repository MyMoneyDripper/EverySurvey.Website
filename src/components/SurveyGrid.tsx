import React, { useState } from "react";
import SurveyCard from "./SurveyCard";

// Sample data - in a real app, this would come from an API
const SAMPLE_DATA = [
	{
		"Website Name": "HeyPiggy",
		"Website URL": "https://www.heypiggy.com/?invite=ZHC6XDW",
		"Registration Requirements": {
			Age: 14,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Visa Prepaid Cards", "Gift Cards"],
		"Minimum Payout": {
			Other: "$1",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Swagbucks",
		"Website URL": "https://www.swagbucks.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$1",
		},
		"Average Pay Per Survey": {
			Min: "$0.25",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Daily Polls, Daily Goals and Bonuses"],
		},
		"Additional Notes":
			"Offerwalls, Cashback, Videos, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Superpay.me",
		"Website URL": "https://superpay.me/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$1",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn up to 20% referral bonus",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Streak Bonuses"],
		},
		"Additional Notes":
			"Offers instant payment options; includes tasks like surveys, videos, and contests.",
	},
	{
		"Website Name": "PineCone Research",
		"Website URL": "https://members.pineconeresearch.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "US/UK/CA",
			Verification: ["Email Address; SMS/Call Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$3",
		},
		"Average Pay Per Survey": {
			Min: "$1",
			Max: "$3",
		},
		"Survey Frequency": "Varies",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Invitation-only"],
		},
		"Additional Notes": "Focuses on market research & product testing",
	},
	{
		"Website Name": "GrabPoints",
		"Website URL": "https://grabpoints.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$3",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn up to 10% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Streak Rewards"],
		},
		"Additional Notes":
			"Offerwalls, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "FeaturePoints",
		"Website URL": "https://featurepoints.com/landing",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address; App Installation"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$3",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes":
			"Games, and app trials; users earn cashback for shopping through the app.",
	},
	{
		"Website Name": "MyPoints",
		"Website URL": "https://www.mypoints.com/login",
		"Registration Requirements": {
			Age: 13,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$3",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn up to 25% of referrals' points",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes":
			"Earn points from surveys, shopping, and reading emails; wide range of redemption options.",
	},
	{
		"Website Name": "Branded Surveys",
		"Website URL": "https://surveys.gobranded.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "US/UK/CA",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Bank Transfer", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn $0.5 to $1 to every referral reaching milestones",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Streak Rewards, Daily Polls"],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Prime Opinion",
		"Website URL": "https://www.primeopinion.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Bank Transfer", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.80",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn $1 when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "HeyCash",
		"Website URL": "https://heycash.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Bank Transfer", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$1",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Level-Up Rewards"],
		},
		"Additional Notes":
			"Game offers, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Pawns.app",
		"Website URL": "https://pawns.app/?r=3318036",
		"Registration Requirements": {
			Age: 14,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Crypto", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes":
			"Bandwidth Sharing, Game offers, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Five Surveys",
		"Website URL": "https://fivesurveys.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "America/£pe",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Visa Prepaid Cards", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$1",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "PrizeRebel",
		"Website URL": "https://www.prizerebel.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Crypto", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 15% to 30% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Loyalty System, Raffles & Contests"],
		},
		"Additional Notes":
			"Offerwalls, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Survey Junkie",
		"Website URL": "https://www.surveyjunkie.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "US/UK/CA/AU",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$3",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn $1.50 for each referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "Opinion Edge",
		"Website URL": "https://panel.opinion-edge.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["Gift Cards", "Paypal (soon)"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Monthly",
		"Referral Program": {
			Earnings: "Earn $0.20 for each verified referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Compensates Disqualification"],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "Reward XP",
		"Website URL": "https://www.rewardxp.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Crypto", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$3",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Loyalty & Level System"],
		},
		"Additional Notes":
			"Offerwalls, Videos, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Toluna Influencers",
		"Website URL": "https://www.toluna.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards", "Crypto"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn up to 500 points per referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Daily Polls, Games, Contests"],
		},
		"Additional Notes": "Focuses on global users with varied interests",
	},
	{
		"Website Name": "Viewfruit",
		"Website URL": "https://ph.viewfruit.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$1.50",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["Android", "Web"],
			Others: ["Lucky Draw, Polls"],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "appKarma",
		"Website URL": "https://www.appkarma.io/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.05",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 30% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: ["Streak Rewards, Reward Tracking System"],
		},
		"Additional Notes":
			"Earn by playing mobile games, completing offers, and inviting friends",
	},
	{
		"Website Name": "Rewards1",
		"Website URL": "https://www.rewards1.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn points for each referral",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes": "Offers, and watching videos",
	},
	{
		"Website Name": "Earnably",
		"Website URL": "https://earnably.com/surveys",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards", "Crypto"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Earn by completing surveys, watching videos, and downloading apps.",
	},
	{
		"Website Name": "CashKarma",
		"Website URL": "https://www.cashkarma.io/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address; App Installation"],
		},
		"Payment Methods": ["PayPal", "Gift Cards", "Crypto"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$1.50",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Referral bonuses depend on app usage",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: ["Level Reward System"],
		},
		"Additional Notes":
			"Earn by completing surveys and checking in daily; users can unlock higher reward tiers.",
	},
	{
		"Website Name": "Nielsen",
		"Website URL": "https://www.nielsen.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "US/UK/CA",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes":
			"Rewards users for sharing browsing habits; includes sweepstakes entries.",
	},
	{
		"Website Name": "Gift Hunter Club",
		"Website URL": "https://gifthunterclub.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes":
			"Earn by watching videos, completing tasks, and engaging in surveys.",
	},
	{
		"Website Name": "Opinion Outpost",
		"Website URL": "https://www.opinionoutpost.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Offers frequent surveys with low minimum payout thresholds.",
	},
	{
		"Website Name": "MobileXpression",
		"Website URL": "https://rewards.mobilexpression.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Address; App Installation"],
		},
		"Payment Methods": ["Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$2",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Sweepstakes"],
		},
		"Additional Notes":
			"Earn rewards for allowing the app to monitor browsing habits.",
	},
	{
		"Website Name": "Ebuno",
		"Website URL": "https://ebuno.net/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$2",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Gamified Interface"],
		},
		"Additional Notes": "Points-based system with tiered membership benefits.",
	},
	{
		"Website Name": "Mobrog",
		"Website URL": "https://www.mobrog.com/en/home/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Skrill"],
		"Minimum Payout": {
			Other: "$6.25",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes":
			"Surveys focus on research topics; straightforward cash rewards.",
	},
	{
		"Website Name": "TGM Panel",
		"Website URL": "https://tgmpanel.is/en/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$7",
		},
		"Average Pay Per Survey": {
			Min: "$0.13",
			Max: "$1.63",
		},
		"Survey Frequency": "Monthly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Compensates Disqualification"],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "OpinionPioneer",
		"Website URL": "https://opinionpioneer.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 15% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Compensates Disqualification"],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "SurveyLama",
		"Website URL": "https://surveylama.com/en",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Crypto", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 15% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes": "Catered toward global users",
	},
	{
		"Website Name": "Timebucks",
		"Website URL": "https://timebucks.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Crypto", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Tier-based referral bonuses",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Offerwalls, Videos, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Surveyeah",
		"Website URL": "https://www.surveyeah.com/en/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn 10% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes":
			"Offers surveys related to consumer habits and opinions",
	},
	{
		"Website Name": "ySense",
		"Website URL": "https://www.ysense.com/login",
		"Registration Requirements": {
			Age: 13,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards", "Skrill"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn up to 30% referral bonus",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes":
			"Watching videos, playing games, and referrals; offers bonuses for consistent activity",
	},
	{
		"Website Name": "Triaba",
		"Website URL": "https://www.triaba.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn $1 per active referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focus on market research",
	},
	{
		"Website Name": "RedMonkey",
		"Website URL": "https://redmonkey.app/earn",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Crypto"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1.50",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn 15% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes":
			"Focused on opinion sharing; offers high survey frequency with decent pay",
	},
	{
		"Website Name": "LifePoints",
		"Website URL": "https://www.lifepointspanel.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2.50",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn up to 20% of referrals' points",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Streak Bonuses"],
		},
		"Additional Notes":
			"Offers surveys across various categories, including consumer opinions and travel.",
	},
	{
		"Website Name": "The Panel Station",
		"Website URL": "thepanellstation.com",
		"Registration Requirements": {
			Age: 18,
			Region: "US/UK/CA",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1.50",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: ["Loyalty Reward System"],
		},
		"Additional Notes":
			"Targets developing markets; offers both local and global surveys.",
	},
	{
		"Website Name": "LootUp",
		"Website URL": "lootup.me",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1.50",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Offers surveys, videos, and pay-to-click ads; tracks earnings visually.",
	},
	{
		"Website Name": "Product Report Card",
		"Website URL": "https://www.productreportcard.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "N/A",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$5",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Tier-based referral bonuses",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Surveys focused on product testing and detailed consumer feedback.",
	},
	{
		"Website Name": "Tellwut",
		"Website URL": "https://www.tellwut.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn points for each referral",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes":
			"Earn by creating surveys and participating in others' surveys.",
	},
	{
		"Website Name": "Ipsos i-Say",
		"Website URL": "https://www.ipsosisay.com/en-us",
		"Registration Requirements": {
			Age: 16,
			Region: "Widely Accessible",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2.50",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn $1 per active referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Loyalty Rewards Program"],
		},
		"Additional Notes":
			"Consistent survey availability; sweepstakes for active members.",
	},
	{
		"Website Name": "American Consumer Opinion",
		"Website URL": "https://acop.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "US",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Tier-based referral bonuses",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: [],
		},
		"Additional Notes": "Offers a mix of surveys and paid testing tasks.",
	},
	{
		"Website Name": "PointClub",
		"Website URL": "https://www.pointclub.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1.50",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Daily Bonus"],
		},
		"Additional Notes":
			"Offers higher payouts for survey streaks; surveys focus on various topics.",
	},
	{
		"Website Name": "Opinion Bureau",
		"Website URL": "https://www.opinionbureau.com/login",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["Gift Cards"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn 10% of referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Surveys focused on societal and consumer trends.",
	},
	{
		"Website Name": "Harris Poll Online",
		"Website URL": "https://www.harrispollonline.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "US/CA",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["Gift Cards", "Sweepstake Entries"],
		"Minimum Payout": {
			Other: "$10",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$3",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Loyalty Reward System"],
		},
		"Additional Notes":
			"Surveys focused on political, societal, and consumer opinions.",
	},
	{
		"Website Name": "PaidViewPoint",
		"Website URL": "https://app.paidviewpoint.com/",
		"Registration Requirements": {
			Age: 15,
			Region: "Widely Accessible",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal"],
		"Minimum Payout": {
			Other: "$15",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$0.50",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 20% when your referral makes a withdrawal",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["TraitScore System"],
		},
		"Additional Notes": "Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "Surveoo",
		"Website URL": "https://www.surveoo.com/en/",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Email & Number Verification"],
		},
		"Payment Methods": ["PayPal", "Bank Transfer", "Gift Cards"],
		"Minimum Payout": {
			Other: "$20",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn 10% of your referrals' earnings",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "InboxDollars",
		"Website URL": "https://www.inboxdollars.com/",
		"Registration Requirements": {
			Age: 13,
			Region: "US",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$30",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings: "Earn referral bonuses for active users",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: [],
		},
		"Additional Notes":
			"Offers surveys, games, and cashback; includes sign-up bonuses and streak incentives.",
	},
	{
		"Website Name": "Prolific",
		"Website URL": "https://auth.prolific.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal"],
		"Minimum Payout": {
			Other: "£5",
		},
		"Average Pay Per Survey": {
			Min: "£0.2",
			Max: "£5",
		},
		"Survey Frequency": "Varies",
		"Referral Program": {
			Earnings: "Earn $30 when your referral completes a study",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Studies/Interviews"],
		},
		"Additional Notes": "Academic Research Focus",
	},
	{
		"Website Name": "Respondent",
		"Website URL": "https://app.respondent.io/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal"],
		"Minimum Payout": {
			Other: "No minimum payout",
		},
		"Average Pay Per Survey": {
			Min: "$5",
			Max: "$200",
		},
		"Survey Frequency": "Varies",
		"Referral Program": {
			Earnings: "Earn $20 when your referral completes a study",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Studies/Interviews"],
		},
		"Additional Notes": "Product tests, Focus groups, and Usability studies",
	},
	{
		"Website Name": "User Interviews",
		"Website URL": "https://www.userinterviews.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "No minimum payout",
		},
		"Average Pay Per Survey": {
			Min: "$50",
			Max: "$200",
		},
		"Survey Frequency": "Varies",
		"Referral Program": {
			Earnings: "Earn $10 when your referral completes a study",
		},
		"Special Features": {
			Platform: ["Web"],
			Others: ["Studies/Interviews"],
		},
		"Additional Notes": "Product tests, Focus groups, and Usability studies",
	},
	{
		"Website Name": "National Consumer Panel",
		"Website URL": "https://www.ncppanel.com/",
		"Registration Requirements": {
			Age: 18,
			Region: "US",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["Gift Cards"],
		"Minimum Payout": {
			Other: "No minimum payout",
		},
		"Average Pay Per Survey": {
			Min: "$0.50",
			Max: "$2",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["Barcode scanning app,"],
			Others: ["Panel-based research"],
		},
		"Additional Notes":
			"Users earn rewards for scanning products and sharing shopping habits.",
	},
	{
		"Website Name": "Freecash",
		"Website URL": "https://freecash.com/en",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Add/Social Account", "ID verification"],
		},
		"Payment Methods": [
			"PayPal",
			"Crypto",
			"Bank Transfer",
			"Visa Prepaid Cards",
			"Gift Cards",
			"Others",
		],
		"Minimum Payout": {
			Crypto: "$0.50",
			Other: "$5",
		},
		"Average Pay Per Survey": {
			Min: "$0.20",
			Max: "$5",
		},
		"Survey Frequency": "Daily",
		"Referral Program": {
			Earnings:
				"Earn 5% to 20% of your referrals' earnings, New users receive a welcome gift (up to $250)",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Streak Rewards", "Daily Bonus Ladder"],
		},
		"Additional Notes":
			"Game offers, Focuses on market research and day-to-day life",
	},
	{
		"Website Name": "YouGov",
		"Website URL": "https://account.yougov.com/",
		"Registration Requirements": {
			Age: 14,
			Region: "Worldwide",
			Verification: ["Email Verification"],
		},
		"Payment Methods": ["Bank Transfer", "Gift Cards"],
		"Minimum Payout": {
			Other: "$20 to $50, depending on location",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$5",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn $1 for each referral",
		},
		"Special Features": {
			Platform: ["iOS", "Android", "Web"],
			Others: ["Focuses on market research"],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "AttaPoll",
		"Website URL": "https://attapoll.com/",
		"Registration Requirements": {
			Age: 16,
			Region: "Worldwide",
			Verification: ["Email Address"],
		},
		"Payment Methods": ["PayPal", "Gift Cards"],
		"Minimum Payout": {
			Other: "$3",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Earn $0.50 for each verified referral ",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "Google Opinion Rewards",
		"Website URL": "https://surveys.google.com/google-opinion-rewards/ ",
		"Registration Requirements": {
			Age: 18,
			Region: "Widely Accessible",
			Verification: ["Google Account"],
		},
		"Payment Methods": ["PayPal", "Google Play Credits"],
		"Minimum Payout": {
			Other: "$2",
		},
		"Average Pay Per Survey": {
			Min: "$0.10",
			Max: "$1",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes": "Focuses on market research",
	},
	{
		"Website Name": "BrandBee",
		"Website URL": "https://www.brandbee.io/",
		"Registration Requirements": {
			Age: 18,
			Region: "US/UK/CA/AU",
			Verification: ["Email Verification", "Active Sim"],
		},
		"Payment Methods": ["Gift Cards"],
		"Minimum Payout": {
			Other: "$1",
		},
		"Average Pay Per Survey": {
			Min: "$0.0066 per point",
			Max: "$0.01 per point",
		},
		"Survey Frequency": "Weekly",
		"Referral Program": {
			Earnings: "Does not offer",
		},
		"Special Features": {
			Platform: ["iOS", "Android"],
			Others: [],
		},
		"Additional Notes": "Sharing device usage data, shopping online",
	},
];

const SurveyGrid = () => {
	const [surveys] = useState(
		SAMPLE_DATA.sort((a, b) =>
			a["Website Name"].localeCompare(b["Website Name"])
		)
	);

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{surveys.map((survey, index) => (
					<SurveyCard
						key={index}
						name={survey["Website Name"]}
						url={survey["Website URL"]}
						minPayout={parseFloat(
							survey["Minimum Payout"].Other.replace("$", "")
						)}
						avgPay={{
							min: parseFloat(
								survey["Average Pay Per Survey"].Min.replace("$", "")
							),
							max: parseFloat(
								survey["Average Pay Per Survey"].Max.replace("$", "")
							),
						}}
						frequency={survey["Survey Frequency"]}
						paymentMethods={survey["Payment Methods"]}
						requirements={[
							`Age: ${survey["Registration Requirements"].Age}+`,
							`Region: ${survey["Registration Requirements"].Region}`,
							...survey["Registration Requirements"].Verification,
						]}
						specialFeatures={[
							...survey["Special Features"].Platform,
							...survey["Special Features"].Others,
						]}
						notes={survey["Additional Notes"]}
					/>
				))}
			</div>
		</div>
	);
};

export default SurveyGrid;
