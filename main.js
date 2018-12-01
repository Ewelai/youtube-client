/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4fb4ef74524445db204c";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./content/content.js":
/*!****************************!*\
  !*** ./content/content.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-next-line import/no-unresolved


var _content = __webpack_require__(/*! ./content.scss */ "./content/content.scss");

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Content = function () {
  function Content() {
    _classCallCheck(this, Content);
  }

  _createClass(Content, [{
    key: 'createContent',

    // eslint-disable-next-line class-methods-use-this
    value: function createContent() {
      var mainBlock = document.createElement('main');
      var container = document.createElement('div');
      var sliderWrap = document.createElement('div');
      container.classList.add('container');
      sliderWrap.classList.add('main-slider');
      mainBlock.classList.add('main');
      sliderWrap.setAttribute('id', 'main-slider');
      container.append(sliderWrap);
      mainBlock.append(container);
      return mainBlock;
    }
  }]);

  return Content;
}();

exports.default = Content;

/***/ }),

/***/ "./content/content.scss":
/*!******************************!*\
  !*** ./content/content.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./css/normalize.css":
/*!***************************!*\
  !*** ./css/normalize.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./css/reset.css":
/*!***********************!*\
  !*** ./css/reset.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./global/global.js":
/*!**************************!*\
  !*** ./global/global.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _global = __webpack_require__(/*! ./global.scss */ "./global/global.scss");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalMarkup = function () {
  function GlobalMarkup() {
    _classCallCheck(this, GlobalMarkup);
  }

  _createClass(GlobalMarkup, [{
    key: 'createGlobalMarkup',

    // eslint-disable-next-line class-methods-use-this
    value: function createGlobalMarkup() {
      var wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      wrapper.setAttribute('id', 'wrapper');
      return wrapper;
    }
  }]);

  return GlobalMarkup;
}();

exports.default = GlobalMarkup;

/***/ }),

/***/ "./global/global.scss":
/*!****************************!*\
  !*** ./global/global.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./header/header.js":
/*!**************************!*\
  !*** ./header/header.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _header = __webpack_require__(/*! ./header.scss */ "./header/header.scss");

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header() {
    _classCallCheck(this, Header);
  }

  _createClass(Header, [{
    key: 'createHeader',

    // eslint-disable-next-line class-methods-use-this
    value: function createHeader() {
      var header = document.createElement('header');
      var container = document.createElement('div');
      container.classList.add('container');
      container.innerHTML = this.createHeaderSearch();
      header.classList.add('header');
      header.append(container);
      return header;
    }
  }, {
    key: 'createHeaderSearch',
    value: function createHeaderSearch() {
      // eslint-disable-next-line quotes
      return '<div class="header-search"><button class="search-btn" id="search-btn" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button> <input class="input-search" id="input-search" type="text" placeholder="Search"></div>';
    }
  }]);

  return Header;
}();

exports.default = Header;

/***/ }),

/***/ "./header/header.scss":
/*!****************************!*\
  !*** ./header/header.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reset = __webpack_require__(/*! ./css/reset.css */ "./css/reset.css");

var _reset2 = _interopRequireDefault(_reset);

var _normalize = __webpack_require__(/*! ./css/normalize.css */ "./css/normalize.css");

var _normalize2 = _interopRequireDefault(_normalize);

var _global = __webpack_require__(/*! ./global/global */ "./global/global.js");

var _global2 = _interopRequireDefault(_global);

var _header = __webpack_require__(/*! ./header/header */ "./header/header.js");

var _header2 = _interopRequireDefault(_header);

var _content = __webpack_require__(/*! ./content/content */ "./content/content.js");

var _content2 = _interopRequireDefault(_content);

var _slider = __webpack_require__(/*! ./slider/slider */ "./slider/slider.js");

var _slider2 = _interopRequireDefault(_slider);

var _requestModule = __webpack_require__(/*! ./requestModule/requestModule */ "./requestModule/requestModule.js");

