const logOutBtn = new LogoutButton();
const rateBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из аккаунта
logOutBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

// Получение курса валют
function gettingStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            rateBoard.clearTable();
            rateBoard.fillTable(response.data);
    }
    })
}

gettingStocks();
setInterval(gettingStocks, 1000);

// Пополнение баланса
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'You add money');
        }
        else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// Конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'You converted money');
        }
        else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// Перевод валюты
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'You transfered money');
        }
        else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// Получение списка избранных
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

// Добавление пользователей в избранное
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.setMessage(true, 'You added user');
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    else {
        favoritesWidget.setMessage(false, response.error);
    }
});
}


// Удаление пользователей из избранного
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.setMessage(true, 'You deleted user');
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    else {
        favoritesWidget.setMessage(false, response.error);
    }
});
}