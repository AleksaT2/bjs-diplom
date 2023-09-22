const logOutBtn = new LogoutButton;
const rateBoard = new RatesBoard;
const moneyManager = new MoneyManager;
const favoritesWidget = new FavoritesWidget;

// Выход из аккаунта
logOutBtn.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе
ApiConnector.current(callback => {
    if (callback.success) {
        ProfileWidget.showProfile(callback.data);
    }
})

// Получение курса валют
ApiConnector.getStocks(callback => {
    if (callback.success) {
        rateBoard.clearTable();
        rateBoard.fillTable(callback.data);
    }
})

setInterval(function() {
    ApiConnector.getStocks;
}, 1000);

// Пополнение баланса
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true, 'You add money');
        }
        else {
            moneyManager.setMessage(false, callback.data);
        }
    })
}

// Конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true, 'You converted money');
        }
        else {
            moneyManager.setMessage(false, callback.data);
        }
    })
}

// Перевод валюты
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true, 'You transfered money');
        }
        else {
            moneyManager.setMessage(false, callback.data);
        }
    })
}

// Получение списка избранных
ApiConnector.getFavorites(callback => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
})

// Добавление пользователей в избранное
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.setMessage(true, 'You added user');
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
    else {
        favoritesWidget.setMessage(false, callback.data);
    }
});
}


// Удаление пользователей из избранного
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, callback => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.setMessage(true, 'You deleted user');
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
    else {
        favoritesWidget.setMessage(false, callback.data);
    }
});
}