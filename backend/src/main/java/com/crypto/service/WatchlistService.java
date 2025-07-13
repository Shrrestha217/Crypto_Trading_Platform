package com.crypto.service;

import com.crypto.model.Coin;
import com.crypto.model.User;
import com.crypto.model.Watchlist;

public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;

    void removeItemFromWatchlist(Coin coin, User user);
}