var _requestModule2 = _interopRequireDefault(_requestModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-cycle
var Header = new _header2.default();
// eslint-disable-next-line import/no-cycle

var GlobalMarkup = new _global2.default();
var ContentBlock = new _content2.default();

var body = document.querySelector('body');

body.append(GlobalMarkup.createGlobalMarkup());

var wrapper = document.getElementById('wrapper');

wrapper.append(Header.createHeader());
wrapper.append(ContentBlock.createContent());

var Slider = new _slider2.default(document.getElementById('main-slider'));
var RequestModule = new _requestModule2.default();

exports.default = { Slider: Slider, RequestModule: RequestModule };

/***/ }),

/***/ "./requestModule/requestModule.js":
/*!****************************************!*\
  !*** ./requestModule/requestModule.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-next-line import/no-cycle


var _index = __webpack_require__(/*! ../index */ "./index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestModule = function () {
  function RequestModule() {
    _classCallCheck(this, RequestModule);

    this.key = 'AIzaSyDUsSLp4hxKRrO5tVjYQJT-TVaS2g46Tx4';
    this.templates = {
      nextPage: '&pageToken=',
      countResult: '&maxResults=15',
      site: 'https://www.googleapis.com/youtube/v3/'
    };
    this.tokenNext = null;
    this.tokenPrev = null;
    this.inputSearch = document.getElementById('input-search');
    this.buttonSend = document.getElementById('search-btn');
    this.data = null;
    this.requestEvent();
    this.inputValue = null;
    this.statuses = { nextPage: false };
  }

  _createClass(RequestModule, [{
    key: 'requestEvent',
    value: function requestEvent() {
      var _this = this;

      this.buttonSend.addEventListener('click', function () {
        _this.getInputValue();
      });
      this.inputSearch.addEventListener('keydown', function (event) {
        var KEY_CODE_ENTER = 13;
        if (event.keyCode === KEY_CODE_ENTER) {
          _this.getInputValue();
        }
      }, true);
    }
  }, {
    key: 'getInputValue',
    value: function getInputValue() {
      var inputValue = this.inputSearch.value;
      if (inputValue.replace(/\s/g, '') === '') {
        inputValue = '';
      }
      if (inputValue) {
        _index2.default.Slider.statuses.initValue = false;
        _index2.default.Slider.data = [];
        _index2.default.Slider.dataLast = [];
        this.statuses.nextPage = false;
        this.inputValue = inputValue;
        this.getRequest(inputValue);
      }
    }
  }, {
    key: 'getRequest',
    value: function getRequest(inputValue) {
      var _this2 = this;

      var request = void 0;
      if (this.statuses.nextPage) {
        request = this.templates.site + 'search?key=' + this.key + '&type=video&part=snippet' + this.templates.countResult + '&q=' + inputValue + this.templates.nextPage + this.tokenNext;
      } else {
        request = this.templates.site + 'search?key=' + this.key + '&type=video&part=snippet' + this.templates.countResult + '&q=' + inputValue;
      }
      fetch(request).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.tokenNext = data.nextPageToken;
        _this2.data = data.items;
        _this2.getAddedRequest();
      });
    }
  }, {
    key: 'getRequestLoad',
    value: function getRequestLoad() {
      this.statuses.nextPage = true;
      this.getRequest(this.inputValue);
    }
  }, {
    key: 'getAddedRequest',
    value: function getAddedRequest() {
      var _this3 = this;

      var urlArray = [];
      this.data.forEach(function (item) {
        urlArray.push(_this3.addViewCoount(item.id.videoId, _this3.key));
      });
      Promise.all(urlArray.map(function (url) {
        return fetch(url).then(function (response) {
          return response.json();
        }).then().catch();
      })).then(function (dataAdded) {
        _this3.bundleAddedRequest(dataAdded);
      });
    }
  }, {
    key: 'bundleAddedRequest',
    value: function bundleAddedRequest(dataAdded) {
      var _this4 = this;

      dataAdded.forEach(function (item, i) {
        _this4.data[i].snippet.viewCount = item.items[0].statistics.viewCount;
      });
      this.output(this.data);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'output',
    value: function output(data) {
      _index2.default.Slider.entry(data);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'addViewCoount',
    value: function addViewCoount(videoId, key) {
      return this.templates.site + 'videos?part=statistics&id=' + videoId + '&key=' + key;
    }
  }]);

  return RequestModule;
}();

