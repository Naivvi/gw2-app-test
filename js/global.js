var baseAPI = 'https://api.guildwars2.com/v2/'
const pageLimit = 200;
var accessToken = '?access_token='
var currentHook = 'account/achievements'
var currentKey = '0ADC6A10-9731-7D46-A7D6-0B48645D4F9A2A42BAF4-5C27-4D0E-AFC1-B6379E158858'

var CategoryList = ['cookingMaterials', 'basicCraftingMaterials', 'intermediateCraftingMaterials',
											'gemstonesAndJewels', 'advancedCraftingMaterials', 'festiveMaterials', 'ascendedMaterials',
											'cookingIngredients', 'scribingMaterials']
let totalMaterials = []

let accountMaterials = []

	for (let i = 0; i < CategoryList.length; i++) {
		totalMaterials[i] = {}

 	}

	for (let i = 0; i < 9; i++) {
		accountMaterials[i] = {}

	}

var materialStorage = document.querySelector('.materialStorage');
var materialStorageSelectors = []

var accountBankDOM = document.querySelector('.accountBank');
var accountBankDOMSelectors = []
