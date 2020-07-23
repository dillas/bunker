require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5adc409b1587311c1ae2";
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
/******/ 			_selfInvalidated: false,
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
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
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
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
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
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
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
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
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
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
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
/******/ 			var queue = outdatedModules.map(function(id) {
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
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
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
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
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
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
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
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
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
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@bunker42/config/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Apollo Starter Kit',
  logo: 'logo.svg',
  // Loaded via webpack and stored in favicon/common/assets
  logging: {
    level: (process.env.npm_config_argv || '').search(/(watch|start)/) >= 0 ? 'debug' : 'info',
    debugSQL: false,
    apolloLogging: (process.env.npm_config_argv || '').search(/(watch|start)/) >= 0
  },
  // Check here for Windows and Mac OS X: https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls
  // Use this protocol handler for Linux: https://github.com/sysgears/vscode-handler
  stackFragmentFormat: 'vscode://file/{0}:{1}:{2}'
});

/***/ }),

/***/ "../../node_modules/@bunker42/config/db.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const db = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    socketPath: process.env.DB_SOCKET_PATH,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL,
    multipleStatements: true,
    charset: 'utf8'
  }
};

const path = __webpack_require__("path");

if (false) {}

if (db.client === 'sqlite3') {
  db.connection = {
    development: {
      filename: path.resolve('./dev-db.sqlite3')
    },
    production: {
      filename: path.resolve('./prod-db.sqlite3')
    },
    test: {
      filename: ':memory:'
    }
  }['development' || false];
  db.pool = {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (db);

/***/ }),

/***/ "../../node_modules/@bunker42/config/engine.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  apiKey: process.env.APOLLO_ENGINE_API_KEY,
  // Set your Apollo Engine API key
  logging: {
    level: 'DEBUG' // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR

  }
});

/***/ }),

/***/ "../../node_modules/@bunker42/config/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/config/modules.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




const envSettings = _objectSpread(_objectSpread({}, Object(lodash__WEBPACK_IMPORTED_MODULE_1__["pickBy"])(_modules__WEBPACK_IMPORTED_MODULE_2__, (v, k) => k !== 'env')), Object(lodash__WEBPACK_IMPORTED_MODULE_1__["get"])(_modules__WEBPACK_IMPORTED_MODULE_2__, 'env.' + 'development'));

/* harmony default export */ __webpack_exports__["default"] = (envSettings);

/***/ }),

/***/ "../../node_modules/@bunker42/config/modules.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/config/app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "app", function() { return _app__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/config/db.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "db", function() { return _db__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/config/engine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "engine", function() { return _engine__WEBPACK_IMPORTED_MODULE_2__["default"]; });



 // export { default as rest } from './rest';
// export { default as mailer } from './mailer';
// export { default as analytics } from './analytics';
// export { default as stripe } from './stripe';
// export { default as i18n } from './i18n';
// export { default as pagination } from './pagination';
// export { default as upload } from './upload';
// export { default as chat } from './chat';
// export { default as auth } from './auth';

/***/ }),

/***/ "../../node_modules/@bunker42/core-client/clientOnly.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



const clientOnly = Comp => {
  var _temp;

  return _temp = class ClientOnly extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    constructor(...args) {
      super(...args);

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "state", {
        client:  false && false
      });
    }

    componentDidMount() {
      this.setState({
        client: false
      });
    }

    render() {
      return this.state.client && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Comp, this.props);
    }

  }, _temp;
};

/* harmony default export */ __webpack_exports__["default"] = (clientOnly);

/***/ }),

/***/ "../../node_modules/@bunker42/core-client/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _clientOnly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-client/clientOnly.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clientOnly", function() { return _clientOnly__WEBPACK_IMPORTED_MODULE_1__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = ( false ? undefined : {});

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/clientStorage.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItem", function() { return getItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setItem", function() { return setItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeItem", function() { return removeItem; });
const getItem = async name => window.sessionStorage.getItem(name);
const setItem = async (name, value) => window.sessionStorage.setItem(name, value);
const removeItem = async name => window.sessionStorage.removeItem(name);

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/createApolloClient.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_link_batch_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("apollo-link-batch-http");
/* harmony import */ var apollo_link_batch_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_link_batch_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("apollo-link");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apollo_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var apollo_link_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("apollo-link-state");
/* harmony import */ var apollo_link_state__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(apollo_link_state__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var apollo_link_ws__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("apollo-link-ws");
/* harmony import */ var apollo_link_ws__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(apollo_link_ws__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("apollo-cache-inmemory");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("apollo-logger");
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(apollo_logger__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("subscriptions-transport-ws");
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("apollo-cache-router");
/* harmony import */ var apollo_cache_router__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_router__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("apollo-utilities");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(apollo_utilities__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../node_modules/@bunker42/core-common/log.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
















const createApolloClient = ({
  apiUrl,
  createNetLink,
  createLink,
  connectionParams,
  clientResolvers
}) => {
  const netCache = new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__["InMemoryCache"]();
  const localCache = new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_7__["InMemoryCache"]();
  const cache = apollo_cache_router__WEBPACK_IMPORTED_MODULE_11___default.a.override(apollo_cache_router__WEBPACK_IMPORTED_MODULE_11___default.a.route([netCache, localCache], document => {
    const operationName = Object(graphql__WEBPACK_IMPORTED_MODULE_2__["getOperationAST"])(document).name;

    if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_12__["hasDirectives"])(['client'], document) || operationName && operationName.value === 'GeneratedClientQuery') {
      // Pass all @client queries and @client defaults to localCache
      return localCache;
    } else {
      // Pass all the other queries to netCache);
      return netCache;
    }
  }), {
    reset: () => {
      // On apolloClient.resetStore() reset only netCache and keep localCache intact
      return netCache.reset();
    }
  });

  const getApolloClient = () => client;

  const queryLink = createNetLink ? createNetLink(apiUrl, getApolloClient) : new apollo_link_batch_http__WEBPACK_IMPORTED_MODULE_3__["BatchHttpLink"]({
    uri: apiUrl,
    credentials: 'include',
    fetch: (isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default())
  });
  let apiLink = queryLink;

  if (apiUrl && ( false || typeof navigator !== 'undefined')) {
    const finalConnectionParams = {};

    if (connectionParams) {
      for (const connectionParam of connectionParams) {
        Object.assign(finalConnectionParams, connectionParam());
      }
    }

    const wsUri = apiUrl.replace(/^http/, 'ws');
    const globalVar = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
    const webSocketImpl = globalVar.WebSocket || globalVar.MozWebSocket;
    const wsClient = new subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_9__["SubscriptionClient"](wsUri, {
      reconnect: true,
      connectionParams: finalConnectionParams
    }, webSocketImpl);
    wsClient.use([{
      applyMiddleware(operationOptions, next) {
        Object.assign(operationOptions, finalConnectionParams);
        next();
      }

    }]);
    wsClient.onDisconnected(() => {// console.log('onDisconnected');
    });
    wsClient.onReconnected(() => {// console.log('onReconnected');
    });
    apiLink = apollo_link__WEBPACK_IMPORTED_MODULE_4__["ApolloLink"].split(({
      query
    }) => {
      const definition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_12__["getMainDefinition"])(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, new apollo_link_ws__WEBPACK_IMPORTED_MODULE_6__["WebSocketLink"](wsClient), queryLink);
  }

  const linkState = Object(apollo_link_state__WEBPACK_IMPORTED_MODULE_5__["withClientState"])(_objectSpread(_objectSpread({}, clientResolvers), {}, {
    cache
  }));
  const allLinks = [...(createLink ? createLink.map(create => create(getApolloClient)) : []), linkState, apiLink];

  if (_bunker42_config__WEBPACK_IMPORTED_MODULE_13__["default"].app.logging.apolloLogging && ( true || false)) {
    allLinks.unshift(new apollo_logger__WEBPACK_IMPORTED_MODULE_8__["LoggingLink"]({
      logger: _log__WEBPACK_IMPORTED_MODULE_14__["default"].debug.bind(_log__WEBPACK_IMPORTED_MODULE_14__["default"])
    }));
  }

  const clientParams = {
    link: apollo_link__WEBPACK_IMPORTED_MODULE_4__["ApolloLink"].from(allLinks),
    cache,
    resolvers: (clientResolvers || {}).resolvers
  };

  if (true) {
    if (typeof window !== 'undefined' && window.__APOLLO_STATE__) {
      clientParams.initialState = window.__APOLLO_STATE__;
    } else {
      clientParams.ssrMode = true;
      clientParams.ssrForceFetchDelay = 100;
    }
  }

  if (false) {}

  const client = new apollo_client__WEBPACK_IMPORTED_MODULE_10__["default"](clientParams);

  if (cache.constructor.name !== 'OverrideCache') {
    // Restore Apollo Link State defaults only if we don't use `apollo-cache-router`
    client.onResetStore(linkState.writeDefaults);
  }

  if (typeof window !== 'undefined' && window.__APOLLO_STATE__) {
    cache.restore(window.__APOLLO_STATE__);
  }

  return client;
};

/* harmony default export */ __webpack_exports__["default"] = (createApolloClient);

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/createReduxStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStoreReducer", function() { return getStoreReducer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("connected-react-router");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("redux-devtools-extension/developmentOnly");
/* harmony import */ var redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_3__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




const getStoreReducer = (history, reducers) => Object(redux__WEBPACK_IMPORTED_MODULE_1__["combineReducers"])(_objectSpread({
  router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["connectRouter"])(history)
}, reducers));

const createReduxStore = (reducers, initialState, history, routerMiddleware) => {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(getStoreReducer(history, reducers), initialState, // initial state
  routerMiddleware ? Object(redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_3__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_1__["applyMiddleware"])(routerMiddleware)) : undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (createReduxStore);

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clientStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/core-common/clientStorage.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "clientStorage", function() { return _clientStorage__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-common/net.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serverPort", function() { return _net__WEBPACK_IMPORTED_MODULE_1__["serverPort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiExternal", function() { return _net__WEBPACK_IMPORTED_MODULE_1__["isApiExternal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apiUrl", function() { return _net__WEBPACK_IMPORTED_MODULE_1__["apiUrl"]; });

/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-common/log.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "log", function() { return _log__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _createApolloClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/core-common/createApolloClient.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createApolloClient", function() { return _createApolloClient__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _createReduxStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@bunker42/core-common/createReduxStore.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxStore", function() { return _createReduxStore__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStoreReducer", function() { return _createReduxStore__WEBPACK_IMPORTED_MODULE_4__["getStoreReducer"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/@bunker42/core-common/utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "omitNested", function() { return _utils__WEBPACK_IMPORTED_MODULE_5__["omitNested"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeTypename", function() { return _utils__WEBPACK_IMPORTED_MODULE_5__["removeTypename"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "traceMethodCalls", function() { return _utils__WEBPACK_IMPORTED_MODULE_5__["traceMethodCalls"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLATFORM", function() { return _utils__WEBPACK_IMPORTED_MODULE_5__["PLATFORM"]; });

/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return lodash__WEBPACK_IMPORTED_MODULE_6__["flowRight"]; });











/***/ }),

/***/ "../../node_modules/@bunker42/core-common/log.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("minilog");
/* harmony import */ var minilog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(minilog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");


minilog__WEBPACK_IMPORTED_MODULE_0___default.a.enable();
const loggerName = typeof window !== 'undefined' ? 'frontend' : 'backend';
const log = minilog__WEBPACK_IMPORTED_MODULE_0___default()(loggerName);
log.suggest.defaultResult = false;
log.suggest.clear().allow(loggerName, _bunker42_config__WEBPACK_IMPORTED_MODULE_1__["default"].app.logging.level);

if (true) {
  const consoleLog = global.console.log;

  global.console.log = (...args) => {
    if (args.length === 1 && typeof args[0] === 'string' && args[0].match(/^\[(HMR|WDS)\]/)) {
      consoleLog('backend ' + args[0]);
    } else {
      consoleLog.apply(global.console, args);
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (log);

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/net.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverPort", function() { return serverPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApiExternal", function() { return isApiExternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiUrl", function() { return apiUrl; });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-common/utils.ts");


const serverPort = _utils__WEBPACK_IMPORTED_MODULE_1__["PLATFORM"] === 'server' && (process.env.PORT || ( true ? 8080 : undefined));
const isApiExternal = !!url__WEBPACK_IMPORTED_MODULE_0___default.a.parse('/graphql').protocol;
const clientApiUrl = !isApiExternal && _utils__WEBPACK_IMPORTED_MODULE_1__["PLATFORM"] === 'web' ? `${window.location.protocol}//${window.location.hostname}${ true ? ':8080' : undefined}${'/graphql'}` : '/graphql';
const serverApiUrl = !isApiExternal ? `http://localhost:${serverPort}${'/graphql'}` : '/graphql';
const apiUrl = _utils__WEBPACK_IMPORTED_MODULE_1__["PLATFORM"] === 'server' ? serverApiUrl : clientApiUrl;

/***/ }),

/***/ "../../node_modules/@bunker42/core-common/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "omitNested", function() { return omitNested; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTypename", function() { return removeTypename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traceMethodCalls", function() { return traceMethodCalls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLATFORM", function() { return PLATFORM; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-common/log.ts");


/**
 * Removes the specified paths from the input object and the nested objects.
 * Returns a new object composed of the properties that were not removed.
 *
 * @param obj - The source object
 * @param paths - The property paths to remove
 */

const omitNested = (obj, paths) => {
  const omittedObject = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(obj, paths);

  Object.keys(omittedObject).forEach(key => {
    if (typeof omittedObject[key] === 'object') {
      omittedObject[key] = omitNested(omittedObject[key], paths);
    }
  });
  return omittedObject;
};
/**
 * Removes the '__typename' field from the incoming object.
 *
 * @param obj - The source object
 */

const removeTypename = obj => omitNested(obj, '__typename');
/**
 * Wraps the target object to trace and log all method calls
 *
 * @param {*} obj target object to trace
 */

const traceMethodCalls = obj => {
  return new Proxy(obj, {
    get(target, property) {
      const origProperty = target[property];
      return (...args) => {
        const result = origProperty.apply(target, args);
        _log__WEBPACK_IMPORTED_MODULE_1__["default"].debug(`${String(property)}${JSON.stringify(args) + ' -> ' + JSON.stringify(result)}`);
        return result;
      };
    }

  });
};
/**
 * Gets the current platform such as web, server, or mobile
 */

const getPlatform = () => {
  if (typeof document !== 'undefined') {
    return 'web';
  } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return 'mobile';
  } else {
    return 'server';
  }
};
/**
 * Current platform
 */


const PLATFORM = getPlatform();

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/api/pubsub.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("apollo-logger");
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql-subscriptions");
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");




const pubsub = _bunker42_config__WEBPACK_IMPORTED_MODULE_3__["default"].app.logging.apolloLogging ? Object(apollo_logger__WEBPACK_IMPORTED_MODULE_0__["wrapPubSub"])(new graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["PubSub"](), {
  logger: _bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["log"].debug.bind(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["log"])
}) : new graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["PubSub"]();
/* harmony default export */ __webpack_exports__["default"] = (pubsub);

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/api/rootSchema.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"FieldError"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"field"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"message"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"dummy"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"SchemaDefinition","directives":[],"operationTypes":[{"kind":"OperationTypeDefinition","operation":"query","type":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}}},{"kind":"OperationTypeDefinition","operation":"mutation","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mutation"}}},{"kind":"OperationTypeDefinition","operation":"subscription","type":{"kind":"NamedType","name":{"kind":"Name","value":"Subscription"}}}]}],"loc":{"start":0,"end":250}};
    doc.loc.source = {"body":"type FieldError {\r\n  field: String!\r\n  message: String!\r\n}\r\n\r\ntype Query {\r\n  dummy: Int\r\n}\r\n\r\ntype Mutation {\r\n  dummy: Int\r\n}\r\n\r\ntype Subscription {\r\n  dummy: Int\r\n}\r\n\r\nschema {\r\n  query: Query\r\n  mutation: Mutation\r\n  subscription: Subscription\r\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "../../node_modules/@bunker42/core-server/api/schema.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSchema", function() { return createSchema; });
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rootSchema_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-server/api/rootSchema.graphql");
/* harmony import */ var _rootSchema_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rootSchema_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-server/api/pubsub.ts");



const createSchema = modules => Object(graphql_tools__WEBPACK_IMPORTED_MODULE_0__["makeExecutableSchema"])({
  typeDefs: [_rootSchema_graphql__WEBPACK_IMPORTED_MODULE_1___default.a].concat(modules.schema),
  resolvers: modules.createResolvers(_pubsub__WEBPACK_IMPORTED_MODULE_2__["default"])
});

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/api/subscriptions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onAppDispose", function() { return onAppDispose; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("subscriptions-transport-ws");
/* harmony import */ var subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




let subscriptionServer;

const addSubscriptions = (httpServer, schema, modules) => {
  subscriptionServer = subscriptions_transport_ws__WEBPACK_IMPORTED_MODULE_1__["SubscriptionServer"].create({
    schema,
    execute: graphql__WEBPACK_IMPORTED_MODULE_2__["execute"],
    subscribe: graphql__WEBPACK_IMPORTED_MODULE_2__["subscribe"],
    onConnect: async (connectionParams, webSocket, ctx) => {
      try {
        return _objectSpread(_objectSpread({}, await modules.createContext(null, null, connectionParams, webSocket)), {}, {
          wsCtx: ctx
        });
      } catch (e) {
        _bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__["log"].error(e);
      }
    },
    onOperation: async (message, params, webSocket) => {
      try {
        params.context = await modules.createContext(null, null, message.payload, webSocket);
        return params;
      } catch (e) {
        _bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__["log"].error(e);
      }
    }
  }, {
    server: httpServer,
    path: '/graphql'
  });
};

const addGraphQLSubscriptions = (httpServer, schema, modules, entryModule) => {
  if (entryModule && entryModule.hot && entryModule.hot.data) {
    const prevServer = entryModule.hot.data.subscriptionServer;

    if (prevServer && prevServer.wsServer) {
      _bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__["log"].debug('Reloading the subscription server.');
      prevServer.wsServer.close(() => {
        addSubscriptions(httpServer, schema, modules);
      });
    }
  } else {
    addSubscriptions(httpServer, schema, modules);
  }
};

const onAppDispose = (_, data) => {
  data.subscriptionServer = subscriptionServer;
};
/* harmony default export */ __webpack_exports__["default"] = (addGraphQLSubscriptions);

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/app.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createServerApp", function() { return createServerApp; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _middleware_graphiql__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@bunker42/core-server/middleware/graphiql.ts");
/* harmony import */ var _middleware_website__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/@bunker42/core-server/middleware/website.tsx");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/@bunker42/core-server/graphql.ts");
/* harmony import */ var _middleware_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/@bunker42/core-server/middleware/error.ts");








const createServerApp = (schema, modules) => {
  const app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // Don't rate limit heroku

  app.enable('trust proxy');

  if (false) {}

  (modules.beforeware || []).forEach(applyBeforeware => applyBeforeware(app, modules.appContext));
  (modules.middleware || []).forEach(applyMiddleware => applyMiddleware(app, modules.appContext));

  if (true) {
    app.get('/servdir', (req, res) => res.send(process.cwd() + path__WEBPACK_IMPORTED_MODULE_2___default.a.sep));
  }

  if (!_bunker42_core_common__WEBPACK_IMPORTED_MODULE_3__["isApiExternal"]) {
    const graphqlServer = Object(_graphql__WEBPACK_IMPORTED_MODULE_6__["default"])(schema, modules);
    graphqlServer.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        credentials: true,
        origin: true
      }
    });
  }

  app.get('/graphiql', (req, res, next) => Object(_middleware_graphiql__WEBPACK_IMPORTED_MODULE_4__["default"])(req, res, next));
  app.use(Object(_middleware_website__WEBPACK_IMPORTED_MODULE_5__["default"])(schema, modules));
  app.use('/', express__WEBPACK_IMPORTED_MODULE_0___default.a.static('../client/build', {
    maxAge: '180 days'
  }));

  if (true) {
    app.use(_middleware_error__WEBPACK_IMPORTED_MODULE_7__["default"]);
  }

  return app;
};

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/entry.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-server/server.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createServer", function() { return _server__WEBPACK_IMPORTED_MODULE_1__["createServer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serverPromise", function() { return _server__WEBPACK_IMPORTED_MODULE_1__["serverPromise"]; });



