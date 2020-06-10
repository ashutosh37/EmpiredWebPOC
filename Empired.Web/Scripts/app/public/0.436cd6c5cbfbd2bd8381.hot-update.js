webpackHotUpdate(0,{

/***/ "./Scripts/app/src/components/fileupload/FileUpload.jsx":
/*!**************************************************************!*\
  !*** ./Scripts/app/src/components/fileupload/FileUpload.jsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactFontawesome = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n\nvar _freeSolidSvgIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ \"./node_modules/@fortawesome/free-solid-svg-icons/index.es.js\");\n\nvar _Services = __webpack_require__(/*! ../Common/Services */ \"./Scripts/app/src/components/Common/Services.jsx\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar FileUpload = function (_React$Component) {\n\t(0, _inherits3.default)(FileUpload, _React$Component);\n\n\tfunction FileUpload(props) {\n\t\t(0, _classCallCheck3.default)(this, FileUpload);\n\n\t\tvar _this = (0, _possibleConstructorReturn3.default)(this, (FileUpload.__proto__ || (0, _getPrototypeOf2.default)(FileUpload)).call(this, props));\n\n\t\t_this.GetBlobListFromServer = function () {\n\t\t\t(0, _Services.GetSaS)(function (response) {\n\t\t\t\tconsole.log(response);\n\t\t\t\tsessionStorage.setItem(\"sasToken\", response.SasToken);\n\t\t\t\tsessionStorage.setItem(\"containerName\", response.Container);\n\t\t\t\tsessionStorage.setItem(\"blobUri\", response.StorageAccount);\n\t\t\t\tvar containerName = response.Container;\n\t\t\t\tvar sasToken = response.SasToken;\n\t\t\t\tvar storageAccount = response.StorageAccount;\n\t\t\t\t_this.GetBlobList(containerName, sasToken, storageAccount);\n\t\t\t});\n\t\t};\n\n\t\t_this.GetBlobList = function (containerName, sasToken, storageAccount) {\n\t\t\tvar self = _this;\n\t\t\tvar blobService = AzureStorage.Blob.createBlobServiceWithSas(storageAccount, sasToken);\n\t\t\tblobService.listBlobsSegmented(containerName, null, function (error, results) {\n\t\t\t\tif (error) {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t} else {\n\t\t\t\t\tself.setState({ bloblist: [] });\n\t\t\t\t\tresults.entries.forEach(function (blob) {\n\n\t\t\t\t\t\tvar link = blobService.getUrl(containerName, blob.name, sasToken);\n\t\t\t\t\t\tself.setState({ bloblist: _this.state.bloblist.concat([{ name: blob.name, url: link }]) });\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\n\t\t_this.displayProcess = function (process) {\n\t\t\tdocument.getElementById(\"uploadProgressBar\").style.width = process + '%';\n\t\t\tdocument.getElementById(\"uploadProgressBar\").innerHTML = process + '%';\n\t\t};\n\n\t\t_this.refreshProgress = function () {\n\t\t\tsetTimeout(function () {\n\t\t\t\tif (!finishedOrError) {\n\t\t\t\t\tvar process = speedSummary.getCompletePercent();\n\t\t\t\t\tdisplayProcess(process);\n\t\t\t\t\trefreshProgress();\n\t\t\t\t}\n\t\t\t}, 200);\n\t\t};\n\n\t\t_this.uploadBlob = function () {\n\t\t\t_this.displayProcess(0);\n\t\t\tvar self = _this;\n\t\t\tvar sasToken = sessionStorage.getItem(\"sasToken\");\n\t\t\tvar containerName = sessionStorage.getItem(\"containerName\");\n\t\t\tvar storageAccount = sessionStorage.getItem(\"blobUri\");\n\t\t\tvar blobService = AzureStorage.Blob.createBlobServiceWithSas(storageAccount, sasToken);\n\t\t\tdocument.getElementById(\"uploadProgressBarContainer\").classList.remove('hidden');\n\t\t\t// If one file has been selected in the HTML file input element\n\t\t\tvar file = $('#FileInput').get(0).files[0];\n\t\t\tconsole.log(file);\n\t\t\tvar customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;\n\t\t\tblobService.singleBlobPutThresholdInBytes = customBlockSize;\n\n\t\t\tvar finishedOrError = false;\n\t\t\tvar speedSummary = blobService.createBlockBlobFromBrowserFile(containerName, file.name, file, { blockSize: customBlockSize }, function (error, result, response) {\n\t\t\t\tfinishedOrError = true;\n\t\t\t\tif (error) {\n\t\t\t\t\talert('Error');\n\t\t\t\t} else {\n\t\t\t\t\tself.displayProcess(100);\n\t\t\t\t\tvar link = blobService.getUrl(containerName, file.name, sasToken);\n\t\t\t\t\tself.setState({ bloblist: this.state.bloblist.concat([{ name: file.name, url: link }]) });\n\t\t\t\t}\n\t\t\t});\n\n\t\t\t_this.refreshProgress();\n\t\t};\n\n\t\t_this.state = {\n\t\t\tuploading: false,\n\t\t\timages: [],\n\t\t\tbloblist: []\n\t\t};\n\t\treturn _this;\n\t}\n\n\t(0, _createClass3.default)(FileUpload, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\n\t\t\tvar self = this;\n\t\t\tvar sasToken = sessionStorage.getItem(\"sasToken\");\n\t\t\tvar containerName = sessionStorage.getItem(\"containerName\");\n\t\t\tvar storageAccount = sessionStorage.getItem(\"blobUri\");\n\t\t\tif (sasToken) {\n\t\t\t\tself.GetBlobList(containerName, sasToken, storageAccount);\n\t\t\t} else {\n\t\t\t\tself.GetBlobListFromServer();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'onchange',\n\t\tvalue: function onchange(e) {}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this2 = this;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fadein' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'button' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'label',\n\t\t\t\t\t\t{ htmlFor: 'multi' },\n\t\t\t\t\t\t_react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: _freeSolidSvgIcons.faImages, color: '#6d84b4', size: '5x' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement('input', { type: 'file', id: 'FileInput', multiple: true }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'button',\n\t\t\t\t\t\t{ type: 'button', value: 'Upload to Blob', className: 'btn btn-default', id: 'UploadBlob', onClick: function onClick(e) {\n\t\t\t\t\t\t\t\treturn _this2.uploadBlob(e);\n\t\t\t\t\t\t\t} },\n\t\t\t\t\t\t'Upload to Blob'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'form-group hidden', id: 'uploadProgressBarContainer' },\n\t\t\t\t\t\t'Uploading...',\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: 'progress' },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'progress-bar', role: 'progressbar', id: 'uploadProgressBar', 'aria-valuenow': '60', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: 0 } },\n\t\t\t\t\t\t\t\t'0%'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'ul',\n\t\t\t\t\tnull,\n\t\t\t\t\tthis.state.bloblist.map(function (listitem, index) {\n\t\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t\t'li',\n\t\t\t\t\t\t\t{ key: index },\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t'a',\n\t\t\t\t\t\t\t\t{ href: listitem.url },\n\t\t\t\t\t\t\t\tlistitem.name\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t);\n\t\t\t\t\t})\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\treturn FileUpload;\n}(_react2.default.Component);\n\nexports.default = FileUpload;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9TY3JpcHRzL2FwcC9zcmMvY29tcG9uZW50cy9maWxldXBsb2FkL0ZpbGVVcGxvYWQuanN4PzZkMTEiXSwibmFtZXMiOlsiRmlsZVVwbG9hZCIsInByb3BzIiwiR2V0QmxvYkxpc3RGcm9tU2VydmVyIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiU2FzVG9rZW4iLCJDb250YWluZXIiLCJTdG9yYWdlQWNjb3VudCIsImNvbnRhaW5lck5hbWUiLCJzYXNUb2tlbiIsInN0b3JhZ2VBY2NvdW50IiwiR2V0QmxvYkxpc3QiLCJzZWxmIiwiYmxvYlNlcnZpY2UiLCJBenVyZVN0b3JhZ2UiLCJCbG9iIiwiY3JlYXRlQmxvYlNlcnZpY2VXaXRoU2FzIiwibGlzdEJsb2JzU2VnbWVudGVkIiwiZXJyb3IiLCJyZXN1bHRzIiwic2V0U3RhdGUiLCJibG9ibGlzdCIsImVudHJpZXMiLCJmb3JFYWNoIiwibGluayIsImdldFVybCIsImJsb2IiLCJuYW1lIiwic3RhdGUiLCJjb25jYXQiLCJ1cmwiLCJkaXNwbGF5UHJvY2VzcyIsInByb2Nlc3MiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJ3aWR0aCIsImlubmVySFRNTCIsInJlZnJlc2hQcm9ncmVzcyIsInNldFRpbWVvdXQiLCJmaW5pc2hlZE9yRXJyb3IiLCJzcGVlZFN1bW1hcnkiLCJnZXRDb21wbGV0ZVBlcmNlbnQiLCJ1cGxvYWRCbG9iIiwiZ2V0SXRlbSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZpbGUiLCIkIiwiZ2V0IiwiZmlsZXMiLCJjdXN0b21CbG9ja1NpemUiLCJzaXplIiwic2luZ2xlQmxvYlB1dFRocmVzaG9sZEluQnl0ZXMiLCJjcmVhdGVCbG9ja0Jsb2JGcm9tQnJvd3NlckZpbGUiLCJibG9ja1NpemUiLCJyZXN1bHQiLCJhbGVydCIsInVwbG9hZGluZyIsImltYWdlcyIsImUiLCJmYUltYWdlcyIsIm1hcCIsImxpc3RpdGVtIiwiaW5kZXgiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0lBRU1BLFU7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNElBQ2JBLEtBRGE7O0FBQUEsUUF5QnBCQyxxQkF6Qm9CLEdBeUJHLFlBQU07QUFDNUIseUJBQU8sVUFBQ0MsUUFBRCxFQUFjO0FBQ3BCQyxZQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDQUcsbUJBQWVDLE9BQWYsQ0FBdUIsVUFBdkIsRUFBbUNKLFNBQVNLLFFBQTVDO0FBQ0FGLG1CQUFlQyxPQUFmLENBQXVCLGVBQXZCLEVBQXdDSixTQUFTTSxTQUFqRDtBQUNBSCxtQkFBZUMsT0FBZixDQUF1QixTQUF2QixFQUFrQ0osU0FBU08sY0FBM0M7QUFDQSxRQUFJQyxnQkFBZ0JSLFNBQVNNLFNBQTdCO0FBQ0EsUUFBSUcsV0FBV1QsU0FBU0ssUUFBeEI7QUFDQSxRQUFJSyxpQkFBaUJWLFNBQVNPLGNBQTlCO0FBQ0EsVUFBS0ksV0FBTCxDQUFpQkgsYUFBakIsRUFBK0JDLFFBQS9CLEVBQTBDQyxjQUExQztBQUVDLElBVkY7QUFXQSxHQXJDbUI7O0FBQUEsUUF1Q3BCQyxXQXZDb0IsR0F1Q04sVUFBQ0gsYUFBRCxFQUFlQyxRQUFmLEVBQTBCQyxjQUExQixFQUE0QztBQUN6RCxPQUFJRSxZQUFKO0FBQ0EsT0FBSUMsY0FBY0MsYUFBYUMsSUFBYixDQUFrQkMsd0JBQWxCLENBQTJDTixjQUEzQyxFQUEyREQsUUFBM0QsQ0FBbEI7QUFDQUksZUFBWUksa0JBQVosQ0FBK0JULGFBQS9CLEVBQThDLElBQTlDLEVBQW9ELFVBQUNVLEtBQUQsRUFBUUMsT0FBUixFQUFvQjtBQUNyRSxRQUFJRCxLQUFKLEVBQVc7QUFDVGpCLGFBQVFDLEdBQVIsQ0FBWWdCLEtBQVo7QUFDRCxLQUZELE1BRU87QUFDTE4sVUFBS1EsUUFBTCxDQUFjLEVBQUNDLFVBQVUsRUFBWCxFQUFkO0FBQ0FGLGFBQVFHLE9BQVIsQ0FBZ0JDLE9BQWhCLENBQXdCLGdCQUFROztBQUU5QixVQUFJQyxPQUFPWCxZQUFZWSxNQUFaLENBQW1CakIsYUFBbkIsRUFBa0NrQixLQUFLQyxJQUF2QyxFQUE2Q2xCLFFBQTdDLENBQVg7QUFDQUcsV0FBS1EsUUFBTCxDQUFjLEVBQUNDLFVBQVUsTUFBS08sS0FBTCxDQUFXUCxRQUFYLENBQW9CUSxNQUFwQixDQUEyQixDQUFDLEVBQUNGLE1BQU9ELEtBQUtDLElBQWIsRUFBb0JHLEtBQUtOLElBQXpCLEVBQUQsQ0FBM0IsQ0FBWCxFQUFkO0FBRUQsTUFMRDtBQU9EO0FBQ0YsSUFiRjtBQWNBLEdBeERtQjs7QUFBQSxRQStEcEJPLGNBL0RvQixHQStESCxVQUFDQyxPQUFELEVBQVk7QUFDNUJDLFlBQVNDLGNBQVQsQ0FBd0IsbUJBQXhCLEVBQTZDQyxLQUE3QyxDQUFtREMsS0FBbkQsR0FBMkRKLFVBQVUsR0FBckU7QUFDQUMsWUFBU0MsY0FBVCxDQUF3QixtQkFBeEIsRUFBNkNHLFNBQTdDLEdBQXlETCxVQUFVLEdBQW5FO0FBQ0EsR0FsRW1COztBQUFBLFFBb0VwQk0sZUFwRW9CLEdBb0VGLFlBQU07QUFDdkJDLGNBQVcsWUFBWTtBQUNyQixRQUFJLENBQUNDLGVBQUwsRUFBc0I7QUFDcEIsU0FBSVIsVUFBVVMsYUFBYUMsa0JBQWIsRUFBZDtBQUNBWCxvQkFBZUMsT0FBZjtBQUNBTTtBQUNEO0FBQ0YsSUFORCxFQU1HLEdBTkg7QUFPQSxHQTVFbUI7O0FBQUEsUUE4RXBCSyxVQTlFb0IsR0E4RVAsWUFBTTtBQUNsQixTQUFLWixjQUFMLENBQW9CLENBQXBCO0FBQ0EsT0FBSW5CLFlBQUo7QUFDQSxPQUFJSCxXQUFXTixlQUFleUMsT0FBZixDQUF1QixVQUF2QixDQUFmO0FBQ0EsT0FBSXBDLGdCQUFnQkwsZUFBZXlDLE9BQWYsQ0FBdUIsZUFBdkIsQ0FBcEI7QUFDQSxPQUFJbEMsaUJBQWlCUCxlQUFleUMsT0FBZixDQUF1QixTQUF2QixDQUFyQjtBQUNBLE9BQUkvQixjQUFjQyxhQUFhQyxJQUFiLENBQWtCQyx3QkFBbEIsQ0FBMkNOLGNBQTNDLEVBQTJERCxRQUEzRCxDQUFsQjtBQUNFd0IsWUFBU0MsY0FBVCxDQUF3Qiw0QkFBeEIsRUFBc0RXLFNBQXRELENBQWdFQyxNQUFoRSxDQUF1RSxRQUF2RTtBQUNGO0FBQ0EsT0FBSUMsT0FBT0MsRUFBRSxZQUFGLEVBQWdCQyxHQUFoQixDQUFvQixDQUFwQixFQUF1QkMsS0FBdkIsQ0FBNkIsQ0FBN0IsQ0FBWDtBQUNBakQsV0FBUUMsR0FBUixDQUFZNkMsSUFBWjtBQUNBLE9BQUlJLGtCQUFrQkosS0FBS0ssSUFBTCxHQUFZLE9BQU8sSUFBUCxHQUFjLEVBQTFCLEdBQStCLE9BQU8sSUFBUCxHQUFjLENBQTdDLEdBQWlELE9BQU8sR0FBOUU7QUFDQXZDLGVBQVl3Qyw2QkFBWixHQUE0Q0YsZUFBNUM7O0FBRUEsT0FBSVgsa0JBQWtCLEtBQXRCO0FBQ0EsT0FBSUMsZUFBZTVCLFlBQVl5Qyw4QkFBWixDQUEyQzlDLGFBQTNDLEVBQTBEdUMsS0FBS3BCLElBQS9ELEVBQXFFb0IsSUFBckUsRUFBMkUsRUFBRVEsV0FBV0osZUFBYixFQUEzRSxFQUEyRyxVQUFVakMsS0FBVixFQUFpQnNDLE1BQWpCLEVBQXlCeEQsUUFBekIsRUFBbUM7QUFDL0p3QyxzQkFBa0IsSUFBbEI7QUFDQSxRQUFJdEIsS0FBSixFQUFXO0FBQ1R1QyxXQUFNLE9BQU47QUFDRCxLQUZELE1BRU87QUFDTDdDLFVBQUttQixjQUFMLENBQW9CLEdBQXBCO0FBQ0EsU0FBSVAsT0FBT1gsWUFBWVksTUFBWixDQUFtQmpCLGFBQW5CLEVBQWtDdUMsS0FBS3BCLElBQXZDLEVBQTZDbEIsUUFBN0MsQ0FBWDtBQUNNRyxVQUFLUSxRQUFMLENBQWMsRUFBQ0MsVUFBVSxLQUFLTyxLQUFMLENBQVdQLFFBQVgsQ0FBb0JRLE1BQXBCLENBQTJCLENBQUMsRUFBQ0YsTUFBT29CLEtBQUtwQixJQUFiLEVBQW9CRyxLQUFLTixJQUF6QixFQUFELENBQTNCLENBQVgsRUFBZDtBQUNQO0FBR0YsSUFYa0IsQ0FBbkI7O0FBYUEsU0FBS2MsZUFBTDtBQUNELEdBM0dvQjs7QUFFbkIsUUFBS1YsS0FBTCxHQUFhO0FBQ1o4QixjQUFXLEtBREM7QUFFWkMsV0FBUSxFQUZJO0FBR1p0QyxhQUFXO0FBSEMsR0FBYjtBQUZtQjtBQU9sQjs7OztzQ0FFbUI7O0FBRXJCLE9BQUlULE9BQU8sSUFBWDtBQUNBLE9BQUlILFdBQVdOLGVBQWV5QyxPQUFmLENBQXVCLFVBQXZCLENBQWY7QUFDQSxPQUFJcEMsZ0JBQWdCTCxlQUFleUMsT0FBZixDQUF1QixlQUF2QixDQUFwQjtBQUNBLE9BQUlsQyxpQkFBaUJQLGVBQWV5QyxPQUFmLENBQXVCLFNBQXZCLENBQXJCO0FBQ0EsT0FBR25DLFFBQUgsRUFBWTtBQUNURyxTQUFLRCxXQUFMLENBQWlCSCxhQUFqQixFQUErQkMsUUFBL0IsRUFBMENDLGNBQTFDO0FBQ0YsSUFGRCxNQUdJO0FBQ0hFLFNBQUtiLHFCQUFMO0FBQ0E7QUFFQzs7OzJCQW9DUTZELEMsRUFBRyxDQUdYOzs7MkJBZ0RRO0FBQUE7O0FBQ1YsVUFDQTtBQUFBO0FBQUEsTUFBSyxXQUFVLFFBQWY7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsUUFBTyxTQUFRLE9BQWY7QUFDRCxvQ0FBQyxpQ0FBRCxJQUFpQixNQUFNQywyQkFBdkIsRUFBaUMsT0FBTSxTQUF2QyxFQUFpRCxNQUFLLElBQXREO0FBREMsTUFERjtBQUlFLDhDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLFdBQXRCLEVBQWtDLGNBQWxDLEdBSkY7QUFLQztBQUFBO0FBQUEsUUFBUSxNQUFLLFFBQWIsRUFBc0IsT0FBTSxnQkFBNUIsRUFBNkMsV0FBVSxpQkFBdkQsRUFBeUUsSUFBRyxZQUE1RSxFQUF5RixTQUFTLGlCQUFDRCxDQUFEO0FBQUEsZUFBTyxPQUFLakIsVUFBTCxDQUFnQmlCLENBQWhCLENBQVA7QUFBQSxRQUFsRztBQUFBO0FBQUEsTUFMRDtBQU1DO0FBQUE7QUFBQSxRQUFLLFdBQVUsbUJBQWYsRUFBbUMsSUFBRyw0QkFBdEM7QUFBQTtBQUVLO0FBQUE7QUFBQSxTQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsY0FBZixFQUE4QixNQUFLLGFBQW5DLEVBQWlELElBQUcsbUJBQXBELEVBQXdFLGlCQUFjLElBQXRGLEVBQTJGLGlCQUFjLEdBQXpHLEVBQTZHLGlCQUFjLEtBQTNILEVBQWlJLE9BQU8sRUFBQ3hCLE9BQU0sQ0FBUCxFQUF4STtBQUFBO0FBQUE7QUFERjtBQUZMO0FBTkQsS0FERDtBQWdCQztBQUFBO0FBQUE7QUFFQyxVQUFLUixLQUFMLENBQVdQLFFBQVgsQ0FBb0J5QyxHQUFwQixDQUF3QixVQUFDQyxRQUFELEVBQVdDLEtBQVgsRUFDeEI7QUFDQyxhQUNDO0FBQUE7QUFBQSxTQUFJLEtBQUtBLEtBQVQ7QUFBZ0I7QUFBQTtBQUFBLFVBQUcsTUFBTUQsU0FBU2pDLEdBQWxCO0FBQXdCaUMsaUJBQVNwQztBQUFqQztBQUFoQixPQUREO0FBR0EsTUFMRDtBQUZEO0FBaEJELElBREE7QUE2QkU7OztFQTdJc0JzQyxnQkFBTUMsUzs7a0JBZ0poQnJFLFUiLCJmaWxlIjoiLi9TY3JpcHRzL2FwcC9zcmMvY29tcG9uZW50cy9maWxldXBsb2FkL0ZpbGVVcGxvYWQuanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJ1xyXG5pbXBvcnQgeyBmYUltYWdlcywgZmFJbWFnZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgR2V0U2FTIH0gZnJvbSAnLi4vQ29tbW9uL1NlcnZpY2VzJztcclxuXHJcbmNsYXNzIEZpbGVVcGxvYWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG5cdFx0c3VwZXIocHJvcHMpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0dXBsb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0aW1hZ2VzOiBbXSxcclxuXHRcdFx0YmxvYmxpc3QgOiBbXVxyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblx0XHJcblx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdHZhciBzYXNUb2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzYXNUb2tlblwiKTtcclxuXHR2YXIgY29udGFpbmVyTmFtZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjb250YWluZXJOYW1lXCIpO1xyXG5cdHZhciBzdG9yYWdlQWNjb3VudCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJibG9iVXJpXCIpO1xyXG5cdGlmKHNhc1Rva2VuKXtcclxuICAgIHNlbGYuR2V0QmxvYkxpc3QoY29udGFpbmVyTmFtZSxzYXNUb2tlbiAsIHN0b3JhZ2VBY2NvdW50KTtcclxuXHR9XHJcblx0ZWxzZXtcclxuXHRcdHNlbGYuR2V0QmxvYkxpc3RGcm9tU2VydmVyKCk7XHJcblx0fVxyXG5cdFxyXG4gIH1cclxuXHJcblx0XHJcblx0R2V0QmxvYkxpc3RGcm9tU2VydmVyID0oKSA9PiB7XHJcblx0XHRHZXRTYVMoKHJlc3BvbnNlKSA9PiB7IFxyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblx0XHRcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJzYXNUb2tlblwiLCByZXNwb25zZS5TYXNUb2tlbik7XHJcblx0XHRcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjb250YWluZXJOYW1lXCIsIHJlc3BvbnNlLkNvbnRhaW5lcik7XHJcblx0XHRcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJibG9iVXJpXCIsIHJlc3BvbnNlLlN0b3JhZ2VBY2NvdW50KTtcclxuXHRcdFx0dmFyIGNvbnRhaW5lck5hbWUgPSByZXNwb25zZS5Db250YWluZXI7XHJcblx0XHRcdHZhciBzYXNUb2tlbiA9IHJlc3BvbnNlLlNhc1Rva2VuO1xyXG5cdFx0XHR2YXIgc3RvcmFnZUFjY291bnQgPSByZXNwb25zZS5TdG9yYWdlQWNjb3VudFxyXG5cdFx0XHR0aGlzLkdldEJsb2JMaXN0KGNvbnRhaW5lck5hbWUsc2FzVG9rZW4gLCBzdG9yYWdlQWNjb3VudCk7XHJcbiAgICAgICAgIFxyXG5cdFx0XHR9KTtcclxuXHR9XHJcblxyXG5cdEdldEJsb2JMaXN0ID0gKGNvbnRhaW5lck5hbWUsc2FzVG9rZW4gLCBzdG9yYWdlQWNjb3VudCkgPT57XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHR2YXIgYmxvYlNlcnZpY2UgPSBBenVyZVN0b3JhZ2UuQmxvYi5jcmVhdGVCbG9iU2VydmljZVdpdGhTYXMoc3RvcmFnZUFjY291bnQsIHNhc1Rva2VuKTtcclxuXHRcdGJsb2JTZXJ2aWNlLmxpc3RCbG9ic1NlZ21lbnRlZChjb250YWluZXJOYW1lLCBudWxsLCAoZXJyb3IsIHJlc3VsdHMpID0+IHtcclxuXHRcdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7YmxvYmxpc3Q6IFtdfSk7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5lbnRyaWVzLmZvckVhY2goYmxvYiA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgbGluayA9IGJsb2JTZXJ2aWNlLmdldFVybChjb250YWluZXJOYW1lLCBibG9iLm5hbWUsIHNhc1Rva2VuKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7YmxvYmxpc3Q6IHRoaXMuc3RhdGUuYmxvYmxpc3QuY29uY2F0KFt7bmFtZSA6IGJsb2IubmFtZSAsIHVybDogbGlua31dKX0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHRcclxuICBvbmNoYW5nZShlKSB7XHJcblxyXG5cdFxyXG4gIH1cclxuXHRcclxuXHRkaXNwbGF5UHJvY2VzcyA9IChwcm9jZXNzKT0+IHtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkUHJvZ3Jlc3NCYXJcIikuc3R5bGUud2lkdGggPSBwcm9jZXNzICsgJyUnO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRQcm9ncmVzc0JhclwiKS5pbm5lckhUTUwgPSBwcm9jZXNzICsgJyUnO1xyXG5cdH1cclxuXHRcclxuXHRyZWZyZXNoUHJvZ3Jlc3MgPSAoKSA9PiB7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpZiAoIWZpbmlzaGVkT3JFcnJvcikge1xyXG5cdFx0XHRcdFx0XHR2YXIgcHJvY2VzcyA9IHNwZWVkU3VtbWFyeS5nZXRDb21wbGV0ZVBlcmNlbnQoKTtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheVByb2Nlc3MocHJvY2Vzcyk7XHJcblx0XHRcdFx0XHRcdHJlZnJlc2hQcm9ncmVzcygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdH0sIDIwMCk7XHJcbiB9XHJcblxyXG5cdHVwbG9hZEJsb2IgPSAoKSA9PiB7XHJcblx0XHR0aGlzLmRpc3BsYXlQcm9jZXNzKDApO1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dmFyIHNhc1Rva2VuID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNhc1Rva2VuXCIpO1xyXG5cdFx0dmFyIGNvbnRhaW5lck5hbWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY29udGFpbmVyTmFtZVwiKTtcclxuXHRcdHZhciBzdG9yYWdlQWNjb3VudCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJibG9iVXJpXCIpO1xyXG5cdFx0dmFyIGJsb2JTZXJ2aWNlID0gQXp1cmVTdG9yYWdlLkJsb2IuY3JlYXRlQmxvYlNlcnZpY2VXaXRoU2FzKHN0b3JhZ2VBY2NvdW50LCBzYXNUb2tlbik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFByb2dyZXNzQmFyQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cdFx0Ly8gSWYgb25lIGZpbGUgaGFzIGJlZW4gc2VsZWN0ZWQgaW4gdGhlIEhUTUwgZmlsZSBpbnB1dCBlbGVtZW50XHJcblx0XHR2YXIgZmlsZSA9ICQoJyNGaWxlSW5wdXQnKS5nZXQoMCkuZmlsZXNbMF07XHJcblx0XHRjb25zb2xlLmxvZyhmaWxlKTtcclxuXHRcdHZhciBjdXN0b21CbG9ja1NpemUgPSBmaWxlLnNpemUgPiAxMDI0ICogMTAyNCAqIDMyID8gMTAyNCAqIDEwMjQgKiA0IDogMTAyNCAqIDUxMjtcclxuXHRcdGJsb2JTZXJ2aWNlLnNpbmdsZUJsb2JQdXRUaHJlc2hvbGRJbkJ5dGVzID0gY3VzdG9tQmxvY2tTaXplO1xyXG4gICAgXHJcblx0XHR2YXIgZmluaXNoZWRPckVycm9yID0gZmFsc2U7XHJcblx0XHR2YXIgc3BlZWRTdW1tYXJ5ID0gYmxvYlNlcnZpY2UuY3JlYXRlQmxvY2tCbG9iRnJvbUJyb3dzZXJGaWxlKGNvbnRhaW5lck5hbWUsIGZpbGUubmFtZSwgZmlsZSwgeyBibG9ja1NpemU6IGN1c3RvbUJsb2NrU2l6ZSB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCwgcmVzcG9uc2UpIHtcclxuXHRcdFx0XHRmaW5pc2hlZE9yRXJyb3IgPSB0cnVlO1xyXG5cdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRhbGVydCgnRXJyb3InKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzZWxmLmRpc3BsYXlQcm9jZXNzKDEwMCk7XHJcblx0XHRcdFx0XHRcdHZhciBsaW5rID0gYmxvYlNlcnZpY2UuZ2V0VXJsKGNvbnRhaW5lck5hbWUsIGZpbGUubmFtZSwgc2FzVG9rZW4pO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtibG9ibGlzdDogdGhpcy5zdGF0ZS5ibG9ibGlzdC5jb25jYXQoW3tuYW1lIDogZmlsZS5uYW1lICwgdXJsOiBsaW5rfV0pfSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9ncmVzcygpO1xyXG59XHJcblxyXG4gIHJlbmRlcigpIHtcclxuXHRyZXR1cm4gKFxyXG5cdDxkaXYgY2xhc3NOYW1lPSdmYWRlaW4nPlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9J2J1dHRvbic+XHJcblx0XHQgIDxsYWJlbCBodG1sRm9yPSdtdWx0aSc+XHJcblx0XHRcdDxGb250QXdlc29tZUljb24gaWNvbj17ZmFJbWFnZXN9IGNvbG9yPScjNmQ4NGI0JyBzaXplPSc1eCcgLz5cclxuXHRcdCAgPC9sYWJlbD5cclxuXHRcdCAgPGlucHV0IHR5cGU9J2ZpbGUnIGlkPVwiRmlsZUlucHV0XCIgbXVsdGlwbGUgLz5cclxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJVcGxvYWQgdG8gQmxvYlwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIGlkPVwiVXBsb2FkQmxvYlwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwbG9hZEJsb2IoZSl9PlVwbG9hZCB0byBCbG9iPC9idXR0b24+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBoaWRkZW5cIiBpZD1cInVwbG9hZFByb2dyZXNzQmFyQ29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRVcGxvYWRpbmcuLi5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHJvZ3Jlc3NcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGlkPVwidXBsb2FkUHJvZ3Jlc3NCYXJcIiBhcmlhLXZhbHVlbm93PVwiNjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT17e3dpZHRoOjB9fT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MCVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PHVsPlxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnN0YXRlLmJsb2JsaXN0Lm1hcCgobGlzdGl0ZW0sIGluZGV4KSA9PiBcclxuXHRcdFx0eyBcclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PGxpIGtleT17aW5kZXh9PjxhIGhyZWY9e2xpc3RpdGVtLnVybH0+e2xpc3RpdGVtLm5hbWV9PC9hPjwvbGk+XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdDwvdWw+XHJcbiAgPC9kaXY+XHJcblx0KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVVwbG9hZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU2NyaXB0cy9hcHAvc3JjL2NvbXBvbmVudHMvZmlsZXVwbG9hZC9GaWxlVXBsb2FkLmpzeCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Scripts/app/src/components/fileupload/FileUpload.jsx\n");

/***/ })

})