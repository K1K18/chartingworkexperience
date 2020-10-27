/* global __TREE_SHAKE__ */
/* Place styles up here so they can be overridden by plugin and page styles if need be */
import "chartiq/css/normalize.css";
import "chartiq/css/page-defaults.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.scss";
import "chartiq/mobile/css/ciq-mobile.css";
/* Support for webcomponents on Legacy Edge */
import "chartiq/js/thirdparty/custom-elements.min.js";
/* This section enables various features within the library. Anything not specified will be tree-shaken.
 * Note that imports always happen before code execution; hence, this example is organized for ease of
 * comprehension rather than by expected execution order.
 */
import { CIQ } from "chartiq/js/chartiq";
import * as Standard from "chartiq/js/standard";
import * as Advanced from "chartiq/js/advanced";
import * as AddOns from "chartiq/js/addOns";
import * as Components from "chartiq/js/components";
import "chartiq/mobile/js/nativeSdkAccessibility.js";
/* Uncomment to see all available feature names in console */
//console.log(Object.keys(Standard));
//console.log(Object.keys(Advanced));
//console.log(Object.keys(AddOns));
//console.log(Object.keys(Components));
// __TREE_SHAKE_ is a global defined by the DefinePlugin in webpack.config.js.
// It must be defined to accomplish tree-shaking.  If it is not defined, all
// features will automatically be activated and there will be no tree-shaking.
// If tree-shaking is not desired, the DefinePlugin should be removed and then this
//  block can be removed as well.
if (typeof __TREE_SHAKE__ !== "undefined" && __TREE_SHAKE__) {
	/* comment out any feature you do not want in your bundle */
	CIQ.activateImports(
		Standard.createEngine,
		Standard.customCharts,
		Standard.drawing,
		Standard.easeMachine,
		Standard.equations,
		Standard.i18n,
		Standard.interaction,
		Standard.markers,
		Standard.market,
		Standard.movement,
		Standard.nameValueStore,
		Standard.quoteFeed,
		Standard.series,
		Standard.share,
		Standard.span,
		Standard.storage,
		Standard.studies,
		Standard.symbolLookupBase,
		Standard.theme,
		Standard.timezone,
		Standard.touch,
		Standard.visualization,
		Standard.medianPrice,
		Standard.momentum,
		Standard.priceRelative,
		Standard.vwap,
		Standard.zigzag,
		Advanced.aggregations,
		Advanced.drawingAdvanced,
		Advanced.equationsAdvanced,
		Advanced.highPerformanceMarkers,
		Advanced.renderersAdvanced,
		Advanced.accumulationDistribution,
		Advanced.adx,
		Advanced.alligator,
		Advanced.aroon,
		Advanced.atr,
		Advanced.awesomeOscillator,
		Advanced.balanceOfPower,
		Advanced.bollinger,
		Advanced.cci,
		Advanced.centerOfGravity,
		Advanced.chaikin,
		Advanced.chande,
		Advanced.choppiness,
		Advanced.comparisonStudies,
		Advanced.coppock,
		Advanced.darvasBox,
		Advanced.detrended,
		Advanced.disparity,
		Advanced.easeOfMovement,
		Advanced.ehlerFisher,
		Advanced.elder,
		Advanced.fractalChaos,
		Advanced.highLowStudies,
		Advanced.ichimoku,
		Advanced.intradayMomentum,
		Advanced.keltner,
		Advanced.klinger,
		Advanced.linearRegression,
		Advanced.macd,
		Advanced.massIndex,
		Advanced.moneyFlow,
		Advanced.movingAverages,
		Advanced.parabolicSAR,
		Advanced.pivotPoints,
		Advanced.prettyGoodOscillator,
		Advanced.priceMomentumOscillator,
		Advanced.priceVolumeOscillator,
		Advanced.primeNumber,
		Advanced.pring,
		Advanced.projectedVolume,
		Advanced.psychologicalLine,
		Advanced.qstick,
		Advanced.rainbow,
		Advanced.randomWalk,
		Advanced.relativeVigor,
		Advanced.rsi,
		Advanced.schaffTrendCycle,
		Advanced.shinohara,
		Advanced.stochastics,
		Advanced.supertrend,
		Advanced.swingIndex,
		Advanced.trendIntensity,
		Advanced.trix,
		Advanced.typicalPrice,
		Advanced.twiggsMoneyFlow,
		Advanced.ulcerIndex,
		Advanced.ultimateOscillator,
		Advanced.valuationLines,
		Advanced.volatilityIndex,
		Advanced.volumeProfile,
		Advanced.volumeStudies,
		Advanced.vortex,
		Advanced.williamsMFI,
		AddOns.animation,
		AddOns.continuousZoom,
		AddOns.extendedHours,
		AddOns.fullScreen,
		AddOns.inactivityTimer,
		AddOns.outliers,
		AddOns.plotComplementer,
		AddOns.rangeSlider,
		AddOns.tooltip,
		Components.abstractMarker,
		Components.advertisement,
		Components.aggregationDialog,
		Components.attribution,
		Components.chartLegend,
		Components.chartTitle,
		Components.chartcontrolGroup,
		Components.clickable,
		Components.close,
		Components.comparison,
		Components.comparisonLookup,
		Components.cvpController,
		Components.dialog,
		Components.drawingContext,
		Components.fibSettingsDialog,
		Components.gridSizePicker,
		Components.heading,
		Components.headsupDynamic,
		Components.headsupStatic,
		Components.infoToggle,
		Components.instantChart,
		Components.languageDialog,
		Components.loader,
		Components.lookup,
		Components.menu,
		Components.menuContainer,
		Components.palette,
		Components.paletteDock,
		Components.redo,
		Components.scroll,
		Components.shareButton,
		Components.shareDialog,
		Components.showRange,
		Components.sideNav,
		Components.sidePanel,
		Components.studies,
		Components.studyContext,
		Components.studyDialog,
		Components.studyInput,
		Components.studyLegend,
		Components.studyOutput,
		Components.studyParameter,
		Components.swatch,
		Components.themeDialog,
		Components.themePiece,
		Components.themes,
		Components.timezoneDialog,
		Components.toggle,
		Components.toolbar,
		Components.undo,
		Components.viewDialog,
		Components.views,
		Components.waveParameters,
		Components.colorPicker,
		Components.drawingPalette,
		Components.drawingSettings,
		Components.menuDropdown,
		null
	);
}
/* Uncomment to enable the deprecated functions.  Update your calls to functions in here to employ current usage. */
//import "chartiq/js/deprecated";
import getDefaultConfig from "chartiq/js/defaultConfiguration";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm";
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";
import "chartiq/examples/translations/translationSample";
// Create and customize default configuration
// This variable triggers display of the simulated data disclaimer necessary when
// using data from the ChartIQ data simulator. Set to false when displaying your
// production data.
const displayDataDisclaimer = true;
CIQ.MobileBridge.determineOs();
const quoteFeedNativeBridge = {
	fetch: function (parameters, cb) {
		function completion(cb) {
			return function (err, results) {
				if (err) {
					cb({ error: err });
				} else {
					cb(results);
				}
			};
		}
		// This should call the native ios or android interface.
		// For sample app, instantiate an interface that connects to the simulator.
		// Call the completion closure with a completionHandler (or other mechanism).
		// Make sure this is done asynchronously so the UI doesn't hang.
		// Completion assumes the results are in correct JSON format.
		CIQ.MobileBridge.nativeQuoteFeed(parameters, cb);
	},
	fetchInitialData: function (
		symbol,
		suggestedStartDate,
		suggestedEndDate,
		params,
		cb
	) {
		const parameters = {
			func: "pullInitialData",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: suggestedStartDate,
			end: suggestedEndDate
		};
		this.fetch(parameters, cb);
	},
	fetchUpdateData: function (symbol, startDate, params, cb) {
		const parameters = {
			func: "pullUpdate",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: startDate
		};
		this.fetch(parameters, cb);
	},
	fetchPaginationData: function (
		symbol,
		suggestedStartDate,
		endDate,
		params,
		cb
	) {
		const parameters = {
			func: "pullPagination",
			symbol: symbol,
			period: params.period,
			timeUnit: params.interval,
			start: suggestedStartDate,
			end: endDate
		};
		this.fetch(parameters, cb);
	}
};
CIQ.MobileBridge.setQuoteFeedInBridge(quoteFeedNativeBridge);
// NOTE: if you are using a push mechanism for your data comment out the quotefeed line and set the dataMethod to 'push' in the client side code
const config = getDefaultConfig({
	scrollStyle: PerfectScrollbar,
	quoteFeed: quoteFeedNativeBridge
});
Object.assign(config.enabledAddOns, { fullScreen: false, rangeSlider: false });
let stx = config.createChart();
if (stx) {
	stx.callbackListeners.drawingEdit = []; // turn off edit mode for drawing mSticky
	stx.callbackListeners.studyOverlayEdit = []; // turn off edit mode for study mSticky
	stx.callbackListeners.studyPanelEdit = []; // turn off edit mode for study panel
	stx.extendedHours.set(false); // default state so it doesn't mess with the native toggle option
	stx.minimumZoomTicks = 5; // default zoom ticks doesn't allow seconds to appear on the x-axis when in portrait mode
	CIQ.MobileBridge.setChartEngineInBridge(stx); // set the chart engine instance for the nativeSdkBridge scripts
	CIQ.MobileBridge.setChartAvailable(true); // lets the mobile bridge know that the chart is finished loading
	if (displayDataDisclaimer) {
		let simWarnDialog = document.getElementById("simulation-warning");
		simWarnDialog.open();
	}
}