process.on('uncaughtException', ex => {
  _bunker42_core_common__WEBPACK_IMPORTED_MODULE_0__["log"].error(ex);
  process.exit(1);
});
process.on('unhandledRejection', reason => {
  _bunker42_core_common__WEBPACK_IMPORTED_MODULE_0__["log"].error(reason);
});

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/graphql.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("apollo-logger");
/* harmony import */ var apollo_logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_logger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






/* harmony default export */ __webpack_exports__["default"] = ((schema, modules) => {
  return new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"]({
    schema,
    context: async ({
      req,
      res
    }) => _objectSpread(_objectSpread({}, await modules.createContext(req, res)), {}, {
      req,
      res
    }),
    formatError: error => error.message === 'Not Authenticated!' ? new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["AuthenticationError"](error.message) : error,
    formatResponse: (response, options) => _bunker42_config__WEBPACK_IMPORTED_MODULE_5__["default"].app.logging.apolloLogging ? Object(apollo_logger__WEBPACK_IMPORTED_MODULE_2__["formatResponse"])({
      logger: _bunker42_core_common__WEBPACK_IMPORTED_MODULE_4__["log"].debug.bind(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_4__["log"])
    }, response, options) : response,
    tracing: !!_bunker42_config__WEBPACK_IMPORTED_MODULE_5__["default"].engine.apiKey,
    cacheControl: !!_bunker42_config__WEBPACK_IMPORTED_MODULE_5__["default"].engine.apiKey,
    engine: _bunker42_config__WEBPACK_IMPORTED_MODULE_5__["default"].engine.apiKey ? {
      apiKey: _bunker42_config__WEBPACK_IMPORTED_MODULE_5__["default"].engine.apiKey
    } : false,
    playground: false
  });
});

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_module_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-server/index.ts");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-server/entry.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serverPromise", function() { return _entry__WEBPACK_IMPORTED_MODULE_1__["serverPromise"]; });

/* harmony import */ var _api_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-server/api/schema.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSchema", function() { return _api_schema__WEBPACK_IMPORTED_MODULE_2__["createSchema"]; });





/* harmony default export */ __webpack_exports__["default"] = (new _bunker42_module_server__WEBPACK_IMPORTED_MODULE_0__["default"]({
  onAppCreate: [_entry__WEBPACK_IMPORTED_MODULE_1__["createServer"]]
}));

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/middleware/error.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");



let assetMap;
/**
 * Gets rid of circular data in the object,
 * replaces circular links to '[Circular]' string
 * It is needed for converting the Error object into JSON via JSON.stringify
 */

const stripCircular = (circularData, seen) => {
  const notCircularData = Array.isArray(circularData) ? [] : {};
  seen = seen || [];
  seen.push(circularData);
  Object.getOwnPropertyNames(circularData).forEach(key => {
    if (!circularData[key] || typeof circularData[key] !== 'object' && !Array.isArray(circularData[key])) {
      notCircularData[key] = circularData[key];
    } else if (seen.indexOf(circularData[key]) < 0) {
      notCircularData[key] = stripCircular(circularData[key], seen.slice(0));
    } else {
      notCircularData[key] = '[Circular]';
    }
  });
  return notCircularData;
};
/**
 * The code below MUST be declared as a function, not closure,
 * otherwise Express will fail to execute this handler
 *
 * Important: should have 4 params, even if they are not used
 */


function errorMiddleware(e, req, res, next) {
  if (!_bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["isApiExternal"] && req.path === '/graphql') {
    const stack = e.stack.toString().replace(/[\n]/g, '\\n');
    res.status(200).send(`[{"data": {}, "errors":[{"message": "${stack}"}]}]`);
  } else {
    _bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["log"].error(e);

    if (true) {
      assetMap = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join('../client/build', 'assets.json')).toString());
    }

    res.status(200).send(`<html>
            <script charset="UTF-8">window.__SERVER_ERROR__=${JSON.stringify(stripCircular(e, null))};</script>
            <body>
                 <div id="root"></div>
                 ${assetMap['vendor.js'] ? `<script src="${assetMap['vendor.js']}" charSet="utf-8"></script>` : ''}
                 <script src="${assetMap['index.js']}" charSet="utf-8"></script>
          </body>
       </html>`);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (errorMiddleware);

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/middleware/graphiql.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("apollo-server-module-graphiql");
/* harmony import */ var apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");




function graphiqlExpress(options) {
  const graphiqlHandler = (req, res, next) => {
    const query = req.url && url__WEBPACK_IMPORTED_MODULE_0__["parse"](req.url, true).query;
    apollo_server_module_graphiql__WEBPACK_IMPORTED_MODULE_1__["resolveGraphiQLString"](query, options, req).then(graphiqlString => {
      res.setHeader('Content-Type', 'text/html');
      res.write(graphiqlString);
      res.end();
    }, error => next(error));
  };

  return graphiqlHandler;
}

/* harmony default export */ __webpack_exports__["default"] = (graphiqlExpress(req => {
  const _url$parse = url__WEBPACK_IMPORTED_MODULE_0__["parse"](req.get('Referer') || `http://localhost`),
        protocol = _url$parse.protocol,
        hostname = _url$parse.hostname;

  const subscriptionsUrl = (!_bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["isApiExternal"] ? `${protocol}//${hostname}:${_bunker42_core_common__WEBPACK_IMPORTED_MODULE_2__["serverPort"]}${'/graphql'}` : '/graphql').replace(/^http/, 'ws');
  return {
    endpointURL: '/graphql',
    subscriptionsEndpoint: subscriptionsUrl,
    query: '{\n' + '  serverCounter {\n' + '    amount\n' + '  }\n' + '}'
  };
}));

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/middleware/website.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apollo_link_schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("apollo-link-schema");
/* harmony import */ var apollo_link_schema__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apollo_link_schema__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _loadable_server__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("@loadable/server");
/* harmony import */ var _loadable_server__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_loadable_server__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }














 // import { createApolloClient } from '@bunker42/core-common';

let assetMap;
let clientModules;

if (true) {
  clientModules = __webpack_require__("../../node_modules/client/src/index.ts").default;

  if (true) {
    module.hot.accept(["../../node_modules/client/src/index.ts"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (() => {
      clientModules = __webpack_require__("../../node_modules/client/src/index.ts").default;
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
  }
}

const Html = ({
  content,
  state,
  css,
  headElements,
  helmet
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("html", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
  lang: "en"
}, helmet.htmlAttributes.toComponent()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("head", null, helmet.title.toComponent(), helmet.meta.toComponent(), helmet.link.toComponent(), helmet.style.toComponent(), helmet.script.toComponent(), helmet.noscript.toComponent(), assetMap['vendor.js'] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("script", {
  src: `${assetMap['vendor.js']}`,
  charSet: "utf-8"
}), headElements, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
  charSet: "utf-8"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1, maximum-scale=1"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "apple-touch-icon",
  sizes: "180x180",
  href: `${assetMap['apple-touch-icon.png']}`
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "icon",
  type: "image/png",
  href: `${assetMap['favicon-32x32.png']}`,
  sizes: "32x32"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "icon",
  type: "image/png",
  href: `${assetMap['favicon-16x16.png']}`,
  sizes: "16x16"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "manifest",
  href: `${assetMap['manifest.xjson']}`
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "mask-icon",
  href: `${assetMap['safari-pinned-tab.svg']}`,
  color: "#5bbad5"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("link", {
  rel: "shortcut icon",
  href: `${assetMap['favicon.ico']}`
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
  name: "msapplication-config",
  content: `${assetMap['browserconfig.xml']}`
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
  name: "theme-color",
  content: "#ffffff"
}), !!css && css), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("body", helmet.bodyAttributes.toComponent(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
  id: "root",
  dangerouslySetInnerHTML: {
    __html: content || ''
  }
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("script", {
  dangerouslySetInnerHTML: {
    __html: `window.__APOLLO_STATE__=${serialize_javascript__WEBPACK_IMPORTED_MODULE_12___default()(state, {
      isJSON: true
    })};`
  },
  charSet: "UTF-8"
})));

const renderServerSide = async (req, res, schema, modules) => {
  const schemaLink = new apollo_link_schema__WEBPACK_IMPORTED_MODULE_4__["SchemaLink"]({
    schema,
    context: _objectSpread(_objectSpread({}, await modules.createContext(req, res)), {}, {
      req,
      res
    })
  });
  const client = Object(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_14__["createApolloClient"])({
    apiUrl: _bunker42_core_common__WEBPACK_IMPORTED_MODULE_14__["apiUrl"],
    createNetLink: !_bunker42_core_common__WEBPACK_IMPORTED_MODULE_14__["isApiExternal"] ? () => schemaLink : undefined,
    createLink: clientModules.createLink,
    clientResolvers: clientModules.resolvers,
    connectionParams: null
  });
  const store = Object(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_14__["createReduxStore"])(clientModules.reducers, {}, client);
  const context = {};
  const App = clientModules.getWrappedRoot( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_6__["Provider"], {
    store: store
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_5__["ApolloProvider"], {
    client: client
  }, clientModules.getDataRoot( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_7__["StaticRouter"], {
    location: req.url,
    context: context
  }, clientModules.router)))), req);
  await Object(react_apollo__WEBPACK_IMPORTED_MODULE_5__["getDataFromTree"])(App);
  context.pageNotFound === true ? res.status(404) : res.status(200);

  if (context.url) {
    res.writeHead(307, {
      Location: context.url
    });
    res.end();
  } else {
    if (true) {
      assetMap = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_9___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_10___default.a.join('../client/build', 'assets.json')).toString());

      if (false) {}
    }

    const extractor = new _loadable_server__WEBPACK_IMPORTED_MODULE_13__["ChunkExtractor"]({
      statsFile: path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve('../client/build', 'loadable-stats.json'),
      entrypoints: ['index'],
      publicPath:  false ? undefined : '/'
    });
    const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_8__["ServerStyleSheet"]();
    const JSX = extractor.collectChunks(sheet.collectStyles(App));
    const content = react_dom_server__WEBPACK_IMPORTED_MODULE_3___default.a.renderToString(JSX);
    const helmet = react_helmet__WEBPACK_IMPORTED_MODULE_11___default.a.renderStatic(); // Avoid memory leak while tracking mounted instances

    const htmlProps = {
      content,
      headElements: [...extractor.getScriptElements(), ...extractor.getLinkElements(), ...extractor.getStyleElements()],
      css: sheet.getStyleElement().map((el, idx) => el ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(el, {
        key: idx
      }) : el),
      helmet,
      state: _objectSpread({}, client.cache.extract())
    };
    res.send(`<!doctype html>\n${react_dom_server__WEBPACK_IMPORTED_MODULE_3___default.a.renderToStaticMarkup( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Html, htmlProps))}`);
    res.end();
  }
};

/* harmony default export */ __webpack_exports__["default"] = ((schema, modules) => async (req, res, next) => {
  try {
    if (req.path.indexOf('.') < 0 && true) {
      return await renderServerSide(req, res, schema, modules);
    } else if (req.path.indexOf('.') < 0 && !true && req.method === 'GET' && !true) {
      res.sendFile(path__WEBPACK_IMPORTED_MODULE_10___default.a.resolve('../client/build', 'index.html'));
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
});

/***/ }),

/***/ "../../node_modules/@bunker42/core-server/server.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverPromise", function() { return serverPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createServer", function() { return createServer; });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/core-common/index.ts");
/* harmony import */ var _api_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/core-server/api/schema.ts");
/* harmony import */ var _api_subscriptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/core-server/api/subscriptions.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@bunker42/core-server/app.ts");






let server;
const ref = {
  modules: null,
  resolve: null
};
const serverPromise = new Promise(resolve => ref.resolve = resolve);
const createServer = async (modules, entryModule) => {
  try {
    ref.modules = modules;

    if (entryModule.hot) {
      entryModule.hot.dispose(data => Object(_api_subscriptions__WEBPACK_IMPORTED_MODULE_3__["onAppDispose"])(modules, data));
      entryModule.hot.status(event => {
        if (event === 'abort' || event === 'fail') {
          console.error('HMR error status: ' + event); // Signal webpack.run.js to do full-reload of the back-end

          process.exit(250);
        }
      });
      entryModule.hot.accept();
    }

    if (!server || !entryModule.hot || !entryModule.hot.data) {
      server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer();
      const schema = Object(_api_schema__WEBPACK_IMPORTED_MODULE_2__["createSchema"])(modules);
      server.on('request', Object(_app__WEBPACK_IMPORTED_MODULE_4__["createServerApp"])(schema, modules));
      Object(_api_subscriptions__WEBPACK_IMPORTED_MODULE_3__["default"])(server, schema, modules);
      server.listen(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__["serverPort"], () => {
        _bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__["log"].info(`API is now running on port ${_bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__["serverPort"]}`);
        ref.resolve(server);
      });
      server.on('close', () => {
        server = undefined;
      });
    } else {
      const schema = Object(_api_schema__WEBPACK_IMPORTED_MODULE_2__["createSchema"])(ref.modules);
      server.removeAllListeners('request');
      server.on('request', Object(_app__WEBPACK_IMPORTED_MODULE_4__["createServerApp"])(schema, ref.modules));
      Object(_api_subscriptions__WEBPACK_IMPORTED_MODULE_3__["default"])(server, schema, ref.modules, entryModule);
    }
  } catch (e) {
    _bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__["log"].error(e);
  }
};

if (true) {
  module.hot.dispose(() => {
    // Shutdown server if changes to this module code are made
    // So that it was started afresh
    try {
      if (server) {
        server.close();
        server = undefined;
      }
    } catch (error) {
      Object(_bunker42_core_common__WEBPACK_IMPORTED_MODULE_1__["log"])(error.stack);
    }
  });
}

/***/ }),

