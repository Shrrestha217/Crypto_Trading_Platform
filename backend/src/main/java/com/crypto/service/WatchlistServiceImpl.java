package com.crypto.service;

import com.crypto.model.Coin;
import com.crypto.model.User;
import com.crypto.model.Watchlist;
import com.crypto.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService{

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist watchlist = watchlistRepository.findByUserId(userId);
        if(watchlist ==  null) {
            throw new Exception("Watchlist Not Found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchlist(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);

        return watchlistRepository.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlistOptional = watchlistRepository.findById(id);
        if(watchlistOptional.isEmpty()) {
            throw new Exception("Watchlist Not Found");
        }

        return watchlistOptional.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());

        if(watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin);
        }
        else watchlist.getCoins().add(coin);

        watchlistRepository.save(watchlist);

        return coin;
    }

    @Override
    public void removeItemFromWatchlist(Coin coin, User user) {
        Watchlist watchlist = watchlistRepository.findByUserId(user.getId());

        if (watchlist != null && watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin);
            watchlistRepository.save(watchlist);
        }
    }}