exports.default = RequestModule;

/***/ }),

/***/ "./slider/slider.js":
/*!**************************!*\
  !*** ./slider/slider.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-param-reassign */

// eslint-disable-next-line import/no-cycle


var _slider = __webpack_require__(/*! ./slider.scss */ "./slider/slider.scss");

var _slider2 = _interopRequireDefault(_slider);

var _index = __webpack_require__(/*! ../index */ "./index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SliderClass = function () {
  function SliderClass(unloadingElem) {
    _classCallCheck(this, SliderClass);

    this.unloadingElem = unloadingElem;
    this.brakepoints = { mobile: 768, tablet: 992, netBook: 1300 };
    this.body = null;
    this.sliderVisible = null;
    this.sliderWrapper = null;
    this.data = [];
    this.dataLast = [];
    this.visibleSlides = 0;
    this.contentWidth = 0;
    this.buttons = { btnPagingPrev: null, btnPagingNext: null };
    this.sliderPosition = null;
    this.firstVisibleSlide = null;
    this.slidePaging = null;
    this.statuses = { initValue: false, sliderAction: false, limitOnSwitch: 300 };
    this.defineSlides();
    this.sliderResize();
  }

  _createClass(SliderClass, [{
    key: 'touchEvent',
    value: function touchEvent() {
      var _this = this;

      var initialPoint = void 0;
      var finalPoint = void 0;
      this.sliderVisible.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // eslint-disable-next-line prefer-destructuring
        initialPoint = event.changedTouches[0];
      }, false);
      this.sliderVisible.addEventListener('touchend', function (event) {
        event.preventDefault();
        // eslint-disable-next-line prefer-destructuring
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        if (xAbs > 20) {
          if (finalPoint.pageX < initialPoint.pageX) {
            _this.switchNextPage();
            _this.controllerLoad();
          } else {
            _this.switchPrevPage();
          }
        }
      }, false);
      this.sliderVisible.addEventListener('mousedown', function (event) {
        event.preventDefault();
        initialPoint = event.clientX;
      }, false);
      this.sliderVisible.addEventListener('mouseup', function (event) {
        event.preventDefault();
        finalPoint = event.clientX;
        var xAbs = Math.abs(initialPoint - finalPoint);
        if (xAbs > 20) {
          if (finalPoint < initialPoint) {
            _this.switchNextPage();
            _this.controllerLoad();
          } else {
            _this.switchPrevPage();
          }
        }
      }, false);
    }
  }, {
    key: 'sliderResize',
    value: function sliderResize() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        if (_this2.statuses.initValue) {
          _this2.defineSlides();
          _this2.defineWidthSlides();
          _this2.sliderPageResize();
        }
      });
    }
  }, {
    key: 'sliderPageResize',
    value: function sliderPageResize() {
      if ((this.sliderPosition - 1) * this.visibleSlides + 1 !== this.firstVisibleSlide) {
        this.sliderPosition = Math.floor(this.firstVisibleSlide / this.visibleSlides) + 1;
        this.firstVisibleSlide = (this.sliderPosition - 1) * this.visibleSlides + 1;
        this.slidePaging.innerHTML = this.sliderPosition;
      }
      this.sliderWrapper.style.transform = 'translateX(-' + this.contentWidth * (this.sliderPosition - 1) + 'px)';
    }
  }, {
    key: 'defineSlides',
    value: function defineSlides() {
      var windowWidth = window.innerWidth;
      if (windowWidth < this.brakepoints.mobile) {
        this.visibleSlides = 1;
      } else if (windowWidth > this.brakepoints.mobile - 1 && windowWidth < this.brakepoints.tablet) {
        this.visibleSlides = 2;
      } else if (windowWidth > this.brakepoints.tablet - 1 && windowWidth < this.brakepoints.netBook) {
        this.visibleSlides = 3;
      } else {
        this.visibleSlides = 4;
      }
    }
  }, {
    key: 'defineWidthSlides',
    value: function defineWidthSlides() {
      this.contentWidth = this.sliderVisible.offsetWidth;
      var slides = this.sliderVisible.querySelectorAll('.slide-block-wrap');
      var slideWidth = this.contentWidth / this.visibleSlides;
      var slidesLength = this.data.length;
      this.sliderWrapper.style.width = slideWidth * slidesLength + 'px';
      slides.forEach(function (item) {
        item.style.width = slideWidth + 'px';
      });
    }
  }, {
    key: 'entry',
    value: function entry(data) {
      var _this3 = this;

      var array = [];
      data.forEach(function (item) {
        _this3.data.push({
          videoId: item.id.videoId,
          chanelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          viewCount: item.snippet.viewCount,
          urlImg: item.snippet.thumbnails.medium.url
        });
        array.push({
          videoId: item.id.videoId,
          chanelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          viewCount: item.snippet.viewCount,
          urlImg: item.snippet.thumbnails.medium.url
        });
      });
      this.dataLast = array;
      this.determinant(this.dataLast);
    }
  }, {
    key: 'determinant',
    value: function determinant(data) {
      if (this.statuses.initValue) {
        this.createSlideItems(data);
        this.defineWidthSlides();
      } else {
        this.init(data);
      }
    }
  }, {
    key: 'init',
    value: function init(data) {
      this.unloadingElem.innerHTML = this.createSlider();
      this.body = document.getElementById('youtube-slider');
      this.sliderVisible = document.getElementById('slider-visible');
      this.sliderWrapper = document.getElementById('slider-wrapper');
      this.statuses.initValue = true;
      this.sliderPosition = 1;
      this.firstVisibleSlide = 1;
      this.createPagination();
      this.createSlideItems(data);
      this.defineWidthSlides();
      this.touchEvent();
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'createSlider',
    value: function createSlider() {
      return '\n      <div class="youtube-slider" id="youtube-slider">\n        <div class="slider-visible" id="slider-visible">\n          <div class="slider-wrapper" id="slider-wrapper">\n          </div>\n        </div>\n      </div>';
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'createPagination',
    value: function createPagination() {
      var _this4 = this;

      var pagination = document.createElement('div');
      var pageNumber = document.createElement('div');
      var buttonPrev = document.createElement('button');
      var buttonNext = document.createElement('button');
      pagination.classList.add('pagination');
      pagination.setAttribute('id', 'pagination');
      pageNumber.classList.add('page-number');
      pageNumber.setAttribute('id', 'page-number');
      buttonPrev.classList.add('btn');
      buttonPrev.classList.add('mute');
      buttonPrev.setAttribute('id', 'btn-paging-prev');
      buttonNext.classList.add('btn');
      buttonNext.setAttribute('id', 'btn-paging-next');
      buttonPrev.innerHTML = 'Prev';
      buttonNext.innerHTML = 'Next';
      pageNumber.innerHTML = this.sliderPosition;
      pagination.append(buttonPrev);
      pagination.append(pageNumber);
      pagination.append(buttonNext);
      this.body.append(pagination);
      this.buttons.btnPagingPrev = document.getElementById('btn-paging-prev');
      this.buttons.btnPagingNext = document.getElementById('btn-paging-next');
      this.slidePaging = document.getElementById('page-number');
      this.buttons.btnPagingNext.addEventListener('click', function () {
        _this4.switchNextPage();
        _this4.controllerLoad();
      });
      this.buttons.btnPagingPrev.addEventListener('click', function () {
        _this4.switchPrevPage();
      });
    }
  }, {
    key: 'createSlideItems',
    value: function createSlideItems(data) {
      var _this5 = this;

      data.forEach(function (item) {
        var div = document.createElement('div');
        div.classList.add('slide-block-wrap');
        div.innerHTML = _this5.templateSlide(item);
        _this5.sliderWrapper.append(div);
      });
    }
  }, {
    key: 'controllerLoad',
    value: function controllerLoad() {
      var slideLength = this.data.length;
      var pageVisible = Math.ceil(slideLength / this.visibleSlides);
      if (pageVisible <= this.sliderPosition + 2) {
        _index2.default.RequestModule.getRequestLoad();
      }
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'templateSlide',
    value: function templateSlide(item) {
      var dateVideo = item.publishedAt.slice(0, 10);
      var linkVideo = 'https://youtu.be/' + item.videoId;
      return '\n      <div class="slide-block">\n        <div class="slide-img">\n          <img draggable="false" src="' + item.urlImg + '">\n          <div class="slide-img-name">\n            <a target="-blank" href="' + linkVideo + '">' + item.title + '</a>\n          </div>\n        </div>\n        <div class="slide-descriptions">\n          <div class="descriptions-info">\n            <div class="desc-line">\n              <div class="line-ico"><i class="fa fa-user" aria-hidden="true"></i></div>\n              <div class="line-name">' + item.chanelTitle + '</div>\n            </div>\n            <div class="desc-line">\n              <div class="line-ico"><i class="fa fa-calendar" aria-hidden="true"></i></div>\n              <div class="line-name">' + dateVideo + '</div>\n            </div>\n            <div class="desc-line">\n              <div class="line-ico"><i class="fa fa-eye" aria-hidden="true"></i></div>\n              <div class="line-name">' + item.viewCount + '</div>\n            </div>\n          </div>\n          <div class="descriptions-text">' + item.description + '</div>\n        </div>\n      </div>\n    ';
    }
  }, {
    key: 'switchNextPage',
    value: function switchNextPage() {
      var _this6 = this;

      if (!this.statuses.sliderAction) {
        var page = this.sliderPosition;
        this.sliderPosition += 1;
        this.firstVisibleSlide += this.visibleSlides;
        this.slidePaging.innerHTML = this.sliderPosition;
        this.sliderWrapper.style.transform = 'translateX(-' + this.contentWidth * page + 'px)';
        this.buttons.btnPagingPrev.classList.remove('mute');
        this.statuses.sliderAction = true;
        setTimeout(function () {
          _this6.statuses.sliderAction = false;
        }, this.statuses.limitOnSwitch);
      }
    }
  }, {
    key: 'switchPrevPage',
    value: function switchPrevPage() {
      var _this7 = this;

      if (!this.statuses.sliderAction) {
        if (this.sliderPosition > 1) {
          this.sliderPosition -= 1;
          this.firstVisibleSlide -= this.visibleSlides;
          this.slidePaging.innerHTML = this.sliderPosition;
          this.sliderWrapper.style.transform = 'translateX(-' + this.contentWidth * (this.sliderPosition - 1) + 'px)';
        }
        if (this.sliderPosition < 2) {
          this.buttons.btnPagingPrev.classList.add('mute');
        }
        this.statuses.sliderAction = true;
        setTimeout(function () {
          _this7.statuses.sliderAction = false;
        }, this.statuses.limitOnSwitch);
      }
    }
  }]);

  return SliderClass;
}();

exports.default = SliderClass;

/***/ }),

/***/ "./slider/slider.scss":
/*!****************************!*\
  !*** ./slider/slider.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.js.map