/***/ "../../node_modules/@bunker42/database-server/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "knex", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["knex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populateTestDb", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["populateTestDb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTransaction", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["createTransaction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "returnId", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["returnId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "truncateTables", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["truncateTables"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "orderedFor", function() { return _sql__WEBPACK_IMPORTED_MODULE_0__["orderedFor"]; });



/***/ }),

/***/ "../../node_modules/@bunker42/database-server/knexdata.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "development", function() { return development; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "production", function() { return production; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test", function() { return test; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("glob");
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // This code gathers migrations and seeds from all modules into two fake directories
// /module-migrations - contains all the migrations from all modules
// /module-seeds - contains all the seeds from all modules
// This hack is needed because knex do not support multiple dirs for migrations and seeds
// at the moment. When knex will support multiple dirs for migrations and seeds this hack can be removed

const fs = __webpack_require__("fs");

const Module = __webpack_require__("module");

const modulesDir = path__WEBPACK_IMPORTED_MODULE_2__["isAbsolute"](__dirname) ? path__WEBPACK_IMPORTED_MODULE_2__["join"](__dirname, '../..') : path__WEBPACK_IMPORTED_MODULE_2__["resolve"]('../../modules');
const virtualDirs = {
  [path__WEBPACK_IMPORTED_MODULE_2__["resolve"]('/module-migrations')]: glob__WEBPACK_IMPORTED_MODULE_1__["sync"](path__WEBPACK_IMPORTED_MODULE_2__["join"](modulesDir, '**/migrations')),
  [path__WEBPACK_IMPORTED_MODULE_2__["resolve"]('/module-seeds')]: glob__WEBPACK_IMPORTED_MODULE_1__["sync"](path__WEBPACK_IMPORTED_MODULE_2__["join"](modulesDir, '**/seeds'))
};
const virtualFiles = {};
const realResolve = Module._resolveFilename;

Module._resolveFilename = function fakeResolve(request, parent) {
  const normRequest = request.replace(/\\/g, '/');

  if (virtualFiles[normRequest]) {
    return virtualFiles[normRequest];
  } else {
    const result = realResolve(request, parent);
    return result;
  }
};

for (const virtualDir of Object.keys(virtualDirs)) {
  const realDirs = virtualDirs[virtualDir];

  for (const realDir of realDirs) {
    const realFiles = fs.readdirSync(realDir);

    for (const file of realFiles) {
      virtualFiles[path__WEBPACK_IMPORTED_MODULE_2__["join"](virtualDir, file).replace(/\\/g, '/')] = path__WEBPACK_IMPORTED_MODULE_2__["join"](realDir, file);
    }
  }
}

const origReaddir = fs.readdir;

fs.readdir = function () {
  const path = arguments[0];

  if (virtualDirs[path]) {
    let files = [];

    for (const dir of virtualDirs[path]) {
      files = files.concat(fs.readdirSync(dir));
    }

    arguments[arguments.length == 2 ? 1 : 2](null, files);
  }

  origReaddir.apply(fs, arguments);
};

const envSettings = {
  ['development' || false]: _objectSpread(_objectSpread({}, _bunker42_config__WEBPACK_IMPORTED_MODULE_3__["default"].db), {}, {
    seeds: {
      directory: '/module-seeds' // fake dir created virtually by tools/knex

    },
    migrations: {
      directory: '/module-migrations' // fake dir created virtually by tools/knex

    },
    useNullAsDefault: true
  })
};
const development = envSettings.development;
const production = envSettings.production;
const test = envSettings.test;
/* WEBPACK VAR INJECTION */}.call(this, "..\\..\\node_modules\\@bunker42\\database-server"))

/***/ }),

/***/ "../../node_modules/@bunker42/database-server/sql/connector.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("knex");
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("objection");
/* harmony import */ var objection__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(objection__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _knexdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/database-server/knexdata.js");


 // eslint-disable-next-line import/namespace

const knexObj = knex__WEBPACK_IMPORTED_MODULE_0___default()(_knexdata__WEBPACK_IMPORTED_MODULE_2__['development' || false]); // Give the knex instance to objection.

objection__WEBPACK_IMPORTED_MODULE_1__["Model"].knex(knexObj);
/* harmony default export */ __webpack_exports__["default"] = (knexObj);

/***/ }),

/***/ "../../node_modules/@bunker42/database-server/sql/createTransaction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/index.ts");

/* harmony default export */ __webpack_exports__["default"] = (async () => new Promise(resolve => ___WEBPACK_IMPORTED_MODULE_0__["knex"].transaction(resolve)));

/***/ }),

/***/ "../../node_modules/@bunker42/database-server/sql/helpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnId", function() { return returnId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "truncateTables", function() { return truncateTables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderedFor", function() { return orderedFor; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bunker42_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/config/index.ts");


const returnId = knexTable => _bunker42_config__WEBPACK_IMPORTED_MODULE_1__["default"].db.client === 'sqlite3' ? knexTable : knexTable.returning('id');
const truncateTables = async (knex, Promise, tables) => {
  if (_bunker42_config__WEBPACK_IMPORTED_MODULE_1__["default"].db.client === 'sqlite3') {
    return Promise.all(tables.map(table => knex(table).truncate()));
  } else if (['mysql', 'mysql2'].indexOf(_bunker42_config__WEBPACK_IMPORTED_MODULE_1__["default"].db.client) >= 0) {
    return knex.transaction(async function (trx) {
      await knex.raw('SET FOREIGN_KEY_CHECKS=0').transacting(trx);
      await Promise.all(tables.map(table => knex.raw(`TRUNCATE TABLE ${table}`).transacting(trx)));
      await trx.commit;
      await knex.raw('SET FOREIGN_KEY_CHECKS=1').transacting(trx);
    });
  } else if (_bunker42_config__WEBPACK_IMPORTED_MODULE_1__["default"].db.client === 'pg') {
    return Promise.all(tables.map(table => knex.raw(`TRUNCATE "${table}" RESTART IDENTITY CASCADE`)));
  }
};
const orderedFor = (rows, collection, field, singleObject) => {
  // return the rows ordered for the collection
  const inGroupsOfField = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["groupBy"])(rows, field);
  return collection.map(element => {
    const elementArray = inGroupsOfField[element];

    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }

    return singleObject ? {} : [];
  });
};

/***/ }),

/***/ "../../node_modules/@bunker42/database-server/sql/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/connector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "knex", function() { return _connector__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _populateTestDb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/populateTestDb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populateTestDb", function() { return _populateTestDb__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _createTransaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/createTransaction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTransaction", function() { return _createTransaction__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "returnId", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["returnId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "truncateTables", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["truncateTables"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "orderedFor", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["orderedFor"]; });






/***/ }),

/***/ "../../node_modules/@bunker42/database-server/sql/populateTestDb.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/database-server/sql/connector.js");

/* harmony default export */ __webpack_exports__["default"] = (async () => {
  await _connector__WEBPACK_IMPORTED_MODULE_0__["default"].migrate.latest();
  return _connector__WEBPACK_IMPORTED_MODULE_0__["default"].seed.run();
});

/***/ }),

/***/ "../../node_modules/@bunker42/module-client/BaseModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bunker42_module_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/module-common/index.ts");



/**
 * Common module interface for React and React Native feature modules
 */

/**
 * Base module ancestor for React and React Native feature modules.
 */
class BaseModule extends _bunker42_module_common__WEBPACK_IMPORTED_MODULE_2__["GraphQLModule"] {
  /**
   * Constructs base module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    super(...modules);
  }
  /**
   * @returns Redux reducers
   */


  get reducers() {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["merge"])({}, ...(this.reducer || []));
  }
  /**
   *
   * @param root React tree data root component (first React root components which is used for fetching data)
   *
   * @returns React tree data root component wrapped up by data root components exposed by this module
   */


  getDataRoot(root) {
    let nestedRoot = root;

    for (const component of this.dataRootComponent || []) {
      nestedRoot = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(component, {}, nestedRoot);
    }

    return nestedRoot;
  }
  /**
   *
   * @param root React tree root component
   *
   * @returns React tree root component wrapped up by root components exposed by this module
   */


  getWrappedRoot(root, req) {
    let nestedRoot = root;

    for (const componentFactory of this.rootComponentFactory || []) {
      nestedRoot = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(componentFactory(req), {}, nestedRoot);
    }

    return nestedRoot;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (BaseModule);

/***/ }),

/***/ "../../node_modules/@bunker42/module-client/ClientModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-client/BaseModule.ts");


/**
 * React client feature modules interface.
 */

/**
 * React client feature module implementation.
 */
class ClientModule extends _BaseModule__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Constructs React client feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    super(...modules);
  }
  /**
   * @returns client-side React route components list
   */


  get routes() {
    return (this.route || []).map((component, idx, items) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(component, {
      key: component.key || idx + items.length
    }));
  }
  /**
   * @returns client-side top left navbar link component list
   */


  get navItems() {
    return (this.navItem || []).map((component, idx, items) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(component, {
      key: component.key || idx + items.length
    }));
  }
  /**
   * @returns client-side top right navbar link component list
   */


  get navItemsRight() {
    return (this.navItemRight || []).map((component, idx, items) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(component, {
      key: component.key || idx + items.length
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ClientModule);

/***/ }),

/***/ "../../node_modules/@bunker42/module-client/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-client/BaseModule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return _BaseModule__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _ClientModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-client/ClientModule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ClientModule__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* empty/unused harmony star reexport */




/***/ }),

/***/ "../../node_modules/@bunker42/module-common/CommonModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-common/Module.ts");

/**
 * Common ancestor for server and client feature modules interfaces.
 */

/**
 * Common ancestor for client and server feature modules.
 */
class CommonModule extends _Module__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * A constructor of common module, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    super(...modules);
  }
  /**
   * @returns localization for i18next library
   */


  get localizations() {
    return this.localization || [];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (CommonModule);

/***/ }),

/***/ "../../node_modules/@bunker42/module-common/GraphQLModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-common/CommonModule.ts");


/**
 * A function to create non-network Apollo Link that wraps in some way network link.
 * There can be multiple non-network links.
 *
 * @param getApolloClient a function that the link can call later to get instance of Apollo Client
 *
 * @returns Apollo Link instance
 */

/**
 * Common GraphQL client-side modules ancestor for feature modules of a GraphQL application.
 */
class GraphQLModule extends _CommonModule__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Constructs GraphQL feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    super(...modules);
  }
  /**
   * @returns Apollo Link State client-side resolvers
   */


  get resolvers() {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])({}, ...(this.resolver || []));
  }
  /**
   * @returns `subscription-transport-ws` WebSocket connection options
   */


  get connectionParams() {
    return this.connectionParam || [];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (GraphQLModule);

/***/ }),

/***/ "../../node_modules/@bunker42/module-common/Module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fractal_objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fractal-objects");
/* harmony import */ var fractal_objects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fractal_objects__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Interface that must be implemented by all the feature modules
 * in the application.
 *
 */

/**
 * This class implements `ModuleShape` interface.
 *
 * It is a very minimalistic feature module implementation, that
 * has only `createApp` function.
 */
class Module {
  /**
   * Constructs feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    Object(fractal_objects__WEBPACK_IMPORTED_MODULE_0__["foldTo"])(this, modules);
  }
  /**
   * Calls each feature module `onAppCreate` hook, with `module` object as a first argument
   * (see below) and the list of all the feature modules as a second argument,
   * extending this `ModuleShape` interface.
   *
   * In `onAppCreate` hook each module can initialize itself. Usually the `core` feature
   * module in `onAppCreate` hook initializes used framework and registers callbacks
   * exported by other feature modules. And then the framework calls these callbacks.
   *
   * @param entryModule a `module` object generated by Webpack for the very first entry javascript file
   *    of the application. Webpack exposes Webpack Hot Module Replacement API in `module.hot` for
   *    each javascript file. To have maximum control we need only entry file `module.hot` object.
   *    We use this API to quickly and properly reload application code after recompilation happens
   *    during development. `module.hot` is not available, when application code is built for
   *    production mode.
   */


  async createApp(entryModule) {
    if (this.onAppCreate) {
      for (const callback of this.onAppCreate) {
        await callback(this, entryModule);
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Module);

/***/ }),

/***/ "../../node_modules/@bunker42/module-common/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-common/CommonModule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CommonModule__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport *//* harmony import */ var _GraphQLModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-common/GraphQLModule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQLModule", function() { return _GraphQLModule__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* empty/unused harmony star reexport */




/***/ }),

/***/ "../../node_modules/@bunker42/module-server/ServerModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bunker42_module_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-common/index.ts");



/**
 * A class that represents server-side feature module
 *
 * An instance of this class is exported by each Node backend feature module
 */
class ServerModule extends _bunker42_module_common__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Constructs backend Node feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules) {
    super(...modules);
  }
  /**
   * @returns list of GraphQL schemas exported by the feature module represented by this class
   */


  get schemas() {
    return this.schema || [];
  }
  /**
   * Creates GraphQL context for this module
   *
   * @param req HTTP request
   * @param res HTTP response
   * @param connectionParams `subscriptions-transport-ws` webSocket connnection params
   * @param webSocket WebSockets implementation
   *
   * @returns GraphQL context
   */


  async createContext(req, res, connectionParams, webSocket) {
    const appContext = this.appContext;
    let graphqlContext = {};

    for (const createContextFunc of this.createContextFunc || []) {
      graphqlContext = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])(graphqlContext, await createContextFunc({
        req,
        res,
        connectionParams,
        webSocket,
        graphqlContext,
        appContext
      }));
    }

    return graphqlContext;
  }
  /**
   * Creates GraphQL resolvers exported by this module.
   *
   * @param pubsub Publish subscribe engine for GraphQL subscriptions
   *
   * @returns GraphQL resolvers
   */


  createResolvers(pubsub) {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])({}, ...(this.createResolversFunc.map(createResolvers => createResolvers(pubsub)) || []));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ServerModule);

/***/ }),

/***/ "../../node_modules/@bunker42/module-server/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ServerModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-server/ServerModule.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ServerModule__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */


/***/ }),

/***/ "../../node_modules/@bunker42/post-server/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_module_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/module-server/index.ts");
/* harmony import */ var _sql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/post-server/sql.ts");
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/post-server/schema.graphql");
/* harmony import */ var _schema_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_schema_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@bunker42/post-server/resolvers.ts");




/* harmony default export */ __webpack_exports__["default"] = (new _bunker42_module_server__WEBPACK_IMPORTED_MODULE_0__["default"]({
  schema: [_schema_graphql__WEBPACK_IMPORTED_MODULE_2___default.a],
  createResolversFunc: [_resolvers__WEBPACK_IMPORTED_MODULE_3__["default"]],
  createContextFunc: [() => ({
    Post: new _sql__WEBPACK_IMPORTED_MODULE_1__["default"]()
  })]
}));

/***/ }),

/***/ "../../node_modules/@bunker42/post-server/resolvers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql-subscriptions");
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_resolve_batch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql-resolve-batch");
/* harmony import */ var graphql_resolve_batch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_resolve_batch__WEBPACK_IMPORTED_MODULE_2__);


 // interfaces

