
var	getMaterialStorage = fetch(baseAPI + 'account/materials' + accessToken + currentKey)
	.then(function(response){
		return response.json();
	});

var getAccountBank = fetch(baseAPI + 'account/bank' + accessToken + currentKey)
	.then(function(response){
		return response.json();
	});

// Material Storage Things //
	getMaterialStorage.then(function(response){
    let amountofMaterials = response.length;
    let MaterialIds = [];
      for (var i = 0; i < response.length; i ++) {
        MaterialIds[i] = response[i].id;
      }
			const categoriesIds = [5, 6, 29, 30, 37, 38, 46, 49, 50];

				let getCategories = fetch(baseAPI + 'materials?ids=' + categoriesIds)
					.then(function(response) {
							return response.json();
					});

	      let mat1 = fetch(baseAPI + 'items?ids=' + MaterialIds.slice(0, pageLimit))
	      .then(function(response){
	        return response.json();
	      })

	      let mat2 = fetch(baseAPI + 'items?ids=' + MaterialIds.slice(200, 400))
	      .then(function(response){
	        return response.json();
	      })

	      let mat3 = fetch(baseAPI + 'items?ids=' + MaterialIds.slice(400, amountofMaterials))
	      .then(function(response){
	        return response.json();
	      })

		var AccountVault = response;

		// Important stuff happens here //
    Promise.all([getCategories, mat1, mat2, mat3]).then(values => {
					 totalMatList = values[1].concat(values[2], values[3])

							for (let i = 0; i < 9; i++) {
									 let currentCategory = values[0][i];
									 let currentObject = totalMaterials[i];

									 currentObject = {
										 Category: currentCategory,
										 Materials: [],
									 }

									let currentCategoryID = currentCategory.id

									 for  (let i = 0; i < totalMatList.length; i++) {
										 let checkArray = jQuery.inArray(totalMatList[i].id, currentCategory.items);
											if (checkArray != -1) {
													 currentObject.Materials.push(totalMatList[i]);
											}
									 }

									 totalMaterials[i] = currentObject;
								 }

									totalMaterials.sort(function(a, b){
										var x = a.Category.order; var y = b.Category.order;
										return ((x < y) ? -1 : ((x > y) ? 1 : 0));
									})


					let orderOfIds = []
							for (let i = 0; i < totalMaterials.length; i++) {
								orderOfIds.push(totalMaterials[i].Category.id);
							}

							AccountVault.sort(function(a, b){
								var x = a.category; var y = b.category;
								return orderOfIds.indexOf(x) < orderOfIds.indexOf(y) ? -1 : 1;
							})

								for (let i = 0; i < 9; i++) {
								let currentCategory = totalMaterials[i].Category;
							 	let currentObject = accountMaterials[i];

												currentObject = {
													Category: currentCategory,
													Materials: [],
												}
																	for  (let i = 0; i < AccountVault.length; i++)

																		 if (currentCategory.id == AccountVault[i].category) {
																					currentObject.Materials.push(AccountVault[i]);
																		 }

									 accountMaterials[i] = currentObject;
								}

								for (let i = 0; i < accountMaterials.length; i++) {

									accountMaterials[i].Materials.sort(function(a, b){
										var x = a.id; var y = b.id;
										return 	accountMaterials[i].Category.items.indexOf(x) < accountMaterials[i].Category.items.indexOf(y) ? -1 : 1;
									})

								}

							for (let i = 0; i < totalMaterials.length; i++) {
										let currentCategory = totalMaterials[i];
										let currentMaterialList =  currentCategory.Materials;
										let currentCategoryHeader =  currentCategory.Category.name;
										let currentClassName = currentCategoryHeader.replace(/\s/g, '');
										let currentAccountCategory = accountMaterials[i];
										let currentAccountMaterials = currentAccountCategory.Materials

										materialStorage.innerHTML += '<section class="materialStorage__category ' + currentClassName + '"></section>'

										materialStorageSelectors[i] = document.querySelector('.' + currentClassName);

											let currentMaterialSelector = materialStorageSelectors[i];
													currentMaterialSelector.style.display = 'flex';
													currentMaterialSelector.style.flexWrap = 'wrap';

												currentMaterialSelector.innerHTML += '<h1 class="materialStorage__header">' + currentCategoryHeader + '</h1>'
											for (let i = 0; i < currentMaterialList.length; i++) {
												let currentAccountMaterialsCount = currentAccountMaterials[i].count
												let currentMaterialName = currentMaterialList[i].name.replace(/\s/g, '');
															currentMaterialName = currentMaterialName.replace(/'/g, '');
																currentMaterialName = currentMaterialName.replace(/\+1AgonyInfusion/g, 'AgonyInfusion');


													currentMaterialSelector.innerHTML += '<div class="materialStorage__box ' + currentMaterialName + '"></div>'
														let currentSelector = document.querySelector('.' +  currentMaterialName);
														currentSelector.style.backgroundImage = 'url('+ currentMaterialList[i].icon + ')';

														if (currentAccountMaterialsCount == 0) {
															currentSelector.classList.add('materialStorage__box--filter')
														} else {
														currentSelector.innerHTML += '<h1 class="materialStorage__count">'+ currentAccountMaterialsCount + '</h1>'
														}
											}
							}
    });
});

// Account Bank Things //
	getAccountBank.then(function(response){

		const maxAmountOfTabs = 14;
		const maxAmountOfSlots = maxAmountOfTabs * 30
		let listOfBankItems = response;
		let bankItemsCount = response.length;
		let bankTabsCount = bankItemsCount / 30
		let bankSlotsUsedCount = 0;
		let itemIds = [];
		let pageLimit = 200;
		let bankItems = [];
		let items2;
		let items3;


			for (let i = 0; i < bankItemsCount; i ++) {
				if (response[i]) {
					bankSlotsUsedCount += 1;
				}
			}

			for (let i = 0; i < response.length; i++) {
				if (response[i]) {
					itemIds.push(response[i].id)
				}
			}

			let items1 = fetch(baseAPI + 'items?ids=' + itemIds.slice(0, pageLimit))
			.then(function(response){
				return response.json();
			})

			if (bankItemsCount >= pageLimit ) {
						items2 = fetch(baseAPI + 'items?ids=' + itemIds.slice(200, 400))
						.then(function(response){
							return response.json();
						})

					if (bankItemsCount >= 400 && bankItemsCount <= maxAmountOfSlots) {
						items3 = fetch(baseAPI + 'items?ids=' + itemIds.slice(400, maxAmountOfSlots))
						.then(function(response){
							return response.json();
						})
					}
				}

		Promise.all([items1, items2, items3]).then(values => {
				totalBankList = values[0].concat(values[1], values[2])
				let accountBank = [];
				let startingNumber = 0;
				let endingNumber = 30;
				let countinterval = 30;
				let itemCount = 0;
				let previousId = 0;
				let totalBankListIds = [];

				for (let i = 0; i < totalBankList.length; i++) {
					if(totalBankList[i]) {
					totalBankListIds[i] = totalBankList[i].id
					}
				}

				for (let i = 0; i < bankTabsCount; i++) {
					accountBank[i] = {
							tabNumber: i,
							tabItems: listOfBankItems.slice(startingNumber, endingNumber),

					}

					currentBankTab = accountBank[i];

					for (let i = 0; i < currentBankTab.tabItems.length; i++) {


						if (currentBankTab.tabItems[i]) {
							var getSlotItem = totalBankListIds.indexOf(currentBankTab.tabItems[i].id)
								currentBankTab.tabItems[i] = {
														itemInfo: currentBankTab.tabItems[i],
														itemDetails: totalBankList[getSlotItem]
							}
					}
				}
				accountBank[i] = currentBankTab;
				startingNumber += countinterval;
				endingNumber += countinterval;
				}

				for (let i = 0; i < accountBank.length; i++) {
						let currentBankTab = accountBank[i]

						let currentItemList = currentBankTab.tabItems
						let currentTabNumber = currentBankTab.tabNumber
						accountBankDOM.innerHTML += '<section class="accountBank__tab ' + 'tab-'+ currentTabNumber + '"></section>'
						accountBankDOMSelectors[i] = document.querySelector('.' + 'tab-' + currentTabNumber);

						let 	currentAccountBankDOMSelector = 	accountBankDOMSelectors[i];
									currentAccountBankDOMSelector.style.display = 'flex';
									currentAccountBankDOMSelector.style.flexWrap = 'wrap';

									for (let z = 0; z < currentItemList.length; z++) {

											if (currentItemList[z]) {
												let itemID = 'tab-' + currentTabNumber + 'item-' + z;
												let currentItemCount = currentItemList[z].itemInfo.count
												let currentBox = 	currentAccountBankDOMSelector.innerHTML += '<div class="accountBank__box ' + itemID + '"></div>'
													let currentSelector = document.querySelector('.' +  itemID);
															currentSelector.style.backgroundImage = 'url('+ currentItemList[z].itemDetails.icon + ')';

													if (currentItemCount != 1) {
														currentSelector.innerHTML += '<h1 class="accountBank__count">' + currentItemCount + '</h1>'
													}
											}

											else {
												currentAccountBankDOMSelector.innerHTML += '<div class="accountBank__box accountBank__box--empty"></div>'
											}
									}
				}
		});
});
