package com.crypto.controller;

import com.crypto.model.Coin;
import com.crypto.model.User;
import com.crypto.model.Watchlist;
import com.crypto.service.CoinService;
import com.crypto.service.UserService;
import com.crypto.service.WatchlistService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addCoinToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin updated = watchlistService.addItemToWatchlist(coin, user);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/remove/coin/{coinId}")
    public ResponseEntity<String> removeCoinFromWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        watchlistService.removeItemFromWatchlist(coin, user);

        return ResponseEntity.ok("Coin removed from watchlist.");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserWatchlist(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());

        List<Map<String, Object>> enrichedCoins = new ArrayList<>();

        for (Coin coin : watchlist.getCoins()) {
            try {
                String coinJson = coinService.getCoinDetails(coin.getId());

                JsonNode jsonNode = new ObjectMapper().readTree(coinJson);
                JsonNode marketData = jsonNode.path("market_data");

                Map<String, Object> data = new HashMap<>();
                data.put("id", jsonNode.path("id").asText());
                data.put("name", jsonNode.path("name").asText());
                data.put("symbol", jsonNode.path("symbol").asText());
                data.put("image", jsonNode.path("image").path("large").asText());

                data.put("currentPrice", marketData.path("current_price").path("usd").asDouble());
                data.put("priceChangePercentage24h", marketData.path("price_change_percentage_24h").asDouble());

                enrichedCoins.add(data);
            } catch (Exception e) {
                System.err.println("Error fetching data for coin " + coin.getId() + ": " + e.getMessage());
            }
        }
        return ResponseEntity.ok(enrichedCoins);
    }
}