const POST_SUBSCRIPTION = 'post_subscription';
const POSTS_SUBSCRIPTION = 'posts_subscription';
const COMMENT_SUBSCRIPTION = 'comment_subscription';
/* harmony default export */ __webpack_exports__["default"] = (pubsub => ({
  Query: {
    async posts(obj, {
      limit,
      after
    }, context) {
      const edgesArray = [];
      const posts = await context.Post.postsPagination(limit, after);
      const total = (await context.Post.getTotal()).count;
      const hasNextPage = total > after + limit;
      posts.map((post, index) => {
        edgesArray.push({
          cursor: after + index,
          node: post
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    },

    post(obj, {
      id
    }, context) {
      return context.Post.post(id);
    }

  },
  Post: {
    comments: Object(graphql_resolve_batch__WEBPACK_IMPORTED_MODULE_2__["createBatchResolver"])((sources, args, context) => {
      return context.Post.getCommentsForPostIds(sources.map(({
        id
      }) => id));
    })
  },
  Mutation: {
    async addPost(obj, {
      input
    }, context) {
      const _await$context$Post$a = await context.Post.addPost(input),
            _await$context$Post$a2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_await$context$Post$a, 1),
            id = _await$context$Post$a2[0];

      const post = await context.Post.post(id); // publish for post list

      pubsub.publish(POSTS_SUBSCRIPTION, {
        postsUpdated: {
          mutation: 'CREATED',
          id,
          node: post
        }
      });
      return post;
    },

    async deletePost(obj, {
      id
    }, context) {
      const post = await context.Post.post(id);
      const isDeleted = await context.Post.deletePost(id);

      if (isDeleted) {
        // publish for post list
        pubsub.publish(POSTS_SUBSCRIPTION, {
          postsUpdated: {
            mutation: 'DELETED',
            id,
            node: post
          }
        }); // publish for edit post page

        pubsub.publish(POST_SUBSCRIPTION, {
          postUpdated: {
            mutation: 'DELETED',
            id,
            node: post
          }
        });
        return {
          id: post.id
        };
      } else {
        return {
          id: null
        };
      }
    },

    async editPost(obj, {
      input
    }, context) {
      await context.Post.editPost(input);
      const post = await context.Post.post(input.id); // publish for post list

      pubsub.publish(POSTS_SUBSCRIPTION, {
        postsUpdated: {
          mutation: 'UPDATED',
          id: post.id,
          node: post
        }
      }); // publish for edit post page

      pubsub.publish(POST_SUBSCRIPTION, {
        postUpdated: {
          mutation: 'UPDATED',
          id: post.id,
          node: post
        }
      });
      return post;
    },

    async addComment(obj, {
      input
    }, context) {
      const _await$context$Post$a3 = await context.Post.addComment(input),
            _await$context$Post$a4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_await$context$Post$a3, 1),
            id = _await$context$Post$a4[0];

      const comment = await context.Post.getComment(id); // publish for edit post page

      pubsub.publish(COMMENT_SUBSCRIPTION, {
        commentUpdated: {
          mutation: 'CREATED',
          id: comment.id,
          postId: input.postId,
          node: comment
        }
      });
      return comment;
    },

    async deleteComment(obj, {
      input: {
        id,
        postId
      }
    }, context) {
      await context.Post.deleteComment(id); // publish for edit post page

      pubsub.publish(COMMENT_SUBSCRIPTION, {
        commentUpdated: {
          mutation: 'DELETED',
          id,
          postId,
          node: null
        }
      });
      return {
        id
      };
    },

    async editComment(obj, {
      input
    }, context) {
      await context.Post.editComment(input);
      const comment = await context.Post.getComment(input.id); // publish for edit post page

      pubsub.publish(COMMENT_SUBSCRIPTION, {
        commentUpdated: {
          mutation: 'UPDATED',
          id: input.id,
          postId: input.postId,
          node: comment
        }
      });
      return comment;
    }

  },
  Subscription: {
    postUpdated: {
      subscribe: Object(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["withFilter"])(() => pubsub.asyncIterator(POST_SUBSCRIPTION), (payload, variables) => {
        return payload.postUpdated.id === variables.id;
      })
    },
    postsUpdated: {
      subscribe: Object(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["withFilter"])(() => pubsub.asyncIterator(POSTS_SUBSCRIPTION), (payload, variables) => {
        return variables.endCursor <= payload.postsUpdated.id;
      })
    },
    commentUpdated: {
      subscribe: Object(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["withFilter"])(() => pubsub.asyncIterator(COMMENT_SUBSCRIPTION), (payload, variables) => {
        return payload.commentUpdated.postId === variables.postId;
      })
    }
  }
}));

/***/ }),

/***/ "../../node_modules/@bunker42/post-server/schema.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Post"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"comments"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Comment"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PostEdges"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PostPageInfo"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"endCursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"hasNextPage"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Posts"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalCount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostEdges"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PostPageInfo"}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"limit"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Posts"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPostInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"editPost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditPostInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCommentInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCommentInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditCommentInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"AddPostInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"content"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"EditPostInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"content"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"AddCommentInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"content"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"DeleteCommentInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"EditCommentInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"content"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"postUpdated"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostPayload"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"postsUpdated"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"endCursor"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostPayload"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"commentUpdated"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentPayload"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UpdatePostPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UpdateCommentPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"postId"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[]}]}],"loc":{"start":0,"end":2202}};
    doc.loc.source = {"body":"# Post\r\ntype Post {\r\n  id: Int!\r\n  title: String!\r\n  content: String!\r\n  comments: [Comment]\r\n}\r\n\r\n# Comment\r\ntype Comment {\r\n  id: Int!\r\n  content: String!\r\n}\r\n\r\n# Edges for Posts\r\ntype PostEdges {\r\n  node: Post\r\n  cursor: Int\r\n}\r\n\r\n# PageInfo for Posts\r\ntype PostPageInfo {\r\n  endCursor: Int\r\n  hasNextPage: Boolean\r\n}\r\n\r\n# Posts relay-style pagination query\r\ntype Posts {\r\n  totalCount: Int\r\n  edges: [PostEdges]\r\n  pageInfo: PostPageInfo\r\n}\r\n\r\nextend type Query {\r\n  # Posts pagination query\r\n  posts(limit: Int, after: Int): Posts\r\n  # Post\r\n  post(id: Int!): Post\r\n}\r\n\r\nextend type Mutation {\r\n  # Create new post\r\n  addPost(input: AddPostInput!): Post\r\n  # Delete a post\r\n  deletePost(id: Int!): Post\r\n  # Edit a post\r\n  editPost(input: EditPostInput!): Post\r\n  # Add comment to post\r\n  addComment(input: AddCommentInput!): Comment\r\n  # Delete a comment\r\n  deleteComment(input: DeleteCommentInput!): Comment\r\n  # Edit a comment\r\n  editComment(input: EditCommentInput!): Comment\r\n}\r\n\r\n# Input for addPost Mutation\r\ninput AddPostInput {\r\n  title: String!\r\n  content: String!\r\n}\r\n\r\n# Input for editPost Mutation\r\ninput EditPostInput {\r\n  id: Int!\r\n  title: String!\r\n  content: String!\r\n}\r\n\r\n# Input for addComment Mutation\r\ninput AddCommentInput {\r\n  content: String!\r\n  # Needed for commentUpdated Subscription filter\r\n  postId: Int!\r\n}\r\n\r\n# Input for editComment Mutation\r\ninput DeleteCommentInput {\r\n  id: Int!\r\n  # Needed for commentUpdated Subscription filter\r\n  postId: Int!\r\n}\r\n\r\n# Input for deleteComment Mutation\r\ninput EditCommentInput {\r\n  id: Int!\r\n  content: String!\r\n  # Needed for commentUpdated Subscription filter\r\n  postId: Int!\r\n}\r\n\r\nextend type Subscription {\r\n  # Subscription for when editing a post\r\n  postUpdated(id: Int!): UpdatePostPayload\r\n  # Subscription for post list\r\n  postsUpdated(endCursor: Int!): UpdatePostPayload\r\n  # Subscription for comments\r\n  commentUpdated(postId: Int!): UpdateCommentPayload\r\n}\r\n\r\n# Payload for postsUpdated Subscription\r\ntype UpdatePostPayload {\r\n  mutation: String!\r\n  id: Int!\r\n  node: Post\r\n}\r\n\r\n# Payload for commentUpdated Subscription\r\ntype UpdateCommentPayload {\r\n  mutation: String!\r\n  id: Int\r\n  postId: Int!\r\n  node: Comment\r\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "../../node_modules/@bunker42/post-server/sql.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostDAO; });
/* harmony import */ var _bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/database-server/index.ts");

class PostDAO {
  postsPagination(limit, after) {
    return _bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"].select('id', 'title', 'content').from('post').orderBy('id', 'desc').limit(limit).offset(after);
  }

  async getCommentsForPostIds(postIds) {
    const res = await _bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"].select('id', 'content', 'post_id AS postId').from('comment').whereIn('post_id', postIds);
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["orderedFor"])(res, postIds, 'postId', false);
  }

  getTotal() {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('post').countDistinct('id as count').first();
  }

  post(id) {
    return _bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"].select('id', 'title', 'content').from('post').where('id', '=', id).first();
  }

  addPost(params) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["returnId"])(Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('post')).insert(params);
  }

  deletePost(id) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('post').where('id', '=', id).del();
  }

  editPost({
    id,
    title,
    content
  }) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('post').where('id', '=', id).update({
      title,
      content
    });
  }

  addComment({
    content,
    postId
  }) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["returnId"])(Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('comment')).insert({
      content,
      post_id: postId
    });
  }

  getComment(id) {
    return _bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"].select('id', 'content').from('comment').where('id', '=', id).first();
  }

  deleteComment(id) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('comment').where('id', '=', id).del();
  }

  editComment({
    id,
    content
  }) {
    return Object(_bunker42_database_server__WEBPACK_IMPORTED_MODULE_0__["knex"])('comment').where('id', '=', id).update({
      content
    });
  }

}

/***/ }),

/***/ "../../node_modules/apollo-client/bundle.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloClient", function() { return ApolloClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApolloError", function() { return ApolloError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchType", function() { return FetchType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkStatus", function() { return NetworkStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableQuery", function() { return ObservableQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApolloError", function() { return isApolloError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("apollo-utilities");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("apollo-link");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("symbol-observable");
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(symbol_observable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ts-invariant");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ts_invariant__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("graphql/language/visitor");
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__);






var NetworkStatus;

(function (NetworkStatus) {
  NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
  NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
  NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
  NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
  NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
  NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
  NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));

function isNetworkRequestInFlight(networkStatus) {
  return networkStatus < 7;
}

var Observable = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Observable, _super);

  function Observable() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Observable.prototype[symbol_observable__WEBPACK_IMPORTED_MODULE_3___default.a] = function () {
    return this;
  };

  Observable.prototype['@@observable'] = function () {
    return this;
  };

  return Observable;
}(apollo_link__WEBPACK_IMPORTED_MODULE_2__["Observable"]);

function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function isApolloError(err) {
  return err.hasOwnProperty('graphQLErrors');
}

var generateErrorMessage = function (err) {
  var message = '';

  if (isNonEmptyArray(err.graphQLErrors)) {
    err.graphQLErrors.forEach(function (graphQLError) {
      var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
      message += "GraphQL error: " + errorMessage + "\n";
    });
  }

  if (err.networkError) {
    message += 'Network error: ' + err.networkError.message + '\n';
  }

  message = message.replace(/\n$/, '');
  return message;
};

var ApolloError = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ApolloError, _super);

  function ApolloError(_a) {
    var graphQLErrors = _a.graphQLErrors,
        networkError = _a.networkError,
        errorMessage = _a.errorMessage,
        extraInfo = _a.extraInfo;

    var _this = _super.call(this, errorMessage) || this;

    _this.graphQLErrors = graphQLErrors || [];
    _this.networkError = networkError || null;

    if (!errorMessage) {
      _this.message = generateErrorMessage(_this);
    } else {
      _this.message = errorMessage;
    }

    _this.extraInfo = extraInfo;
    _this.__proto__ = ApolloError.prototype;
    return _this;
  }

  return ApolloError;
}(Error);

var FetchType;

(function (FetchType) {
  FetchType[FetchType["normal"] = 1] = "normal";
  FetchType[FetchType["refetch"] = 2] = "refetch";
  FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));

var hasError = function (storeValue, policy) {
  if (policy === void 0) {
    policy = 'none';
  }

  return storeValue && (storeValue.networkError || policy === 'none' && isNonEmptyArray(storeValue.graphQLErrors));
};

var ObservableQuery = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ObservableQuery, _super);

  function ObservableQuery(_a) {
    var queryManager = _a.queryManager,
        options = _a.options,
        _b = _a.shouldSubscribe,
        shouldSubscribe = _b === void 0 ? true : _b;

    var _this = _super.call(this, function (observer) {
      return _this.onSubscribe(observer);
    }) || this;

    _this.observers = new Set();
    _this.subscriptions = new Set();
    _this.isTornDown = false;
    _this.options = options;
    _this.variables = options.variables || {};
    _this.queryId = queryManager.generateQueryId();
    _this.shouldSubscribe = shouldSubscribe;
    var opDef = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationDefinition"])(options.query);
    _this.queryName = opDef && opDef.name && opDef.name.value;
    _this.queryManager = queryManager;
    return _this;
  }

  ObservableQuery.prototype.result = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var observer = {
        next: function (result) {
          resolve(result);

          _this.observers.delete(observer);

          if (!_this.observers.size) {
            _this.queryManager.removeQuery(_this.queryId);
          }

          setTimeout(function () {
            subscription.unsubscribe();
          }, 0);
        },
        error: reject
      };

      var subscription = _this.subscribe(observer);
    });
  };

  ObservableQuery.prototype.currentResult = function () {
    var result = this.getCurrentResult();

    if (result.data === undefined) {
      result.data = {};
    }

    return result;
  };

  ObservableQuery.prototype.getCurrentResult = function () {
    if (this.isTornDown) {
      var lastResult = this.lastResult;
      return {
        data: !this.lastError && lastResult && lastResult.data || void 0,
        error: this.lastError,
        loading: false,
        networkStatus: NetworkStatus.error
      };
    }

    var _a = this.queryManager.getCurrentQueryResult(this),
        data = _a.data,
        partial = _a.partial;

    var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
    var result;
    var fetchPolicy = this.options.fetchPolicy;
    var isNetworkFetchPolicy = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';

    if (queryStoreValue) {
      var networkStatus = queryStoreValue.networkStatus;

      if (hasError(queryStoreValue, this.options.errorPolicy)) {
        return {
          data: void 0,
          loading: false,
          networkStatus: networkStatus,
          error: new ApolloError({
            graphQLErrors: queryStoreValue.graphQLErrors,
            networkError: queryStoreValue.networkError
          })
        };
      }

      if (queryStoreValue.variables) {
        this.options.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options.variables), queryStoreValue.variables);
        this.variables = this.options.variables;
      }

      result = {
        data: data,
        loading: isNetworkRequestInFlight(networkStatus),
        networkStatus: networkStatus
      };

      if (queryStoreValue.graphQLErrors && this.options.errorPolicy === 'all') {
        result.errors = queryStoreValue.graphQLErrors;
      }
    } else {
      var loading = isNetworkFetchPolicy || partial && fetchPolicy !== 'cache-only';
      result = {
        data: data,
        loading: loading,
        networkStatus: loading ? NetworkStatus.loading : NetworkStatus.ready
      };
    }

    if (!partial) {
      this.updateLastResult(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), {
        stale: false
      }));
    }

    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), {
      partial: partial
    });
  };

  ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
    var snapshot = this.lastResultSnapshot;
    return !(snapshot && newResult && snapshot.networkStatus === newResult.networkStatus && snapshot.stale === newResult.stale && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(snapshot.data, newResult.data));
  };

  ObservableQuery.prototype.getLastResult = function () {
    return this.lastResult;
  };

  ObservableQuery.prototype.getLastError = function () {
    return this.lastError;
  };

  ObservableQuery.prototype.resetLastResults = function () {
    delete this.lastResult;
    delete this.lastResultSnapshot;
    delete this.lastError;
    this.isTornDown = false;
  };

  ObservableQuery.prototype.resetQueryStoreErrors = function () {
    var queryStore = this.queryManager.queryStore.get(this.queryId);

    if (queryStore) {
      queryStore.networkError = null;
      queryStore.graphQLErrors = [];
    }
  };

  ObservableQuery.prototype.refetch = function (variables) {
    var fetchPolicy = this.options.fetchPolicy;

    if (fetchPolicy === 'cache-only') {
      return Promise.reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('cache-only fetchPolicy option should not be used together with query refetch.'));
    }

    if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'cache-and-network') {
      fetchPolicy = 'network-only';
    }

    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(this.variables, variables)) {
      this.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.variables), variables);
    }

    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(this.options.variables, this.variables)) {
      this.options.variables = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options.variables), this.variables);
    }

    return this.queryManager.fetchQuery(this.queryId, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), {
      fetchPolicy: fetchPolicy
    }), FetchType.refetch);
  };

  ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
    var _this = this;

     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fetchMoreOptions.updateQuery, 'updateQuery option is required. This function defines how to update the query data with the new results.');

    var combinedOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, fetchMoreOptions.query ? fetchMoreOptions : Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), fetchMoreOptions), {
      variables: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.variables), fetchMoreOptions.variables)
    })), {
      fetchPolicy: 'network-only'
    });

    var qid = this.queryManager.generateQueryId();
    return this.queryManager.fetchQuery(qid, combinedOptions, FetchType.normal, this.queryId).then(function (fetchMoreResult) {
      _this.updateQuery(function (previousResult) {
        return fetchMoreOptions.updateQuery(previousResult, {
          fetchMoreResult: fetchMoreResult.data,
          variables: combinedOptions.variables
        });
      });

      _this.queryManager.stopQuery(qid);

      return fetchMoreResult;
    }, function (error) {
      _this.queryManager.stopQuery(qid);

      throw error;
    });
  };

  ObservableQuery.prototype.subscribeToMore = function (options) {
    var _this = this;

    var subscription = this.queryManager.startGraphQLSubscription({
      query: options.document,
      variables: options.variables
    }).subscribe({
      next: function (subscriptionData) {
        var updateQuery = options.updateQuery;

        if (updateQuery) {
          _this.updateQuery(function (previous, _a) {
            var variables = _a.variables;
            return updateQuery(previous, {
              subscriptionData: subscriptionData,
              variables: variables
            });
          });
        }
      },
      error: function (err) {
        if (options.onError) {
          options.onError(err);
          return;
        }

         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('Unhandled GraphQL subscription error', err);
      }
    });
    this.subscriptions.add(subscription);
    return function () {
      if (_this.subscriptions.delete(subscription)) {
        subscription.unsubscribe();
      }
    };
  };

  ObservableQuery.prototype.setOptions = function (opts) {
    var oldFetchPolicy = this.options.fetchPolicy;
    this.options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), opts);

    if (opts.pollInterval) {
      this.startPolling(opts.pollInterval);
    } else if (opts.pollInterval === 0) {
      this.stopPolling();
    }

    var fetchPolicy = opts.fetchPolicy;
    return this.setVariables(this.options.variables, oldFetchPolicy !== fetchPolicy && (oldFetchPolicy === 'cache-only' || oldFetchPolicy === 'standby' || fetchPolicy === 'network-only'), opts.fetchResults);
  };

  ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
    if (tryFetch === void 0) {
      tryFetch = false;
    }

    if (fetchResults === void 0) {
      fetchResults = true;
    }

    this.isTornDown = false;
    variables = variables || this.variables;

    if (!tryFetch && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(variables, this.variables)) {
      return this.observers.size && fetchResults ? this.result() : Promise.resolve();
    }

    this.variables = this.options.variables = variables;

    if (!this.observers.size) {
      return Promise.resolve();
    }

    return this.queryManager.fetchQuery(this.queryId, this.options);
  };

  ObservableQuery.prototype.updateQuery = function (mapFn) {
    var queryManager = this.queryManager;

    var _a = queryManager.getQueryWithPreviousResult(this.queryId),
        previousResult = _a.previousResult,
        variables = _a.variables,
        document = _a.document;

    var newResult = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () {
      return mapFn(previousResult, {
        variables: variables
      });
    });

    if (newResult) {
      queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
      queryManager.broadcastQueries();
    }
  };

  ObservableQuery.prototype.stopPolling = function () {
    this.queryManager.stopPollingQuery(this.queryId);
    this.options.pollInterval = undefined;
  };

  ObservableQuery.prototype.startPolling = function (pollInterval) {
    assertNotCacheFirstOrOnly(this);
    this.options.pollInterval = pollInterval;
    this.queryManager.startPollingQuery(this.options, this.queryId);
  };

  ObservableQuery.prototype.updateLastResult = function (newResult) {
    var previousResult = this.lastResult;
    this.lastResult = newResult;
    this.lastResultSnapshot = this.queryManager.assumeImmutableResults ? newResult : Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(newResult);
    return previousResult;
  };

  ObservableQuery.prototype.onSubscribe = function (observer) {
    var _this = this;

    try {
      var subObserver = observer._subscription._observer;

      if (subObserver && !subObserver.error) {
        subObserver.error = defaultSubscriptionObserverErrorCallback;
      }
    } catch (_a) {}

    var first = !this.observers.size;
    this.observers.add(observer);
    if (observer.next && this.lastResult) observer.next(this.lastResult);
    if (observer.error && this.lastError) observer.error(this.lastError);

    if (first) {
      this.setUpQuery();
    }

    return function () {
      if (_this.observers.delete(observer) && !_this.observers.size) {
        _this.tearDownQuery();
      }
    };
  };

  ObservableQuery.prototype.setUpQuery = function () {
    var _this = this;

    var _a = this,
        queryManager = _a.queryManager,
        queryId = _a.queryId;

    if (this.shouldSubscribe) {
      queryManager.addObservableQuery(queryId, this);
    }

    if (this.options.pollInterval) {
      assertNotCacheFirstOrOnly(this);
      queryManager.startPollingQuery(this.options, queryId);
    }

    var onError = function (error) {
      _this.updateLastResult(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.lastResult), {
        errors: error.graphQLErrors,
        networkStatus: NetworkStatus.error,
        loading: false
      }));

      iterateObserversSafely(_this.observers, 'error', _this.lastError = error);
    };

    queryManager.observeQuery(queryId, this.options, {
      next: function (result) {
        if (_this.lastError || _this.isDifferentFromLastResult(result)) {
          var previousResult_1 = _this.updateLastResult(result);

          var _a = _this.options,
              query_1 = _a.query,
              variables = _a.variables,
              fetchPolicy_1 = _a.fetchPolicy;

          if (queryManager.transform(query_1).hasClientExports) {
            queryManager.getLocalState().addExportedVariables(query_1, variables).then(function (variables) {
              var previousVariables = _this.variables;
              _this.variables = _this.options.variables = variables;

              if (!result.loading && previousResult_1 && fetchPolicy_1 !== 'cache-only' && queryManager.transform(query_1).serverQuery && !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousVariables, variables)) {
                _this.refetch();
              } else {
                iterateObserversSafely(_this.observers, 'next', result);
              }
            });
          } else {
            iterateObserversSafely(_this.observers, 'next', result);
          }
        }
      },
      error: onError
    }).catch(onError);
  };

  ObservableQuery.prototype.tearDownQuery = function () {
    var queryManager = this.queryManager;
    this.isTornDown = true;
    queryManager.stopPollingQuery(this.queryId);
    this.subscriptions.forEach(function (sub) {
      return sub.unsubscribe();
    });
    this.subscriptions.clear();
    queryManager.removeObservableQuery(this.queryId);
    queryManager.stopQuery(this.queryId);
    this.observers.clear();
  };

  return ObservableQuery;
}(Observable);

