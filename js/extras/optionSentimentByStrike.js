/**
 *	8.1.99
 *	Generation date: 2020-10-20T06:25:04.849Z
 *	Client name: chartiq-library-trial
 *	Package Type: Technical Analysis
 *	License type: annual
 *	Expiration date: "2020-11-19"
 *	Domain lock: ["127.0.0.1","localhost","chartiq.com"]
 *	iFrame lock: true
 */

/***********************************************************
 * Copyright by ChartIQ, Inc.
 * Licensed under the ChartIQ, Inc. Developer License Agreement https://www.chartiq.com/developer-license-agreement
*************************************************************/
/*************************************** DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! **************************************/
/* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting */
/* and load that file right after the library has been loaded, but before the chart engine is instantiated.              */
/* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          */
/*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


/*
	Option Sentiment by Strike
	==========================
	Requires a quotefeed which creates an optionChain object in the masterData.  See examples/feeds/optionChainSimulator.js
*/
import { CIQ } from "../../js/chartiq.js";
/**
 * Creates an option sentiment by strike underlay for the chart. The underlay is always 25% of the width of the chart.
 * NOTE: Option Sentiment by Strike will only display on the chart panel sharing the yAxis.
 */
if (!CIQ.Studies) {
	console.error(
		"optionSentimentByStrike feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.displayOptionSentimentByStrike = function (stx, sd, quotes) {
		if (!stx || !stx.chart.dataSet) return;
		const { chart, layout } = stx;
		if (
			layout.periodicity > 1 ||
			(!stx.dontRoll &&
				(layout.interval === "week" || layout.interval === "month"))
		) {
			stx.displayErrorAsWatermark(
				"chart",
				stx.translateIf(
					"Sentiment By Strike not available on consolidated data"
				)
			);
			return;
		}
		const field = sd.inputs.Field || "volume";
		const contractType = sd.inputs["Contract Type"] || "both";
		let widthPercentage = sd.parameters.widthPercentage;
		let displayAmount = sd.parameters.displayAmount;
		//set defaults
		if (!widthPercentage || widthPercentage < 0) widthPercentage = 0.25;
		if (displayAmount !== false) displayAmount = true;
		let optionChain, displayDate;
		for (let dsIndex = quotes.length - 1; dsIndex >= 0; dsIndex--) {
			const segmentRecord = quotes[dsIndex];
			if (!segmentRecord) continue;
			const record = stx.chart.dataSet[segmentRecord.tick];
			if (!record) continue;
			optionChain = record.optionChain;
			displayDate = record.displayDate || record.DT;
			if (optionChain) break;
		}
		if (!optionChain) {
			stx.displayErrorAsWatermark(
				"chart",
				stx.translateIf("No option data found")
			);
			return;
		}
		let volumeMax = 0; // this is the maximum volume after we group them by the bars we will draw
		const volByStrike = {};
		for (let opt in optionChain) {
			const option = optionChain[opt];
			const strike = option.strike.value,
				volume = option[field].value,
				callorput = option.callorput.value;
			if (!volByStrike[strike]) volByStrike[strike] = { call: 0, put: 0 };
			let vbs = volByStrike[strike];
			if (callorput == "C") vbs.call += volume;
			else if (callorput == "P") vbs.put += volume;
			volumeMax = Math.max(
				volumeMax,
				vbs.call,
				vbs.put,
				contractType == "combined" ? vbs.call + vbs.put : 0
			);
		}
		if (volumeMax === 0) {
			stx.displayErrorAsWatermark(
				"chart",
				stx.translateIf("No sentiment data to render")
			);
			return;
		}
		const context = sd.getContext(stx);
		const fontstyle = "stx-float-date";
		stx.canvasFont(fontstyle, context);
		const txtHeight = stx.getCanvasFontSize(fontstyle);
		const panel = chart.panel;
		const chartTop = panel.yAxis.top;
		const chartBottom = panel.yAxis.bottom;
		const chartRight = chart.right;
		const barMaxHeight = chart.width * widthPercentage; // pixels for highest bar
		const self = stx;
		stx.startClip(panel.name);
		context.globalAlpha = 0.5;
		context.fillStyle = self.defaultColor;
		context.lineWidth = 10;
		context.textBaseline = "middle";
		const types = ["put", "call"];
		if (contractType === "call") types.shift();
		else if (contractType === "put") types.pop();
		const message =
			field == "volume"
				? "Option volume data for"
				: "Option open interest data as of";
		types.forEach((j) => {
			context.strokeStyle = CIQ.Studies.determineColor(
				sd.outputs[j === "call" ? "Calls" : "Puts"]
			);
			context.beginPath();
			for (let i in volByStrike) {
				let volume = volByStrike[i][j];
				if (volume) {
					let barBottom = Math.round(chartRight) - 0.5; //bottom x coordinate for the bar  -- remember bars are sideways so the bottom is on the x axis
					let pixel = self.pixelFromPrice(i, panel);
					if (contractType == "both") {
						let pixelShift = context.lineWidth / 2;
						if (j === "call") pixelShift *= -1;
						if (panel.yAxis.flipped) pixelShift *= -1;
						pixel += pixelShift;
					} else if (contractType == "combined") {
						if (j === "call")
							barBottom -= (volByStrike[i].put * barMaxHeight) / volumeMax;
					}
					if (
						pixel - context.lineWidth > chartBottom ||
						pixel + context.lineWidth < chartTop
					)
						continue;
					const barTop = barBottom - (volume * barMaxHeight) / volumeMax;
					context.moveTo(barTop, pixel);
					context.lineTo(barBottom, pixel);
					if (contractType == "combined") {
						if (j === "put") continue;
						volume += volByStrike[i].put;
					}
					if (displayAmount) {
						//write the volume on the bar **/
						const txt = volume; //CIQ.condenseInt(volume);
						let width;
						try {
							width = context.measureText(txt).width;
						} catch (e) {
							width = 0;
						}
						context.fillText(txt, barTop - width - 3, pixel + 1);
					}
				}
			}
			if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
			context.stroke();
			context.closePath();
		});
		context.textAlign = "right";
		context.fillText(
			stx.translateIf(message) +
				" " +
				CIQ.displayableDate(stx, chart, displayDate),
			chartRight - 10,
			chartTop + 10
		);
		context.fillText(
			stx.translateIf("(Adjust y-axis if necessary)"),
			chartRight - 10,
			chartTop + 10 + txtHeight
		);
		stx.endClip();
		context.globalAlpha = 1;
	};
	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Sentiment By Strike": {
			name: "Option Sentiment By Strike",
			underlay: true,
			seriesFN: CIQ.Studies.displayOptionSentimentByStrike,
			calculateFN: null,
			inputs: {
				Field: ["volume", "openinterest"],
				"Contract Type": ["both", "call", "put", "combined"]
			},
			outputs: { Calls: "#f8ae63", Puts: "#b64a96" },
			parameters: {
				init: {
					displayAmount: true,
					widthPercentage: 0.25
				}
			},
			customRemoval: true,
			attributes: {
				yaxisDisplayValue: { hidden: true },
				panelName: { hidden: true },
				flippedEnabled: { hidden: true }
			}
		}
	});
}