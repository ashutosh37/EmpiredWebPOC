webpackHotUpdate(0,{

/***/ "./Scripts/app/src/components/fileupload/FileUpload.jsx":
/*!**************************************************************!*\
  !*** ./Scripts/app/src/components/fileupload/FileUpload.jsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactFontawesome = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n\nvar _freeSolidSvgIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ \"./node_modules/@fortawesome/free-solid-svg-icons/index.es.js\");\n\nvar _Services = __webpack_require__(/*! ../Common/Services */ \"./Scripts/app/src/components/Common/Services.jsx\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar FileUpload = function (_React$Component) {\n\t(0, _inherits3.default)(FileUpload, _React$Component);\n\n\tfunction FileUpload(props) {\n\t\t(0, _classCallCheck3.default)(this, FileUpload);\n\n\t\tvar _this = (0, _possibleConstructorReturn3.default)(this, (FileUpload.__proto__ || (0, _getPrototypeOf2.default)(FileUpload)).call(this, props));\n\n\t\t_this.state = {\n\t\t\tuploading: false,\n\t\t\timages: [],\n\t\t\tbloblist: []\n\t\t};\n\t\treturn _this;\n\t}\n\n\t(0, _createClass3.default)(FileUpload, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar _this2 = this;\n\n\t\t\t(0, _Services.GetSaS)(function (response) {\n\t\t\t\tconsole.log(response);\n\t\t\t\tsessionStorage.setItem(\"sasToken\", response.SasToken);\n\t\t\t\tsessionStorage.setItem(\"containerName\", response.Container);\n\t\t\t\tsessionStorage.setItem(\"blobUri\", response.StorageAccount);\n\t\t\t\tvar blobService = AzureStorage.Blob.createBlobServiceWithSas(response.StorageAccount, response.SasToken);\n\t\t\t\tblobService.listBlobsSegmented(response.Container, null, function (error, results) {\n\t\t\t\t\tif (error) {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t} else {\n\t\t\t\t\t\t_this2.setState({ bloblist: [] });\n\t\t\t\t\t\tresults.entries.forEach(function (blob) {\n\n\t\t\t\t\t\t\tvar link = blobService.getUrl(containerName, blob.name, sasToken);\n\t\t\t\t\t\t\tbloblist.push({ name: blob.name, url: link });\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'onchange',\n\t\tvalue: function onchange(e) {}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this3 = this;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fadein' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'button' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'label',\n\t\t\t\t\t\t{ htmlFor: 'multi' },\n\t\t\t\t\t\t_react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: _freeSolidSvgIcons.faImages, color: '#6d84b4', size: '10x' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement('input', { type: 'file', id: 'multi', onChange: function onChange(e) {\n\t\t\t\t\t\t\treturn _this3.onchange(e);\n\t\t\t\t\t\t}, multiple: true })\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'ul',\n\t\t\t\t\tnull,\n\t\t\t\t\tthis.state.bloblist.map(function (listitem, index) {\n\t\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t\t'li',\n\t\t\t\t\t\t\t{ key: index },\n\t\t\t\t\t\t\tlistitem.name\n\t\t\t\t\t\t);\n\t\t\t\t\t})\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\treturn FileUpload;\n}(_react2.default.Component);\n\nexports.default = FileUpload;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9TY3JpcHRzL2FwcC9zcmMvY29tcG9uZW50cy9maWxldXBsb2FkL0ZpbGVVcGxvYWQuanN4PzZkMTEiXSwibmFtZXMiOlsiRmlsZVVwbG9hZCIsInByb3BzIiwic3RhdGUiLCJ1cGxvYWRpbmciLCJpbWFnZXMiLCJibG9ibGlzdCIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIlNhc1Rva2VuIiwiQ29udGFpbmVyIiwiU3RvcmFnZUFjY291bnQiLCJibG9iU2VydmljZSIsIkF6dXJlU3RvcmFnZSIsIkJsb2IiLCJjcmVhdGVCbG9iU2VydmljZVdpdGhTYXMiLCJsaXN0QmxvYnNTZWdtZW50ZWQiLCJlcnJvciIsInJlc3VsdHMiLCJzZXRTdGF0ZSIsImVudHJpZXMiLCJmb3JFYWNoIiwibGluayIsImdldFVybCIsImNvbnRhaW5lck5hbWUiLCJibG9iIiwibmFtZSIsInNhc1Rva2VuIiwicHVzaCIsInVybCIsImUiLCJmYUltYWdlcyIsIm9uY2hhbmdlIiwibWFwIiwibGlzdGl0ZW0iLCJpbmRleCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7SUFFTUEsVTs7O0FBRUoscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0SUFDYkEsS0FEYTs7QUFFbkIsUUFBS0MsS0FBTCxHQUFhO0FBQ1pDLGNBQVcsS0FEQztBQUVaQyxXQUFRLEVBRkk7QUFHWkMsYUFBVztBQUhDLEdBQWI7QUFGbUI7QUFPbEI7Ozs7c0NBRW1CO0FBQUE7O0FBR3JCLHlCQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQkMsWUFBUUMsR0FBUixDQUFZRixRQUFaO0FBQ0FHLG1CQUFlQyxPQUFmLENBQXVCLFVBQXZCLEVBQW1DSixTQUFTSyxRQUE1QztBQUNBRixtQkFBZUMsT0FBZixDQUF1QixlQUF2QixFQUF3Q0osU0FBU00sU0FBakQ7QUFDQUgsbUJBQWVDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0NKLFNBQVNPLGNBQTNDO0FBQ0QsUUFBSUMsY0FBY0MsYUFBYUMsSUFBYixDQUFrQkMsd0JBQWxCLENBQTJDWCxTQUFTTyxjQUFwRCxFQUFvRVAsU0FBU0ssUUFBN0UsQ0FBbEI7QUFDQUcsZ0JBQVlJLGtCQUFaLENBQStCWixTQUFTTSxTQUF4QyxFQUFtRCxJQUFuRCxFQUF5RCxVQUFDTyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDMUUsU0FBSUQsS0FBSixFQUFXO0FBQ1RaLGNBQVFDLEdBQVIsQ0FBWVcsS0FBWjtBQUNELE1BRkQsTUFFTztBQUNMLGFBQUtFLFFBQUwsQ0FBYyxFQUFDaEIsVUFBVSxFQUFYLEVBQWQ7QUFDQWUsY0FBUUUsT0FBUixDQUFnQkMsT0FBaEIsQ0FBd0IsZ0JBQVE7O0FBRTlCLFdBQUlDLE9BQU9WLFlBQVlXLE1BQVosQ0FBbUJDLGFBQW5CLEVBQWtDQyxLQUFLQyxJQUF2QyxFQUE2Q0MsUUFBN0MsQ0FBWDtBQUNBeEIsZ0JBQVN5QixJQUFULENBQWMsRUFBQ0YsTUFBT0QsS0FBS0MsSUFBYixFQUFvQkcsS0FBS1AsSUFBekIsRUFBZDtBQUNELE9BSkQ7QUFNRDtBQUNGLEtBWkY7QUFhQyxJQW5CRjtBQW9CRTs7OzJCQUVRUSxDLEVBQUcsQ0FHWDs7OzJCQUVRO0FBQUE7O0FBQ1YsVUFDQTtBQUFBO0FBQUEsTUFBSyxXQUFVLFFBQWY7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsUUFBTyxTQUFRLE9BQWY7QUFDRCxvQ0FBQyxpQ0FBRCxJQUFpQixNQUFNQywyQkFBdkIsRUFBaUMsT0FBTSxTQUF2QyxFQUFpRCxNQUFLLEtBQXREO0FBREMsTUFERjtBQUlFLDhDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLE9BQXRCLEVBQThCLFVBQVUsa0JBQUNELENBQUQ7QUFBQSxjQUFPLE9BQUtFLFFBQUwsQ0FBY0YsQ0FBZCxDQUFQO0FBQUEsT0FBeEMsRUFBaUUsY0FBakU7QUFKRixLQUREO0FBT0M7QUFBQTtBQUFBO0FBRUMsVUFBSzlCLEtBQUwsQ0FBV0csUUFBWCxDQUFvQjhCLEdBQXBCLENBQXdCLFVBQUNDLFFBQUQsRUFBV0MsS0FBWCxFQUN4QjtBQUNDLGFBQ0M7QUFBQTtBQUFBLFNBQUksS0FBS0EsS0FBVDtBQUFpQkQsZ0JBQVNSO0FBQTFCLE9BREQ7QUFHQSxNQUxEO0FBRkQ7QUFQRCxJQURBO0FBb0JFOzs7RUE5RHNCVSxnQkFBTUMsUzs7a0JBaUVoQnZDLFUiLCJmaWxlIjoiLi9TY3JpcHRzL2FwcC9zcmMvY29tcG9uZW50cy9maWxldXBsb2FkL0ZpbGVVcGxvYWQuanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJ1xyXG5pbXBvcnQgeyBmYUltYWdlcywgZmFJbWFnZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgR2V0U2FTIH0gZnJvbSAnLi4vQ29tbW9uL1NlcnZpY2VzJztcclxuXHJcbmNsYXNzIEZpbGVVcGxvYWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG5cdFx0c3VwZXIocHJvcHMpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0dXBsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0aW1hZ2VzOiBbXSxcclxuXHRcdFx0YmxvYmxpc3QgOiBbXVxyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblx0XHJcblx0XHJcblx0R2V0U2FTKChyZXNwb25zZSkgPT4ge1xyXG5cdCAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cdCAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInNhc1Rva2VuXCIsIHJlc3BvbnNlLlNhc1Rva2VuKTtcclxuXHQgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjb250YWluZXJOYW1lXCIsIHJlc3BvbnNlLkNvbnRhaW5lcik7XHJcblx0ICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYmxvYlVyaVwiLCByZXNwb25zZS5TdG9yYWdlQWNjb3VudCk7XHJcblx0XHR2YXIgYmxvYlNlcnZpY2UgPSBBenVyZVN0b3JhZ2UuQmxvYi5jcmVhdGVCbG9iU2VydmljZVdpdGhTYXMocmVzcG9uc2UuU3RvcmFnZUFjY291bnQsIHJlc3BvbnNlLlNhc1Rva2VuKTtcclxuXHRcdGJsb2JTZXJ2aWNlLmxpc3RCbG9ic1NlZ21lbnRlZChyZXNwb25zZS5Db250YWluZXIsIG51bGwsIChlcnJvciwgcmVzdWx0cykgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtibG9ibGlzdDogW119KTtcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLmVudHJpZXMuZm9yRWFjaChibG9iID0+IHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBsaW5rID0gYmxvYlNlcnZpY2UuZ2V0VXJsKGNvbnRhaW5lck5hbWUsIGJsb2IubmFtZSwgc2FzVG9rZW4pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRibG9ibGlzdC5wdXNoKHtuYW1lIDogYmxvYi5uYW1lICwgdXJsOiBsaW5rfSk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcbiAgb25jaGFuZ2UoZSkge1xyXG5cclxuXHRcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHRyZXR1cm4gKFxyXG5cdDxkaXYgY2xhc3NOYW1lPSdmYWRlaW4nPlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9J2J1dHRvbic+XHJcblx0XHQgIDxsYWJlbCBodG1sRm9yPSdtdWx0aSc+XHJcblx0XHRcdDxGb250QXdlc29tZUljb24gaWNvbj17ZmFJbWFnZXN9IGNvbG9yPScjNmQ4NGI0JyBzaXplPScxMHgnIC8+XHJcblx0XHQgIDwvbGFiZWw+XHJcblx0XHQgIDxpbnB1dCB0eXBlPSdmaWxlJyBpZD0nbXVsdGknIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbmNoYW5nZShlKX0gbXVsdGlwbGUgLz5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PHVsPlxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnN0YXRlLmJsb2JsaXN0Lm1hcCgobGlzdGl0ZW0sIGluZGV4KSA9PiBcclxuXHRcdFx0eyBcclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGxpIGtleT17aW5kZXh9PntsaXN0aXRlbS5uYW1lfTwvbGk+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdDwvdWw+XHJcbiAgPC9kaXY+XHJcblx0KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU2NyaXB0cy9hcHAvc3JjL2NvbXBvbmVudHMvZmlsZXVwbG9hZC9GaWxlVXBsb2FkLmpzeCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Scripts/app/src/components/fileupload/FileUpload.jsx\n");

/***/ })

})