function defaultSubscriptionObserverErrorCallback(error) {
   false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error('Unhandled error', error.message, error.stack);
}

function iterateObserversSafely(observers, method, argument) {
  var observersWithMethod = [];
  observers.forEach(function (obs) {
    return obs[method] && observersWithMethod.push(obs);
  });
  observersWithMethod.forEach(function (obs) {
    return obs[method](argument);
  });
}

function assertNotCacheFirstOrOnly(obsQuery) {
  var fetchPolicy = obsQuery.options.fetchPolicy;
   false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fetchPolicy !== 'cache-first' && fetchPolicy !== 'cache-only', 'Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
}

var MutationStore = function () {
  function MutationStore() {
    this.store = {};
  }

  MutationStore.prototype.getStore = function () {
    return this.store;
  };

  MutationStore.prototype.get = function (mutationId) {
    return this.store[mutationId];
  };

  MutationStore.prototype.initMutation = function (mutationId, mutation, variables) {
    this.store[mutationId] = {
      mutation: mutation,
      variables: variables || {},
      loading: true,
      error: null
    };
  };

  MutationStore.prototype.markMutationError = function (mutationId, error) {
    var mutation = this.store[mutationId];

    if (mutation) {
      mutation.loading = false;
      mutation.error = error;
    }
  };

  MutationStore.prototype.markMutationResult = function (mutationId) {
    var mutation = this.store[mutationId];

    if (mutation) {
      mutation.loading = false;
      mutation.error = null;
    }
  };

  MutationStore.prototype.reset = function () {
    this.store = {};
  };

  return MutationStore;
}();

var QueryStore = function () {
  function QueryStore() {
    this.store = {};
  }

  QueryStore.prototype.getStore = function () {
    return this.store;
  };

  QueryStore.prototype.get = function (queryId) {
    return this.store[queryId];
  };

  QueryStore.prototype.initQuery = function (query) {
    var previousQuery = this.store[query.queryId];
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!previousQuery || previousQuery.document === query.document || Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousQuery.document, query.document), 'Internal Error: may not update existing query string in store');
    var isSetVariables = false;
    var previousVariables = null;

    if (query.storePreviousVariables && previousQuery && previousQuery.networkStatus !== NetworkStatus.loading) {
      if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isEqual"])(previousQuery.variables, query.variables)) {
        isSetVariables = true;
        previousVariables = previousQuery.variables;
      }
    }

    var networkStatus;

    if (isSetVariables) {
      networkStatus = NetworkStatus.setVariables;
    } else if (query.isPoll) {
      networkStatus = NetworkStatus.poll;
    } else if (query.isRefetch) {
      networkStatus = NetworkStatus.refetch;
    } else {
      networkStatus = NetworkStatus.loading;
    }

    var graphQLErrors = [];

    if (previousQuery && previousQuery.graphQLErrors) {
      graphQLErrors = previousQuery.graphQLErrors;
    }

    this.store[query.queryId] = {
      document: query.document,
      variables: query.variables,
      previousVariables: previousVariables,
      networkError: null,
      graphQLErrors: graphQLErrors,
      networkStatus: networkStatus,
      metadata: query.metadata
    };

    if (typeof query.fetchMoreForQueryId === 'string' && this.store[query.fetchMoreForQueryId]) {
      this.store[query.fetchMoreForQueryId].networkStatus = NetworkStatus.fetchMore;
    }
  };

  QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
    if (!this.store || !this.store[queryId]) return;
    this.store[queryId].networkError = null;
    this.store[queryId].graphQLErrors = isNonEmptyArray(result.errors) ? result.errors : [];
    this.store[queryId].previousVariables = null;
    this.store[queryId].networkStatus = NetworkStatus.ready;

    if (typeof fetchMoreForQueryId === 'string' && this.store[fetchMoreForQueryId]) {
      this.store[fetchMoreForQueryId].networkStatus = NetworkStatus.ready;
    }
  };

  QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
    if (!this.store || !this.store[queryId]) return;
    this.store[queryId].networkError = error;
    this.store[queryId].networkStatus = NetworkStatus.error;

    if (typeof fetchMoreForQueryId === 'string') {
      this.markQueryResultClient(fetchMoreForQueryId, true);
    }
  };

  QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
    var storeValue = this.store && this.store[queryId];

    if (storeValue) {
      storeValue.networkError = null;
      storeValue.previousVariables = null;

      if (complete) {
        storeValue.networkStatus = NetworkStatus.ready;
      }
    }
  };

  QueryStore.prototype.stopQuery = function (queryId) {
    delete this.store[queryId];
  };

  QueryStore.prototype.reset = function (observableQueryIds) {
    var _this = this;

    Object.keys(this.store).forEach(function (queryId) {
      if (observableQueryIds.indexOf(queryId) < 0) {
        _this.stopQuery(queryId);
      } else {
        _this.store[queryId].networkStatus = NetworkStatus.loading;
      }
    });
  };

  return QueryStore;
}();

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var LocalState = function () {
  function LocalState(_a) {
    var cache = _a.cache,
        client = _a.client,
        resolvers = _a.resolvers,
        fragmentMatcher = _a.fragmentMatcher;
    this.cache = cache;

    if (client) {
      this.client = client;
    }

    if (resolvers) {
      this.addResolvers(resolvers);
    }

    if (fragmentMatcher) {
      this.setFragmentMatcher(fragmentMatcher);
    }
  }

  LocalState.prototype.addResolvers = function (resolvers) {
    var _this = this;

    this.resolvers = this.resolvers || {};

    if (Array.isArray(resolvers)) {
      resolvers.forEach(function (resolverGroup) {
        _this.resolvers = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeep"])(_this.resolvers, resolverGroup);
      });
    } else {
      this.resolvers = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeep"])(this.resolvers, resolvers);
    }
  };

  LocalState.prototype.setResolvers = function (resolvers) {
    this.resolvers = {};
    this.addResolvers(resolvers);
  };

  LocalState.prototype.getResolvers = function () {
    return this.resolvers || {};
  };

  LocalState.prototype.runResolvers = function (_a) {
    var document = _a.document,
        remoteResult = _a.remoteResult,
        context = _a.context,
        variables = _a.variables,
        _b = _a.onlyRunForcedResolvers,
        onlyRunForcedResolvers = _b === void 0 ? false : _b;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
        if (document) {
          return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, remoteResult), {
              data: localResult.result
            });
          })];
        }

        return [2, remoteResult];
      });
    });
  };

  LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
    this.fragmentMatcher = fragmentMatcher;
  };

  LocalState.prototype.getFragmentMatcher = function () {
    return this.fragmentMatcher;
  };

  LocalState.prototype.clientQuery = function (document) {
    if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasDirectives"])(['client'], document)) {
      if (this.resolvers) {
        return document;
      }

       false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('Found @client directives in a query but no ApolloClient resolvers ' + 'were specified. This means ApolloClient local resolver handling ' + 'has been disabled, and @client directives will be passed through ' + 'to your link chain.');
    }

    return null;
  };

  LocalState.prototype.serverQuery = function (document) {
    return this.resolvers ? Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["removeClientSetsFromDocument"])(document) : document;
  };

  LocalState.prototype.prepareContext = function (context) {
    if (context === void 0) {
      context = {};
    }

    var cache = this.cache;

    var newContext = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), {
      cache: cache,
      getCacheKey: function (obj) {
        if (cache.config) {
          return cache.config.dataIdFromObject(obj);
        } else {
           false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(false, 'To use context.getCacheKey, you need to use a cache that has ' + 'a configurable dataIdFromObject, like apollo-cache-inmemory.');
        }
      }
    });

    return newContext;
  };

  LocalState.prototype.addExportedVariables = function (document, variables, context) {
    if (variables === void 0) {
      variables = {};
    }

    if (context === void 0) {
      context = {};
    }

    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        if (document) {
          return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, variables), data.exportedVariables);
          })];
        }

        return [2, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, variables)];
      });
    });
  };

  LocalState.prototype.shouldForceResolvers = function (document) {
    var forceResolvers = false;
    Object(graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__["visit"])(document, {
      Directive: {
        enter: function (node) {
          if (node.name.value === 'client' && node.arguments) {
            forceResolvers = node.arguments.some(function (arg) {
              return arg.name.value === 'always' && arg.value.kind === 'BooleanValue' && arg.value.value === true;
            });

            if (forceResolvers) {
              return graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__["BREAK"];
            }
          }
        }
      }
    });
    return forceResolvers;
  };

  LocalState.prototype.buildRootValueFromCache = function (document, variables) {
    return this.cache.diff({
      query: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["buildQueryFromSelectionSet"])(document),
      variables: variables,
      returnPartialData: true,
      optimistic: false
    }).result;
  };

  LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
    if (context === void 0) {
      context = {};
    }

    if (variables === void 0) {
      variables = {};
    }

    if (fragmentMatcher === void 0) {
      fragmentMatcher = function () {
        return true;
      };
    }

    if (onlyRunForcedResolvers === void 0) {
      onlyRunForcedResolvers = false;
    }

    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        mainDefinition = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getMainDefinition"])(document);
        fragments = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getFragmentDefinitions"])(document);
        fragmentMap = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["createFragmentMap"])(fragments);
        definitionOperation = mainDefinition.operation;
        defaultOperationType = definitionOperation ? capitalizeFirstLetter(definitionOperation) : 'Query';
        _a = this, cache = _a.cache, client = _a.client;
        execContext = {
          fragmentMap: fragmentMap,
          context: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), {
            cache: cache,
            client: client
          }),
          variables: variables,
          fragmentMatcher: fragmentMatcher,
          defaultOperationType: defaultOperationType,
          exportedVariables: {},
          onlyRunForcedResolvers: onlyRunForcedResolvers
        };
        return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) {
          return {
            result: result,
            exportedVariables: execContext.exportedVariables
          };
        })];
      });
    });
  };

  LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var fragmentMap, context, variables, resultsToMerge, execute;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
        resultsToMerge = [rootValue];

        execute = function (selection) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var fragment, typeCondition;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
              if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["shouldInclude"])(selection, variables)) {
                return [2];
              }

              if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isField"])(selection)) {
                return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                  var _a;

                  if (typeof fieldResult !== 'undefined') {
                    resultsToMerge.push((_a = {}, _a[Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["resultKeyNameFromField"])(selection)] = fieldResult, _a));
                  }
                })];
              }

              if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["isInlineFragment"])(selection)) {
                fragment = selection;
              } else {
                fragment = fragmentMap[selection.name.value];
                 false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(fragment, "No fragment named " + selection.name.value);
              }

              if (fragment && fragment.typeCondition) {
                typeCondition = fragment.typeCondition.name.value;

                if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                  return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                    resultsToMerge.push(fragmentResult);
                  })];
                }
              }

              return [2];
            });
          });
        };

        return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
          return Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["mergeDeepArray"])(resultsToMerge);
        })];
      });
    });
  };

  LocalState.prototype.resolveField = function (field, rootValue, execContext) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        variables = execContext.variables;
        fieldName = field.name.value;
        aliasedFieldName = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["resultKeyNameFromField"])(field);
        aliasUsed = fieldName !== aliasedFieldName;
        defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
        resultPromise = Promise.resolve(defaultResult);

        if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
          resolverType = rootValue.__typename || execContext.defaultOperationType;
          resolverMap = this.resolvers && this.resolvers[resolverType];

          if (resolverMap) {
            resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];

            if (resolve) {
              resultPromise = Promise.resolve(resolve(rootValue, Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["argumentsObjectFromField"])(field, variables), execContext.context, {
                field: field,
                fragmentMap: execContext.fragmentMap
              }));
            }
          }
        }

        return [2, resultPromise.then(function (result) {
          if (result === void 0) {
            result = defaultResult;
          }

          if (field.directives) {
            field.directives.forEach(function (directive) {
              if (directive.name.value === 'export' && directive.arguments) {
                directive.arguments.forEach(function (arg) {
                  if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                    execContext.exportedVariables[arg.value.value] = result;
                  }
                });
              }
            });
          }

          if (!field.selectionSet) {
            return result;
          }

          if (result == null) {
            return result;
          }

          if (Array.isArray(result)) {
            return _this.resolveSubSelectedArray(field, result, execContext);
          }

          if (field.selectionSet) {
            return _this.resolveSelectionSet(field.selectionSet, result, execContext);
          }
        })];
      });
    });
  };

  LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
    var _this = this;

    return Promise.all(result.map(function (item) {
      if (item === null) {
        return null;
      }

      if (Array.isArray(item)) {
        return _this.resolveSubSelectedArray(field, item, execContext);
      }

      if (field.selectionSet) {
        return _this.resolveSelectionSet(field.selectionSet, item, execContext);
      }
    }));
  };

  return LocalState;
}();

function multiplex(inner) {
  var observers = new Set();
  var sub = null;
  return new Observable(function (observer) {
    observers.add(observer);
    sub = sub || inner.subscribe({
      next: function (value) {
        observers.forEach(function (obs) {
          return obs.next && obs.next(value);
        });
      },
      error: function (error) {
        observers.forEach(function (obs) {
          return obs.error && obs.error(error);
        });
      },
      complete: function () {
        observers.forEach(function (obs) {
          return obs.complete && obs.complete();
        });
      }
    });
    return function () {
      if (observers.delete(observer) && !observers.size && sub) {
        sub.unsubscribe();
        sub = null;
      }
    };
  });
}

function asyncMap(observable, mapFn) {
  return new Observable(function (observer) {
    var next = observer.next,
        error = observer.error,
        complete = observer.complete;
    var activeNextCount = 0;
    var completed = false;
    var handler = {
      next: function (value) {
        ++activeNextCount;
        new Promise(function (resolve) {
          resolve(mapFn(value));
        }).then(function (result) {
          --activeNextCount;
          next && next.call(observer, result);
          completed && handler.complete();
        }, function (e) {
          --activeNextCount;
          error && error.call(observer, e);
        });
      },
      error: function (e) {
        error && error.call(observer, e);
      },
      complete: function () {
        completed = true;

        if (!activeNextCount) {
          complete && complete.call(observer);
        }
      }
    };
    var sub = observable.subscribe(handler);
    return function () {
      return sub.unsubscribe();
    };
  });
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var QueryManager = function () {
  function QueryManager(_a) {
    var link = _a.link,
        _b = _a.queryDeduplication,
        queryDeduplication = _b === void 0 ? false : _b,
        store = _a.store,
        _c = _a.onBroadcast,
        onBroadcast = _c === void 0 ? function () {
      return undefined;
    } : _c,
        _d = _a.ssrMode,
        ssrMode = _d === void 0 ? false : _d,
        _e = _a.clientAwareness,
        clientAwareness = _e === void 0 ? {} : _e,
        localState = _a.localState,
        assumeImmutableResults = _a.assumeImmutableResults;
    this.mutationStore = new MutationStore();
    this.queryStore = new QueryStore();
    this.clientAwareness = {};
    this.idCounter = 1;
    this.queries = new Map();
    this.fetchQueryRejectFns = new Map();
    this.transformCache = new (apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["canUseWeakMap"] ? WeakMap : Map)();
    this.inFlightLinkObservables = new Map();
    this.pollingInfoByQueryId = new Map();
    this.link = link;
    this.queryDeduplication = queryDeduplication;
    this.dataStore = store;
    this.onBroadcast = onBroadcast;
    this.clientAwareness = clientAwareness;
    this.localState = localState || new LocalState({
      cache: store.getCache()
    });
    this.ssrMode = ssrMode;
    this.assumeImmutableResults = !!assumeImmutableResults;
  }

  QueryManager.prototype.stop = function () {
    var _this = this;

    this.queries.forEach(function (_info, queryId) {
      _this.stopQueryNoBroadcast(queryId);
    });
    this.fetchQueryRejectFns.forEach(function (reject) {
      reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('QueryManager stopped while query was in flight'));
    });
  };

  QueryManager.prototype.mutate = function (_a) {
    var mutation = _a.mutation,
        variables = _a.variables,
        optimisticResponse = _a.optimisticResponse,
        updateQueriesByName = _a.updateQueries,
        _b = _a.refetchQueries,
        refetchQueries = _b === void 0 ? [] : _b,
        _c = _a.awaitRefetchQueries,
        awaitRefetchQueries = _c === void 0 ? false : _c,
        updateWithProxyFn = _a.update,
        _d = _a.errorPolicy,
        errorPolicy = _d === void 0 ? 'none' : _d,
        fetchPolicy = _a.fetchPolicy,
        _e = _a.context,
        context = _e === void 0 ? {} : _e;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var mutationId, generateUpdateQueriesInfo, self;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_f) {
        switch (_f.label) {
          case 0:
             false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.');
             false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!fetchPolicy || fetchPolicy === 'no-cache', "Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.");
            mutationId = this.generateQueryId();
            mutation = this.transform(mutation).document;
            this.setQuery(mutationId, function () {
              return {
                document: mutation
              };
            });
            variables = this.getVariables(mutation, variables);
            if (!this.transform(mutation).hasClientExports) return [3, 2];
            return [4, this.localState.addExportedVariables(mutation, variables, context)];

          case 1:
            variables = _f.sent();
            _f.label = 2;

          case 2:
            generateUpdateQueriesInfo = function () {
              var ret = {};

              if (updateQueriesByName) {
                _this.queries.forEach(function (_a, queryId) {
                  var observableQuery = _a.observableQuery;

                  if (observableQuery) {
                    var queryName = observableQuery.queryName;

                    if (queryName && hasOwnProperty.call(updateQueriesByName, queryName)) {
                      ret[queryId] = {
                        updater: updateQueriesByName[queryName],
                        query: _this.queryStore.get(queryId)
                      };
                    }
                  }
                });
              }

              return ret;
            };

            this.mutationStore.initMutation(mutationId, mutation, variables);
            this.dataStore.markMutationInit({
              mutationId: mutationId,
              document: mutation,
              variables: variables,
              updateQueries: generateUpdateQueriesInfo(),
              update: updateWithProxyFn,
              optimisticResponse: optimisticResponse
            });
            this.broadcastQueries();
            self = this;
            return [2, new Promise(function (resolve, reject) {
              var storeResult;
              var error;
              self.getObservableFromLink(mutation, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), {
                optimisticResponse: optimisticResponse
              }), variables, false).subscribe({
                next: function (result) {
                  if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result) && errorPolicy === 'none') {
                    error = new ApolloError({
                      graphQLErrors: result.errors
                    });
                    return;
                  }

                  self.mutationStore.markMutationResult(mutationId);

                  if (fetchPolicy !== 'no-cache') {
                    self.dataStore.markMutationResult({
                      mutationId: mutationId,
                      result: result,
                      document: mutation,
                      variables: variables,
                      updateQueries: generateUpdateQueriesInfo(),
                      update: updateWithProxyFn
                    });
                  }

                  storeResult = result;
                },
                error: function (err) {
                  self.mutationStore.markMutationError(mutationId, err);
                  self.dataStore.markMutationComplete({
                    mutationId: mutationId,
                    optimisticResponse: optimisticResponse
                  });
                  self.broadcastQueries();
                  self.setQuery(mutationId, function () {
                    return {
                      document: null
                    };
                  });
                  reject(new ApolloError({
                    networkError: err
                  }));
                },
                complete: function () {
                  if (error) {
                    self.mutationStore.markMutationError(mutationId, error);
                  }

                  self.dataStore.markMutationComplete({
                    mutationId: mutationId,
                    optimisticResponse: optimisticResponse
                  });
                  self.broadcastQueries();

                  if (error) {
                    reject(error);
                    return;
                  }

                  if (typeof refetchQueries === 'function') {
                    refetchQueries = refetchQueries(storeResult);
                  }

                  var refetchQueryPromises = [];

                  if (isNonEmptyArray(refetchQueries)) {
                    refetchQueries.forEach(function (refetchQuery) {
                      if (typeof refetchQuery === 'string') {
                        self.queries.forEach(function (_a) {
                          var observableQuery = _a.observableQuery;

                          if (observableQuery && observableQuery.queryName === refetchQuery) {
                            refetchQueryPromises.push(observableQuery.refetch());
                          }
                        });
                      } else {
                        var queryOptions = {
                          query: refetchQuery.query,
                          variables: refetchQuery.variables,
                          fetchPolicy: 'network-only'
                        };

                        if (refetchQuery.context) {
                          queryOptions.context = refetchQuery.context;
                        }

                        refetchQueryPromises.push(self.query(queryOptions));
                      }
                    });
                  }

                  Promise.all(awaitRefetchQueries ? refetchQueryPromises : []).then(function () {
                    self.setQuery(mutationId, function () {
                      return {
                        document: null
                      };
                    });

                    if (errorPolicy === 'ignore' && storeResult && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(storeResult)) {
                      delete storeResult.errors;
                    }

                    resolve(storeResult);
                  });
                }
              });
            })];
        }
      });
    });
  };

  QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var _a, metadata, _b, fetchPolicy, _c, context, query, variables, storeResult, isNetworkOnly, needToFetch, _d, complete, result, shouldFetch, requestId, cancel, networkResult;

      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
        switch (_e.label) {
          case 0:
            _a = options.metadata, metadata = _a === void 0 ? null : _a, _b = options.fetchPolicy, fetchPolicy = _b === void 0 ? 'cache-first' : _b, _c = options.context, context = _c === void 0 ? {} : _c;
            query = this.transform(options.query).document;
            variables = this.getVariables(query, options.variables);
            if (!this.transform(query).hasClientExports) return [3, 2];
            return [4, this.localState.addExportedVariables(query, variables, context)];

          case 1:
            variables = _e.sent();
            _e.label = 2;

          case 2:
            options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
              variables: variables
            });
            isNetworkOnly = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
            needToFetch = isNetworkOnly;

            if (!isNetworkOnly) {
              _d = this.dataStore.getCache().diff({
                query: query,
                variables: variables,
                returnPartialData: true,
                optimistic: false
              }), complete = _d.complete, result = _d.result;
              needToFetch = !complete || fetchPolicy === 'cache-and-network';
              storeResult = result;
            }

            shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
            if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasDirectives"])(['live'], query)) shouldFetch = true;
            requestId = this.idCounter++;
            cancel = fetchPolicy !== 'no-cache' ? this.updateQueryWatch(queryId, query, options) : undefined;
            this.setQuery(queryId, function () {
              return {
                document: query,
                lastRequestId: requestId,
                invalidated: true,
                cancel: cancel
              };
            });
            this.invalidate(fetchMoreForQueryId);
            this.queryStore.initQuery({
              queryId: queryId,
              document: query,
              storePreviousVariables: shouldFetch,
              variables: variables,
              isPoll: fetchType === FetchType.poll,
              isRefetch: fetchType === FetchType.refetch,
              metadata: metadata,
              fetchMoreForQueryId: fetchMoreForQueryId
            });
            this.broadcastQueries();

            if (shouldFetch) {
              networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: query,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId
              }).catch(function (error) {
                if (isApolloError(error)) {
                  throw error;
                } else {
                  if (requestId >= _this.getQuery(queryId).lastRequestId) {
                    _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);

                    _this.invalidate(queryId);

                    _this.invalidate(fetchMoreForQueryId);

                    _this.broadcastQueries();
                  }

                  throw new ApolloError({
                    networkError: error
                  });
                }
              });

              if (fetchPolicy !== 'cache-and-network') {
                return [2, networkResult];
              }

              networkResult.catch(function () {});
            }

            this.queryStore.markQueryResultClient(queryId, !shouldFetch);
            this.invalidate(queryId);
            this.invalidate(fetchMoreForQueryId);

            if (this.transform(query).hasForcedResolvers) {
              return [2, this.localState.runResolvers({
                document: query,
                remoteResult: {
                  data: storeResult
                },
                context: context,
                variables: variables,
                onlyRunForcedResolvers: true
              }).then(function (result) {
                _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);

                _this.broadcastQueries();

                return result;
              })];
            }

            this.broadcastQueries();
            return [2, {
              data: storeResult
            }];
        }
      });
    });
  };

  QueryManager.prototype.markQueryResult = function (queryId, result, _a, fetchMoreForQueryId) {
    var fetchPolicy = _a.fetchPolicy,
        variables = _a.variables,
        errorPolicy = _a.errorPolicy;

    if (fetchPolicy === 'no-cache') {
      this.setQuery(queryId, function () {
        return {
          newData: {
            result: result.data,
            complete: true
          }
        };
      });
    } else {
      this.dataStore.markQueryResult(result, this.getQuery(queryId).document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
    }
  };

  QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
    var _this = this;

    function invoke(method, argument) {
      if (observer[method]) {
        try {
          observer[method](argument);
        } catch (e) {
           false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error(e);
        }
      } else if (method === 'error') {
         false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].error(argument);
      }
    }

    return function (queryStoreValue, newData) {
      _this.invalidate(queryId, false);

      if (!queryStoreValue) return;

      var _a = _this.getQuery(queryId),
          observableQuery = _a.observableQuery,
          document = _a.document;

      var fetchPolicy = observableQuery ? observableQuery.options.fetchPolicy : options.fetchPolicy;
      if (fetchPolicy === 'standby') return;
      var loading = isNetworkRequestInFlight(queryStoreValue.networkStatus);
      var lastResult = observableQuery && observableQuery.getLastResult();
      var networkStatusChanged = !!(lastResult && lastResult.networkStatus !== queryStoreValue.networkStatus);
      var shouldNotifyIfLoading = options.returnPartialData || !newData && queryStoreValue.previousVariables || networkStatusChanged && options.notifyOnNetworkStatusChange || fetchPolicy === 'cache-only' || fetchPolicy === 'cache-and-network';

      if (loading && !shouldNotifyIfLoading) {
        return;
      }

      var hasGraphQLErrors = isNonEmptyArray(queryStoreValue.graphQLErrors);
      var errorPolicy = observableQuery && observableQuery.options.errorPolicy || options.errorPolicy || 'none';

      if (errorPolicy === 'none' && hasGraphQLErrors || queryStoreValue.networkError) {
        return invoke('error', new ApolloError({
          graphQLErrors: queryStoreValue.graphQLErrors,
          networkError: queryStoreValue.networkError
        }));
      }

      try {
        var data = void 0;
        var isMissing = void 0;

        if (newData) {
          if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'network-only') {
            _this.setQuery(queryId, function () {
              return {
                newData: null
              };
            });
          }

          data = newData.result;
          isMissing = !newData.complete;
        } else {
          var lastError = observableQuery && observableQuery.getLastError();
          var errorStatusChanged = errorPolicy !== 'none' && (lastError && lastError.graphQLErrors) !== queryStoreValue.graphQLErrors;

          if (lastResult && lastResult.data && !errorStatusChanged) {
            data = lastResult.data;
            isMissing = false;
          } else {
            var diffResult = _this.dataStore.getCache().diff({
              query: document,
              variables: queryStoreValue.previousVariables || queryStoreValue.variables,
              returnPartialData: true,
              optimistic: true
            });

            data = diffResult.result;
            isMissing = !diffResult.complete;
          }
        }

        var stale = isMissing && !(options.returnPartialData || fetchPolicy === 'cache-only');
        var resultFromStore = {
          data: stale ? lastResult && lastResult.data : data,
          loading: loading,
          networkStatus: queryStoreValue.networkStatus,
          stale: stale
        };

        if (errorPolicy === 'all' && hasGraphQLErrors) {
          resultFromStore.errors = queryStoreValue.graphQLErrors;
        }

        invoke('next', resultFromStore);
      } catch (networkError) {
        invoke('error', new ApolloError({
          networkError: networkError
        }));
      }
    };
  };

  QueryManager.prototype.transform = function (document) {
    var transformCache = this.transformCache;

    if (!transformCache.has(document)) {
      var cache = this.dataStore.getCache();
      var transformed = cache.transformDocument(document);
      var forLink = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["removeConnectionDirectiveFromDocument"])(cache.transformForLink(transformed));
      var clientQuery = this.localState.clientQuery(transformed);
      var serverQuery = this.localState.serverQuery(forLink);
      var cacheEntry_1 = {
        document: transformed,
        hasClientExports: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["hasClientExports"])(transformed),
        hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
        clientQuery: clientQuery,
        serverQuery: serverQuery,
        defaultVars: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getDefaultValues"])(Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationDefinition"])(transformed))
      };

      var add = function (doc) {
        if (doc && !transformCache.has(doc)) {
          transformCache.set(doc, cacheEntry_1);
        }
      };

      add(document);
      add(transformed);
      add(clientQuery);
      add(serverQuery);
    }

    return transformCache.get(document);
  };

  QueryManager.prototype.getVariables = function (document, variables) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.transform(document).defaultVars), variables);
  };

  QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
    if (shouldSubscribe === void 0) {
      shouldSubscribe = true;
    }

     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.fetchPolicy !== 'standby', 'client.watchQuery cannot be called with fetchPolicy set to "standby"');
    options.variables = this.getVariables(options.query, options.variables);

    if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
      options.notifyOnNetworkStatusChange = false;
    }

    var transformedOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options);

    return new ObservableQuery({
      queryManager: this,
      options: transformedOptions,
      shouldSubscribe: shouldSubscribe
    });
  };

  QueryManager.prototype.query = function (options) {
    var _this = this;

     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.query, 'query option is required. You must specify your GraphQL document ' + 'in the query option.');
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.');
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.');
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(!options.pollInterval, 'pollInterval option only supported on watchQuery.');
    return new Promise(function (resolve, reject) {
      var watchedQuery = _this.watchQuery(options, false);

      _this.fetchQueryRejectFns.set("query:" + watchedQuery.queryId, reject);

      watchedQuery.result().then(resolve, reject).then(function () {
        return _this.fetchQueryRejectFns.delete("query:" + watchedQuery.queryId);
      });
    });
  };

  QueryManager.prototype.generateQueryId = function () {
    return String(this.idCounter++);
  };

  QueryManager.prototype.stopQueryInStore = function (queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.broadcastQueries();
  };

  QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
    this.stopPollingQuery(queryId);
    this.queryStore.stopQuery(queryId);
    this.invalidate(queryId);
  };

  QueryManager.prototype.addQueryListener = function (queryId, listener) {
    this.setQuery(queryId, function (_a) {
      var listeners = _a.listeners;
      listeners.add(listener);
      return {
        invalidated: false
      };
    });
  };

  QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
    var _this = this;

    var cancel = this.getQuery(queryId).cancel;
    if (cancel) cancel();

    var previousResult = function () {
      var previousResult = null;

      var observableQuery = _this.getQuery(queryId).observableQuery;

      if (observableQuery) {
        var lastResult = observableQuery.getLastResult();

        if (lastResult) {
          previousResult = lastResult.data;
        }
      }

      return previousResult;
    };

    return this.dataStore.getCache().watch({
      query: document,
      variables: options.variables,
      optimistic: true,
      previousResult: previousResult,
      callback: function (newData) {
        _this.setQuery(queryId, function () {
          return {
            invalidated: true,
            newData: newData
          };
        });
      }
    });
  };

  QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
    this.setQuery(queryId, function () {
      return {
        observableQuery: observableQuery
      };
    });
  };

  QueryManager.prototype.removeObservableQuery = function (queryId) {
    var cancel = this.getQuery(queryId).cancel;
    this.setQuery(queryId, function () {
      return {
        observableQuery: null
      };
    });
    if (cancel) cancel();
  };

  QueryManager.prototype.clearStore = function () {
    this.fetchQueryRejectFns.forEach(function (reject) {
      reject( false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]('Store reset while query was in flight (not completed in link chain)'));
    });
    var resetIds = [];
    this.queries.forEach(function (_a, queryId) {
      var observableQuery = _a.observableQuery;
      if (observableQuery) resetIds.push(queryId);
    });
    this.queryStore.reset(resetIds);
    this.mutationStore.reset();
    return this.dataStore.reset();
  };

  QueryManager.prototype.resetStore = function () {
    var _this = this;

    return this.clearStore().then(function () {
      return _this.reFetchObservableQueries();
    });
  };

  QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
    var _this = this;

    if (includeStandby === void 0) {
      includeStandby = false;
    }

    var observableQueryPromises = [];
    this.queries.forEach(function (_a, queryId) {
      var observableQuery = _a.observableQuery;

      if (observableQuery) {
        var fetchPolicy = observableQuery.options.fetchPolicy;
        observableQuery.resetLastResults();

        if (fetchPolicy !== 'cache-only' && (includeStandby || fetchPolicy !== 'standby')) {
          observableQueryPromises.push(observableQuery.refetch());
        }

        _this.setQuery(queryId, function () {
          return {
            newData: null
          };
        });

        _this.invalidate(queryId);
      }
    });
    this.broadcastQueries();
    return Promise.all(observableQueryPromises);
  };

  QueryManager.prototype.observeQuery = function (queryId, options, observer) {
    this.addQueryListener(queryId, this.queryListenerForObserver(queryId, options, observer));
    return this.fetchQuery(queryId, options);
  };

  QueryManager.prototype.startQuery = function (queryId, options, listener) {
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn("The QueryManager.startQuery method has been deprecated");
    this.addQueryListener(queryId, listener);
    this.fetchQuery(queryId, options).catch(function () {
      return undefined;
    });
    return queryId;
  };

  QueryManager.prototype.startGraphQLSubscription = function (_a) {
    var _this = this;

    var query = _a.query,
        fetchPolicy = _a.fetchPolicy,
        variables = _a.variables;
    query = this.transform(query).document;
    variables = this.getVariables(query, variables);

    var makeObservable = function (variables) {
      return _this.getObservableFromLink(query, {}, variables, false).map(function (result) {
        if (!fetchPolicy || fetchPolicy !== 'no-cache') {
          _this.dataStore.markSubscriptionResult(result, query, variables);

          _this.broadcastQueries();
        }

        if (Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result)) {
          throw new ApolloError({
            graphQLErrors: result.errors
          });
        }

        return result;
      });
    };

    if (this.transform(query).hasClientExports) {
      var observablePromise_1 = this.localState.addExportedVariables(query, variables).then(makeObservable);
      return new Observable(function (observer) {
        var sub = null;
        observablePromise_1.then(function (observable) {
          return sub = observable.subscribe(observer);
        }, observer.error);
        return function () {
          return sub && sub.unsubscribe();
        };
      });
    }

    return makeObservable(variables);
  };

  QueryManager.prototype.stopQuery = function (queryId) {
    this.stopQueryNoBroadcast(queryId);
    this.broadcastQueries();
  };

  QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.removeQuery(queryId);
  };

  QueryManager.prototype.removeQuery = function (queryId) {
    this.fetchQueryRejectFns.delete("query:" + queryId);
    this.fetchQueryRejectFns.delete("fetchRequest:" + queryId);
    this.getQuery(queryId).subscriptions.forEach(function (x) {
      return x.unsubscribe();
    });
    this.queries.delete(queryId);
  };

  QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
    if (optimistic === void 0) {
      optimistic = true;
    }

    var _a = observableQuery.options,
        variables = _a.variables,
        query = _a.query,
        fetchPolicy = _a.fetchPolicy,
        returnPartialData = _a.returnPartialData;
    var lastResult = observableQuery.getLastResult();
    var newData = this.getQuery(observableQuery.queryId).newData;

    if (newData && newData.complete) {
      return {
        data: newData.result,
        partial: false
      };
    }

    if (fetchPolicy === 'no-cache' || fetchPolicy === 'network-only') {
      return {
        data: undefined,
        partial: false
      };
    }

    var _b = this.dataStore.getCache().diff({
      query: query,
      variables: variables,
      previousResult: lastResult ? lastResult.data : undefined,
      returnPartialData: true,
      optimistic: optimistic
    }),
        result = _b.result,
        complete = _b.complete;

    return {
      data: complete || returnPartialData ? result : void 0,
      partial: !complete
    };
  };

  QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
    var observableQuery;

    if (typeof queryIdOrObservable === 'string') {
      var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
       false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(foundObserveableQuery, "ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
      observableQuery = foundObserveableQuery;
    } else {
      observableQuery = queryIdOrObservable;
    }

    var _a = observableQuery.options,
        variables = _a.variables,
        query = _a.query;
    return {
      previousResult: this.getCurrentQueryResult(observableQuery, false).data,
      variables: variables,
      document: query
    };
  };

  QueryManager.prototype.broadcastQueries = function () {
    var _this = this;

    this.onBroadcast();
    this.queries.forEach(function (info, id) {
      if (info.invalidated) {
        info.listeners.forEach(function (listener) {
          if (listener) {
            listener(_this.queryStore.get(id), info.newData);
          }
        });
      }
    });
  };

  QueryManager.prototype.getLocalState = function () {
    return this.localState;
  };

  QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
    var _this = this;

    if (deduplication === void 0) {
      deduplication = this.queryDeduplication;
    }

    var observable;
    var serverQuery = this.transform(query).serverQuery;

    if (serverQuery) {
      var _a = this,
          inFlightLinkObservables_1 = _a.inFlightLinkObservables,
          link = _a.link;

      var operation = {
        query: serverQuery,
        variables: variables,
        operationName: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationName"])(serverQuery) || void 0,
        context: this.prepareContext(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), {
          forceFetch: !deduplication
        }))
      };
      context = operation.context;

      if (deduplication) {
        var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
        inFlightLinkObservables_1.set(serverQuery, byVariables_1);
        var varJson_1 = JSON.stringify(variables);
        observable = byVariables_1.get(varJson_1);

        if (!observable) {
          byVariables_1.set(varJson_1, observable = multiplex(Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(link, operation)));

          var cleanup = function () {
            byVariables_1.delete(varJson_1);
            if (!byVariables_1.size) inFlightLinkObservables_1.delete(serverQuery);
            cleanupSub_1.unsubscribe();
          };

          var cleanupSub_1 = observable.subscribe({
            next: cleanup,
            error: cleanup,
            complete: cleanup
          });
        }
      } else {
        observable = multiplex(Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(link, operation));
      }
    } else {
      observable = Observable.of({
        data: {}
      });
      context = this.prepareContext(context);
    }

    var clientQuery = this.transform(query).clientQuery;

    if (clientQuery) {
      observable = asyncMap(observable, function (result) {
        return _this.localState.runResolvers({
          document: clientQuery,
          remoteResult: result,
          context: context,
          variables: variables
        });
      });
    }

    return observable;
  };

  QueryManager.prototype.fetchRequest = function (_a) {
    var _this = this;

    var requestId = _a.requestId,
        queryId = _a.queryId,
        document = _a.document,
        options = _a.options,
        fetchMoreForQueryId = _a.fetchMoreForQueryId;
    var variables = options.variables,
        _b = options.errorPolicy,
        errorPolicy = _b === void 0 ? 'none' : _b,
        fetchPolicy = options.fetchPolicy;
    var resultFromStore;
    var errorsFromStore;
    return new Promise(function (resolve, reject) {
      var observable = _this.getObservableFromLink(document, options.context, variables);

      var fqrfId = "fetchRequest:" + queryId;

      _this.fetchQueryRejectFns.set(fqrfId, reject);

      var cleanup = function () {
        _this.fetchQueryRejectFns.delete(fqrfId);

        _this.setQuery(queryId, function (_a) {
          var subscriptions = _a.subscriptions;
          subscriptions.delete(subscription);
        });
      };

      var subscription = observable.map(function (result) {
        if (requestId >= _this.getQuery(queryId).lastRequestId) {
          _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);

          _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);

          _this.invalidate(queryId);

          _this.invalidate(fetchMoreForQueryId);

          _this.broadcastQueries();
        }

        if (errorPolicy === 'none' && isNonEmptyArray(result.errors)) {
          return reject(new ApolloError({
            graphQLErrors: result.errors
          }));
        }

        if (errorPolicy === 'all') {
          errorsFromStore = result.errors;
        }

        if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
          resultFromStore = result.data;
        } else {
          var _a = _this.dataStore.getCache().diff({
            variables: variables,
            query: document,
            optimistic: false,
            returnPartialData: true
          }),
              result_1 = _a.result,
              complete = _a.complete;

          if (complete || options.returnPartialData) {
            resultFromStore = result_1;
          }
        }
      }).subscribe({
        error: function (error) {
          cleanup();
          reject(error);
        },
        complete: function () {
          cleanup();
          resolve({
            data: resultFromStore,
            errors: errorsFromStore,
            loading: false,
            networkStatus: NetworkStatus.ready,
            stale: false
          });
        }
      });

      _this.setQuery(queryId, function (_a) {
        var subscriptions = _a.subscriptions;
        subscriptions.add(subscription);
      });
    });
  };

  QueryManager.prototype.getQuery = function (queryId) {
    return this.queries.get(queryId) || {
      listeners: new Set(),
      invalidated: false,
      document: null,
      newData: null,
      lastRequestId: 1,
      observableQuery: null,
      subscriptions: new Set()
    };
  };

  QueryManager.prototype.setQuery = function (queryId, updater) {
    var prev = this.getQuery(queryId);

    var newInfo = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prev), updater(prev));

    this.queries.set(queryId, newInfo);
  };

  QueryManager.prototype.invalidate = function (queryId, invalidated) {
    if (invalidated === void 0) {
      invalidated = true;
    }

    if (queryId) {
      this.setQuery(queryId, function () {
        return {
          invalidated: invalidated
        };
      });
    }
  };

  QueryManager.prototype.prepareContext = function (context) {
    if (context === void 0) {
      context = {};
    }

    var newContext = this.localState.prepareContext(context);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, newContext), {
      clientAwareness: this.clientAwareness
    });
  };

  QueryManager.prototype.checkInFlight = function (queryId) {
    var query = this.queryStore.get(queryId);
    return query && query.networkStatus !== NetworkStatus.ready && query.networkStatus !== NetworkStatus.error;
  };

  QueryManager.prototype.startPollingQuery = function (options, queryId, listener) {
    var _this = this;

    var pollInterval = options.pollInterval;
     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(pollInterval, 'Attempted to start a polling query without a polling interval.');

    if (!this.ssrMode) {
      var info = this.pollingInfoByQueryId.get(queryId);

      if (!info) {
        this.pollingInfoByQueryId.set(queryId, info = {});
      }

      info.interval = pollInterval;
      info.options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        fetchPolicy: 'network-only'
      });

      var maybeFetch_1 = function () {
        var info = _this.pollingInfoByQueryId.get(queryId);

        if (info) {
          if (_this.checkInFlight(queryId)) {
            poll_1();
          } else {
            _this.fetchQuery(queryId, info.options, FetchType.poll).then(poll_1, poll_1);
          }
        }
      };

      var poll_1 = function () {
        var info = _this.pollingInfoByQueryId.get(queryId);

        if (info) {
          clearTimeout(info.timeout);
          info.timeout = setTimeout(maybeFetch_1, info.interval);
        }
      };

      if (listener) {
        this.addQueryListener(queryId, listener);
      }

      poll_1();
    }

    return queryId;
  };

  QueryManager.prototype.stopPollingQuery = function (queryId) {
    this.pollingInfoByQueryId.delete(queryId);
  };

  return QueryManager;
}();

var DataStore = function () {
  function DataStore(initialCache) {
    this.cache = initialCache;
  }

  DataStore.prototype.getCache = function () {
    return this.cache;
  };

  DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
    if (ignoreErrors === void 0) {
      ignoreErrors = false;
    }

    var writeWithErrors = !Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result);

    if (ignoreErrors && Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result) && result.data) {
      writeWithErrors = true;
    }

    if (!fetchMoreForQueryId && writeWithErrors) {
      this.cache.write({
        result: result.data,
        dataId: 'ROOT_QUERY',
        query: document,
        variables: variables
      });
    }
  };

  DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(result)) {
      this.cache.write({
        result: result.data,
        dataId: 'ROOT_SUBSCRIPTION',
        query: document,
        variables: variables
      });
    }
  };

  DataStore.prototype.markMutationInit = function (mutation) {
    var _this = this;

    if (mutation.optimisticResponse) {
      var optimistic_1;

      if (typeof mutation.optimisticResponse === 'function') {
        optimistic_1 = mutation.optimisticResponse(mutation.variables);
      } else {
        optimistic_1 = mutation.optimisticResponse;
      }

      this.cache.recordOptimisticTransaction(function (c) {
        var orig = _this.cache;
        _this.cache = c;

        try {
          _this.markMutationResult({
            mutationId: mutation.mutationId,
            result: {
              data: optimistic_1
            },
            document: mutation.document,
            variables: mutation.variables,
            updateQueries: mutation.updateQueries,
            update: mutation.update
          });
        } finally {
          _this.cache = orig;
        }
      }, mutation.mutationId);
    }
  };

  DataStore.prototype.markMutationResult = function (mutation) {
    var _this = this;

    if (!Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["graphQLResultHasError"])(mutation.result)) {
      var cacheWrites_1 = [{
        result: mutation.result.data,
        dataId: 'ROOT_MUTATION',
        query: mutation.document,
        variables: mutation.variables
      }];
      var updateQueries_1 = mutation.updateQueries;

      if (updateQueries_1) {
        Object.keys(updateQueries_1).forEach(function (id) {
          var _a = updateQueries_1[id],
              query = _a.query,
              updater = _a.updater;

          var _b = _this.cache.diff({
            query: query.document,
            variables: query.variables,
            returnPartialData: true,
            optimistic: false
          }),
              currentQueryResult = _b.result,
              complete = _b.complete;

          if (complete) {
            var nextQueryResult = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () {
              return updater(currentQueryResult, {
                mutationResult: mutation.result,
                queryName: Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["getOperationName"])(query.document) || undefined,
                queryVariables: query.variables
              });
            });

            if (nextQueryResult) {
              cacheWrites_1.push({
                result: nextQueryResult,
                dataId: 'ROOT_QUERY',
                query: query.document,
                variables: query.variables
              });
            }
          }
        });
      }

      this.cache.performTransaction(function (c) {
        cacheWrites_1.forEach(function (write) {
          return c.write(write);
        });
        var update = mutation.update;

        if (update) {
          Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_1__["tryFunctionOrLogError"])(function () {
            return update(c, mutation.result);
          });
        }
      });
    }
  };

  DataStore.prototype.markMutationComplete = function (_a) {
    var mutationId = _a.mutationId,
        optimisticResponse = _a.optimisticResponse;

    if (optimisticResponse) {
      this.cache.removeOptimistic(mutationId);
    }
  };

  DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
    this.cache.write({
      result: newResult,
      dataId: 'ROOT_QUERY',
      variables: variables,
      query: document
    });
  };

  DataStore.prototype.reset = function () {
    return this.cache.reset();
  };

  return DataStore;
}();

var version = "2.6.10";
var hasSuggestedDevtools = false;

var ApolloClient = function () {
  function ApolloClient(options) {
    var _this = this;

    this.defaultOptions = {};
    this.resetStoreCallbacks = [];
    this.clearStoreCallbacks = [];
    var cache = options.cache,
        _a = options.ssrMode,
        ssrMode = _a === void 0 ? false : _a,
        _b = options.ssrForceFetchDelay,
        ssrForceFetchDelay = _b === void 0 ? 0 : _b,
        connectToDevTools = options.connectToDevTools,
        _c = options.queryDeduplication,
        queryDeduplication = _c === void 0 ? true : _c,
        defaultOptions = options.defaultOptions,
        _d = options.assumeImmutableResults,
        assumeImmutableResults = _d === void 0 ? false : _d,
        resolvers = options.resolvers,
        typeDefs = options.typeDefs,
        fragmentMatcher = options.fragmentMatcher,
        clientAwarenessName = options.name,
        clientAwarenessVersion = options.version;
    var link = options.link;

    if (!link && resolvers) {
      link = apollo_link__WEBPACK_IMPORTED_MODULE_2__["ApolloLink"].empty();
    }

    if (!link || !cache) {
      throw  false ? undefined : new ts_invariant__WEBPACK_IMPORTED_MODULE_4__["InvariantError"]("In order to initialize Apollo Client, you must specify 'link' and 'cache' properties in the options object.\n" + "These options are part of the upgrade requirements when migrating from Apollo Client 1.x to Apollo Client 2.x.\n" + "For more information, please visit: https://www.apollographql.com/docs/tutorial/client.html#apollo-client-setup");
    }

    this.link = link;
    this.cache = cache;
    this.store = new DataStore(cache);
    this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
    this.queryDeduplication = queryDeduplication;
    this.defaultOptions = defaultOptions || {};
    this.typeDefs = typeDefs;

    if (ssrForceFetchDelay) {
      setTimeout(function () {
        return _this.disableNetworkFetches = false;
      }, ssrForceFetchDelay);
    }

    this.watchQuery = this.watchQuery.bind(this);
    this.query = this.query.bind(this);
    this.mutate = this.mutate.bind(this);
    this.resetStore = this.resetStore.bind(this);
    this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
    var defaultConnectToDevTools =  true && typeof window !== 'undefined' && !window.__APOLLO_CLIENT__;

    if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools && typeof window !== 'undefined') {
      window.__APOLLO_CLIENT__ = this;
    }

    if (!hasSuggestedDevtools && 'development' !== 'production') {
      hasSuggestedDevtools = true;

      if (typeof window !== 'undefined' && window.document && window.top === window.self) {
        if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Chrome') > -1) {
            console.debug('Download the Apollo DevTools ' + 'for a better development experience: ' + 'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
          }
        }
      }
    }

    this.version = version;
    this.localState = new LocalState({
      cache: cache,
      client: this,
      resolvers: resolvers,
      fragmentMatcher: fragmentMatcher
    });
    this.queryManager = new QueryManager({
      link: this.link,
      store: this.store,
      queryDeduplication: queryDeduplication,
      ssrMode: ssrMode,
      clientAwareness: {
        name: clientAwarenessName,
        version: clientAwarenessVersion
      },
      localState: this.localState,
      assumeImmutableResults: assumeImmutableResults,
      onBroadcast: function () {
        if (_this.devToolsHookCb) {
          _this.devToolsHookCb({
            action: {},
            state: {
              queries: _this.queryManager.queryStore.getStore(),
              mutations: _this.queryManager.mutationStore.getStore()
            },
            dataWithOptimisticResults: _this.cache.extract(true)
          });
        }
      }
    });
  }

  ApolloClient.prototype.stop = function () {
    this.queryManager.stop();
  };

  ApolloClient.prototype.watchQuery = function (options) {
    if (this.defaultOptions.watchQuery) {
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.watchQuery), options);
    }

    if (this.disableNetworkFetches && (options.fetchPolicy === 'network-only' || options.fetchPolicy === 'cache-and-network')) {
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        fetchPolicy: 'cache-first'
      });
    }

    return this.queryManager.watchQuery(options);
  };

  ApolloClient.prototype.query = function (options) {
    if (this.defaultOptions.query) {
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.query), options);
    }

     false ? undefined : Object(ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"])(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' + 'client.query can only return a single result. Please use client.watchQuery ' + 'to receive multiple results from the cache and the network, or consider ' + 'using a different fetchPolicy, such as cache-first or network-only.');

    if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        fetchPolicy: 'cache-first'
      });
    }

    return this.queryManager.query(options);
  };

  ApolloClient.prototype.mutate = function (options) {
    if (this.defaultOptions.mutate) {
      options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.defaultOptions.mutate), options);
    }

    return this.queryManager.mutate(options);
  };

  ApolloClient.prototype.subscribe = function (options) {
    return this.queryManager.startGraphQLSubscription(options);
  };

  ApolloClient.prototype.readQuery = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.cache.readQuery(options, optimistic);
  };

  ApolloClient.prototype.readFragment = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.cache.readFragment(options, optimistic);
  };

  ApolloClient.prototype.writeQuery = function (options) {
    var result = this.cache.writeQuery(options);
    this.queryManager.broadcastQueries();
    return result;
  };

  ApolloClient.prototype.writeFragment = function (options) {
    var result = this.cache.writeFragment(options);
    this.queryManager.broadcastQueries();
    return result;
  };

  ApolloClient.prototype.writeData = function (options) {
    var result = this.cache.writeData(options);
    this.queryManager.broadcastQueries();
    return result;
  };

  ApolloClient.prototype.__actionHookForDevTools = function (cb) {
    this.devToolsHookCb = cb;
  };

  ApolloClient.prototype.__requestRaw = function (payload) {
    return Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(this.link, payload);
  };

  ApolloClient.prototype.initQueryManager = function () {
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_4__["invariant"].warn('Calling the initQueryManager method is no longer necessary, ' + 'and it will be removed from ApolloClient in version 3.0.');
    return this.queryManager;
  };

  ApolloClient.prototype.resetStore = function () {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this.queryManager.clearStore();
    }).then(function () {
      return Promise.all(_this.resetStoreCallbacks.map(function (fn) {
        return fn();
      }));
    }).then(function () {
      return _this.reFetchObservableQueries();
    });
  };

  ApolloClient.prototype.clearStore = function () {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this.queryManager.clearStore();
    }).then(function () {
      return Promise.all(_this.clearStoreCallbacks.map(function (fn) {
        return fn();
      }));
    });
  };

  ApolloClient.prototype.onResetStore = function (cb) {
    var _this = this;

    this.resetStoreCallbacks.push(cb);
    return function () {
      _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) {
        return c !== cb;
      });
    };
  };

  ApolloClient.prototype.onClearStore = function (cb) {
    var _this = this;

    this.clearStoreCallbacks.push(cb);
    return function () {
      _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) {
        return c !== cb;
      });
    };
  };

  ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
    return this.queryManager.reFetchObservableQueries(includeStandby);
  };

  ApolloClient.prototype.extract = function (optimistic) {
    return this.cache.extract(optimistic);
  };

  ApolloClient.prototype.restore = function (serializedState) {
    return this.cache.restore(serializedState);
  };

  ApolloClient.prototype.addResolvers = function (resolvers) {
    this.localState.addResolvers(resolvers);
  };

  ApolloClient.prototype.setResolvers = function (resolvers) {
    this.localState.setResolvers(resolvers);
  };

  ApolloClient.prototype.getResolvers = function () {
    return this.localState.getResolvers();
  };

  ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
    this.localState.setFragmentMatcher(fragmentMatcher);
  };

  return ApolloClient;
}();

/* harmony default export */ __webpack_exports__["default"] = (ApolloClient);


/***/ }),

/***/ "../../node_modules/client/src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/client/src/modules.ts");


(async () => {
  await _modules__WEBPACK_IMPORTED_MODULE_0__["default"].createApp(module);
})();

/* harmony default export */ __webpack_exports__["default"] = (_modules__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../../node_modules/client/src/modules.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/core-client/index.tsx");
/* harmony import */ var _bunker42_module_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/module-client/index.ts");
 // import look from '@bunker42/look-client-react';
// import i18n from '@bunker42/i18n-client-react';
// import counter from '@bunker42/counter-client-react';
// import chat from '@bunker42/chat-client-react';
// import contact from '@bunker42/contact-client-react';
// import validation from '@bunker42/validation-common-react';

 // import defaultRouter from '@bunker42/router-client-react';
// import payments from '@bunker42/payments-client-react';
// import authentication from '@bunker42/authentication-client-react';
// import '@bunker42/favicon-common';
// const post = require('@bunkre42/post-client-react').default;
// const pageNotFound = require('@bunkre42/page-not-found-client-react').default;
// const reports = require('@bunkre42/reports-client-react').default;
// const upload = require('@bunkre42/upload-client-react').default;
// const pagination = require('@bunkre42/pagination-client-react').default;
// const user = require('@bunkre42/user-client-react').default;

const modules = new _bunker42_module_client__WEBPACK_IMPORTED_MODULE_1__["default"]( //   look,
//   validation,
//   defaultRouter,
//   counter,
//   post,
//   upload,
//   contact,
//   pagination,
//   chat,
//   payments,
//   user,
//   i18n,
//   reports,
//   pageNotFound,
_bunker42_core_client__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (modules);

/***/ }),

/***/ "../../node_modules/webpack/buildin/harmony-module.js":
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "../../node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });

  var log = __webpack_require__("../../node_modules/webpack/hot/log.js");

  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }

  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
  }
};

/***/ }),

/***/ "../../node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
/* eslint-disable node/no-unsupported-features/node-builtins */


var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
  logLevel = level;
};

module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;

  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};

/***/ }),

/***/ "../../node_modules/webpack/hot/poll.js?200":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/*globals __resourceQuery */
if (true) {
  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;

  var log = __webpack_require__("../../node_modules/webpack/hot/log.js");

  var checkForUpdate = function checkForUpdate(fromUpdate) {
    if (module.hot.status() === "idle") {
      module.hot.check(true).then(function (updatedModules) {
        if (!updatedModules) {
          if (fromUpdate) log("info", "[HMR] Update applied.");
          return;
        }

        __webpack_require__("../../node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

        checkForUpdate(true);
      }).catch(function (err) {
        var status = module.hot.status();

        if (["abort", "fail"].indexOf(status) >= 0) {
          log("warning", "[HMR] Cannot apply update.");
          log("warning", "[HMR] " + log.formatError(err));
          log("warning", "[HMR] You need to restart the application!");
        } else {
          log("warning", "[HMR] Update failed: " + log.formatError(err));
        }
      });
    }
  };

  setInterval(checkForUpdate, hotPollInterval);
} else {}
/* WEBPACK VAR INJECTION */}.call(this, "?200"))

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules.ts");



(async () => {
  await _modules__WEBPACK_IMPORTED_MODULE_1__["default"].createApp(module);
})();

/* harmony default export */ __webpack_exports__["default"] = (_modules__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/modules.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bunker42_core_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@bunker42/core-server/index.ts");
/* harmony import */ var _bunker42_post_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@bunker42/post-server/index.ts");
/* harmony import */ var _bunker42_module_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@bunker42/module-server/index.ts");
 // import i18n from '@bunker42/i18n-server-ts';
// import validation from '@bunker42/validation-common-react';
// import counter from '@bunker42/counter-server-ts';
// import chat from '@bunker42/chat-server-ts';
// import contact from '@bunker42/contact-server-ts';
// import cookies from '@bunker42/cookies-server-ts';

 // import upload from '@bunker42/upload-server-ts';
// import subscription from '@bunker42/payments-server-ts';
// import mailer from '@bunker42/mailer-server-ts';
// import graphqlTypes from '@bunker42/graphql-types-server-ts';
// import authentication from '@bunker42/authentication-server-ts';
// import reports from '@bunker42/reports-server-ts';
// import rest from '@bunker42/rest-server-ts';
// import '@bunker42/debug-server-ts';

 // const user = require('@bunker42/user-server-ts').default;

const modules = new _bunker42_module_server__WEBPACK_IMPORTED_MODULE_2__["default"]( //   authentication,
//   cookies,
//   i18n,
//   validation,
//   counter,
_bunker42_post_server__WEBPACK_IMPORTED_MODULE_1__["default"], //   subscription,
//   user,
//   upload,
//   contact,
//   mailer,
//   chat,
//   reports,
//   rest,
//   graphqlTypes,
_bunker42_core_server__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (modules);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../node_modules/webpack/hot/poll.js?200");
__webpack_require__("raf/polyfill");
module.exports = __webpack_require__("./src/index.ts");


/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@loadable/server":
/***/ (function(module, exports) {

module.exports = require("@loadable/server");

/***/ }),

/***/ "apollo-cache-inmemory":
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-cache-router":
/***/ (function(module, exports) {

module.exports = require("apollo-cache-router");

/***/ }),

/***/ "apollo-link":
/***/ (function(module, exports) {

module.exports = require("apollo-link");

/***/ }),

/***/ "apollo-link-batch-http":
/***/ (function(module, exports) {

module.exports = require("apollo-link-batch-http");

/***/ }),

/***/ "apollo-link-schema":
/***/ (function(module, exports) {

module.exports = require("apollo-link-schema");

/***/ }),

/***/ "apollo-link-state":
/***/ (function(module, exports) {

module.exports = require("apollo-link-state");

/***/ }),

/***/ "apollo-link-ws":
/***/ (function(module, exports) {

module.exports = require("apollo-link-ws");

/***/ }),

/***/ "apollo-logger":
/***/ (function(module, exports) {

module.exports = require("apollo-logger");

/***/ }),

/***/ "apollo-server-express":
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "apollo-server-module-graphiql":
/***/ (function(module, exports) {

module.exports = require("apollo-server-module-graphiql");

/***/ }),

/***/ "apollo-utilities":
/***/ (function(module, exports) {

module.exports = require("apollo-utilities");

/***/ }),

/***/ "compression":
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connected-react-router":
/***/ (function(module, exports) {

module.exports = require("connected-react-router");

/***/ }),

/***/ "dotenv/config":
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fractal-objects":
/***/ (function(module, exports) {

module.exports = require("fractal-objects");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "glob":
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ "graphql":
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-resolve-batch":
/***/ (function(module, exports) {

module.exports = require("graphql-resolve-batch");

/***/ }),

/***/ "graphql-subscriptions":
/***/ (function(module, exports) {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "graphql-tools":
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "graphql/language/visitor":
/***/ (function(module, exports) {

module.exports = require("graphql/language/visitor");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "isomorphic-fetch":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "isomorphic-unfetch":
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "knex":
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "minilog":
/***/ (function(module, exports) {

module.exports = require("minilog");

/***/ }),

/***/ "module":
/***/ (function(module, exports) {

module.exports = require("module");

/***/ }),

/***/ "objection":
/***/ (function(module, exports) {

module.exports = require("objection");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "raf/polyfill":
/***/ (function(module, exports) {

module.exports = require("raf/polyfill");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router":
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension/developmentOnly":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension/developmentOnly");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "styled-components":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "subscriptions-transport-ws":
/***/ (function(module, exports) {

module.exports = require("subscriptions-transport-ws");

/***/ }),

/***/ "symbol-observable":
/***/ (function(module, exports) {

module.exports = require("symbol-observable");

/***/ }),

/***/ "ts-invariant":
/***/ (function(module, exports) {

module.exports = require("ts-invariant");

/***/ }),

/***/ "tslib":
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "url":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.b66e0583e423b9b7c17c.js.map